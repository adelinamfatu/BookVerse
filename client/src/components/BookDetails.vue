<template>
  <div class="center-container">
    <v-card class="overflow-y-auto" height="80vh" width="80vw" elevation="10" color="blue-grey-lighten-5">
      <v-card-actions>
        <v-btn @click="goBack">
          <v-icon>mdi-arrow-left</v-icon> Return
        </v-btn>
      </v-card-actions>

      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-img
            v-if="bookDetails"
            :src="bookDetails.coverImage"
            height="95%"
            contain
            aspect-ratio="1"
          ></v-img>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <p v-if="bookDetails" class="headline">{{ bookDetails.title }}</p>
          <p v-if="bookDetails" class="subtitle">by {{ bookDetails.author }}</p>
          <div v-if="bookDetails">
            <v-rating half-increments v-if="bookDetails.rating !== undefined" v-model="bookDetails.rating" readonly></v-rating>
            <v-rating v-else :model-value="0" readonly></v-rating>
          </div>

          <v-row>
            <v-col cols="12">
              <p v-if="bookDetails" class="subtitle">{{ bookDetails.rating.toFixed(2) }} stars from {{ bookDetails.reviews }} reviews</p>
            </v-col>
          </v-row>

          <p v-if="bookDetails" class="description">{{ bookDetails.description }}</p>
          
          <v-btn
            :color="isFavorite ? 'pink' : 'white'"
            rounded
            class="fab-button"
            style="margin-top: 16px; margin-bottom: 16px"
            @click="toggleFavorite"
          >
            <v-icon :color="isFavorite ? 'white' : 'pink'">{{ 'mdi-heart' }}</v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
            >{{ isFavorite ? 'Already Favorited' : 'Not Favorited' }}</v-tooltip>
          </v-btn>

          <v-combobox
            v-model="selectedBookshelf"
            :items="userBookshelves"
            item-text="title"
            item-value="id"
            density="compact"
            bg-color="teal-lighten-4"
            rounded
            variant="solo-filled"
            style="width: 20rem; margin: auto"
            label="Select bookshelf"
            @update:modelValue="onBookshelfChange"
          ></v-combobox>

          <v-combobox
            v-if="userTags?.length > 0"
            v-model="selectedTags"
            :items="userTags"
            multiple
            chips
            item-text="title"
            item-value="id"
            density="compact"
            bg-color="deep-purple-lighten-4"
            rounded
            variant="solo-filled"
            style="width: 20rem; margin: auto"
            label="Select tags"
          ></v-combobox>

        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bookDetails: null,
      isFavorite: false,
      userBookshelves: [],
      selectedBookshelf: null,
      userTags: [],
      selectedTags: []
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchBookDetails(isbn) {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get(`http://localhost:6100/api/books/details/${isbn}`, {
          headers: {
            'x-access-token': token,
          },
        });
        
        this.bookDetails = response.data;
        this.isFavorite = response.data.isFavorite;
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    },

    async fetchUserBookshelves() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get('http://localhost:6100/api/bookshelves/user', {
          headers: {
            'x-access-token': token,
          },
        });

        this.userBookshelves = response.data.filter(bookshelf => bookshelf.isDefault);
        //this.selectedBookshelf = this.userBookshelves[1];

        this.userTags = response.data.filter(bookshelf => !bookshelf.isDefault);
      } catch (error) {
        console.error('Error fetching user bookshelves:', error);
      }
    },

    async toggleFavorite() {
      const token = this.$store.getters['auth/firebaseToken'];
      this.isFavorite = !this.isFavorite;
      const isbn = this.$route.params.isbn;

      if (this.isFavorite) {
        try {
          await axios.put(`http://localhost:6100/api/books/favorites/add/${isbn}`, {}, {
            headers: {
              'x-access-token': token,
            },
          });

        } catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          await axios.put(`http://localhost:6100/api/books/favorites/remove/${isbn}`, {}, {
            headers: {
              'x-access-token': token,
            },
          });

        } catch (error) {
          console.log(error);
        }
      }
    },

    async addBookToBookshelf() {
      if (!this.selectedBookshelf) {
        return; 
      }

      const token = this.$store.getters['auth/firebaseToken'];
      const isbn = this.$route.params.isbn;

      try {
        const response = await axios.post(`http://localhost:6100/api/bookshelves/add-book/${this.selectedBookshelf.id}`, {
          isbn,
          title: this.bookDetails.title,
          author: this.bookDetails.author,
          coverImage: this.bookDetails.coverImage,
        }, {
          headers: {
            'x-access-token': token,
          },
        });

        console.log(response.data); 
      } catch (error) {
        console.error('Error adding book to bookshelf:', error);
      }
    },

    async onBookshelfChange() {
      await this.addBookToBookshelf();
    },
  },
  
  async created() {
    const isbn = this.$route.params.isbn;
    await this.fetchBookDetails(isbn);
    await this.fetchUserBookshelves();
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E3F2FD;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 1rem;
}

.description {
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
}
</style>