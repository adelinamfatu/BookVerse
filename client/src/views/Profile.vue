<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12">
          <div class="pa-4">
            <h2 style="color: #37474F" class="mb-4 ml-8">Profile</h2>
          </div>
        </v-col>

        <v-col cols="12" sm="9">
          <div style="text-align: center;">
            <img
              v-if="userDetails.profilePictureUrl || hasDefaultImage"
              :src="userDetails.profilePictureUrl || defaultImageSrc"
              alt="Profile Picture"
              style="height: 100px; border: 1px solid #ccc; border-radius: 5px;"
              class="mb-4"
            />

            <v-file-input
              label="Profile Picture"
              variant="solo"
              class="mb-4"
              bg-color="indigo-lighten-5"
              ref="files"
              accept="image/*"
              @change="handleFileChange"
            ></v-file-input>

            <v-text-field
              v-model="userDetails.email"
              label="Email"
              variant="solo"
              class="mb-4"
              readonly
              bg-color="indigo-lighten-5"
            ></v-text-field>

            <v-text-field
              v-model="userDetails.name"
              label="Name"
              variant="solo"
              class="mb-4"
              bg-color="indigo-lighten-5"
            ></v-text-field>

            <v-select
              v-model="userDetails.gender"
              label="Gender"
              variant="solo"
              :items="genders"
              class="mb-4"
              bg-color="indigo-lighten-5"
            ></v-select>

            <v-select
              v-model="userDetails.favoriteGenres"
              chips
              label="Favorite book genres"
              :items="genres"
              multiple
              variant="solo"
              bg-color="indigo-lighten-5"
            ></v-select>

            <v-btn @click="saveChanges" color="green-lighten-4">Save</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';

export default {
  data() {
    return {
      userDetails: {
        name: '',
        email: '',
        gender: '',
        favoriteGenres: [],
        profilePictureUrl: null,
      },
      genders: ['Male', 'Female', 'Other'],
      genres: [
        'Fantasy', 'Science Fiction', 'Mystery', 'Romance',
        'Historical Fiction', 'Thriller', 'Action', 'Horror',
        'Young Adult', 'Comedy',
      ],
    };
  },
  
  methods: {
    showToast(message, type) {
      toast(message, {
        autoClose: 3000,
        type: type,
      });
    },

    async loadUserProfile() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.get('http://localhost:6100/api/users/profile', {
          headers: {
            'x-access-token': token,
          },
        });

        this.userDetails = response.data;
      } catch (error) {
        this.showToast('Error loading the profile. Please try again.', 'error');
      }
    },

    async saveChanges() {
      const token = this.$store.getters['auth/firebaseToken'];

      try {
        const response = await axios.put('http://localhost:6100/api/users/update', this.userDetails, {
          headers: {
            'x-access-token': token,
          },
        });

        if (response.status === 200) {
          this.showToast(response.data, 'success');
        } else {
          this.showToast('Error updating the profile. Please try again.', 'error');
        }

      } catch (error) {
        this.showToast('Error updating the profile. Please try again.', 'error');
      }
    },

    handleFileChange(event) {
      this.uploadProfilePicture(event.target.files[0]);
    },

    async uploadProfilePicture(profilePictureUrl) {
      if (profilePictureUrl) {
        const token = this.$store.getters['auth/firebaseToken'];
        const formData = new FormData();
        formData.append('file', profilePictureUrl);

        try {
          const response = await axios.put('http://localhost:6100/api/users/picture', formData, {
            headers: {
              'x-access-token': token,
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status === 200) {
            this.userDetails.profilePictureUrl = response.data.profilePictureUrl;
            this.showToast(response.data.message, 'success');
          } else {
            this.showToast('Error uploading the file. Please try again.', 'error');
          }
          
        } catch (error) {
          this.showToast('Error uploading the file. Please try again.', 'error');
        }
      }
    },
  },

  computed: {
    defaultImageSrc() {
      return 'https://firebasestorage.googleapis.com/v0/b/bookverse-86b43.appspot.com/o/profile.png?alt=media&token=5e990f95-08fa-4c78-8911-a50d8d2a9a1d';
    },
    
    hasDefaultImage() {
      return !this.userDetails.profilePictureUrl;
    },
  },

  created() {
    this.loadUserProfile();
  }
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