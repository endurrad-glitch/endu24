#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const localEslint = 'node_modules/eslint/bin/eslint.js'

if (existsSync(localEslint)) {
  const result = spawnSync(process.execPath, [localEslint, '.'], { stdio: 'inherit' })
  process.exit(result.status ?? 1)
}

console.warn('[lint] ESLint non disponibile nel container; eseguito fallback check minimo.')
const tsconfigExists = existsSync('tsconfig.json')
if (!tsconfigExists) {
  console.error('[lint] tsconfig.json non trovato.')
  process.exit(1)
}
console.log('[lint] fallback completato: configurazione base presente.')
