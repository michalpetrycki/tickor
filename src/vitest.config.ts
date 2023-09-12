/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    server: {
        open: true,
    },
    build: {
        outDir: 'build',
        sourcemap: true,
        commonjsOptions: {
            include: [],
        },
    },
    optimizeDeps: {
        disabled: false,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        mockReset: true
    }
});