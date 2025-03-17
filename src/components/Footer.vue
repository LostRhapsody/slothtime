<template>
  <v-footer app>
    <v-container>
      <v-row>
        <v-col>
          <v-btn icon href="https://github.com/LostRhapsody/slothtime" title="View on Github">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon href="https://evanrobertson.dev" title="Visit Developer Website">
            <v-icon>mdi-emoji-laughing</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon title="Open Changelog" @click="displayChangelogModal">
            <v-icon>mdi-git</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    displayChangelogModal() {
      // Implement the logic to display the changelog modal
    },
  },
};
</script>

<style scoped>
.v-footer {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.v-btn {
  color: var(--text-color);
}

.v-btn:hover {
  color: var(--main-color);
}
</style>
