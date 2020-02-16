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
    height: 8px;
}
.spacer--height--small {
    height: 14px;
}
.spacer--height--medium {
    height: 22px;
}
.spacer--height--large {
    height: 30px;
}
.spacer--height--extra-large {
    height: 38px;
}
</style> 