<template>
  <div>
    <h2>Books in Bookshelf</h2>

    <v-row>
      <v-col v-for="(book, index) in books" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>{{ book.title }}</v-card-title>
          <v-card-subtitle>{{ book.author }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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