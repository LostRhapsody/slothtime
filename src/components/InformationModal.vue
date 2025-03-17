<template>
  <v-dialog v-model="showInformationModal" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Information</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeInformationModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card>
          <v-card-title>Shortcuts</v-card-title>
          <v-card-text>
            <ul>
              <li>
                Ctrl + Shift + Space:
                <ul>
                  <li>
                    Open a modal when in a Time Entry field to make reading and editing larger entries easier.
                  </li>
                </ul>
              </li>
              <li>
                Ctrl + Shift + Period:
                <ul>
                  <li>Create a new row.</li>
                </ul>
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Important:</v-card-title>
          <v-card-text>
            <p>
              Slothtime is a work in progress. This project is continually changing. Use at your own risk.
            </p>
            <ul>
              <li>
                This project was inspired by my hatred of boring corporate time keeping software and monkeytype.com, the worlds best and most customizable typing test website. &#10084; You guys.
              </li>
              <li>
                The total task time (total number of hours/minutes spent on a ticket) will be auto-filled in the export file if you enter your start and end times in a 0900 or 09:00 format.
                <strong>Currently only accouts for 12 hours (Doesn't take AM/PM into account)</strong>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="4">
            <v-btn icon href="https://github.com/LostRhapsody/slothtime" title="View on Github">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn icon href="https://evanrobertson.dev" title="Visit Developer Website">
              <v-icon>mdi-emoji-laughing</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn icon @click="displayChangelogModal" title="Open Changelog">
              <v-icon>mdi-git</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'InformationModal',
  setup() {
    const showInformationModal = ref(false);

    const closeInformationModal = () => {
      showInformationModal.value = false;
    };

    const displayChangelogModal = () => {
      // Implement logic to display changelog modal
    };

    return {
      showInformationModal,
      closeInformationModal,
      displayChangelogModal,
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
