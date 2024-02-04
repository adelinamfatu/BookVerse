<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
            
        <h2 style="color: #37474F" class="mb-4 ml-8">
          {{ selectedBookshelf.isDefault ? selectedBookshelf.title : 'Books in ' + selectedBookshelf.title }}
        </h2>

        <v-row>
          <v-col v-for="(book, index) in selectedBookshelf.books" :key="index" cols="12" sm="6" md="4" lg="3">
            <BookshelfBook :book="book" :bookshelfTitle="selectedBookshelf.title" @bookMoved="removeBookFromUI" />
          </v-col>
        </v-row>

      </div>
    </v-card>
  </div>
</template>

<script>
import BookshelfBook from '../components/BookshelfBook.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    BookshelfBook,
  },

  computed: {
    ...mapGetters('bookshelves', ['getSelectedBookshelf']), 
    selectedBookshelf() {
      return this.getSelectedBookshelf;
    },
  },

  created() {
    const bookshelfId = this.$route.params.bookshelfId;
    this.$store.dispatch('bookshelves/fetchSelectedBookshelf', bookshelfId); 
  },

  methods: {
    removeBookFromUI(isbn) {
      const index = this.selectedBookshelf.books.findIndex(book => book.isbn === isbn);

      if (index !== -1) {
        this.selectedBookshelf.books.splice(index, 1);
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