<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="email" label="Email"></v-text-field>
              <v-text-field v-model="password" label="Password" type="password"></v-text-field>
              <v-btn @click="register" color="primary">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

const email = ref("");
const password = ref("");

const register = async () => {
  const userData = {
    email: email.value,
    password: password.value
  };
  console.log(userData);

  try {
    const response = await axios.post('http://localhost:6100/api/users/add', userData);
    console.log(response.data);
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
</script>