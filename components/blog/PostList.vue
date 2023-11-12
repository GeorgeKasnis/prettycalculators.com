<template>
    <div v-if="posts" class>
        <nuxt-link to="/blog">
            <h2 class="text-small font-bold p-small bg-black text-main">Blog</h2>
        </nuxt-link>
        <nuxt-link v-if="imgAreReady" to="#" class="grid grid-cols-4 gap-big mt-big tablet:grid-cols-3 mobile:grid-cols-1">
            <BlogSinglePost v-for="(post, index) in posts.items" :key="index" :post-data="post" :img-url="imagesUrls[index]" />
        </nuxt-link>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const { data: posts } = await useFetch(`${runtimeConfig.public.API_URL} `);

const imgAreReady = ref(false);
const imagesUrls = ref([]);

const matchImageUrls = () => {
    imgAreReady.value = false;
    imagesUrls.value = [];

    const assetMap = new Map(posts.value.includes.Asset.map(asset => [asset.sys.id, asset.fields.file.url]));

    for (const item of posts.value.items) {
        const imageId = item.fields.featuredImage.sys.id;
        const imageUrl = assetMap.get(imageId);

        if (imageUrl) {
            imagesUrls.value.push(imageUrl);
        }
    }

    imgAreReady.value = imagesUrls.value.length > 0;
};

onMounted(() => {
    matchImageUrls();
});
</script>
