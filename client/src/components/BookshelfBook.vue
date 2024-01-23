<template>
    <div class="card-container">
        <v-card hover elevation="5" style="width: 7rem; height: 14rem">

            <v-img :src="book.coverImage" height="170" contain></v-img>

            <v-card-title align="center" style="font-size: 14px; font-weight: bold; margin: 0; padding: 0;">{{ book.title }}</v-card-title>

            <v-card-subtitle align="center" style="font-size: 10px; font-style: italic; margin: 0;">{{ book.author }}</v-card-subtitle>

        </v-card>
        
        <v-rating
                v-model="rating"
                :item-labels="labels"
                size="small">
            <template v-slot:item-label="props">
                <span
                    class="font-weight-black text-caption"
                    :class="`text-${colors[props.index]}`">
                    {{ props.label }}
                </span>
            </template>
        </v-rating>
    </div>
</template>

<script>
export default {
  props: {
    book: Object,
  },

  data() {
    return {
      rating: 0, 
      colors: ['red', 'orange', 'grey', 'cyan', 'green'],
      labels: ['bad', 'so so', 'ok', 'good', 'great'],
    };
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>