import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import { default as _ } from 'lodash'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const alias: Record<string, string> = {
    '/@': pathResolve('./src/'),
    assets: pathResolve('./src/assets'),
  }

  return {
    plugins: [vue()],
    root: process.cwd(),
    resolve: { alias },
    base: './',
    server: {
      host: '0.0.0.0',
      port: 4200,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/graphql': {
          target: 'https://vortex.korabli.su/api/',
          headers: {
            origin: 'localhost',
          },
          changeOrigin: true,
          secure: false,
        },
      }
    },
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      outDir: './dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', 'element-plus'],
            echarts: ['echarts'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/@/styles/element/index.scss" as *;`,
        },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
}

export default viteConfig
