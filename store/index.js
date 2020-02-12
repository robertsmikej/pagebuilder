const theme = {
    1 : {
        wrapper: {
            nav: {
                drawer: {
                    fixed: true,
                    right: false,
                    "mini-variant": false,
                    clipped: false,
                    height: "50px"
                },
                bar :{
                    clipped: false,
                    fixed: true,
                    "collapse-on-scroll": false
                }    
            },
            footer: {
                "dark": true,
                "fixed": false
            }
        },
        creeperbar: {
            basic: {
                "dark": true,
                "light": false,
                "fixed": false,
                "lights-out": false,
                "window": true
            }
        },
        carousel: {
            special: {
                "continuous": false,
                "cycle": true,
                "dark": false,
                "height": 400,
                "hide-delimiters": false,
                "interval": 6000,
                "show-arrows": false,
                "show-arrows-on-hover": true,
                "hide-delimiter-background": true
            },
            basic: {
                "continuous": false,
                "cycle": true,
                "dark": false,
                "height": 400,
                "hide-delimiters": false,
                "interval": 6000,
                "show-arrows": false,
                "show-arrows-on-hover": true,
            }
        }
    }
};

export const state = () => ({
    sitewide: {},
    pages: {},
    nav: [],
    theme: {}
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
function stripTheme(data) {
    return data ? parseInt(data.toLowerCase().replace("style ", "")) : data;
}

export const mutations = {
    setSitewide(state, data) {
        state.sitewide = data;
        let wrapperThemeNum = stripTheme(data.theme);
        state.sitewide.theme = {
            num: {
                wrapper: wrapperThemeNum
            }
        };
    },
    setNav(state, data) {
        var checkLive = sortItems(data);
        var populate = checkLive[0].nav_items;
        state.nav = populate;
    },
    setPages(state, data) {
        for (var p in data) {
            let page = data[p];
            let name = page.name;
            state.pages[name] = page;
            state.pages[name].pagewidgets = {};
            for (let w in page.widgets) {
                let widget = page.widgets[w];
                let type = widget.type;
                let widgetThemeNum = stripTheme(widget.theme);
                let widgetTheme = theme[widgetThemeNum][type];
                if (widgetTheme) {
                    if (widget.special) {
                        widget.theme = theme[widgetThemeNum][type].special;
                    } else {
                        widget.theme = theme[widgetThemeNum][type].basic;
                    }
                } else {
                    widget.theme = {
                        basic: {}
                    }
                }
                let componentName = widget.type.split(" ");
                for (let i = 0; i < componentName.length; i++) {
                    componentName[i] = componentName[i][0].toUpperCase() + componentName[i].slice(1);
                }
                componentName.join(" ");
                widget.componentName = componentName[0];
            }
        }
        // console.log(state.pages);
    },
    setTheme(state) {
        let wrapperThemeNum = state.sitewide.theme.num.wrapper;
        state.theme.wrapper = theme[wrapperThemeNum].wrapper;
        state.theme.themes = theme;
    }
};

export const getters = {
    sitewide: state => state.sitewide,
    nav: state => state.nav,
    pages: state => state.pages,
    theme: state => state.theme
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

        var datas = await require.context('~/assets/content/pages/', false, /\.json$/);
        var d = datas.keys().map(key => {
            let res = datas(key);
            res.slug = key.slice(2, -5);
            return res;
        });
        await commit('setPages', d);

        
        await commit('setTheme');

    }
};