<template>
    <div class="container">
        <v-card style="height: 95vh; width: 100%" color="brown-lighten-5" elevation="12">
            <v-row align="center" justify="center">
            <v-col cols="12">
                <div class="pa-4">
                <h2 style="color: #37474F" class="mb-4 ml-8">Profile</h2>
                </div>
            </v-col>

            <v-col cols="12" sm="6">
                <div class="pa-4" style="text-align: center;">
                    <img
                        v-if="userDetails.profilePicture || hasDefaultImage"
                        :src="userDetails.profilePicture || defaultImageSrc"
                        alt="Profile Picture"
                        style="height: 100px; border: 1px solid #ccc; border-radius: 5px;"
                        class="mb-4"
                    />

                    <v-file-input
                        v-model="userDetails.profilePicture"
                        label="Profile Picture"
                        outlined
                        class="mb-4"
                    ></v-file-input>

                    <v-text-field
                        v-model="userDetails.email"
                        label="Email"
                        outlined
                        class="mb-4"
                        readonly
                    ></v-text-field>
                </div>
            </v-col>

            <v-col cols="12" sm="6">
                <div class="pa-4">
                    <v-text-field
                        v-model="userDetails.name"
                        label="Name"
                        outlined
                        class="mb-4"
                    ></v-text-field>
                        
                    <v-select
                        v-model="userDetails.gender"
                        label="Gender"
                        outlined
                        :items="genders"
                        class="mb-4"
                    ></v-select>

                    <v-select
                        v-model="userDetails.favoriteGenres"
                        chips
                        label="Favorite book genres"
                        :items="genres"
                        multiple
                        outlined
                    ></v-select>

                    <v-btn @click="saveChanges" color="success" :disabled="!isSaveEnabled">Save</v-btn>
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
      originalUserDetails: {},
      userDetails: {
        name: '',
        email: '',
        gender: '',
        favoriteGenres: [],
        profilePicture: null,
      },
      genders: ['Male', 'Female', 'Other'],
      genres: [
        'Fantasy', 'Science Fiction', 'Mystery', 'Romance',
        'Historical Fiction', 'Thriller', 'Action', 'Horror',
        'Young Adult', 'Comedy',
      ],
    };
  },
  computed: {
    isSaveEnabled() {
      return (
        this.userDetails.name !== this.originalUserDetails.name ||
        this.userDetails.email !== this.originalUserDetails.email ||
        this.userDetails.gender !== this.originalUserDetails.gender ||
        JSON.stringify(this.userDetails.favoriteGenres) !== JSON.stringify(this.originalUserDetails.favoriteGenres) ||
        this.userDetails.profilePicture !== this.originalUserDetails.profilePicture
      );
    },
  },
  methods: {
    saveChanges() {
      this.originalUserDetails = { ...this.userDetails };
    },
  },
  watch: {
    userDetails: {
      deep: true,
      handler(newValue) {
      },
    },
  },
  mounted() {
    this.originalUserDetails = { ...this.userDetails };
  },

  computed: {
    defaultImageSrc() {
      return 'https://firebasestorage.googleapis.com/v0/b/bookverse-86b43.appspot.com/o/profile.png?alt=media&token=5e990f95-08fa-4c78-8911-a50d8d2a9a1d';
    },
    hasDefaultImage() {
      return !this.userDetails.profilePicture;
    },
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