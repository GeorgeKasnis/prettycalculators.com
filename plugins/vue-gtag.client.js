import VueGtag from 'vue-gtag-next'
 
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-VL24XPE0N4'
    }
  })
})