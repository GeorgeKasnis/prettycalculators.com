export const useAllCalculators = () => {
    const { otherCategories } = useCategoryConfig('_')
    return otherCategories.flatMap(cat =>
        cat.tools.map(tool => ({
            label:        tool.label,
            to:           tool.to,
            category:     cat.title,
            categorySlug: cat.slug,
            color:        cat.color,
        }))
    )
}
