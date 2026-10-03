import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePublicLife, readLife } from '../server/life.js';

const item = (id, title, isPublic = true, status = 'todo') => ({
  id, content: { url: `https://github.com/icyng/life/issues/${id}` },
  memexProjectColumnValues: [
    { memexProjectColumnId: 'Title', value: { title: { raw: title } } },
    { memexProjectColumnId: 'Repository', value: { isPublic } },
    { memexProjectColumnId: 'Status', value: { id: status } },
  ],
});
const html = (items, { publicProject = true, more = false, total = items.length } = {}) => {
  const data = {
    'memex-data': { title: 'life', public: publicProject },
    'memex-columns-data': [{ id: 'Status', name: 'Status', settings: { options: [{ id: 'todo', name: 'To do' }, { id: 'done', name: 'Done' }] } }],
    'memex-paginated-items-data': { totalCount: { value: total, isApproximate: false },
      groupedItems: [{ nodes: items, pageInfo: { hasNextPage: more, hasPreviousPage: false } }] },
  };
  return Object.entries(data).map(([id, value]) => `<script type="application/json" id="${id}">${JSON.stringify(value)}</script>`).join('');
};

test('public board retains titles, status and canonical issue links, excluding private repositories', () => {
  const feed = parsePublicLife(html([item(1, '公開項目'), item(2, '非公開項目', false)]));
  assert.deepEqual(feed.groups, [{ name: 'To do', items: [{ id: '1', title: '公開項目', url: 'https://github.com/icyng/life/issues/1' }] }]);
});

test('private and incomplete boards are rejected instead of published', () => {
  assert.throws(() => parsePublicLife(html([], { publicProject: false })));
  assert.throws(() => parsePublicLife(html([item(1, '部分項目')], { more: true })));
  assert.throws(() => parsePublicLife(html([], { total: 1 })));
  assert.throws(() => parsePublicLife('<html>404</html>'));
});

test('public adapter works without a token and marks successful responses cacheable', async () => {
  const result = await readLife(undefined, async url => url.includes('api.github.com') ? Response.json({ body: '本文' }) : new Response(html([item(1, '公開項目')])));
  assert.equal(result.status, 200);
  assert.match(result.headers.get('Cache-Control'), /max-age=300/);
  assert.equal((await result.json()).groups[0].items[0].body, '本文');
});

test('upstream failure is sanitized and never cached', async () => {
  const result = await readLife(undefined, async () => { throw new Error('Sensitive upstream detail'); });
  assert.equal(result.status, 502);
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await result.json(), { error: 'public-board-unavailable' });
});

test('official API paginates and excludes archived/private items', async () => {
  let calls = 0;
  const result = await readLife('test-token', async (_url, options) => {
    const { variables } = JSON.parse(options.body);
    assert.equal(variables.after, calls === 0 ? null : 'next');
    calls += 1;
    return Response.json({ data: { user: { projectV2: {
      title: 'life', public: true,
      fields: { nodes: [{ name: 'Status', options: [{ name: 'To do' }] }] },
      items: {
        pageInfo: { hasNextPage: calls === 1, endCursor: 'next' },
        nodes: [{ id: String(calls), content: { title: `項目${calls}`, repository: { isPrivate: false } },
          fieldValues: { nodes: [{ name: 'To do', field: { name: 'Status' } }] } },
          { id: 'hidden', content: { title: '非公開', repository: { isPrivate: true } }, fieldValues: { nodes: [] } },
          { id: 'archived', isArchived: true, content: { title: '古い項目' }, fieldValues: { nodes: [] } }],
      },
    } } } });
  });
  assert.equal(calls, 2);
  assert.equal(result.status, 200);
  assert.deepEqual((await result.json()).groups[0].items.map(value => value.title), ['項目1', '項目2']);
});

test('Done items are excluded before any issue body requests', async () => {
  const requested = [];
  const result = await readLife(undefined, async url => {
    requested.push(url);
    return url.includes('api.github.com') ? Response.json({ body: '## 概要\n説明\n- [ ] TODO' })
      : new Response(html([item(1, '未完了'), item(2, '完了', true, 'done')]));
  });
  const feed = await result.json();
  assert.equal(feed.groups.length, 1);
  assert.equal(feed.groups[0].items[0].body, '## 概要\n説明\n- [ ] TODO');
  assert.equal(requested.length, 2);
  assert.ok(!requested.some(url => url.endsWith('/issues/2')));
});

test('a body request failure retains the item with an explicit unavailable flag', async () => {
  const result = await readLife(undefined, async url => url.includes('api.github.com')
    ? new Response('', { status: 429 }) : new Response(html([item(1, '未完了')])));
  const feed = await result.json();
  assert.equal(result.status, 200);
  assert.equal(feed.groups[0].items[0].title, '未完了');
  assert.equal(feed.groups[0].items[0].bodyUnavailable, true);
});
