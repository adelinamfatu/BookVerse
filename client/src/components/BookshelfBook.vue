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
import axios from 'axios';
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
    showToast(message, type) {
      toast(message, {
        autoClose: 3000,
        type: type,
      });
    },

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

        if (response.status === 200) {
          this.showToast(response.data.message, 'success');
        } else {
          this.showToast('Error updating the rating. Please try again.', 'error');
        }
      } catch (error) {
        this.showToast('Error updating the rating. Please try again.', 'error');
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
        this.showToast('Error moving the book to another bookshelf. Please try again.', 'error');
      }
    },

    markFinished() {
      this.moveBook('Read');
    },

    markCurrentlyReading() {
      this.moveBook('Currently reading');
    },

    async updateCurrentPage() {
      const token = this.$store.getters['auth/firebaseToken'];
      
      if(this.book.currentPage > 0 && this.book.currentPage <= this.book.nbPages) {
        try {
          const bookshelfId = this.$route.params.bookshelfId;
          const isbn = this.book.isbn;

          await axios.put(`http://localhost:6100/api/bookshelves/update-current-page/${bookshelfId}/${isbn}`, {
            currentPage: this.book.currentPage,
          }, {
            headers: {
              'x-access-token': token,
            },
          });

          if (response.status === 200) {
            this.showToast(response.data.message, 'success');
          } else {
            this.showToast('Error updating the progress. Please try again.', 'error');
          }
        } catch (error) {
          this.showToast('Error updating the progress. Please try again.', 'error');
        }
      }
    },

    async updateReview() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const bookshelfId = this.$route.params.bookshelfId;
        const isbn = this.book.isbn;
        const review = this.book.review;

        await axios.put(`http://localhost:6100/api/bookshelves/update-review/${bookshelfId}/${isbn}`, {
          review: review,
        }, {
          headers: {
            'x-access-token': token,
          },
        });

        if (response.status === 200) {
          this.showToast(response.data.message, 'success');
        } else {
          this.showToast('Error updating the review. Please try again.', 'error');
        }
      } catch (error) {
        this.showToast('Error updating the review. Please try again.', 'error');
      }
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