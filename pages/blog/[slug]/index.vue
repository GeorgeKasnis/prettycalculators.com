<template>
    <div class="max-w-4xl w-full">
        <h1 class="text-big font-bold mb-small">{{ post.items[0].fields.title }}</h1>
        <img class="w-full aspect-video object-cover" :src="`https://${post.includes.Asset[0].fields.file.url}`" :alt="post.includes.Asset[0].fields.title" />

        <div class="mt-small block">
            <BlogSocialShare class=""  :title="post.items[0].fields.metaTitle" :description="post.items[0].fields.metaTitle"  :slug="route.params.slug" />
        </div>
        <div class="mt-big" v-html="documentToHtmlString(post.items[0].fields.content)"></div>
    </div>
</template>

<script setup>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { data: post } = await useFetch(`${runtimeConfig.public.API_URL}&content_type=blog&fields.slug=${route.params.slug}`);

useHead({
    title: `Pretty Calculators - ${post.value.items[0].fields.metaTitle}`,
    meta: [
        { hid: "title", name: "title", content: `Pretty Calculators - ${post.value.items[0].fields.metaTitle}` },
        {
            hid: "description",
            name: "description",
            content: `${post.value.items[0].fields.metaDescription}`,
        },
        { hid: "og-title", property: "og:title", content: `Pretty Calculators - ${post.value.items[0].fields.metaTitle}` },
        {
            hid: "og:description",
            property: "og:description",
            content: `${post.value.items[0].fields.metaDescription}`,
        },
    ],
});
</script>
