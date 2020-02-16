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

export const mutations = {
    setSitewide(state, data) {
        state.sitewide = data;
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
    }
};