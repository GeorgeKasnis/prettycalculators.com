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
    for (let i in posts.value.items) {
        for (let y in posts.value.includes.Asset) {
            if ((posts.value.items[i].fields.featuredImage.sys.id == posts.value.includes.Asset[y].sys.id)) {
                imagesUrls.value.push(posts.value.includes.Asset[y].fields.file.url);
            }
        }
    }

    imagesUrls.value = imagesUrls.value.slice(0, posts.value.items.length);
     imagesUrls.value ?  imgAreReady.value = true : imgAreReady.value = false ;
};

onMounted(() => {
    matchImageUrls();
});
</script>
