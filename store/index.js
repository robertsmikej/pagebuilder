export const state = () => ({
    colors: {},
    sitewide: {},
    nav: [],
    themes: {},
    pages: {}
});

function sortItems(data) {
    let newdata = [];
    for (var d in data) {
        let keys = Object.keys(newdata);
        let item = data[d];
        if (item.shown || item.status || item.status === 'published') {
            newdata.push(item);
        }
    }
    return newdata;
}

function setStyles(data, colors) {
    let widg = data;
    let styles = data.styles;
    for (let s in styles) {
        if (s.indexOf("class_") >= 0) { //SET CLASSES
            let style = s.split("class_")[1];
            let choosen;
            if (typeof styles[s] !== "boolean") {
                choosen = styles[s].toLowerCase().replace(/ /g, "-");
            } else {
                choosen = styles[s];
            }
            widg.classes.push(data.type + "--" + style + "--" + choosen);
        } else if (s.indexOf("attribute_") >= 0) { //SET ATTRIBUTES FOR VUETIFY COMPONENTS
            let attribute = s.split("attribute_")[1];
            let choosen;
            if (typeof styles[s] !== "boolean") {
                choosen = styles[s].toLowerCase().replace(/ /g, "-");
            } else {
                choosen = styles[s];
            }
            widg.attributes[attribute] = choosen;
        } else { //SET PARSED STYLES
            let style = s.split("_")[0];
            let elem = s.split("_")[1];
            // console.log(elem);
            if (elem in widg.parsedStyles) {
                widg.parsedStyles[elem][style] = colors[styles[s]].code;
            } else if (elem) {
                widg.parsedStyles[elem] = {};
                // console.log(styles[s])
                widg.parsedStyles[elem][style] = colors[styles[s]].code;
            }
        }
    }
    return widg;
}

export const mutations = {
    setColors(state, data) {
        let newObj = {};
        for (let c in data) {
            let color = data[c];
            newObj[color.name] = color;
        }
        state.colors = newObj;
    },
    setSitewide(state, data) {
        data.creeperbar.classes = [];
        data.creeperbar.parsedStyles = {};
        data.footer.classes = [];
        data.footer.parsedStyles = {};
        data.nav = {};
        data.nav.styles = data.options.nav.styles;
        data.nav.classes = [];
        data.nav.parsedStyles = {};
        // console.log(data.creeperbar);
        data.styles = {
            creeper: setStyles(data.creeperbar, state.colors),
            footer: setStyles(data.footer, state.colors),
            nav: setStyles(data.nav, state.colors)
        }
        state.sitewide = data;
    },
    setNav(state, data) {
        var checkLive = sortItems(data);
        var populate = checkLive[0].nav_items;
        state.nav = populate;
        // console.log(data);
    },
    setThemes(state, data) {
        let themes = {};
        for (let t in data) {
            let segments = {};
            let theme = data[t];
            let name = theme.name.toLowerCase();
            theme.name = name;
            themes[name] = theme;
            for (let s in theme.segment) {
                let segment = theme.segment[s];
                segments[segment.type.toLowerCase()] = segment;
            }
            delete theme.segment;
            theme.segments = segments;
        }
        state.themes = themes;
    },
    setPages(state, data) {
        let themes = state.themes;
        let sitewide = state.sitewide;
        for (var p in data) {
            let page = data[p];
            
            let name = page.name;
            state.pages[name] = page;
            state.pages[name].pagewidgets = {};
            for (let w in page.widgets) {
                let widget = page.widgets[w];
                let type = widget.type;
                //BELOW SETS WIDGET THEME DATA
                // if (widget.theme) {
                //     widget.theme = widget.theme.toLowerCase();
                //     let theme = widget.theme;
                //     if (themes[theme]) {
                //         if (themes[theme].segments[widget.type]) {
                //             widget.themedata = themes[theme].segments[widget.type];
                //         } else {
                //             widget.themedata = themes[theme].segments["default"];
                //         }
                //     }
                // } else {
                //     widget.theme = sitewide.theme.toLowerCase();
                //     widget.themedata = themes[widget.theme].segments["default"];
                // }

                //BELOW SETS CLASS NAMES AND PARSED STYLES FOR WIDGETS, ETC.
                widget.classes = [];
                widget.classes.push(type);
                widget.parsedStyles = {};
                widget.attributes = {};
                let widget2 = widget;
                if (widget.styles) {
                    widget2 = setStyles(widget, state.colors);
                }
                // if (widget.substyles) {
                //     for (let s in widget.substyles) {
                //         let styleblock = s;
                //         for (let st in widget.substyles[s].styles) {
                //             let style = st;
                //             let choosen = widget.substyles[s].styles[st].toLowerCase();
                //             subClasses.push(type + "--" + style + "--" + choosen);
                //         }
                //     }
                // }

                // widget.subClasses = subClasses;

                //KEEP BELOW - CHANGES NAME OF COMPONENT TO VUE STYLE NAME
                let componentName = widget2.type.split(" ");
                for (let i = 0; i < componentName.length; i++) {
                    componentName[i] = componentName[i][0].toUpperCase() + componentName[i].slice(1);
                }
                componentName.join(" ");
                widget2.componentName = componentName[0];
            }
        }
    }
};

export const getters = {
    colors: state => state.colors,
    sitewide: state => state.sitewide,
    nav: state => state.nav,
    themes: state => state.themes,
    pages: state => state.pages
};

export const actions = {
    async nuxtServerInit({ commit }) {
        var datas = await require.context('~/assets/content/colors/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setColors', d);

        var datas = await require.context('~/assets/content/sitewide/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setSitewide', d[0]);

        var datas = await require.context('~/assets/content/nav/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setNav', d);

        var datas = await require.context('~/assets/content/themes/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setThemes', d);

        var datas = await require.context('~/assets/content/pages/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setPages', d);
    }
};