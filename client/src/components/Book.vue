<template>
  <v-card hover elevation="5" style="width: 8rem; height: 11rem">
    <v-img src="@/assets/shatterme.jpg" height="120" contain></v-img>
    <v-card-title align="center" style="font-size: 16px; font-weight: bold; margin: 0; padding: 0;">{{ book.title }}</v-card-title>
    <v-card-subtitle align="center" style="font-size: 12px; font-weight: italic; margin: 0;">{{ book.author }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    book: Object,
  },
};
</script>