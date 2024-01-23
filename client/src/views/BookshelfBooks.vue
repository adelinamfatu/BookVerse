<template>
  <div class="container">
    <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="brown-lighten-5" elevation="12">
        <div class="pa-4">
            
            <h2 style="color: #37474F" class="mb-4 ml-8">Books in Bookshelf</h2>

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
import BookshelfBook from '../components/BookshelfBook.vue';

export default {
  components: {
    BookshelfBook,
  },

  data() {
    return {
      books: [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
        { id: 3, title: 'Book 3', author: 'Author 3' }
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