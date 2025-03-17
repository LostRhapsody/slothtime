<template>
  <v-dialog v-model="showMobileEntryModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Time Entry</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeMobileEntryModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="taskNumber"
                label="Task Number"
                placeholder="Task Number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="workCode"
                :items="workCodes"
                label="Work Code"
                placeholder="Work Code"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="timeEntry"
                label="Time Entry"
                placeholder="Time Entry"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="startTime"
                label="Start Time"
                placeholder="Start"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="endTime"
                label="End Time"
                placeholder="End"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="totalTime"
                label="Total Time"
                placeholder="Total"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveAndClose">
          Save & Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MobileEntryModal',
  setup() {
    const showMobileEntryModal = ref(false);
    const taskNumber = ref('');
    const workCode = ref('');
    const timeEntry = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const totalTime = ref('');
    const workCodes = ref(['Work Code', 'Analysis', 'Programming', 'Deployment']);

    const closeMobileEntryModal = () => {
      showMobileEntryModal.value = false;
    };

    const saveAndClose = () => {
      // Implement save logic here
      closeMobileEntryModal();
    };

    return {
      showMobileEntryModal,
      taskNumber,
      workCode,
      timeEntry,
      startTime,
      endTime,
      totalTime,
      workCodes,
      closeMobileEntryModal,
      saveAndClose,
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
