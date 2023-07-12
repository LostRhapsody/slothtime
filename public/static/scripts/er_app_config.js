/*---------------------------------
User config file - stored in cache
This file is used to store user settings in the browser cache.

General layout of configuration file:

slothtime_config{
   "tracking_array": [Time entry table objects],
   "current_theme": {
      "name":"serika_dark.css",
      "main_color":"#000000",
      "bg_color":"#000000",
      "sub_color":"#000000",
      "text_color":"#000000",
   },
   "favortie_themes": [array of theme names]
   
}
----------------------------------*/

/* check if cache is available */
/* TODO Add cache checks whenever pulling from cache */
const cacheAvailable = "caches" in self;
var slothtime_config = getConfig();

/* pathing for stylesheets */
var stylePath = "static/styles/themes/";

if (!cacheAvailable){
   console.error("Cache not available");
}

/*
gets the cached config file
*/
function getConfig() {
   /* Check and retrieve any stored data in the cache */
   var tmp_slothtime_config = JSON.parse(localStorage.getItem("slothtime_config"));

   /* verify config is not null, otherwise set to blank */
   if (tmp_slothtime_config != null) slothtime_config = tmp_slothtime_config;
   else slothtime_config = 
   {
      "tracking_array": [],
      "current_theme": {
         "name": "serika_dark.css",
         "main_color": "#e2b714",
         "bg_color": "#323437",
         "sub_color": "#646669",
         "text_color": "#d1d0c5",
      },
      "favorite_themes": []
   };

   return slothtime_config;
}

/*
Updates the currently selected theme in the config file
current_theme: a theme object
*/
function cacheCurrentTheme(current_theme) {
   if (current_theme == null) {
      console.error("current_theme is null");
   } else {
      slothtime_config.current_theme = current_theme;
      cacheConfig();
   }
}

/*
updates the favorite themes array in the config file
*/
function cacheFavoriteThemes(favorite_themes) {
   if (favorite_themes == null) {
      console.error("favorite_theme is null");
   } else {
      slothtime_config.favorite_themes = favorite_themes;
      cacheConfig();
   }
}

/* 
caches the tracking array 
*/
function cacheTrackingArray(tracking_array) {
   if (tracking_array == null) {
      console.error("tracking_array is null");
   } else {
      slothtime_config.tracking_array = tracking_array;   
      cacheConfig();
   }
}

/*
updates the config file in cache
*/
function cacheConfig() {
   localStorage.setItem("slothtime_config", JSON.stringify(slothtime_config));
}
