import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	server: {
		host: true,
	},
	build: {
		rollupOptions: {
			output: {
				assetFileNames: '[hash].[name].[ext]',
			},
		},
	},
	plugins: [react()],
});
