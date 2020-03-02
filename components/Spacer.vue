<template>
    <div :class="datas.classes">
        <div v-if="datas.styles.line" :style="datas.parsedStyles.line" class="spacer__line"></div>
    </div>
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
    width: 80%;
    margin: 0 auto;
    display: block;
    height: 1px;
}
.spacer__line {
    height: 1px;
}
.spacer--height--extra-small {
    margin: 8px auto;
}
.spacer--height--small {
    margin: 12px auto;
}
.spacer--height--medium {
    margin: 18px auto;
}
.spacer--height--large {
    margin: 22px auto;
}
.spacer--height--extra-large {
    margin: 28px auto;
}
.spacer--height--mega-ultra-huge {
    margin: 50px auto ;
}
</style> 