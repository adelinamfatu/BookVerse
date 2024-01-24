<template>
  <div class="card-container">
    <v-card hover elevation="5" style="text-align: center; padding: 1rem;" width="90%">

      <v-img :src="book.coverImage" height="150" contain></v-img>

      <v-card-title style="font-size: 18px; font-weight: bold;">{{ book.title }}</v-card-title>

      <v-card-subtitle style="font-size: 14px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>

      <v-rating
        v-if="showRating"
        v-model="rating"
        :item-labels="labels"
        class="mt-3"
        size="small"
      >
        <template v-slot:item-label="props">
          <span
            class="font-weight-black text-caption"
            :class="`text-${colors[props.index]}`"
          >
            {{ props.label }}
          </span>
        </template>
      </v-rating>

      <v-btn v-if="showFinishedButton" @click="markFinished" color="primary" class="mt-3">Finished</v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    bookshelfTitle: String,
  },

  data() {
    return {
      rating: 0, 
      colors: ['red', 'orange', 'grey', 'cyan', 'green'],
      labels: ['bad', 'so so', 'ok', 'good', 'great'],
    };
  },

  computed: {
    showRating() {
      return this.bookshelfTitle === 'Read';
    },

    showFinishedButton() {
      return this.bookshelfTitle === 'Currently reading';
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>