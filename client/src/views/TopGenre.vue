<template>
  <div class="container">
    <v-card 
      class="overflow-y-auto" 
      :color="slideColors[currentSlideIndex]" 
      style="height: 80vh; width: 80%" 
      elevation="12">
      
      <v-card-actions>
        <v-btn @click="goBack">
          <v-icon>mdi-arrow-left</v-icon> Return
        </v-btn>
      </v-card-actions>

      <v-carousel
          :continuous="false"
          hide-delimiters
          v-model="currentSlideIndex"
        >
          <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6">
                <v-img :src="item.coverImage" 
                  contain 
                  aspect-ratio="1"
                  ></v-img>
              </v-col>
              
              <v-col cols="12" sm="6" class="text-center">
                <h2 class="headline">{{ item.title }}</h2>
                <div class="pa-4">
                  <v-rating v-model="item.rating" 
                    readonly 
                    half-increments
                    ></v-rating>
                    <pre>{{ item.rating }}</pre>
                </div>
                <p class="description">{{ item.description }}</p>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>

    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genre: '',
      slideColors: [
        'blue-accent-1',
        'indigo-accent-1',
        'light-blue-accent-1',
        'cyan-accent-1',
        'teal-accent-1',
        'green-accent-1',
        'yellow-accent-1',
        'orange-accent-1',
        'deep-orange-accent-1'
      ],
      currentSlideIndex: 0,
    };
  },

  computed: {
    carouselItems() {
      return this.$store.getters['books/getGenreBooks'];
    },
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },

  async created() {
    const routeGenre = this.$route.params.genre;
    this.genre = routeGenre.charAt(0).toUpperCase() + routeGenre.slice(1);

    try {
      await this.$store.dispatch('books/fetchGenreBooks', this.genre);
    } catch (error) {
      console.error('Error fetching genre books:', error);
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E3F2FD;
}

.description {
  padding-left: 2rem;
  padding-right: 2rem;
  text-align: justify;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0; 
}
</style>