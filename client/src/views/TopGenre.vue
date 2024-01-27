<template>
    <div class="container">
        <v-card style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
            <v-carousel>
                <v-carousel-item
                v-for="(item, index) in carouselItems"
                :key="index"
                :src="item.src"
                cover
                ></v-carousel-item>
            </v-carousel>
        </v-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      carouselItems: [
        { src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg' },
        { src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  background-color: #E3F2FD;
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>