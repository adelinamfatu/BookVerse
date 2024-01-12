<template>
  <v-card hover elevation="5" style="width: 7rem; height: 14rem">
    <v-img src="@/assets/shatterme.jpg" height="170" contain></v-img>
    <v-card-title align="center" style="font-size: 14px; font-weight: bold; margin: 0; padding: 0;">{{ book.title }}</v-card-title>
    <v-card-subtitle align="center" style="font-size: 10px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    book: Object,
  },
};
</script>