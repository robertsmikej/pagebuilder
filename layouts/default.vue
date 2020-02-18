<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app v-bind="vtheme.wrapper.nav.drawer" :style="setStyles(sitewide.options.nav.styles)">
            <v-list>
                <v-list-item router exact v-for="(item, i) in nav" :key="i" :to="item.link" :style="setStyles(sitewide.options.nav.styles)">
                    <v-list-item-action>
                        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app v-bind="vtheme.wrapper.nav.bar" ref="navbar" :style="setStyles(sitewide.options.nav.styles)">
            <div class="app__bar__container">
                <div class="app__bar__name__container">
                    <div v-if="sitewide.options.nav.show_logo" class="app__bar__logo__container">
                        <img :src="sitewide.logo" :alt="sitewide.name + ' Logo'" class="app__bar__logo">
                    </div>
                    <v-toolbar-title v-if="sitewide.options.nav.show_name">
                        {{ sitewide.name }}
                    </v-toolbar-title>
                </div>
                <ul class="nav__links__no-hambuger" v-if="!sitewide.options.nav.hamburger">
                    <nuxt-link v-for="(item, i) in nav" :key="i" :to="item.link" :style="setStyles(sitewide.options.nav.styles)">
                            <img v-if="item.icon"/>
                            <p>{{ item.title }}</p>
                    </nuxt-link>
                </ul>
                <v-app-bar-nav-icon :class="{'nav__hamburger__hide' : !this.hamburgerHide}" right @click.stop="drawer = !drawer"/>
            </div>
        </v-app-bar>
        <Creeperbar v-if="sitewide.creeperbar.show_sitewide_creeper" :datas="sitewide.creeperbar" ref="creeper" :style="creeperThemed(themes, sitewide, this.$refs.navbar)" class="sitewide__creeper"/>
        <v-content :style="{'paddingTop': paddingMain}">
            <v-container>
                <nuxt/>
            </v-container>
        </v-content>
        <v-footer app v-bind="vtheme.wrapper.footer" :style="setStyles(sitewide.footer.styles)">
            <span>&copy; {{ new Date().getFullYear() }} - {{ sitewide.name }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import Creeperbar from '~/components/Creeperbar.vue';

export default {
    components: {
        Creeperbar
    },
    computed: {
        wrapper: function () {
            return this.$store.state.theme.wrapper;
        },
        sitewide: function () {
            return this.$store.state.sitewide
        },
        nav: function () {
            return this.$store.state.nav
        },
        themes: function () {
            return this.$store.state.themes
        },
        colors: function () {
            return this.$store.state.colors
        } 
    },
    methods: {
        creeperThemed: function (themes, sitewide, navbar) {
            let creeperTheme = themes[sitewide.theme.toLowerCase()].segments["creeperbar"];
            let theme = {
                width: "100%",
                position: "fixed",
                top: "0"
            };
            for (let i in creeperTheme) {
                let item = creeperTheme[i];
                if (i !== 'type') {
                    theme[i] = item;
                }
            }
            if (navbar) {
                theme.top = navbar.styles.height;
            }
            return theme;
        },
        mainPadding: function () {
            let paddingTop = 0;
            if (this.$refs.navbar) {
                this.paddingMain = this.$refs.navbar.styles.height;
            }
            if (this.$refs.creeper) {
                let height = parseInt(this.$refs.creeper.$el.style.height.replace("px", "")) + parseInt(paddingTop);
                this.paddingMain = height  + "px";
            }
            return this.paddingMain;
        },
        setStyles: function (data) {
            let colors = this.colors;
            let newObj = {};
            for (let s in data) {
                let textColor = data[s];
                if (textColor in colors) {
                    newObj[s] = colors[data[s]].code;
                }
            }
            return newObj
        }
    },
    mounted() {
        this.mainPadding();
        this.hamburgerHide = this.sitewide.options.nav.hamburger
    },
    data () {
        return {
            drawer: false,
            paddingMain: "0px",
            hamburgerHide: false,
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
                            fixed: false,
                            dark: false,
                            dense: true,
                            flat: true,
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
    font-family: var(--default-font);
    font-size: 16px;
    line-height: 16px;
    letter-spacing: .05px;
}
body .v-application {
    font-family: var(--default-font);
    letter-spacing: .05px;
}
body * {
    box-sizing: border-box;
}
html {
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
    font-size: 3.4em;
    line-height: 1em;
    font-weight: 400;
    margin: 0;
    color: #232323;
    text-shadow: 2px 2px 1px #232323;
}
h2 {
    font-size: 1.9em;
    line-height: 1em;
    font-weight: 400;
    margin: 14px 0;
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
    line-height: 1.5em;
    font-weight: 400;
    margin: 14px 0 0;
}
ul, li {
    font-size: 1em;
    line-height: 1.3em;
    font-weight: 400;
}
li {
    margin-bottom: 6px;
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

.sitewide__creeper {
    text-align: center;
    justify-content: center;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    z-index: 2;
}
.app__bar__container {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
}
.app__bar__name__container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    flex: 1;
    align-items: center;
}
.app__bar__logo__container {
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
}
.app__bar__logo {
    max-height: 32px;
    object-fit: contain;
    align-self: center;
}
.nav__hamburger__hide {
    display: none;
}
.nav__links__no-hambuger {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-around;
}
.nav__links__no-hambuger p, .nav__links__no-hambuger a {
    text-decoration: none;
    margin: 0 5px;
}
/* ------------------ MEDIA QUERY ------------------ */
@media screen and (max-width: 768px) {
    .nav__hamburger__hide {
        display: inline-flex;
    }
    .nav__links__no-hambuger {
        display: none;
    }
}
</style>