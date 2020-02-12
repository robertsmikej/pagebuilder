<template>  
    <v-system-bar v-bind="theme">
        {{data.text}}
    </v-system-bar>
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

</style> 