<template>
  <v-dialog v-model="showChangelog" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Changelog</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row v-for="(versionNote, index) in changelog" :key="index">
            <v-col>
              <h1>{{ versionNote.update }}</h1>
            </v-col>
            <v-col class="d-flex justify-content-end align-items-end">
              <h2 class="fs-5">{{ versionNote.date }}</h2>
            </v-col>
            <v-col>
              <div v-if="versionNote.commitMessage.Features">
                <h2 class="fs-5">Features:</h2>
                <p v-html="formatCommitMessage(versionNote.commitMessage.Features)"></p>
              </div>
              <div v-if="versionNote.commitMessage.Other">
                <h2 class="fs-5">Other:</h2>
                <p v-html="formatCommitMessage(versionNote.commitMessage.Other)"></p>
              </div>
              <div v-if="versionNote.commitMessage.Bugs">
                <h2 class="fs-5">Bug Fixes:</h2>
                <p v-html="formatCommitMessage(versionNote.commitMessage.Bugs)"></p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showChangelog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ChangelogModal',
  setup() {
    const store = useStore();
    const showChangelog = ref(false);
    const changelog = ref([]);

    const fetchChangelog = async () => {
      const response = await fetch('data/changelog/changelog_v2.json');
      const data = await response.json();
      changelog.value = data;
    };

    const formatCommitMessage = (message) => {
      return message.split('|').map((line) => `&ndash; ${line}<br>`).join('');
    };

    onMounted(() => {
      fetchChangelog();
      showChangelog.value = store.state.showChangelog;
    });

    return {
      showChangelog,
      changelog,
      formatCommitMessage,
    };
  },
};
</script>

<style scoped>
.v-dialog {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.v-card-title {
  border-bottom: 1px solid var(--sub-alt-color);
}

.v-card-actions {
  border-top: 1px solid var(--sub-alt-color);
}
</style>
