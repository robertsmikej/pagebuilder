<template>  
    <v-btn v-bind="theme">
        {{data.text}}
    </v-btn>
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