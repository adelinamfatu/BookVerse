<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card class="pa-4 mx-auto" style="height: 45vh; width: 95%; border-radius: 30px" elevation="5" color="orange-lighten-5">
        <v-row align="center">
          <v-col>
            <v-img src="@/assets/books-pile.png" height="40vh" contain></v-img>
          </v-col>
          <v-col>
            <h2 class="mb-4" style="color: #01579B">{{ new Date().getFullYear() }} year 30 most popular bestsellers</h2>
            <p class="mb-4" style="color: #90A4AE">List of the most interesting books of the year based on customers and critics reviews</p>
            <v-btn @click="viewAllBooks" color="light-blue-darken-2">
              <v-icon left>mdi-book-open</v-icon> View All <template></template>
            </v-btn>
          </v-col>
          
          <v-col>
            <router-link to="/top/fantasy">
              <v-card class="pa-4 mx-auto" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="blue-lighten-4">
                <v-row align="center">
                  <v-avatar>
                    <v-icon size="40" style="color: white">mdi-alien</v-icon>
                  </v-avatar>
                  <v-card-title>
                    <h2 style="color: white">Top 10 Fantasy books</h2>
                  </v-card-title>
                  <v-card-subtitle>
                    <p style="color: white;">Explore the fascinating world of fantasy literature.</p>
                  </v-card-subtitle>
                </v-row>
              </v-card>
            </router-link>

            <router-link to="/top/romance">
              <v-card class="pa-4 mx-auto mt-4" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="cyan-lighten-4">
                <v-row align="center">
                  <v-avatar>
                    <v-icon size="40" style="color: white">mdi-heart</v-icon>
                  </v-avatar>
                  <v-card-title>
                    <h2 style="color: white">Top 10 Romance books</h2>
                  </v-card-title>
                  <v-card-subtitle>
                    <p style="color: white;">Discover love stories that will captivate your heart.</p>
                  </v-card-subtitle>
                </v-row>
              </v-card>
            </router-link>

            <router-link to="/top/thriller">
              <v-card class="pa-4 mx-auto mt-4" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="green-lighten-4">
                <v-row align="center">
                  <v-avatar>
                    <v-icon size="40" style="color: white">mdi-book</v-icon>
                  </v-avatar>
                  <v-card-title>
                    <h2 style="color: white">Top 10 Thriller books</h2>
                  </v-card-title>
                  <v-card-subtitle>
                    <p style="color: white;">Experience the suspense and excitement with our curated selection.</p>
                  </v-card-subtitle>
                </v-row>
              </v-card>
            </router-link>

          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    viewAllBooks() {
      this.$router.push('/topbestsellers');
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>