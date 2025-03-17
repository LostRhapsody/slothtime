<template>
  <v-dialog v-model="showDeleteTableModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Clear Table?</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDeleteTableModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-alert type="error" dense>
              Danger Zone. This will empty every row in the table.
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn block @click="closeDeleteTableModal">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="error" @click="clearTrackingTable">
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DeleteTableModal',
  setup() {
    const showDeleteTableModal = ref(false);

    const closeDeleteTableModal = () => {
      showDeleteTableModal.value = false;
    };

    const clearTrackingTable = () => {
      // Implement logic to clear the tracking table
    };

    return {
      showDeleteTableModal,
      closeDeleteTableModal,
      clearTrackingTable,
    };
  },
};
</script>

<style scoped>
.v-dialog {
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
