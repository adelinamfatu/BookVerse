<template>
  <v-container fluid class="fill-height" style="background-color: #E3F2FD;">
    <v-row justify="center">
      <v-col cols="12" md="7" sm="8" lg="5">
        <v-card color="light-blue-lighten-4" elevation="10"> 
          <v-row justify="center" class="mt-5">
            <v-col class="d-flex justify-center align-center">
              <v-avatar size="70">
                <img src="@/assets/logo.png" alt="Icon" style="width: 70px; height: auto;">
              </v-avatar>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-card-title class="text-h5" style="color: white; text-align: center; margin: 0; padding: 0;">
                <span style="font-size: 32px; font-weight: bold">BookVerse</span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                :rules="emailRules"
                density="compact"
                label="Email"
                placeholder="Email address"
                clearable
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined">
              </v-text-field>
              <v-text-field
                :rules="passwordRules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                v-model="password"
                label="Password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible">
              </v-text-field>
              <v-text-field
                :rules="confirmPasswordRules"
                :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="confirmVisible ? 'text' : 'password'"
                density="compact"
                v-model="confirmPassword"
                label="Confirm password"
                placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="confirmVisible = !confirmVisible">
              </v-text-field>
              <v-text-field
                :rules="nameRules"
                class="mb-4"
                density="compact"
                label="Name"
                clearable
                @input="updateFormattedName"
                @keypress="onKeyPress"
                placeholder="First and last name"
                v-model="name"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined">
              </v-text-field>
              <div class="d-flex justify-center">
                <v-btn @click="register" color="orange-accent-1">Register</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-row justify="center" class="mb-4">
            <v-col>
              <div class="d-flex justify-center align-center">
                <span style="font-size: 14px;">Already have an account?</span>
                <router-link to="/login" style="margin-left: 5px; text-decoration: underline; color: blue;">Login</router-link>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const name = ref("");

const emailRules = ref([
  value => !!value || 'Email is required',
  value => /.+@.+\..+/.test(value) || 'Email must be valid'
]);
const passwordRules = ref([
  value => !!value || 'Password is required',
  value => (value && value.length >= 8) || 'Password should be at least 8 characters long'
]);
const confirmPasswordRules = ref([
  value => !!value || 'Confirm Password is required',
  value => value === password.value || 'Passwords do not match'
]);
const nameRules = ref([
  value => !!value || 'Name is required'
]);
const visible = ref(false);
const confirmVisible = ref(false);

const updateFormattedName = () => {
  name.value = processName(name.value);
};

const register = async () => {
  const userData = {
    email: email.value,
    name: name.value
  };

  const registerData = {
    email: email.value, 
    password: password.value
  };

  try {
    await store.dispatch('auth/register', registerData);

    axios.post('http://localhost:6100/api/users/add', userData)
      .then(response => {
        router.push('/dashboard');
      })
      .catch(error => {
        console.error('Backend request error:', error);
      });

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

const processName = (inputName) => {
  return inputName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const onKeyPress = (event) => {
  const charCode = event.which || event.keyCode;

  if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
    event.preventDefault();
  }
};
</script>