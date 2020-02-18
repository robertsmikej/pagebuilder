<template>
    <div :class="datas.classes" class="site__cards">
        <v-card :nuxt="item.link ? true : false" :to="item.link ? item.link : null" v-for="(item, index) in datas.list" :key="index">
            <div class="card__header__container">
                <v-list-item-avatar
                    tile
                    size="60"
                    color="transparent"
                >
                    <img :src="item.icon" :alt="item.header" class="card__icon">
                </v-list-item-avatar>
                <div class="card__header__container__text">
                    <v-list-item-title class="headline mb-1">{{ item.header }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.sub_header }}</v-list-item-subtitle>
                </div>
            </div>
            
            <v-list-item-content class="card__content">
                
                
                <div v-html="$md.render(item.content)"></div>
            </v-list-item-content>
            <!-- {{item}} -->
            
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        datas: Object,
        theme: Object
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
    margin: 0 auto 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
}
.v-card {
    flex: 1 1 auto;
    padding: 16px;
    box-sizing: border-box;
    max-width: 350px;
    margin: 10px;
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
</style> 