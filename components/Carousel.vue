<template>
    <v-carousel v-bind="theme">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet height="100%">
                <v-row class="fill-height" align="center" justify="center">
                    <div class="carousel__img__container">
                        <img :src="slide.desktop" alt="" class="carousel__img">
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
        theme: Object
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
.carousel__text__container {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(8vw, -50%);
}
</style> 

        // :continuous="theme['continuous'] ? true : false"
        // :cycle="theme['cycle'] ? true : false"
        // :dark="theme['dark'] ? true : false"
        // :height="theme['height']"
        // :hide-delimiters="theme['hide-delimiters'] ? true : false"
        // :interval="theme['interval']"
        // :show-arrows="theme['show-arrows'] ? true : false"
        // :show-arrows-on-hover="theme['show-arrows-on-hover'] ? true : false"