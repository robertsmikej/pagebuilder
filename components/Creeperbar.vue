<template>  
    <v-system-bar :class="datas.classes" v-bind="setTheme">
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
            elementName: "creeperbar__component",
            vtheme: {
                "1" : {
                    "dark": false,
                    "light": false,
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
.sitewide__creeper .v-system-bar {
    display: fixed;
}
</style> 