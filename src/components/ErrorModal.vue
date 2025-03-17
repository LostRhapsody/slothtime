<template>
  <v-dialog v-model="showErrorModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">An Error Has Occurred</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeErrorModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>
          A developer error has occurred. To help solve this issue, you can choose to report this error and send an alert to the developer. If you don't want information regarding your session sent to the developer, choose
          <em>do not share my info</em>.
        </p>
        <v-row>
          <v-col cols="6">
            <v-btn block color="red" @click="closeErrorModal">
              Do not share my info
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="green" @click="sendErrorLogs">
              Send error logs to developer
            </v-btn>
          </v-col>
        </v-row>
        <p>Check your browser's console logs to see the full error.</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ErrorModal',
  setup() {
    const showErrorModal = ref(false);

    const closeErrorModal = () => {
      showErrorModal.value = false;
    };

    const sendErrorLogs = () => {
      // Implement logic to send error logs to developer
    };

    return {
      showErrorModal,
      closeErrorModal,
      sendErrorLogs,
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
