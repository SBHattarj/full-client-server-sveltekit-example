import adapter from '@carlosv2/adapter-node-ws/adapter';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
