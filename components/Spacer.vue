<template>
    <div :class="datas.classes"></div>
</template>

<script>
export default {
    props: {
        datas: Object,
        theme: Object
    }
}
</script>

<style>
.spacer {
    width: 100%;
    display: block;
}
.spacer--height--extra-small {
    height: 14px;
}
.spacer--height--small {
    height: 24px;
}
.spacer--height--medium {
    height: 34px;
}
.spacer--height--large {
    height: 44px;
}
.spacer--height--extra-large {
    height: 54px;
}
.spacer--height--mega-ultra-huge {
    height: 100px;
}
</style> 