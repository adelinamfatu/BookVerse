<template>
  <div class="card-container">
    <v-card hover elevation="5" style="text-align: center; padding: 1rem;" width="90%">

      <v-img :src="book.coverImage" height="150" contain></v-img>

      <v-card-title style="font-size: 18px; font-weight: bold;">{{ book.title }}</v-card-title>

      <v-card-subtitle style="font-size: 14px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>

      <v-rating
        v-if="showRating"
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

      <v-btn v-if="isFinished" @click="markCurrentlyReading" color="blue-darken-1" class="mt-3">Currently reading?</v-btn>

      <v-btn v-if="isCurrentlyReading" @click="markFinished" color="indigo-darken-1" class="mt-3">Finished?</v-btn>
    
      <div v-if="isCurrentlyReading" class="mt-3" style="display: flex; align-items: center;">
        <v-text-field
          v-model="book.currentPage"
          label="Current Page"
          class="mr-2"
          type="number"
          :rules="[positiveNumber, currentPageLimit]"
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
import axios from 'axios';

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
    };
  },

  computed: {
    showRating() {
      return this.bookshelfTitle === 'Read';
    },

    isCurrentlyReading() {
      return this.bookshelfTitle === 'Currently reading';
    },

    isFinished() {
      return this.bookshelfTitle === 'Want to read';
    },
  },

  methods: {
    async updateRating(newRating) {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const bookshelfId = this.$route.params.bookshelfId;
        const isbn = this.book.isbn; 

        await axios.put(`http://localhost:6100/api/bookshelves/update-rating/${bookshelfId}/${isbn}`, {
          rating: newRating,
        } , {
          headers: {
            'x-access-token': token,
          },
        });

        console.log('Rating updated successfully');
      } catch (error) {
        console.error('Error updating rating:', error.message);
      }
    },

    async moveBook(targetBookshelfTitle) {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const bookshelfId = this.$route.params.bookshelfId;
        const isbn = this.book.isbn;

        await axios.post(`http://localhost:6100/api/bookshelves/move-book/${bookshelfId}/${isbn}`, {
          targetBookshelfTitle,
        }, {
          headers: {
            'x-access-token': token,
          },
        });

        this.$emit('bookMoved', isbn);

      } catch (error) {
        //
      }
    },

    markFinished() {
      this.moveBook('Read');
    },

    markCurrentlyReading() {
      this.moveBook('Currently reading');
    },
  },

  watch: {
    'book.rating': {
      handler(newValue) {
        this.updateRating(newValue);
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