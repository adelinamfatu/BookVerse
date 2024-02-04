<template>
  <div class="card-container">
    <v-card hover elevation="5" style="text-align: center; padding: 1rem;" width="90%">

      <v-img :src="book.coverImage" height="150" contain></v-img>

      <v-card-title style="font-size: 18px; font-weight: bold;">{{ book.title }}</v-card-title>

      <v-card-subtitle style="font-size: 14px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>

      <v-rating
        v-if="isFinished"
        v-model="book.rating"
        :item-labels="labels"
        class="mt-3"
        size="small"
        @input="updateRating"
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

      <v-btn v-if="isWantToRead" @click="markCurrentlyReading" color="blue-darken-1" class="mt-3">Currently reading?</v-btn>

      <v-btn v-if="isCurrentlyReading" @click="markFinished" color="indigo-darken-1" class="mt-3">Finished?</v-btn>
    
      <v-textarea
        v-if="isFinished"
        v-model="book.review"
        label="Review"
        rows="2"
        @blur="updateReview"
        @input="validateReviewInput"
      ></v-textarea>

      <div v-if="isCurrentlyReading" class="mt-3" style="display: flex; align-items: center;">
        <v-text-field
          v-model="book.currentPage"
          label="Current Page"
          class="mr-2"
          type="number"
          :rules="[positiveNumber, currentPageLimit]"
          @blur="updateCurrentPage"
        ></v-text-field>

        <span class="divider">/</span>

        <v-text-field
          v-model="book.nbPages"
          label="Total Pages"
          class="ml-2"
          type="number"
          readonly
        ></v-text-field>
      </div>
    </v-card>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  props: {
    book: Object,
    bookshelfTitle: String,
  },

  data() {
    return {
      colors: ['red', 'orange', 'grey', 'cyan', 'green'],
      labels: ['bad', 'so so', 'ok', 'good', 'great'],
      positiveNumber: (value) => {
        const number = parseInt(value);
        return !isNaN(number) && number > 0;
      },
      currentPageLimit: (value) => {
        const number = parseInt(value, 10);
        return number <= parseInt(this.book.nbPages, 10);
      },
      ratingChangedByUser: false,
    };
  },

  computed: {
    isFinished() {
      return this.bookshelfTitle === 'Read';
    },

    isCurrentlyReading() {
      return this.bookshelfTitle === 'Currently reading';
    },

    isWantToRead() {
      return this.bookshelfTitle === 'Want to read';
    },
  },

  methods: {
    async updateRating(newRating) {
      const bookshelfId = this.$route.params.bookshelfId;
      const isbn = this.book.isbn;
      this.$store.dispatch('bookshelves/updateRating', { newRating, bookshelfId, isbn });
    },

    markFinished() {
      const bookshelfId = this.$route.params.bookshelfId;
      const isbn = this.book.isbn;
      this.$store.dispatch('bookshelves/moveBook', { targetBookshelfTitle: 'Read', bookshelfId, isbn });
    },

    markCurrentlyReading() {
      const bookshelfId = this.$route.params.bookshelfId;
      const isbn = this.book.isbn;
      this.$store.dispatch('bookshelves/moveBook', { targetBookshelfTitle: 'Currently reading', bookshelfId, isbn });
    },

    async updateCurrentPage() {
      const bookshelfId = this.$route.params.bookshelfId;
      const isbn = this.book.isbn;
      this.$store.dispatch('bookshelves/updateCurrentPage', { bookshelfId, isbn, currentPage: this.book.currentPage });
    },

    async updateReview() {
      const bookshelfId = this.$route.params.bookshelfId;
      const isbn = this.book.isbn;
      this.$store.dispatch('bookshelves/updateReview', { bookshelfId, isbn, review: this.book.review });
      this.ratingChangedByUser = true;
    },

    validateReviewInput() {
      const validCharactersRegex = /^[a-zA-Z0-9\s\.,'"?!-]*$/;
      if (!validCharactersRegex.test(this.book.review)) {
        this.book.review = this.sanitizeReviewInput(this.book.review);
      }
    },

    sanitizeReviewInput(input) {
      return input.replace(/[^a-zA-Z0-9\s\.,'"?!-]/g, '');
    },
  },

  watch: {
    'book.rating': {
      handler(newValue) {
        if (this.ratingChangedByUser) {
          this.updateRating(newValue);
        }
      },
      deep: true, 
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