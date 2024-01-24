<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="brown-lighten-5" elevation="12">
        <div class="pa-4">
            
            <h2 style="color: #37474F" class="mb-4 ml-8">
              {{ isDefault ? bookshelfTitle : 'Books in ' + bookshelfTitle }}
            </h2>

            <v-row>
                <v-col v-for="(book, index) in books" :key="index" cols="12" sm="6" md="4" lg="3">
                    <BookshelfBook :book="book" />
                </v-col>
            </v-row>

        </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import BookshelfBook from '../components/BookshelfBook.vue';

export default {
  components: {
    BookshelfBook,
  },

  data() {
    return {
      books: [],
      bookshelfTitle: '',
      isDefault: false,
    };
  },

  created() {
    this.fetchBooks();
  },

  methods: {
    async fetchBooks() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const bookshelfId = this.$route.params.bookshelfId;
        const response = await axios.get(`http://localhost:6100/api/bookshelves/books/${bookshelfId}`, {
          headers: {
            'x-access-token': token,
          },
        });

        this.bookshelfTitle = response.data.title;
        this.isDefault = response.data.isDefault;
        this.books = response.data.books;

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
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