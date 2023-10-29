<template>
    <div>
        <article class="bg-white">
            <nuxt-link :to="`/blog/${postData.fields.slug}`">
                <img class="w-full aspect-video object-cover border-b" :src="`https://${fixUrl(imgUrl)}`" alt="" />
                <div class="p-small border">
                    <h3 class="font-bold line-clamp-1">{{ postData.fields.title }}</h3>
                </div>
            </nuxt-link>
        </article>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const props = defineProps({
    postData: {
        type: Object,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
});

const fixUrl = (url) => {
    return url.replace(/^\/+/, "");
};

console.log("aaa", props.imgUrl);
</script>
