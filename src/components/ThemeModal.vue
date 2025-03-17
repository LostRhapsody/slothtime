<template>
  <v-dialog v-model="showThemeModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Themes</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeThemeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="themeSearch"
              label="Type to search"
              @input="searchThemes"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn block @click="addThemeToFavorites">
              &#9733; <em>{{ favoriteThemeLabel }}</em>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block @click="filterFavorites">
              &#9733; Filter by favorite themes
            </v-btn>
          </v-col>
        </v-row>
        <v-list>
          <v-list-item
            v-for="theme in filteredThemes"
            :key="theme.name"
            @click="changeTheme(theme.name)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ theme.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'ThemeModal',
  setup() {
    const showThemeModal = ref(false);
    const themeSearch = ref('');
    const themes = ref([
      // Add your themes here
    ]);
    const favoriteThemes = ref([]);
    const isFiltered = ref(false);

    const filteredThemes = computed(() => {
      if (isFiltered.value) {
        return themes.value.filter((theme) =>
          favoriteThemes.value.includes(theme.name)
        );
      }
      return themes.value.filter((theme) =>
        theme.name.toLowerCase().includes(themeSearch.value.toLowerCase())
      );
    });

    const favoriteThemeLabel = computed(() => {
      return themes.value.find((theme) => theme.name === currentTheme)?.name || '';
    });

    const searchThemes = () => {
      // Implement search logic here
    };

    const addThemeToFavorites = () => {
      if (!favoriteThemes.value.includes(currentTheme)) {
        favoriteThemes.value.push(currentTheme);
        // Show toast message
      } else {
        alert('Theme already in favorites');
      }
    };

    const filterFavorites = () => {
      isFiltered.value = !isFiltered.value;
    };

    const changeTheme = (theme) => {
      // Implement theme change logic here
    };

    const closeThemeModal = () => {
      showThemeModal.value = false;
    };

    return {
      showThemeModal,
      themeSearch,
      filteredThemes,
      favoriteThemeLabel,
      searchThemes,
      addThemeToFavorites,
      filterFavorites,
      changeTheme,
      closeThemeModal,
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
