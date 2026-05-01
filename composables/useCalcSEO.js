export const useCalcSEO = (title, description) => {
    useHead({
        title,
        meta: [
            { hid: 'title', name: 'title', content: title },
            { hid: 'description', name: 'description', content: description },
            { hid: 'og-title', property: 'og:title', content: title },
            { hid: 'og:description', property: 'og:description', content: description },
        ],
    })
}
