<template>
    <v-layout
    column
    justify-center
    align-center
    >
        <v-flex
            xs12
            sm8
            md6
        >
            <component :is="component.componentName" v-for="(component, index) in pagewidgets" :key="index" :slides="component.slides ? component.slides : null" :data="component.data ? component.data : component" :theme="component.themedata ? component.themedata : null"></component>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        page: "home",
        dynamic: null,
        componentName: null
    }),
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
