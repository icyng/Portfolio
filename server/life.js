const isDone = name => /^done$/i.test(name.trim());
const PROJECT_URL = 'https://github.com/users/icyng/projects/10';
const query = `query Life($after: String) {
  user(login: "icyng") {
    projectV2(number: 10) {
      title url public
      fields(first: 100) { nodes { ... on ProjectV2SingleSelectField { name options { name } } } }
      items(first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id isArchived
          content {
            ... on DraftIssue { title body }
            ... on Issue { title body url repository { isPrivate } }
            ... on PullRequest { title body url repository { isPrivate } }
          }
          fieldValues(first: 100) { nodes {
            ... on ProjectV2ItemFieldSingleSelectValue {
              name field { ... on ProjectV2SingleSelectField { name } }
            }
          } }
        }
      }
    }
  }
}`;

const response = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': status === 200 ? 'public, max-age=300' : 'no-store',
  },
});

export async function readLife(token, requestFetch = fetch) {
  if (!token) return readPublicLife(requestFetch);
  try {
    let after = null;
    const groups = new Map();
    let project;
    for (let page = 0; page < 10; page += 1) {
      const result = await requestFetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'icyng-portfolio' },
        body: JSON.stringify({ query, variables: { after } }),
        signal: AbortSignal.timeout(8000),
      });
      if (!result.ok) return response({ error: 'upstream-unavailable' }, 502);
      const payload = await result.json();
      project = payload.data?.user?.projectV2;
      if (payload.errors?.length || !project) return response({ error: 'project-unavailable' }, 502);
      // Never turn a private project into a public feed.
      if (!project.public) return response({ error: 'project-not-public' }, 403);
      const statusField = project.fields.nodes.find(field => /^(status|ステータス)$/i.test(field.name ?? ''));
      for (const option of statusField?.options ?? []) {
        if (!isDone(option.name) && !groups.has(option.name)) groups.set(option.name, []);
      }
      for (const item of project.items.nodes) {
        if (item.isArchived || !item.content?.title || item.content.repository?.isPrivate) continue;
        const status = item.fieldValues.nodes.find(value => /^(status|ステータス)$/i.test(value.field?.name ?? ''))?.name ?? 'その他';
        if (isDone(status)) continue;
        if (!groups.has(status)) groups.set(status, []);
        const url = item.content.url;
        groups.get(status).push({ id: item.id, title: item.content.title, body: item.content.body ?? '',
          ...(url?.startsWith('https://github.com/') ? { url } : {}) });
      }
      if (!project.items.pageInfo.hasNextPage) {
        return response({ title: project.title, url: PROJECT_URL, fetchedAt: new Date().toISOString(),
          groups: [...groups].map(([name, items]) => ({ name, items })) });
      }
      after = project.items.pageInfo.endCursor;
      if (!after) return response({ error: 'invalid-pagination' }, 502);
    }
    return response({ error: 'project-too-large' }, 502);
  } catch {
    return response({ error: 'upstream-unavailable' }, 502);
  }
}

// Public GitHub pages include the board's initial display data. Keep this
// adapter isolated because it is not GitHub's versioned API contract.
export function parsePublicLife(html) {
  const embedded = id => {
    const match = html.match(new RegExp(`<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)</script>`));
    if (!match) throw new Error('Missing public board data');
    return JSON.parse(match[1]);
  };
  const project = embedded('memex-data');
  if (project.public !== true) throw new Error('Project is not public');
  const page = embedded('memex-paginated-items-data');
  const columns = embedded('memex-columns-data');
  const statusField = columns.find(column => /^(status|ステータス)$/i.test(column.name));
  const options = statusField?.settings?.options ?? [];
  const groups = new Map(options.filter(option => !isDone(option.name)).map(option => [option.name, []]));
  const seen = new Set();
  for (const batch of page.groupedItems) {
    if (batch.pageInfo?.hasNextPage || batch.pageInfo?.hasPreviousPage) throw new Error('Incomplete public board data');
    for (const item of batch.nodes) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      const values = item.memexProjectColumnValues;
      const titleValue = values.find(value => value.memexProjectColumnId === 'Title')?.value;
      const title = titleValue?.title?.raw;
      const repository = values.find(value => value.memexProjectColumnId === 'Repository')?.value;
      if (item.isArchived || !title || (repository && repository.isPublic !== true)) continue;
      const statusId = values.find(value => value.memexProjectColumnId === statusField?.id)?.value?.id;
      const status = options.find(option => option.id === statusId)?.name ?? 'その他';
      if (isDone(status)) continue;
      if (!groups.has(status)) groups.set(status, []);
      const url = item.content?.url ?? titleValue.url;
      groups.get(status).push({ id: String(item.id), title,
        ...(url?.startsWith('https://github.com/') ? { url } : {}) });
    }
  }
  if (page.totalCount.isApproximate || seen.size !== page.totalCount.value) throw new Error('Incomplete public board data');
  return { title: project.title, url: PROJECT_URL, fetchedAt: new Date().toISOString(),
    groups: [...groups].map(([name, items]) => ({ name, items })) };
}

async function readPublicLife(requestFetch) {
  try {
    const result = await requestFetch(PROJECT_URL, {
      headers: { Accept: 'text/html', 'User-Agent': 'icyng-portfolio' },
      signal: AbortSignal.timeout(8000),
    });
    if (!result.ok) return response({ error: 'project-unavailable' }, 502);
    const feed = parsePublicLife(await result.text());
    const items = feed.groups.flatMap(group => group.items);
    let cursor = 0;
    // Keep unauthenticated REST requests bounded; completed items never fetch bodies.
    async function loadBodies() {
      while (cursor < items.length) {
        const item = items[cursor++];
        const match = item.url?.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(issues|pull)\/(\d+)$/);
        if (!match) { item.bodyUnavailable = true; continue; }
        try {
          const issue = await requestFetch(`https://api.github.com/repos/${match[1]}/${match[2]}/issues/${match[4]}`, {
            headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'icyng-portfolio', 'X-GitHub-Api-Version': '2026-03-10' },
            signal: AbortSignal.timeout(8000),
          });
          if (!issue.ok) throw new Error('Issue unavailable');
          const data = await issue.json();
          if (data.body != null && typeof data.body !== 'string') throw new Error('Invalid issue body');
          item.body = data.body ?? '';
        } catch { item.bodyUnavailable = true; }
      }
    }
    await Promise.all(Array.from({ length: Math.min(4, items.length) }, loadBodies));
    return response(feed);
  } catch {
    return response({ error: 'public-board-unavailable' }, 502);
  }
}
