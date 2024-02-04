<template>
  <v-card elevation="5">
    <v-img :src="book.coverImage" alt="Book Cover" max-height="10rem"></v-img>

    <v-card-title>
      {{ book.title }} 
    </v-card-title>

    <v-card-subtitle>
      by {{ book.author }} 
      <v-rating 
        v-model="book.rating" 
        class="ma-2" 
        density="compact"
        half-increments
        readonly></v-rating>
    </v-card-subtitle>

    <v-card-actions class="d-flex justify-space-between">
      <router-link :to="'/book/' + book.isbn">
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >
          See more
        </v-btn>
      </router-link>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleShow"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        {{ truncateDescription }}
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  
  data() {
    return {
      show: false,
    };
  },

  computed: {
    truncateDescription() {
      const words = this.book.description.split(' ');
      return words.slice(0, 25).join(' ');
    },
  },

  methods: {
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.v-card-subtitle {
  margin-bottom: 0;
  padding-bottom: 0;
}

.v-card-actions {
  padding-top: 0;
}
</style>