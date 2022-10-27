import { defineConfig } from 'vitest/config'

export default defineConfig ({
	base: '/capgemini/sanctuary/',
	build: {
		outDir: '../docs/sanctuary',
		emptyOutDir: true
	},
	test: {
		includeSource: ['js/**/*.js'],
	}
})