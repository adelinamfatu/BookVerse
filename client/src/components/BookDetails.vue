<template>
  <div class="center-container">
    <v-card height="80vh" width="80vw" elevation="10" color="blue-grey-lighten-5">
      <v-card-actions>
        <v-btn @click="goBack"> 
          <v-icon>mdi-arrow-left</v-icon> Return
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E3F2FD;
}
</style>