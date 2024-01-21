<template>
  <div class="container">
    <v-card class="overflow-y-auto" color="brown-lighten-5" style="height: 95vh; width: 100%" elevation="12">
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
import axios from 'axios';

export default {
  components: {
    BookshelfCard,
  },
  data() {
    return {
      cards: [],
    };
  },

  mounted() {
    this.fetchBookshelves();
  },

  methods: {
    async fetchBookshelves() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get('http://localhost:6100/api/bookshelves/user', {
          headers: {
            'x-access-token': token,
          },
        });

        this.cards = response.data;
      } catch (error) {
        console.error('Error fetching bookshelves:', error);
      }
    },

    async addBookshelf() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.post('http://localhost:6100/api/bookshelves/add', {
          title: 'New Bookshelf',
          color: '#607D8B', 
        }, {
          headers: {
            'x-access-token': token,
          },
        });

        const newBookshelf = {
          id: response.data,
          title: 'New Bookshelf',
          color: '#607D8B', 
        }; 

        this.cards.push(newBookshelf);
      } catch (error) {
        console.error('Error adding bookshelf:', error);
      }
    },

    deleteBookshelf(bookshelfId) {
      const token = this.$store.getters['auth/firebaseToken'];

      axios.delete(`http://localhost:6100/api/bookshelves/delete/${bookshelfId}`, {
        headers: {
          'x-access-token': token,
        },
      })
      .then(response => {
        console.log('Delete successful', response.data);
        this.cards = this.cards.filter(card => card.id !== bookshelfId);
      })
      .catch(error => {
        console.error('Error deleting bookshelf', error);
      });
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
</style>