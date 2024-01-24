<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
        <h2 style="color: #37474F" class="mb-4 ml-8">Favorites</h2>  

        <v-container>
          <v-row>
            <v-col v-for="(book, index) in displayedBooks" :key="index" cols="12" sm="6" md="6" lg="4">
              <FavoriteBook :book="book" />
            </v-col>
          </v-row>
        </v-container>

        <v-pagination :length="totalPages" v-model="currentPage" @update:model-value="updatePagination"></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
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
      totalBooks: 0,
      allBooks: [],
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalBooks / this.itemsPerPage);
    },

    displayedBooks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allBooks.slice(start, end);
    },
  },

  methods: {
    async fetchData() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get('http://localhost:6100/api/books/favorites', {
          headers: {
            'x-access-token': token,
          },
        });
        this.allBooks = response.data;
        this.totalBooks = this.allBooks.length;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    updatePagination(newPage) {
      this.currentPage = newPage;
    },
  },
  
  created() {
    this.fetchData();
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