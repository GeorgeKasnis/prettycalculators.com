<template>
    <clientOnly>
        <div class="flex gap-4">
            <ShareNetwork network="facebook" :url="`${runtimeConfig.public.SITE_URL}blog/${props.slug}`" :title="title" :description="description">
                <font-awesome-icon icon="fa-brands fa-facebook" />
            </ShareNetwork>
            <ShareNetwork network="twitter" :url="`${runtimeConfig.public.SITE_URL}blog/${props.slug}`" :title="title" :description="description">
                <font-awesome-icon icon="fa-brands fa-twitter" />
            </ShareNetwork>
            <ShareNetwork network="messenger" :url="`${runtimeConfig.public.SITE_URL}blog/${props.slug}`" :title="title" :description="description">
                <font-awesome-icon :icon="['fab', 'facebook-messenger']" />
            </ShareNetwork>
            <ShareNetwork network="viber" :url="`${runtimeConfig.public.SITE_URL}blog/${props.slug}`" :title="title" :description="description">
                <font-awesome-icon :icon="['fab', 'viber']" />
            </ShareNetwork>
            <button @click="copyUrl"><font-awesome-icon :icon="['fas', 'link']" /></button>
        </div>
    </clientOnly>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug:{
        type:String,
        required:true
    }
});

const copyUrl = () =>{
     navigator.clipboard.writeText(`${runtimeConfig.public.SITE_URL}blog/${props.slug}`)
       toast.success("Url copied to clipboard");
}
</script>
