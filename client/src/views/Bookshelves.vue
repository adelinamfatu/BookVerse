<template>
  <div class="container">
    <v-card class="overflow-y-auto" color="blue-grey-lighten-5" style="height: 95vh; width: 100%" elevation="12">
      <div class="pa-4">
        <v-row>
          <v-col cols="8">
            <h2 style="color: #37474F" class="mb-4 ml-8">My bookshelves</h2>
          </v-col>
          <v-col cols="4" class="text-right">
            <v-btn @click="addBookshelf" icon color="light-blue-accent-4">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-container>
          <v-row>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="6" lg="4">
              <BookshelfCard
                :id="card.id"
                :title="card.title"
                :color="card.color"
                :isDefault="card.isDefault"
                :supplementaryText="card.supplementaryText"
                @delete-bookshelf="deleteBookshelf"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
import BookshelfCard from '../components/BookshelfCard.vue';

export default {
  components: {
    BookshelfCard,
  },
  
  computed: {
    cards() {
      return this.$store.getters['bookshelves/getBookshelves'];
    },
  },

  mounted() {
    this.$store.dispatch('bookshelves/fetchBookshelves');
  },

  methods: {
    addBookshelf() {
      this.$store.dispatch('bookshelves/addBookshelf');
    },

    deleteBookshelf(bookshelfId) {
      this.$store.dispatch('bookshelves/deleteBookshelf', bookshelfId);
    },
  }
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