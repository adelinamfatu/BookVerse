<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card class="pa-4 mx-auto" style="height: 45vh; width: 95%; border-radius: 30px" elevation="5" color="orange-lighten-5">
        <v-row align="center">
          <v-col>
            <v-img src="@/assets/books-pile.png" height="40vh" contain></v-img>
          </v-col>
          <v-col>
            <h2 class="mb-4" style="color: #01579B">{{ new Date().getFullYear() }} year 50 most popular bestsellers</h2>
            <p class="mb-4" style="color: #90A4AE">List of the most interesting books of the year based on customers and critics reviews</p>
            <v-btn rounded color="red-lighten-3">
              <v-icon left>mdi-eye</v-icon>View all
            </v-btn>
          </v-col>
          <v-col>
            <v-card class="pa-4 mx-auto" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="blue-lighten-4">
              <v-row align="center">
                <v-avatar>
                  <v-icon size="40" style="color: white">mdi-alien</v-icon>
                </v-avatar>
                <v-card-title>
                  <h2 style="color: white">Top 10 Sci-Fi books</h2>
                </v-card-title>
                <v-card-subtitle>
                  <p style="color: white;">Explore the fascinating world of science fiction literature.</p>
                </v-card-subtitle>
              </v-row>
            </v-card>
            <v-card class="pa-4 mx-auto mt-4" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="cyan-lighten-4">
              <v-row align="center">
                <v-avatar>
                    <v-icon size="40" style="color: white">mdi-heart</v-icon>
                </v-avatar>
                <v-card-title>
                    <h2 style="color: white">Top 30 Romance books</h2>
                </v-card-title>
                <v-card-subtitle>
                    <p style="color: white;">Discover love stories that will captivate your heart.</p>
                </v-card-subtitle>
              </v-row>
            </v-card>
            <v-card class="pa-4 mx-auto mt-4" style="height: 12vh; width: 95%; border-radius: 30px" elevation="10" color="green-lighten-4">
                <v-row align="center">
                  <v-avatar>
                    <v-icon size="40" style="color: white">mdi-book</v-icon>
                  </v-avatar>
                  <v-card-title>
                    <h2 style="color: white">Top 50 Classic books</h2>
                  </v-card-title>
                  <v-card-subtitle>
                    <p style="color: white;">Experience timeless literature with our collection of classic books.</p>
                  </v-card-subtitle>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>