import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import WebSockets from "@carlosv2/adapter-node-ws/plugin";
import { serverBrowserSync } from 'full-client-server-sveltekit/plugin';
import { cjsInterop } from 'vite-plugin-cjs-interop'

export default defineConfig({
	plugins: [
        sveltekit(),
        WebSockets(),
        serverBrowserSync({
            connectionTimeout: 10 * 1000,
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
    },
    define: {
        "globalThis.__internal_full_client_server_timeout__": 10 * 1000
    }
});
