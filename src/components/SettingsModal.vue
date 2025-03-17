<template>
  <v-dialog v-model="showSettingsModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Settings</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeSettingsModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-btn block @click="toggleClock">
          {{ hideClock ? 'Show Clock' : 'Hide Clock' }}
        </v-btn>
        <v-btn block @click="toggleHoursColumns">
          {{ useTotalTime ? 'Total Hours -> Start/End Time' : 'Start/End Time -> Total Hours' }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'SettingsModal',
  setup() {
    const showSettingsModal = ref(false);
    const hideClock = ref(false);
    const useTotalTime = ref(false);

    const toggleClock = () => {
      hideClock.value = !hideClock.value;
      // Implement logic to hide/show clock
    };

    const toggleHoursColumns = () => {
      useTotalTime.value = !useTotalTime.value;
      // Implement logic to toggle hours columns
    };

    const closeSettingsModal = () => {
      showSettingsModal.value = false;
    };

    return {
      showSettingsModal,
      hideClock,
      useTotalTime,
      toggleClock,
      toggleHoursColumns,
      closeSettingsModal,
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
