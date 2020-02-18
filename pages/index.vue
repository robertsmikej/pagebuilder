<template>
    <v-layout column justify-center align-center>
        <component :is="component.componentName" v-for="(component, index) in pagewidgets" :key="index" :slides="component.slides ? component.slides : null" :datas="component" :theme="component.themedata ? component.themedata : null" :cssStyles="component.css ? component.css : null"></component>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        page: "home",
        dynamic: null,
        componentName: null
    }),
    props: {
        mainPadding: Object
    },
    computed: {
        sitewide: function () {
            return this.$store.state.sitewide
        },
        pagewidgets: function () {
            let pagewidgets = this.$store.state.pages[this.page].widgets;
            for (let w in pagewidgets) {
                let widget = pagewidgets[w];
                if (widget.componentName) {
                    this.componentName = widget.componentName;
                    this.dynamic = () => import(`@/components/${this.componentName}.vue`);
                }
            };
            return pagewidgets;
        },
        pageInfo: function () {
            return this.$store.state.pages.home
        }
    },
    methods: {
        creeperMain: function (creeper) {
            
        }
    },
    head() {
        return {
            script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
            title: "",
            meta: [
                { 
                    hid: 'description',
                    name: 'description',
                    content: ""
                },
                { hid: 'robots', name: 'robots', content: 'index, follow' }
            ]
        };
    },
}
</script>
