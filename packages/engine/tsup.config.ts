import type { Format, NormalizedOptions } from 'tsup'
import { defineConfig } from 'tsup'

interface Context {
    format: Format
}

interface Result {
    js?: string
}

function outputExtensions(ctx: Context): Result {
    if (ctx.format === 'cjs') return { js: '.js' }
    if (ctx.format === 'esm') return { js: '.mjs' }
    return { js: '.min.js' }
}

const license = '/* MIT */'

export default defineConfig({
    splitting: false,
    entry: ['src/index.ts'],
    dts: {
        banner: license
    },
    format: ['cjs', 'esm', 'iife'],
    outExtension: outputExtensions,
    clean: true,
    banner: {
        js: license
    },
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true
})
