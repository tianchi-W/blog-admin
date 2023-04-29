import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
console.log(process.env.NODE_ENV)
// https://vitejs.dev/config/
export default () => {
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
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
        }
      }
      // proxy: {
      //   [`${loadEnv(mode, process.cwd()).VITE_APP_BASE_API}`]: {
      //     target: loadEnv(mode, process.cwd()).VITE_TEST_HOST, // 线上
      //     // rewrite: (path:any) => path.replace(/^\/api/, ''),
      //     changeOrigin: true,
      //     ws: true
      //   }
      // }
    }
  })
}
