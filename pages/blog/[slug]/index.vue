<template>
    <div class="max-w-4xl w-full">
        <h1 class="text-big font-bold mb-small">{{post.items[0].fields.title}}</h1>
        <img class="w-full aspect-video object-cover" :src="`https://${post.includes.Asset[0].fields.file.url}`" alt="">
        <div>
            <p v-for="i,index in post.items[0].fields.content.content" :key="index" v-html="i.content[0].value"></p>
        </div>
    </div>
</template>

<script setup>
    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();
    const { data: post } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog&fields.slug=${route.params.slug}`);
    console.log(post);
</script>

