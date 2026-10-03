# Portfolio

This is a simple portfolio website built with React, Vite, and TailwindCSS.

## Development

```sh
npm install
npm run dev
```

## Checks

```sh
npm test
npm run lint
npm run build
```

## Life (GitHub Projects)

Life reads user `icyng`'s project `10` through `/api/life`. The page loads on
opening and refreshes every five minutes. Successful API responses are cached
for up to five minutes. Only non-archived items from a public project are shown;
items from private repositories are excluded. Done items are excluded. Titles, Status groups, and Markdown bodies are shown.
The public-page adapter obtains issue bodies through the public Issues REST API;
if a body request fails, the title and source link remain visible with a message.

By default the server reads the public board's embedded display data, with no
credentials. This is not GitHub's versioned API and can change. If GitHub changes
the page structure or paginates the board, the adapter fails explicitly rather
than silently publishing an incomplete board.

For the official GraphQL API (recommended for a larger board), create
`.env.local` (ignored by Git):

```dotenv
GITHUB_PROJECT_TOKEN=your_read_only_project_token
```

Use a token with `read:project` access. Never use a `VITE_` prefix for this
secret. Restart the dev server after setting it.

For Cloudflare Pages, `functions/api/life.js` serves the endpoint. Optionally configure
`GITHUB_PROJECT_TOKEN` as a secret for the official API. Deploy
with Pages Functions enabled (project root `functions/`, build output `dist`).
The GitHub project must be public. Making a project public is a separate manual
choice; the application does not change its visibility.

A static `dist` deployment or `vite preview` alone does not serve this API.
If public visibility, the public-page adapter, or the configured API is unavailable, the page displays an
unavailable message and keeps the link to GitHub. No placeholder items are
presented as real data. Deployments on other providers need an equivalent
server endpoint.
