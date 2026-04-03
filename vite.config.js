import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        collections: resolve(__dirname, 'collections.html'),
        blog: resolve(__dirname, 'blog.html'),
        article: resolve(__dirname, 'article.html')
      }
    }
  }
})
