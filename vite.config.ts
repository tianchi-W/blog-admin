import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCDNPlugin from 'vite-plugin-cdn-import' //cdn
import viteCompression from 'vite-plugin-compression'
const pathSrc = path.resolve(__dirname, 'src')
export default () => {
  console.log(process.env.NODE_ENV)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],

        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      ,
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver()
        ],

        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      visualizer({
        open: true, //注意这里要设置为true，否则无效
        gzipSize: true,
        brotliSize: true
      }),
      // viteCDNPlugin({
      //   // 需要 CDN 加速的模块
      //   modules: [
      //     {
      //       name: 'three',
      //       var: '_',
      //       path: `https://cdn.bootcdn.net/ajax/libs/three.js/0.151.3/three.js`
      //     }
      //   ]
      // }),
      viteCompression({
        algorithm: 'gzip',
        threshold: 10240,
        verbose: false,
        deleteOriginFile: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      cors: true,
      open: false,
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://localhost:50',
          changeOrigin: true,
          rewrite: (path) => {
            console.log(path)
            return path.replace(/\/api/, '')
          } // 不可以省略rewrite
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id: any): any {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  })
}
