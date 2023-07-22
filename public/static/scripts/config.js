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
   "favortie_themes": [array of theme names],
   "changelog": {
        version: "0.0.0",
        shown: true,
    },
    "hide_clock":false,
    "use_total_time": false,
   
}
----------------------------------*/

/* check if cache is available */
/* TODO Add cache checks whenever pulling from cache */
const cacheAvailable = "caches" in self;
var slothtime_config = getConfig();

/* pathing for stylesheets */
var stylePath = "static/styles/themes/";

if (!cacheAvailable) {
  console.error("Cache not available");
}

/* get the current version from the server */
const versionURL = "data/changelog/version.json";
fetch(versionURL)
  .then((response) => response.json())
  .then((json) => cacheChangelog(json));

/*
gets the cached config file
*/
function getConfig() {
  /* Check and retrieve any stored data in the cache */
  var tmp_slothtime_config = JSON.parse(
    localStorage.getItem("slothtime_config")
  );

  /* verify config is not null, otherwise set to blank */
  if (tmp_slothtime_config != null) slothtime_config = tmp_slothtime_config;
  else
    slothtime_config = {
      tracking_array: [],
      current_theme: {
        name: "serika_dark.css",
        main_color: "#e2b714",
        bg_color: "#323437",
        sub_color: "#646669",
        text_color: "#d1d0c5",
      },
      favorite_themes: [],
      changelog: {
        version: "0.0.0",
        shown: true,
      },
      hide_clock:false,
      use_total_time: false,
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
caches the hide clock setting 
*/
function cacheHideClock(hideClock) {
  if (hideClock == null) {
    console.error("hideClock is null");
  } else {
    slothtime_config.hide_clock = hideClock;
    cacheConfig();
  }
}

/* 
caches the use total time setting 
*/
function cacheUseTotalTime(useTotalTime) {
  if (useTotalTime == null) {
    console.error("useTotalTime is null");
  } else {
    slothtime_config.use_total_time = useTotalTime;
    cacheConfig();
  }
}

/*
updates the changelogShown variable in the config file
If it's true and the version of the config is the same,
doesn't show the config on launch, otherwise shows
the config and latest updates
*/
function cacheChangelog(versionJson) {
  let updateChangelog = false;
  if (versionJson == null) {
    console.error("versionJson is null");
  } else {
    /* check if changelog is undefined */
    if (slothtime_config.changelog === undefined) updateChangelog = true;
    else {
      /* check if version is undefined */
      if (slothtime_config.changelog.version === undefined)
        updateChangelog = true;
      else {
        /* check if version is the same */
        if (
          versionJson.version != slothtime_config.changelog.version ||
          !slothtime_config.changelog.shown
        )
          updateChangelog = true;
      }
    }
    if (updateChangelog) {

      displayChangelogModal();      
    
      /* update the config object and cache */
      slothtime_config.changelog = {
        version: versionJson.version,
        shown: true,
      };
      cacheConfig();
    }
  }
}

/* Fetches the changelog json file from the server and loads it */
function fetchChangelog(){
  /* fetch the changelog */
  const url = "data/changelog/changelog_v2.json";

  fetch(url)
    .then((response) => response.json())
    .then((json) => loadChangelog(json));
}

/* displays the changelog modal */
function displayChangelogModal(){
  /* first we fetch it in case this is the first time */
  fetchChangelog();
  /* Instantiate Changelog modal */
  var changelogModal = new bootstrap.Modal(
    document.getElementById("changelog-modal")
  );
  changelogModal.show();
}

/* adds the changelog to the modal */
function loadChangelog(data) {
  data.forEach((versionNote) => {
    /* first build up the HTML for each section */

    /* New Features */
    let featureList = versionNote.commitMessage.Features;
    let featuresHTML = "";
    if (featureList != null) {
      featuresHTML = "<h2 class='fs-5'>Features:</h2><p>";
      featureList.split("|").forEach((feature) => {
        featuresHTML = featuresHTML + "&ndash;" + feature + "<br>";
      });
      featuresHTML = featuresHTML + "</p>";
    }

    /* misc changes */
    let otherList = versionNote.commitMessage.Other;
    let otherHTML = "";
    if (otherList != null) {
      otherHTML = "<h2 class='fs-5'>Other:</h2><p>";
      otherList.split("|").forEach((other) => {
        otherHTML = otherHTML + "&ndash;" + other + "<br>";
      });
      otherHTML = otherHTML + "</p>";
    }

    /* bug fixes */
    let bugList = versionNote.commitMessage.Bugs;
    let bugHTML = "";
    if (bugList != null) {
      bugHTML = "<h2 class='fs-5'>Bug Fixes:</h2><p>";
      bugList.split("|").forEach((bug) => {
        bugHTML = bugHTML + "&ndash;" + bug + "<br>";
      });
      bugHTML = bugHTML + "</p>";
    }
    /* append the HTML, titles, version notes, etc */
    $("#changelog-body").append(
      "<div class='row'>" +
        "<div class='col'>" +
          "<h1>" +
            versionNote.update +
          "</h1>" +
        "</div>" +
        "<div class='col d-flex justify-content-end align-items-end'>" +
          "<h2 class='fs-5'>" +
              versionNote.date +
          "</h2>" +
        "</div>" +
      "</div>" +
      "<div id=" +
        versionNote.update +
      ">" +
        featuresHTML +        
        otherHTML +
        bugHTML +
      "</div>"
    );
  });
  /* set loaded to true so we only fetch once */
  $("#changelog-body").attr("data-st-loaded", "true");
}

/*
updates the config file in cache
*/
function cacheConfig() {
  localStorage.setItem("slothtime_config", JSON.stringify(slothtime_config));
}