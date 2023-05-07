import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default () => {
  console.log(process.env.NODE_ENV)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      cors: true,
      open: true,
      port: 8000
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:50',
      //     changeOrigin: true,
      //     rewrite: (path) => {
      //       console.log(path)
      //       return path.replace(/\/api/, '')
      //     } // 不可以省略rewrite
      //   }
      // }
    }
  })
}
