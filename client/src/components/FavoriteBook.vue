<template>
  <v-card elevation="5" color="deep-orange-lighten-5" class="book-card">
    <v-row class="my-1" justify="center" align="center">
      <v-col cols="1">
        <v-img :src="book.coverImage" alt="Book Cover" max-height="9rem"></v-img>
      </v-col>

      <v-col cols="3">
        <v-card-text style="font-weight: bold; font-size: 17px;">{{ book.title }}</v-card-text>
        <v-card-text style="font-style: italic;">by {{ book.author }}</v-card-text>
      </v-col>

      <v-col cols="7">
        <v-card-text style="font-size: 16px;">
          {{ truncateDescription }}
          <router-link :to="'/book/' + book.isbn">See more</router-link>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMore: false,
    };
  },
  computed: {
    truncateDescription() {
      const words = this.book.description.split(' ');
      return words.slice(0, 20).join(' ');
    },
  },
};
</script>

<style scoped>
.book-card {
  margin-bottom: 20px;
}
</style>