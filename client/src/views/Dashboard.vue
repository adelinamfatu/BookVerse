<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" elevation="12">
      <v-card-title>Dashboard</v-card-title>
      <v-card-text>
        <p>Most popular this week</p>
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
            <book
              :book="book"
              :class="['ma-4', selectedClass]"
              @click="toggle"
            ></book>
          </v-slide-group-item>
        </v-slide-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import Book from '@/components/Book.vue';

export default {
  name: 'Dashboard',
  components: {
    Book,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    /*
    if (!store.state.user) {
        router.push('/login');
    }*/
  },
  data() {
    return {
      model: [],
      books: [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
      ],
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