/*** Utilities for ER Applications ****/

/* Grab the currently loaded page source */
var filePath = $('script[src*="utilities"]').attr("src");
var fileName = filePath.split("/").pop();
var fileLocation = filePath.replace("utilities.js", "");
var pageName = $(document)[0].title;
var isHomePage = false;
if (pageName == "slothtime | A minimalist, customizable time tracker") isHomePage = true;

/* store the user's favorite themes */
var favoriteThemes = slothtime_config.favorite_themes;

/* keeps track of it the theme list is filtered by favorites or not */
var isFiltered = false;

/* just nice to have */
/* const pageName = $("title")[0].text.slice(12); */

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
----------------------------*/

/* tracks if the theme is currently being changed */
var switchingTheme = false; 

/* stores the stylesheet pathing */
var themeStylesheetPath = "static/styles/themes/";

/* grab all the theme data from the config file */
var themeObj = slothtime_config.current_theme;
var currentTheme = themeObj.name;
var themeName = currentTheme.replaceAll("_", " ").replace(".css", "");
var currentMain = themeObj.main_color;
var currentBg = themeObj.bg_color;
var currentSub = themeObj.sub_color;
var currentText = themeObj.text_color;

/* TODO: verify all data from the config file is valid */
/* only necessary if we decide to use additional data */

/* if no theme is cached, default to serika_dark */
if (currentTheme == null) currentTheme = "serika_dark.css";

/* set the theme */ 
changeTheme(currentTheme);

/* update the favorite button on theme modal to show current theme name */
/* don't fire on about page */
if (isHomePage)
   updateAddFaveBtn(currentTheme);

/* Events */
/* attaches to the 'X' button on the favorites list */
$("#theme-list").on("click",".remove-from-favorites",function(e) {
   removeThemeFromFavorites(e.target.dataset.theme);
});

/* load the themes stylesheet */
/* removes the loaded stylesheet if it's already loaded */
function changeTheme(theme) {

   /* update the currentTheme sylesheet tag */
   $("#currentTheme")[0].href = themeStylesheetPath + theme;   
   /* this ensures the theme-color meta tag is the same as */ 
   /* the current theme's main color */
   $("#metaThemeColor")[0].content = currentMain;

   /* get just the ID of list item the theme is in */
   let themeID = theme.replace(".css", "");
   let themeElement = document.getElementById(themeID);

   /* if element exists (meaning the theme list has been loaded) */
   if (themeElement != null) {
      /* update the theme-color meta tag */
      $("#metaThemeColor")[0].content = themeElement.dataset.maincolor;
      themeObj.name       = theme;
      themeObj.main_color = themeElement.dataset.maincolor;
      themeObj.bg_color   = themeElement.dataset.bgcolor;
      themeObj.sub_color  = themeElement.dataset.subcolor;
      themeObj.text_color = themeElement.dataset.textcolor;
      themeName = theme.replaceAll("_", " ").replace(".css", "");
      currentTheme = theme;
      cacheCurrentTheme(themeObj);
      updateAddFaveBtn(themeName);
   } /* else, the theme is default or just loaded in from cache */
   switchingTheme = false;
}

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
         " aria-hidden='true'" +
         " aria-label='" +
         theme.name +
         " Selection'" +
         " class='trigger-change-theme list-group-item " + 
         " list-group-item-action'" +
         " data-theme='" +
         theme.name +
         ".css'" +
         " data-mainColor='" +
         theme.mainColor + "'" +
         " data-subColor='" +
         theme.subColor + "'" +
         " data-bgColor='" +
         theme.bgColor + "'" +
         " data-textColor='" +
         theme.textColor + "'" +
         ">" +
         "<div class='row'>" +
            "<div class='col-8'>" + 
               theme.name.replaceAll('_', ' ') + 
            "</div>" +
            "<div class='col-4 d-flex align-items-center justify-content-around rounded' style='background-color:" + theme.bgColor + "'>" + 
               "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'" +
               "fill='" + theme.mainColor + 
               "' class='bi bi-circle-fill' viewBox='0 0 16 16'>" + 
               "<circle cx='8' cy='8' r='8'/>" +
               "</svg>" +
               "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'" +
               "fill='" + theme.subColor + 
               "' class='bi bi-circle-fill' viewBox='0 0 16 16'>" + 
               "<circle cx='8' cy='8' r='8'/>" +
               "</svg>" +               
               "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'" +
               "fill='" + theme.textColor + 
               "' class='bi bi-circle-fill' viewBox='0 0 16 16'>" + 
               "<circle cx='8' cy='8' r='8'/>" +
               "</svg>" +
            "</div>" +
         "</div>" +
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
               document.getElementById(e.currentTarget.id).dataset.theme,
               "show"
            );
         },
         function (e) {
            if (switchingTheme) return;
            previewTheme(
               document.getElementById(e.currentTarget.id).dataset.theme,
               "hide"
            );
         }
      );
      /* when theme li is clicked, changes current theme */
      $(themeID).click(function (e) {
         if(e.target.classList.contains("remove-from-favorites")) return;
         if (switchingTheme) return;
         switchingTheme = true;
         changeTheme(e.currentTarget.dataset.theme);
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

/* searches through the list of themes */
function searchThemes() {
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

/* filters the list of themes by favorites */
function filterFavorites() {
   const favoriteList = slothtime_config.favorite_themes;
   const themeElements = $(".trigger-change-theme");
   if (isFiltered) {
      $('.trigger-change-theme .btn').remove();
      /* display whole list */
      themeElements.each(element => {
         $(themeElements[element]).show();
      });   
      /* toggle text */
      $("#btn-filter-favorites")[0].innerHTML = "&#9733; Filter by favorite themes";
   } else {
      /* remove all bookmark buttons, if we're running from
      remove favorites they will still be there */
      $('.trigger-change-theme .btn').remove();
      /* display only favorites */
      themeElements.each(element => {
         if(favoriteList.includes(themeElements[element].dataset.theme)) {
            $(themeElements[element]).show();
            $(themeElements[element]).append(
               "<button type='button' data-theme='" + themeElements[element].dataset.theme +
                  "' class='btn remove-from-favorites' " +
                  "aria-hidden='true' aria-label='Remove from favorites'>X" +
               "</button>"
            );
         }
         else{
            $(themeElements[element]).hide();      
         }
      });
      /* toggle text */
      $("#btn-filter-favorites")[0].innerHTML = "Display all themes";
   }
   isFiltered = !isFiltered;   
}

/* update the favorite button in theme modal */
function updateAddFaveBtn(theme) {
   /* remove the .css from the theme name       */
   $('#favorite-theme-label')[0].innerHTML = themeName;
}

function addThemeToFavorites() {   
   if(!favoriteThemes.includes(currentTheme)){
      favoriteThemes.push(currentTheme);
      cacheFavoriteThemes(favoriteThemes);
      $("#favorited_toast").toast("show");
   } else 
      alert("Theme already in favorites");
}

function removeThemeFromFavorites(theme) {
   if(favoriteThemes.includes(theme)){
      favoriteThemes.forEach(function(element, index) {
         if(element == theme)
            favoriteThemes.splice(index, 1);
      });
      cacheFavoriteThemes(favoriteThemes);
      $("#unfavorited_toast").toast("show");
   }
   /* toggle this so it re-runs the 'display favorites' branch */
   isFiltered = !isFiltered;   
   /* re-load the list of favorites */
   filterFavorites();
}