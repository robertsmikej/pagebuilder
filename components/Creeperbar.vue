<template>  
    <v-system-bar :class="datas.classes" v-bind="setTheme">
        <nuxt-link v-if="datas.link" :to="datas.link" class="creeper__anchor"/>
        {{datas.text}}
    </v-system-bar>
</template>

<script>
export default {
    props: {
        datas: Object
    },
    data() {
        return {
            vtheme: {
                "1" : {
                    "fixed": false,
                    "lights-out": false,
                    "window": true
                }
            }
        }
    },
    computed: {
        setTheme: function () {
            if (this.datas.special) {
                return this.vtheme.special;
            }
            return this.vtheme["1"];
        }
    }
}
</script>

<style>
.v-system-bar {
    position: relative;
}
.creeper__anchor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
}
</style> 