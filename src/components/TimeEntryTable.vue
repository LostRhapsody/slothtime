<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="newRow">Add New Row</v-btn>
        <v-btn @click="removeRow">Remove Last Row</v-btn>
        <v-btn @click="exportTable">Export to CSV</v-btn>
        <v-btn @click="clearTrackingTable">Clear Table</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task Number</th>
              <th>Work Code</th>
              <th>Time Entry</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Task Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in trackingArray" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <v-text-field v-model="entry.taskNumber" @change="updateTrackingArray(index)" />
              </td>
              <td>
                <v-select :items="workCodes" v-model="entry.workCode" @change="updateTrackingArray(index)" />
              </td>
              <td>
                <v-textarea v-model="entry.jiraEntry" @change="updateTrackingArray(index)" />
              </td>
              <td>
                <v-text-field v-model="entry.startTime" @change="updateTrackingArray(index)" />
              </td>
              <td>
                <v-text-field v-model="entry.endTime" @change="updateTrackingArray(index)" />
              </td>
              <td>
                <v-text-field v-model="entry.taskTime" @change="updateTrackingArray(index)" />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      trackingArray: [],
      workCodes: ['Work Code', 'Analysis', 'Programming', 'Deployment'],
    };
  },
  methods: {
    newRow() {
      this.trackingArray.push({
        taskNumber: '',
        workCode: 'Work Code',
        jiraEntry: '',
        startTime: '',
        endTime: '',
        taskTime: '',
      });
    },
    removeRow() {
      this.trackingArray.pop();
    },
    exportTable() {
      const csvContent = this.trackingArray.map(entry => 
        `${entry.taskNumber},${entry.workCode},${entry.jiraEntry},${entry.startTime},${entry.endTime},${entry.taskTime}`
      ).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'slothtime.csv';
      link.click();
    },
    clearTrackingTable() {
      this.trackingArray = [];
    },
    updateTrackingArray(index) {
      this.$set(this.trackingArray, index, this.trackingArray[index]);
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin: 5px;
}
</style>
