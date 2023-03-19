

import { createApp } from 'vue'
import VueGtm from '@gtm-support/vue-gtm'

export default ({ app }) => {
  const options = {
    id: 'GTM-TP4P927',
    enabled: true,
    debug: true,
    loadScript: true,
    vueRouter: app.router,
    ignoredViews: ['homepage']
  }
  
  createApp().use(VueGtm, options)
}
