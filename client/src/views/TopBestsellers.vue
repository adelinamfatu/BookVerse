<template>
    <div class="container">
        <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
            <div class="pa-4">
                <h2 style="color: #37474F" class="mb-4 ml-8">Top 30 bestsellers</h2>
            </div>
            <div class="half-width">
                <v-data-table 
                    :items="books"
                    :items-per-page-options="[
                        { value: 5, title: '5' },
                        { value: 10, title: '10' },
                        { value: 15, title: '15' }
                    ]"
                    class="table">
                    <template v-slot:item.rating="{ value }">
                        <v-chip :color="getRatingColor(value)">
                        {{ value }}
                        </v-chip>
                    </template>
                    <template v-slot:item.cover="{ item }">
                        <v-img :src="item.cover" width="50" height="50"></v-img>
                    </template>
                </v-data-table>
            </div>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'TopBestsellers',

  data() {
    return {
        books: [],
    };
  },

  mounted() {
    this.fetchTopBooks();
  },

  methods: {
    async fetchTopBooks() {
        const store = useStore();
        const token = store.getters['auth/firebaseToken'];

        try {
            const response = await axios.get('http://localhost:6100/api/books/top', {
                headers: {
                    'x-access-token': token,
                },
            }); 
            this.books = response.data;
        } catch (error) {
            console.error('Error fetching top books:', error);
        }
    },

    getRatingColor(rating) {
        if (rating >= 4) {
            return 'green';
        } else if (rating >= 3) {
            return 'orange';
        } else {
            return 'red';
        }
    },
  },
}
</script>

<style scoped>
.container {
  background-color: #E3F2FD;
  height: 100vh;
  display: flex;
  align-items: center;
}

.half-width {
  width: 90%;
  margin: 0 auto;
}

.table {
  background-color: #ECEFF1;
}
</style>