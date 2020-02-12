<template>
    <v-divider v-bind="theme"/>
</template>

<script>
export default {
    props: {
        data: Object,
        theme: Object
    }
}
</script>

<style>
.v-divider {
    margin: 10px 0
}
</style> 