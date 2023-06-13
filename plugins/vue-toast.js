import Toast, { POSITION } from "vue-toastification";

import "vue-toastification/dist/index.css" // if needed

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        // Setting the global default position
        position: "bottom-right",
        icon: false,
        hideProgressBar: true,
        closeButton:false
    })
})