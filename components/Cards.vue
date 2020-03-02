<template>
    <div :class="datas.classes" :style="datas.parsedStyles.container" class="site__cards">
        <v-card :nuxt="item.link ? true : false" :to="item.link ? item.link : null" v-for="(item, index) in datas.list" :style="datas.parsedStyles.cards" hover v-bind="datas.attributes" :key="index">
            <div class="card__header__container">
                <v-list-item-avatar v-if="item.icon" tile size="60" color="transparent">
                    <img :src="item.icon" :alt="item.header" class="card__icon">
                </v-list-item-avatar>
                <div v-if="item.header" class="card__header__container__text">
                    <v-list-item-title class="headline mb-1">{{ item.header }}</v-list-item-title>
                    <v-list-item-subtitle v-if="item.sub_header">{{ item.sub_header }}</v-list-item-subtitle>
                </div>
            </div>
            <v-list-item-content v-if="item.content" class="card__content">
                <div v-html="$md.render(item.content)"></div>
            </v-list-item-content>
            <vue-plyr ref="plyr" v-if="item.file">
                <audio>
                    <source :src="item.file" type="audio/mp3"/>
                </audio>
            </vue-plyr>
            <Sitebutton v-if="item.button" :datas="{'text': item.button, 'link': item.link, 'styles': datas.parsedStyles.button}"/>
        </v-card>
    </div>
</template>

<script>
import Sitebutton from '~/components/Sitebutton.vue';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';

export default {
    components: {
        Sitebutton
    },
    props: {
        datas: Object,
        theme: Object
    },
    computed: {
        player () {
            return this.$refs.plyr.player
        }
    },
    data() {
        return {
            vtheme: {
                "1" : {
                    hover: true,
                    light: true,
                    ripple: true,
                    shaped: true,
                    tile: false,
                    raised: true,
                    outlined: true
                }
            }
        }
    },
}
</script>

<style>
.v-application--is-ltr .v-list-item__avatar:first-child {
    margin-right: 6px;
}
.site__cards {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
}
.v-card {
    flex: 1 1 auto;
    padding: 20px;
    box-sizing: border-box;
    margin: 40px 10px;
    min-width: 240px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
}
.v-list-item__content {
    flex: initial;
}
.cards--max-width--small {
    justify-content: space-around;
}
.cards--max-width--small .v-card {
    width: 23%;
}
.cards--max-width--medium {
    justify-content: space-around;
}
.cards--max-width--medium .v-card {
    width: 31%;
}
.cards--max-width--large {
    justify-content: space-around;
}
.cards--max-width--large .v-card {
    min-width: 240px;
    width: 47%;
}
.cards--max-width--unlimited {
    justify-content: flex-start;
}
.cards--max-width--unlimited .v-card {
    width: 100%;
}
.v-card .v-list-item__title, .v-card .v-list-item__subtitle {
    text-align: center;
    margin: 0;
    overflow: unset;
    white-space: normal;
}
.card__header__container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: flex-start;
}
.card__header__container__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
.v-card .v-btn {
    margin: auto auto 0;
}
/* ------------------ MEDIA QUERY ------------------ */
@media screen and (max-width: 768px) {
    .site__cards {
        padding: 14px;
    }
    .v-card {
        padding: 16px;
        margin: 20px 6px;
    }
}
</style> 