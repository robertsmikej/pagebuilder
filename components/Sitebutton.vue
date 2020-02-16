<template>  
    <v-btn :class="datas.classes" v-bind="setTheme">
        {{datas.text}}
    </v-btn>
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
                    "bottom": true,
                    "dark": false,
                    "depressed": false,
                    "small": true
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
.sitebutton {
    margin: 10px 0;
}
</style>

