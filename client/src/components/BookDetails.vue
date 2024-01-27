<template>
  <div class="center-container">
    <v-card class="overflow-y-auto" height="90vh" width="90vw" elevation="10" color="blue-grey-lighten-5">
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

          <v-chip
            v-for="(tag, index) in userTags"
            :key="index"
            dense
            :color="tag.isSelected ? 'pink-darken-4' : 'indigo darken-2'"
            class="ma-1 pointer-on-hover"
            @click="toggleTag(tag)"
          >
            {{ tag.title }}
            <v-icon v-if="tag.isSelected">mdi-checkbox-marked-circle</v-icon>
          </v-chip>

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

    toggleTag(tag) {
      tag.isSelected = !tag.isSelected;

      if (!tag.isSelected) {
        this.removeBookFromBookshelf(tag);
      } else {
        this.addBookToBookshelf(tag);
      }
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

    async fetchUserBookshelves(isbn) {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get(`http://localhost:6100/api/bookshelves/book?isbn=${isbn}`, {
          headers: {
            'x-access-token': token,
          },
        });

        this.userBookshelves = response.data.filter(bookshelf => bookshelf.isDefault);
        this.selectedBookshelf = this.userBookshelves.find(bookshelf => bookshelf.isSelected === true) || null;

        this.userTags = response.data.filter(bookshelf => !bookshelf.isDefault);
        this.selectedTags = this.userTags.find(tag => tag.isSelected === true);
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

    async addBookToBookshelf(bookshelf) {
      const token = this.$store.getters['auth/firebaseToken'];
      const isbn = this.$route.params.isbn;

      try {
        const response = await axios.post(`http://localhost:6100/api/bookshelves/add-book/${bookshelf.id}`, {
          isbn,
          title: this.bookDetails.title,
          author: this.bookDetails.author,
          coverImage: this.bookDetails.coverImage,
          nbPages: this.bookDetails.nbPages
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

    async removeBookFromBookshelf(bookshelf) {
      const token = this.$store.getters['auth/firebaseToken'];
      const isbn = this.$route.params.isbn;

      try {
        const response = await axios.delete(`http://localhost:6100/api/bookshelves/delete-book/${bookshelf.id}/${isbn}`, {
          headers: {
            'x-access-token': token,
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error removing book from bookshelf:', error);
      }
    },

    async onBookshelfChange() {
      if (this.selectedBookshelf) {
        await this.addBookToBookshelf(this.selectedBookshelf);
      }
    },
  },
  
  async created() {
    const isbn = this.$route.params.isbn;
    await this.fetchBookDetails(isbn);
    await this.fetchUserBookshelves(isbn);
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

.pointer-on-hover {
    cursor: pointer !important;
}
</style>