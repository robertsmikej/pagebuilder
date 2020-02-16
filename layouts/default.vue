<template>
    <v-app>
        
        <v-navigation-drawer v-model="drawer" app v-bind="vtheme.wrapper.nav.drawer">
            <v-list>
                <v-list-item router exact v-for="(item, i) in nav" :key="i" :to="item.link">
                    <v-list-item-action>
                        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app v-bind="vtheme.wrapper.nav.bar">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                {{ sitewide.name }}
            </v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container>
            <nuxt/>
            </v-container>
        </v-content>
        <v-footer app v-bind="vtheme.wrapper.footer">
            <span>&copy; {{ new Date().getFullYear() }} - {{ sitewide.name }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    computed: {
        wrapper: function () {
            return this.$store.state.theme.wrapper;
        },
        sitewide: function () {
            return this.$store.state.sitewide
        },
        nav: function () {
            return this.$store.state.nav
        }
    },
    data () {
        return {
            drawer: false,
            vtheme: {
                wrapper: {
                    nav: {
                        drawer: {
                            fixed: true,
                            right: false,
                            "mini-variant": false,
                            clipped: false
                        },
                        bar: {
                            clipped: false,
                            fixed: true,
                            "collapse-on-scroll": false
                        }    
                    },
                    footer: {
                        "dark": true,
                        "fixed": false
                    }
                }
            }
        }
    }
}
</script>

<style>
:root {
    --site-white: #FFF;
    --dark-yellow: #fec303;
    --lightest-grey: #f2f2f2;
    --teal: #139487;
    --cyan: #1dbad3;
    --aqua: #0ED7F4;
    --blue-grey: #607C8a;
    --blue: #009CD6;
    --light-blue: #F1F5F6;
    --dark-blue: #36485f;
    --dark-grey: #2B373C;
    --dark-grey: #263E47;
    --lime-green: #98C93C;
    --light-red: #CF2255;
    --deep-red: #901D00;
    --light-orange: #FA9E0D;
    --logo-orange: #F0512B;
    --powder-blue: #BCF2FC;
    --turkish-blue: #50A3B1;
    --default-font: 'Work Sans', 'Helvetica Neue', Arial, sans-serif;
    --light-green: #94AC9E;
    --medium-green: #72918B;
    --dark-green: #496568;
    --text-color: #273F49;
}
body, html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: var(--dark-grey);
    scroll-behavior: smooth;
}
body * {
    box-sizing: border-box;
}
html {
    font-family: var(--default-font);
    font-size: 21px;
    line-height: 21px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: var(--dark-blue);
    background-color: var(--light-orange);
    background-color: var(--dark-blue);
}
main {
    width: 100%;
    background-color: #FFF;
    margin: 0;
}

.container {
    max-width: 1300px;
    padding-top: 0;
}

h1 {
    font-size: 2.1em;
    line-height: 1.1em;
    font-weight: 400;
    margin: 0 0 10px;
    color: #232323;
}
h2 {
    font-size: 1.8em;
    line-height: 1em;
    font-weight: 400;
    margin: 4px 0;
}
h3 {
    font-size: 1.5em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h4 {
    font-size: 1.2em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h5 {
    font-size: 1em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h6 {
    font-size: .8em;
    line-height: 1em;
    font-weight: 300;
    margin: 10px auto 0;
}
p {
    font-size: 1em;
    line-height: 1.3em;
    font-weight: 400;
    margin: 14px 0 0;
}
ul, li {
    font-size: 1em;
    line-height: 1.3em;
    font-weight: 400;
}
a {
    color: var(--dark-grey);
    font-size: 1em;
    line-height: 1em;
    font-weight: 400;
}
/* ------------------ MEDIA QUERY ------------------ */
@media screen and (max-width: 1500px) {
    html {
        font-size: 18px;
        line-height: 18px;
    } 
}
/* ------------------ MEDIA QUERY ------------------ */
@media screen and (max-width: 1000px) {
    h1 {
        font-size: 2.2em;
    }
}
/* ----------------------------  MEDIA QUERY ------------------------------ */
@media screen and (max-width:900px) {
    html {
        font-size: 17px;
        line-height: 17px;
    }
}
/* ----------------------------  MEDIA QUERY ------------------------------ */
@media screen and (max-width: 700px) {
    html {
        font-size: 16px;
        line-height: 16px;
    }
    h1 {
        font-size: 2em;
        line-height: 1em;
        margin: 4px 0;
    }
    h2 {
        font-size: 1.6em;
        line-height: 1em;
        font-weight: 500;
        margin: 10px 0;
    }
}
/* ----------------------------  MEDIA QUERY ------------------------------ */
@media screen and (max-width: 500px) {
    h1 {
        font-size: 1.4em;
        line-height: 1.1em;
    }
    h2 {
        font-size: 1.4em;
        margin: 4px 0;
    }
}
</style>