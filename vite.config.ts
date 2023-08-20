import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { serverBrowserSync } from 'full-client-server-sveltekit/plugin';
import { cjsInterop } from 'vite-plugin-cjs-interop'

export default defineConfig({
	plugins: [
        sveltekit(),
        serverBrowserSync({
        }),
        cjsInterop({
            dependencies: [
                "pg"
            ]
        })

    ],
    server: {
        hmr: {
            port: 3000
        }
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/]
        },
        target: 'esnext'
    }
});
