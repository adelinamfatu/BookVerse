<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <div class="pa-4">
        <h2 style="color: #37474F" class="mb-4 ml-8">Explore the infinite universe of books</h2>

        <v-autocomplete
          v-model="searchQuery"
          :items="[]"
          label="Search"
          placeholder="Enter book title, author, or genre"
          auto-select-first
          class="ml-8"
          dense
          item-text="name"
          item-value="id" 
          prepend-icon="mdi-magnify"
          rounded
          variant="solo"
          theme="light"
        ></v-autocomplete>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
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