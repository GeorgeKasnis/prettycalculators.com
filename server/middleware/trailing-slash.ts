// 301 /path/ -> /path so every page has exactly one indexable URL
export default defineEventHandler((event) => {
    const url = event.node.req.url || ''
    const qIndex = url.indexOf('?')
    const path = qIndex === -1 ? url : url.slice(0, qIndex)
    if (path.length > 1 && path.endsWith('/')) {
        const query = qIndex === -1 ? '' : url.slice(qIndex)
        return sendRedirect(event, path.replace(/\/+$/, '') + query, 301)
    }
})
