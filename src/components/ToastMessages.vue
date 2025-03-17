<template>
  <div>
    <!-- Copied text to clipboard message -->
    <v-snackbar v-model="copiedSnackbar" :timeout="2000" bottom left>
      Copied to clipboard!
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="copiedSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Theme added to favorites message -->
    <v-snackbar v-model="favoritedSnackbar" :timeout="2000" bottom left>
      Added to favorites!
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="favoritedSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copiedSnackbar: false,
      favoritedSnackbar: false,
    };
  },
};
</script>

<style scoped>
.v-snackbar {
  background-color: var(--frosted-bg);
  color: var(--text-color);
}
</style>
