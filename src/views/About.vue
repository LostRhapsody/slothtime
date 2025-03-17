<template>
  <v-container class="my-5">
    <v-row class="flex-column flex-md-row align-items-end text-start">
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
    <v-container class="mt-3">
      <v-row class="justify-content-center">
        <v-col cols="12" md="6" class="text-center">
          <h1>About</h1>
          <p class="lh-base">
            A personal time entry project created so I don't have to use my
            company's time entry website all day. Correct, this was a spite
            project.
          </p>
          <p class="lh-base">But it's turned into much more.</p>
          <p class="lh-base">
            lol (lots of love) to
            <a target="_blank" href="https://monkeytype.com" rel="noopener"
              >monkeytype.com</a
            >,
            <a target="_blank" href="https://github.com/Miodec" rel="noopener"
              >Miodec</a
            >
            and all the
            <a
              target="_blank"
              href="https://github.com/monkeytypegame"
              rel="noopener"
              >awesome people who contributed to that project</a
            >, for serving as inspiration.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'About',
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
