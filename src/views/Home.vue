<template>
  <v-container>
    <Header />
    <Clock />
    <TimeEntryTable />
    <ThemeModal />
    <SettingsModal />
    <InformationModal />
    <DeleteTableModal />
    <ErrorModal />
    <ChangelogModal />
    <MobileEntryModal />
    <FabButtons />
    <ToastMessages />
    <Footer />
  </v-container>
</template>

<script>
import Header from '../components/Header.vue';
import Clock from '../components/Clock.vue';
import TimeEntryTable from '../components/TimeEntryTable.vue';
import ThemeModal from '../components/ThemeModal.vue';
import SettingsModal from '../components/SettingsModal.vue';
import InformationModal from '../components/InformationModal.vue';
import DeleteTableModal from '../components/DeleteTableModal.vue';
import ErrorModal from '../components/ErrorModal.vue';
import ChangelogModal from '../components/ChangelogModal.vue';
import MobileEntryModal from '../components/MobileEntryModal.vue';
import FabButtons from '../components/FabButtons.vue';
import ToastMessages from '../components/ToastMessages.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Clock,
    TimeEntryTable,
    ThemeModal,
    SettingsModal,
    InformationModal,
    DeleteTableModal,
    ErrorModal,
    ChangelogModal,
    MobileEntryModal,
    FabButtons,
    ToastMessages,
    Footer,
  },
};
</script>

<style scoped>
.v-container {
  padding: 0;
}
</style>
