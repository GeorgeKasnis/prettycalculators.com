// 301 old /other/* URLs to /tools/* after the category split (2026-07)
const MOVED = new Set([
    'image-compressor',
    'qr-code-generator',
    'password-generator',
    'json-formatter',
    'diff-checker',
    'unix-timestamp-converter',
    'color-contrast-checker',
    'base64-encoder-decoder',
    'uuid-generator',
    'word-counter',
    'px-to-rem-calculator',
    'aspect-ratio-calculator',
    'css-clamp-calculator',
])

export default defineEventHandler((event) => {
    const url = event.node.req.url || ''
    const match = url.match(/^\/other\/([a-z0-9-]+)\/?(\?.*)?$/)
    if (match && MOVED.has(match[1])) {
        return sendRedirect(event, `/tools/${match[1]}${match[2] || ''}`, 301)
    }
})
