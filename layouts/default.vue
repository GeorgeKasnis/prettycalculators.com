<template>
    <div class="w-screen full-height flex items-center flex-col border border-black">
        <UiTheHeader />
        <div class="flex-1 grid place-items-center w-full">
            <slot />
        </div>
        <UiTheFooter />
    </div>
</template>

<script>
export default {
    mounted() {
        let vh = window.innerHeight;

        if (document.documentElement.clientHeight < window.innerHeight) {
            const offset = window.innerHeight - document.documentElement.clientHeight;
            vh += offset;
        }

        document.querySelector(".full-height").style.height = `${vh}px`;

        let favicons = ["/B.png", "/M.png", "/I.png"];
        let counter = 0;

        let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = favicons[0];
        document.getElementsByTagName("head")[0].appendChild(link);

        setInterval(function () {
            let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = favicons[counter];
            document.getElementsByTagName("head")[0].appendChild(link);
            if (counter == favicons.length - 1) counter = 0;
            else counter++;
        }, 2500);
    },
};
</script>
