<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
        <v-row>

          <v-col md="6">
            <h2 style="color: #37474F" class="ml-8">Recommended for you</h2>
          </v-col>
          
          <v-col md="6">
            <v-autocomplete
              v-model="searchQuery"
              :items="filteredBooks"
              label="Search"
              clearable
              placeholder="Enter book title"
              auto-select-first
              dense
              item-text="title"
              item-value="isbn"
              prepend-icon="mdi-magnify"
              rounded
              variant="solo"
              @click:prepend="searchBooks"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-slide-group
          v-model="model"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="(book, index) in books"
            :key="index"
            v-slot="{ toggle, selectedClass }"
          >
            <router-link :to="`/book/${encodeURIComponent(book.isbn)}`">
              <book
                :book="book"
                :class="['ma-4', selectedClass]"
                @click="toggle"
              ></book>
            </router-link>
          </v-slide-group-item>
        </v-slide-group>
        <MostPopular />
      </div>
    </v-card>
  </div>
</template>

<script>
import Book from '@/components/Book.vue';
import MostPopular from '@/components/MostPopular.vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'Dashboard',

  components: {
    Book,
    MostPopular,
  },

  data() {
    return {
      model: [],
      books: [],
      filteredBooks: [],
      searchQuery: '',
    };
  },

  methods: {
    async fetchRecommendedBooks() {
      try {
        const store = useStore();
        const token = store.getters['auth/firebaseToken'];
        const response = await axios.get('http://localhost:6100/api/books/recommended', {
          headers: {
            'x-access-token': token,
          },
        });

        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    async fetchBooks() {
      try {
        const store = useStore();
        const token = store.getters['auth/firebaseToken'];
        const response = await axios.get('http://localhost:6100/api/books/all', {
          headers: {
            'x-access-token': token,
          },
        });

        this.filteredBooks = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    searchBooks() {
      if (this.searchQuery) {
        const isbn = encodeURIComponent(this.searchQuery);
        this.$router.push(`/book/${isbn}`);
      }
    },
  },

  mounted() {
    this.fetchBooks();
    this.fetchRecommendedBooks();
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

a {
  text-decoration: none;
}
</style>