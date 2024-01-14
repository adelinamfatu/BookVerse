<template>
  <div class="center-container">
    <v-card height="80vh" width="80vw" elevation="10" color="blue-grey-lighten-5">
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
            <v-rating v-if="bookDetails.rating !== undefined" v-model="bookDetails.rating" readonly></v-rating>
            <v-rating v-else :model-value="0" readonly></v-rating>
          </div>
          <p v-if="bookDetails" class="description">{{ bookDetails.description }}</p>
          <v-btn
            fab
            color="white"
            rounded
            class="fab-button"
            @click="toggleFavorite"
          >
            <v-icon color="pink">{{ 'mdi-heart' }}</v-icon>
          </v-btn>
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchBookDetails(isbn) {
      try {
        const response = await axios.get(`http://localhost:6100/api/books/${isbn}`);
        this.bookDetails = response.data;
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    },
  },
  async created() {
    const isbn = this.$route.params.isbn;
    await this.fetchBookDetails(isbn);
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
  font-size: 2rem;
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