<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
        <v-row>
          <v-col>
            <h2 style="color: #37474F" class="mb-4 ml-8">Favorites</h2>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="sortByTitle"
              :items="['asc', 'desc']"
              label="Sort by Title"
              dense
              variant="solo-filled"
            ></v-select>
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="sortByRating"
              :items="['asc', 'desc']"
              label="Sort by Rating"
              dense
              variant="solo-filled"
            ></v-select>
          </v-col>
        </v-row>

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
      sortByTitle: 'asc',
      sortByRating: 'asc',
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
      const sortedBooks = [...this.$store.getters['books/getFavoriteBooks']];
      
      sortedBooks.sort((a, b) => {
        const roundedRatingA = Math.floor(a.rating * 2) / 2 + 0.5;
        const roundedRatingB = Math.floor(b.rating * 2) / 2 + 0.5;

        if (this.sortByRating === 'asc') {
          if (roundedRatingA !== roundedRatingB) {
            return roundedRatingA - roundedRatingB;
          }
        } else if (this.sortByRating === 'desc') {
          if (roundedRatingA !== roundedRatingB) {
            return roundedRatingB - roundedRatingA;
          }
        }

        if (this.sortByTitle === 'asc') {
          return a.title.localeCompare(b.title);
        } else if (this.sortByTitle === 'desc') {
          return b.title.localeCompare(a.title);
        }

        return 0;
      });

      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return sortedBooks.slice(start, end);
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

@media (max-width: 1200px) {
  .container {
    height: auto;
  }
}
</style>