<template>
    <v-carousel :class="datas.classes" v-bind="setTheme">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                    <div class="carousel__img__container">
                        <img :src="slide.desktop" alt="" class="carousel__img">
                        <nuxt-link v-if="slide.link" :to="slide.link" class="carousel__link"/>
                    </div>
                    <div class="carousel__text__container">
                        <h1 v-if="slide.header_1" class="carousel__header--h1">
                            <span >{{ slide.header_1 }}</span>
                            <span v-if="slide.header_2">{{ slide.header_2 }}</span>
                            <span v-if="slide.header_3">{{ slide.header_2 }}</span>
                        </h1>
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    props: {
        slides: Array,
        datas: Object
    },
    data() {
        return {
            elementName: "carousel__component",
            vtheme: {
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
                1: {
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
    },
    computed: {
        setTheme: function () {
            if (this.datas.special) {
                return this.vtheme.special;
            }
            return this.vtheme["1"];
        }
    }
}
</script>

<style>

.carousel__img__container {
    width: 100%;
    height: 100%;
}
.carousel__img {
    width: 100%;
    height: 100%;
}
.carousel__link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 2;
}
.carousel--alignment--center .carousel__text__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.carousel--alignment--left .carousel__text__container {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(8vw, -50%);
    text-align: left;
}
.carousel--alignment--right .carousel__text__container {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-8vw, -50%);
    text-align: right;
}
</style> 