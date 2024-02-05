<template>
  <v-card class="custom-card" hover elevation="5">
    <v-img :src="book.coverImage" :height="isTablet ? '230' : '170'" contain></v-img>
    <v-card-title align="center" style="font-size: 14px; font-weight: bold; margin: 0; padding: 0;">{{ book.title }}</v-card-title>
    <v-card-subtitle align="center" style="font-size: 10px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    book: Object,
  },

  data() {
    return {
      isTablet: false,
    };
  },
  
  mounted() {
    this.isTablet = window.innerWidth >= 601 && window.innerWidth <= 1200;
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  
  methods: {
    handleResize() {
      this.isTablet = window.innerWidth >= 601 && window.innerWidth <= 1200;
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 7rem;
  height: 14rem;
}

@media (min-width: 601px) and (max-width: 1200px) {
  .custom-card {
    width: 9rem;
    height: 18rem;
  }
}
</style>