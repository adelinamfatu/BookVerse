<template>
  <v-row>
    <v-col cols="4">
      <v-img :src="book.coverImage" alt="Book Cover" max-height="10rem"></v-img>
    </v-col>

    <v-col cols="4">
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-text>{{ book.author }}</v-card-text>
    </v-col>

    <v-col cols="4">
      <v-card-text>{{ book.description }}</v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>