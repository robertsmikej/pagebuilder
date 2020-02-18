<template>
    <v-divider :class="datas.classes"/>
</template>

<script>
export default {
    props: {
        datas: Object
    }
}
</script>

<style>
.v-divider {
    width: 100%;
}
.divider--margin--extra-small {
    margin: 8px 0;
}
.divider--margin--small {
    margin: 14px 0;
}
.divider--margin--medium {
    margin: 22px 0;
}
.divider--margin--large {
    margin: 30px 0;
}
.divider--margin--extra-large {
    margin: 38px 0;
}
</style> 