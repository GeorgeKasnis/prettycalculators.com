import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-VL24XPE0N4'
    }
  }, router)
})