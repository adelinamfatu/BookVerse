<template>
  <div class="container">
    <v-card class="overflow-y-auto" color="brown-lighten-5" style="height: 95vh; width: 100%" elevation="12">
      <div class="pa-4">
        <h2 style="color: #37474F" class="mb-4 ml-8">My bookshelf</h2> 
        <v-container>
          <v-row>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3">
            <BookshelfCard
              :title="card.title"
              :color="card.color"
              :supplementaryText="card.supplementaryText"
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

export default {
  components: {
    BookshelfCard,
  },
  data() {
    return {
      cards: [
        {
          title: 'Card 1',
          color: '#FFC107',
          supplementaryText: 'Supplementary Text 1',
        },
        {
          title: 'Card 2',
          color: '#4CAF50',
          supplementaryText: 'Supplementary Text 2',
        },
        {
          title: 'Card 3',
          color: '#2196F3',
          supplementaryText: 'Supplementary Text 3',
        },
        {
          title: 'Card 4',
          color: '#FF5722',
          supplementaryText: 'Supplementary Text 4',
        },
        {
          title: 'Card 5',
          color: '#9C27B0',
          supplementaryText: 'Supplementary Text 5',
        },
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