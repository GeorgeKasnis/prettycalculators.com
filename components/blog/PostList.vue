<template>
    <div v-if="posts" class>
        <nuxt-link to="/blog">
            <h2 class="text-small font-bold p-small bg-black text-main">Blog</h2>
        </nuxt-link>
        <nuxt-link to="#" class="grid grid-cols-4 gap-big mt-big tablet:grid-cols-3 mobile:grid-cols-1">
            <BlogSinglePost v-for="(post, index) in posts.items" :key="index" :post-data="post" :img-url="posts.includes.Asset[index].fields.file.url" />
        </nuxt-link>

    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const { data: posts } = await useFetch(`${runtimeConfig.public.API_URL} `);

</script>
