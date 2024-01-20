<template>
    <div class="container">
        <v-card style="height: 95vh; width: 100%" color="brown-lighten-5" elevation="12">
            <div class="pa-4">
                <h2 style="color: #37474F" class="mb-4 ml-8">Favorites</h2>  

                <v-card elevation="5" color="deep-orange-lighten-5" class="book-card" v-for="(book, index) in displayedBooks" :key="index">
                  <favorite-book :book="book"></favorite-book>
                </v-card>

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
      itemsPerPage: 3,
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
        console.log(this.allBooks);
        this.totalBooks = this.allBooks.length;
        this.handlePageChange();
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    handlePageChange() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.displayedBooks = this.allBooks.slice(start, end);
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

.book-card {
  margin-bottom: 20px;
}
</style>