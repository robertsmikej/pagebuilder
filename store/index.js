export const state = () => ({
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

export const mutations = {
    setSitewide(state, data) {
        state.sitewide = data;
    },
    setNav(state, data) {
        var checkLive = sortItems(data);
        var populate = checkLive[0].nav_items;
        state.nav = populate;
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
                if (widget.theme) {
                    widget.theme = widget.theme.toLowerCase();
                    let theme = widget.theme;
                    if (themes[theme]) {
                        if (themes[theme].segments[widget.type]) {
                            widget.themedata = themes[theme].segments[widget.type];
                        } else {
                            widget.themedata = themes[theme].segments["default"];
                        }
                    }
                } else {
                    widget.theme = sitewide.theme.toLowerCase();
                    widget.themedata = themes[widget.theme].segments["default"];
                }

                //BELOW SETS CLASS NAMES FOR WIDGETS, ETC.
                let classArr = [];
                let subClasses = [];
                classArr.push(type);
                if (widget.styles) {
                    for (let s in widget.styles) {
                        let style = s;
                        let choosen = widget.styles[s].toLowerCase();
                        classArr.push(type + "--" + style + "--" + choosen);
                    }
                }
                if (widget.substyles) {
                    for (let s in widget.substyles) {
                        let styleblock = s;
                        for (let st in widget.substyles[s].styles) {
                            let style = st;
                            let choosen = widget.substyles[s].styles[st].toLowerCase();
                            subClasses.push(type + "--" + style + "--" + choosen);
                        }
                    }
                }
                widget.subClasses = subClasses;
                widget.classes = classArr;



                //KEEP BELOW - CHANGES NAME OF COMPONENT TO VUE STYLE NAME
                let componentName = widget.type.split(" ");
                for (let i = 0; i < componentName.length; i++) {
                    componentName[i] = componentName[i][0].toUpperCase() + componentName[i].slice(1);
                }
                componentName.join(" ");
                widget.componentName = componentName[0];
            }
        }
    }
};

export const getters = {
    sitewide: state => state.sitewide,
    nav: state => state.nav,
    themes: state => state.themes,
    pages: state => state.pages
};

export const actions = {
    async nuxtServerInit({ commit }) {
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