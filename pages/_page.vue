<template>
    <v-layout column justify-center align-center>
        <component :is="component.componentName" v-for="(component, index) in pagewidgets" :key="index" :slides="component.slides ? component.slides : null" :datas="component" :theme="component.themedata ? component.themedata : null" :cssStyles="component.css ? component.css : null"></component>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        dynamic: null,
        componentName: null,
        pageData: {},
        pageName: ""
    }),
    props: {
        mainPadding: Object
    },
    computed: {
        sitewide: function () {
            return this.$store.state.sitewide
        },
        pagewidgets: function () {
            let pagewidgets = this.$store.state.pages[this.pageInfo].widgets;
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
            return this.pageData.name;
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
    async asyncData({ params, payload }) {
        if (payload) {
            return { 
                pageData: payload
            };
        } else if (params) {
            if (params.page) {
                return {
                    pageData: await require(`~/assets/content/pages/${params.page}.json`),
                }
            } else {
                return {
                    pageData: await require(`~/assets/content/pages/index.json`),
                }
            }
        }
    }
}
</script>