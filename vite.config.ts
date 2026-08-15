import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

function copyApiPlugin() {
  return {
    name: 'copy-api',
    closeBundle() {
      const from = join(process.cwd(), 'api')
      const to = join(process.cwd(), 'dist', 'api')
      if (!existsSync(from)) return
      mkdirSync(to, { recursive: true })
      cpSync(from, to, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), copyApiPlugin()],
})
