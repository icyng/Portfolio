import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readLife } from './server/life.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GITHUB_PROJECT_')
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'life-api',
        configureServer(server) {
          server.middlewares.use('/api/life', async (req, res) => {
            if (req.method !== 'GET') {
              res.statusCode = 405
              res.setHeader('Allow', 'GET')
              res.end()
              return
            }
            const result = await readLife(env.GITHUB_PROJECT_TOKEN || process.env.GITHUB_PROJECT_TOKEN)
            res.statusCode = result.status
            result.headers.forEach((value, key) => res.setHeader(key, value))
            res.end(await result.text())
          })
        },
      },
    ],
  }
})
