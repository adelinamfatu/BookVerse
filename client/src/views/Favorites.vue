<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
        <h2 style="color: #37474F" class="mb-4 ml-8">Favorites</h2>  

        <v-container v-if="totalBooks > 0">
          <v-row>
            <v-col v-for="(book, index) in displayedBooks" :key="index" cols="12" sm="6" md="6" lg="4">
              <FavoriteBook :book="book" />
            </v-col>
          </v-row>
          <v-pagination :length="totalPages" v-model="currentPage" @update:model-value="updatePagination"></v-pagination>
        </v-container>

        <div v-else>
          <p style="color: #546E7A; text-align: center;">No favorites</p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import FavoriteBook from '../components/FavoriteBook.vue';

export default {
  name: 'Favorites',

  components: {
    FavoriteBook,
  },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
    };
  },

  computed: {
    totalBooks() {
      return this.$store.getters['books/getFavoriteBooks'].length;
    },

    totalPages() {
      return Math.ceil(this.totalBooks / this.itemsPerPage);
    },

    displayedBooks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.$store.getters['books/getFavoriteBooks'].slice(start, end);
    },
  },

  methods: {
    updatePagination(newPage) {
      this.currentPage = newPage;
    },
  },
  
  created() {
    this.$store.dispatch('books/fetchFavoriteBooks');
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