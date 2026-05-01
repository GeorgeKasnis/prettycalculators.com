const THUMB_COLORS = ['#1a1600', '#0d0020', '#001a10', '#1a0000', '#001220', '#120015', '#0a1515', '#15000a']

export const useBlogUtils = () => ({
    thumbLines: (title) => {
        if (!title) return ['', '']
        const words = title.split(' ')
        if (words.length <= 2) return [title, '']
        const mid = Math.ceil(words.length / 2)
        return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
    },
    thumbColor: (i) => THUMB_COLORS[i % THUMB_COLORS.length],
    formatDate: (iso, long = false) => {
        if (!iso) return ''
        return long
            ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    },
    postCategory: (post) => post.fields?.category ?? post.metadata?.tags?.[0]?.sys?.id ?? '',
})
