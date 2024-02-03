<template>
  <v-card class="mb-4">
    <v-container :style="{ backgroundColor: internalColor, height: '200px' }">
      <v-row>
        <v-col>
          <v-btn icon @click="navigateToBookshelfRoute">
            <v-icon>mdi-arrow-expand-all</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn v-if="!isDefault" icon color="rgba(255, 255, 255, 0.25)" @click="openDeleteDialog">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="isEditing" class="d-flex align-center justify-center">
        <v-color-picker 
          :value="internalColor" 
          hide-canvas hide-inputs 
          @update:modelValue="handleColorChange"></v-color-picker>
      </v-row>
    </v-container>

    <v-row>
      <v-col :md="isEditing ? 8 : 7">
        <v-card-title>
          <template v-if="!isEditing">{{ editedTitle }}</template>
          <template v-else>
            <v-text-field 
              :disabled="isDefault"
              v-model="editedTitle" 
              label="Edit Title"></v-text-field>
          </template>
        </v-card-title>
      </v-col>

      <v-col :md="isEditing ? 4 : 5" class="d-flex">
        <v-card-actions class="ml-auto">
          <v-btn icon @click="toggleEditing">
            <v-icon>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-dialog v-model="deleteDialogVisible" max-width="400px">
      <v-card>
        <v-card-title class="text-center">Confirm Delete</v-card-title>
        <v-card-text class="text-center">Are you sure you want to delete this bookshelf?</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn text @click="cancelDelete">No</v-btn>
          <v-btn text color="primary" @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
  props: {
    id: String,
    title: String,
    color: String,
    isDefault: Boolean,
  },

  data() {
    return {
      show: false,
      isEditing: false,
      editedTitle: this.title,
      deleteDialogVisible: false,
      internalColor: this.color,
    };
  },

  methods: {
    showToast(message, type) {
      toast(message, {
        autoClose: 3000,
        type: type,
      });
    },

    toggleShow() {
      this.show = !this.show;
    },

    toggleEditing() {
      if (this.isEditing) {
        this.isEditing = false;
        this.saveChanges();
      } else {
        this.isEditing = true;
      }
    },

    openDeleteDialog() {
      this.deleteDialogVisible = true;
    },

    cancelDelete() {
      this.deleteDialogVisible = false;
    },

    confirmDelete() {
      this.$emit('delete-bookshelf', this.id);
      this.deleteDialogVisible = false;
      this.showToast('Bookshelf deleted succesfully', 'success');
    },

    handleColorChange(newColor) {
      this.internalColor = newColor;
      
      this.$emit('update:color', newColor);
    },

    async saveChanges() {
      const updatedData = {
        title: this.editedTitle,
        color: this.internalColor,
      };

      await this.$store.dispatch('bookshelves/updateBookshelf', { id: this.id, data: updatedData });
    },

    navigateToBookshelfRoute() {
      this.$router.push(`/bookshelf/${this.id}`);
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
