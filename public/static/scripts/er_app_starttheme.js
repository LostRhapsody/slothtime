/*** Start Theme for ER Applications ****/

/* 
the idea is to use this to set the stylesheet BEFORE
any other page loading happens 
Requires Jquery and config to be loaded above it
*/

/* Grab the currently loaded page source */
var fileLocation = $('script[src*="er_app_starttheme"]').attr("src");
fileLocation = fileLocation.replace("er_app_starttheme.js", "");

var themeObj = slothtime_config.current_theme;
var currentTheme = themeObj.name;
var currentMain = themeObj.main_color;
var currentBg = themeObj.bg_color;
var currentSub = themeObj.sub_color;
var currentText = themeObj.text_color;

/* if no theme is cached, default to serika_dark */
if (currentTheme == null) currentTheme = "serika_dark.css";

/* stores the currently loaded theme's file location */
var currentThemeStylesheet = "static/styles/themes/" + currentTheme;

/* directly set the link tag's href */
/* else, set the theme */ 
if (currentThemeStylesheet != null)
   changeTheme(currentTheme);

/* load the themes stylesheet */
/* removes the loaded stylesheet if it's already loaded */
function changeTheme(theme) {

   /* update the currentTheme sylesheet tag */
   $("#currentTheme")[0].href = currentThemeStylesheet;   

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
      cacheCurrentTheme(themeObj);
   } /* else, the theme is default or just loaded in from cache */
}
