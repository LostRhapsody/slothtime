<template>
  <v-app-bar app>
    <v-container>
      <v-row class="align-items-end text-start">
        <v-col cols="12" md="7" class="d-flex align-items-center justify-content-center justify-content-md-start">
          <v-btn icon href="https://slothtime.dev">
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
          <v-icon class="sloth-icon me-3">
            mdi-sloth
          </v-icon>
          <h1 class="display-6 mb-0">slothtime</h1>
          <v-icon class="iconRow">
            mdi-clock
          </v-icon>
          <v-btn icon href="https://slothtime.dev/about">
            <v-icon>
              mdi-information
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="5">
          <div id="clock" class="row text-center">
            <h2 id="time" class="display-6 mb-0"></h2>
            <h2 id="timer" class="display-5 mb-0"></h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.sloth-icon {
  width: 2.2rem;
  height: 2.2rem;
  color: var(--main-color);
}

.iconRow {
  width: 1.8rem;
  height: 1.8rem;
  align-self: center;
  color: var(--sub-color);
  margin-left: 1.5rem;
  background-color: var(--bg-color);
}

.iconRow:hover {
  color: var(--text-color);
  transition: color 0.125s;
}
</style>
