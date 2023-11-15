export const globalCopyEmbed = (embed) => {
    navigator.clipboard.writeText(embed)
    toast.success("Embed copied to clipboard");
};

import { useToast } from "vue-toastification";

const toast = useToast();
