<template>
  <div class="fabs d-md-none" role="group" aria-label="Floating action buttons">
    <v-btn icon class="fab" aria-label="Expand Menu" aria-hidden="true" title="Expand menu" id="fab_menu_btn" @click="toggleFabMenu">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-btn icon class="fab mini-fab" aria-label="Open Theme List" aria-hidden="true" title="Open Theme List" v-if="isFabMenuOpen" @click="openThemeModal">
      <v-icon>mdi-palette</v-icon>
    </v-btn>
    <v-btn icon class="fab mini-fab" aria-label="Settings Menu" aria-hidden="true" title="Settings menu" v-if="isFabMenuOpen" @click="openSettingsModal">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FabButtons',
  data() {
    return {
      isFabMenuOpen: false,
    };
  },
  methods: {
    toggleFabMenu() {
      this.isFabMenuOpen = !this.isFabMenuOpen;
    },
    openThemeModal() {
      this.$emit('open-theme-modal');
    },
    openSettingsModal() {
      this.$emit('open-settings-modal');
    },
  },
};
</script>

<style scoped>
.fabs {
  --_viewport-margin: 2.5vmin;
  position: fixed;
  z-index: 11;
  inset-block: auto var(--_viewport-margin);
  inset-inline: auto var(--_viewport-margin);
  display: flex;
  flex-direction: column-reverse;
  place-items: center;
  gap: var(--_viewport-margin);
}

.fab {
  --_size: 2rem;
  padding: calc(var(--_size) / 2);
  border: none;
  border-radius: 50%;
  aspect-ratio: 1;
  box-shadow: 10px 10px 38px 0px rgba(0, 0, 0, 0.75);
  background: var(--main-color);
  color: var(--sub-alt-color) !important;
  -webkit-tap-highlight-color: transparent;
}

.fab > .v-icon {
  --_size: 2rem;
  inline-size: var(--_size);
  block-size: var(--_size);
  stroke-width: 3px;
}

.mini-fab {
  --_size: 1.5rem;
  padding: calc(var(--_size) / 2);
}

.mini-fab > .v-icon {
  --_size: 1.5rem;
  inline-size: var(--_size);
  block-size: var(--_size);
}
</style>
