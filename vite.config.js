import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'

export default {
  plugins: [
    // ...
    Pages({
      onRoutesGenerated: routes => (generateSitemap({ routes })),
    }),
  ],
}