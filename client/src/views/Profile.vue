<template>
  <div class="container">
    <v-card style="height: 95vh; width: 100%" color="blue-grey-lighten-5" elevation="12">
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12">
          <div class="pa-4">
            <h2 style="color: #37474F" class="mb-4 ml-8">Profile</h2>
          </div>
        </v-col>

        <v-col cols="12" sm="10">
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
              @input="processName"
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
export default {
  data() {
    return {
      genders: ['Male', 'Female', 'Other'],
      genres: [
        'Fantasy', 'Science Fiction', 'Mystery', 'Romance',
        'Historical Fiction', 'Thriller', 'Action', 'Horror',
        'Young Adult', 'Comedy',
      ],
    };
  },

  computed: {
    userDetails() {
      return this.$store.getters['users/getUserDetails'] || {
        name: '',
        email: '',
        gender: '',
        favoriteGenres: [],
        profilePictureUrl: null,
      };
    },

    defaultImageSrc() {
      return 'https://firebasestorage.googleapis.com/v0/b/bookverse-86b43.appspot.com/o/profile.png?alt=media&token=5e990f95-08fa-4c78-8911-a50d8d2a9a1d';
    },
    
    hasDefaultImage() {
      return !this.userDetails.profilePictureUrl;
    },
  },
  
  methods: {
    saveChanges() {
      this.$store.dispatch('users/saveUserProfile', this.userDetails);
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.$store.dispatch('users/uploadProfilePicture', file);
    },

    processName() {
      const cleanedName = this.userDetails.name.replace(/[^a-zA-Z\s]/g, '');
      const formattedName = cleanedName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
      this.userDetails.name = formattedName;
    },
  },

  created() {
    this.$store.dispatch('users/fetchUserData');
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

@media (max-width: 1200px) {
  .container {
    height: auto;
  }
  h2 {
    font-size: 20px;
  }
}
</style>