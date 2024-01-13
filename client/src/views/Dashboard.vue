<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" color="brown-lighten-5" elevation="12">
      <div class="pa-4">
        <h2 class="mb-4 ml-8">Recommended for you</h2>  
        <v-slide-group
          v-model="model"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="(book, index) in books"
            :key="index"
            v-slot="{ toggle, selectedClass }"
          >
            <router-link :to="`/book/${encodeURIComponent(book.title)}`">
              <book
                :book="book"
                :class="['ma-4', selectedClass]"
                @click="toggle"
              ></book>
            </router-link>
          </v-slide-group-item>
        </v-slide-group>
        <MostPopular />
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Book from '@/components/Book.vue';
import MostPopular from '@/components/MostPopular.vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    Book,
    MostPopular,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const model = ref([]);
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('firebaseToken');
        const response = await axios.get('http://localhost:6100/api/books/all', {
          headers: {
            'x-access-token': token,
          },
        });

        books.value = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      model,
      books,
    };
  },
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