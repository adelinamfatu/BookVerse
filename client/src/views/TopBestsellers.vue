<template>
    <div class="container">
        <v-card class="overflow-y-auto" style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
            <div class="pa-4">
                <h2 style="color: #37474F" class="mb-4 ml-8">Top 30 bestsellers</h2>
            </div>
            <div class="half-width">
                <v-data-table 
                    :items="topBooks"
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
                        <v-img :src="item.cover" class="cover-image"></v-img>
                    </template>
                </v-data-table>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
  name: 'TopBestsellers',

  computed: {
    topBooks() {
      return this.$store.getters['books/getTopBooks'];
    },
  },

  mounted() {
    this.$store.dispatch('books/fetchTopBooks');
  },

  methods: {
    getRatingColor(rating) {
        if (rating >= 4.7) {
            return 'green';
        } else if (rating >= 4) {
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

.cover-image {
  width: 50px; /* Default width for small screens */
  height: 50px; /* Default height for small screens */
}

.half-width {
  width: 90%;
  margin: 0 auto;
}

.table {
  background-color: #ECEFF1;
}

@media (max-width: 1200px) {
  .container {
    height: auto;
  }
  .cover-image {
    width: 90px; 
    height: 90px;
  }
}
</style>