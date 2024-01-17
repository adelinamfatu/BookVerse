<template>
  <v-card class="mb-4">
    <v-container :style="{ backgroundColor: color, height: '200px' }">
    </v-container>

    <v-row>
      <v-col>
        <v-card-title>{{ title }}</v-card-title>
      </v-col>

      <v-col class="d-flex">
        <v-card-actions class="ml-auto">
          <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleShow"></v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ supplementaryText }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    color: String,
    supplementaryText: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
  },
};
</script>