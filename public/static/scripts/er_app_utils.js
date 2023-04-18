/*** Utilities for ER Applications ****/

/* Grab the currently loaded page source */
var fileLocation = $('script[src*="er_app_utils"]').attr("src");
fileLocation = fileLocation.replace("er_app_utils.js", "");

/* store the user's favorite themes */
var favoriteThemes = [];

/* just nice to have */
const pageName = $("title")[0].text.slice(12);

updateAddFaveBtn();

/*----------------------------
Toast Message Utilities
----------------------------*/

/* Initialize Bootstrap's Toast Utility */
var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
   return new bootstrap.Toast(toastEl);
});

/*----------------------------
Theme Utilities
Handles loading, storing,
caching, and switching themes
IMPORTANT -  include
er_app_starttheme.js in header
and this file in footer
----------------------------*/

/* gets the list of themes from _list.json */
async function getThemeList() {
   const cacheKey = 'slothtimeCache_v1';

   let myThemeListString =
      "static/styles/themes/_list.json";

   /* only fetch if it hasn't been loaded yet */
   if (typeof $("#theme-list").attr("data-st-loaded") == "undefined")
      fetch(myThemeListString)
         .then((response) => response.json())
         .then((json) => loadThemeList(json));
}

/* loads the list of themes from _list.json in a html list */
function loadThemeList(themes) {
   themes.sort((a,b) => a.name.localeCompare(b.name));
   themes.forEach((theme) => {
      const liElement =
         "<li" +
         " id=" +
         theme.name +
         ' aria-hidden="true"' +
         ' aria-label="' +
         theme.name +
         ' Selection"' +
         ' class="trigger-change-theme list-group-item list-group-item-action"' +
         ' data-theme="' +
         theme.name +
         '.css"' +
         ">" +
         theme.name.replaceAll('_', ' ') +
         "</li>";
      $("#theme-list").append(liElement);
   });

   /* add loaded attributed so we don't re-load */
   $("#theme-list").attr("data-st-loaded", "true");

   /* get an array of elements from the theme list */
   const themeElements = $(".trigger-change-theme");

   /* add hover and click event listeners to each item */
   themeElements.each(function () {
      let themeID = "#" + this.id.toString();
      /* when theme li is hovered, displays the theme but      */
      /* does not change the current theme, then switches back */
      $(themeID).hover(
         function (e) {
            if (switchingTheme) return;
            previewTheme(
               $("#" + e.target.id.toString()).attr("data-theme"),
               "show"
            );
         },
         function (e) {
            if (switchingTheme) return;
            previewTheme(
               $("#" + e.target.id.toString()).attr("data-theme"),
               "hide"
            );
         }
      );
      /* when theme li is clicked, changes current theme */
      $(themeID).click(function (e) {
         if (switchingTheme) return;
         switchingTheme = true;
         /* changeTheme defined in erp_app_starttheme.js */
         changeTheme(e.target.attributes[4].value);
         updateAddFaveBtn()
         themeModal.toggle();
      });
   });
}

/* load the themes stylesheet */
/* only for previews */
function previewTheme(theme, mode) {
   if (mode == "show") {
      $("#previewTheme")[0].href = "static/styles/themes/" + theme;
   } else {
      $("#previewTheme")[0].href = "";
   }
}

/* filters through the list of themes */
function filterThemes() {
   /* search box */
   var input = $("#theme-search-box")[0];
   /* input value to uppercase */
   var filter = input.value.toUpperCase();
   const themeElements = $(".trigger-change-theme");
   themeElements.each(element => {
      if(themeElements[element].innerText.toUpperCase().indexOf(filter) > -1)
         $(themeElements[element]).show();
      else
         $(themeElements[element]).hide();      
   });

}

/* update the favorite button in theme modal */
function updateAddFaveBtn() {
   /* remove the .css from the theme name       */
   $('#favorite-theme-label')[0].innerHTML = currentTheme.slice(0, currentTheme.length - 4).replaceAll('_', ' ');
}

/* TODO Switch to a config file for favorites, table data, etc. */
/* FEATURE Make favorites list accessible                       */ 
function addThemeToFavorites() {   
   if(!favoriteThemes.includes(currentTheme)){
      favoriteThemes.push(currentTheme);
      localStorage.setItem("favorite_themes", favoriteThemes);
      $("#favorited_toast").toast("show");
   } else 
      alert("Theme already in favorites");
}