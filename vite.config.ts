import { reactRouter } from '@react-router/dev/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { type UserConfig } from 'vite'

import { envOnlyMacros } from 'vite-env-only'

const MODE = process.env.NODE_ENV

export default {
	build: {
		target: 'es2022',
		cssMinify: MODE === 'production',

		rollupOptions: {
			external: [/node:.*/, 'fsevents'],
		},

		assetsInlineLimit: (source: string) => {
			if (
				source.endsWith('sprite.svg') ||
				source.endsWith('favicon.svg') ||
				source.endsWith('apple-touch-icon.png')
			) {
				return false
			}
		},

		sourcemap: true,
	},
	plugins: [
		envOnlyMacros(),
		reactRouter(),
		process.env.SENTRY_AUTH_TOKEN
			? sentryVitePlugin({
					disable: MODE !== 'production',
					authToken: process.env.SENTRY_AUTH_TOKEN,
					org: process.env.SENTRY_ORG,
					project: process.env.SENTRY_PROJECT,
					release: {
						name: process.env.COMMIT_SHA,
						setCommits: {
							auto: true,
						},
					},
					sourcemaps: {
						filesToDeleteAfterUpload: [
							'./build/**/*.map',
							'.server-build/**/*.map',
						],
					},
				})
			: null,
	],
} satisfies UserConfig
