/*** Start Theme for ER Applications ****/

/* 
the idea is to use this to set the stylesheet BEFORE
any other page loading happens 
Requires Jquery to be loaded above it
*/

/* Grab the currently loaded page source */
var fileLocation = $('script[src*="er_app_starttheme"]').attr("src");
fileLocation = fileLocation.replace("er_app_starttheme.js", "");

/* stores the currently loaded theme's file location */
var currentThemeStylesheet = localStorage.getItem("current_theme_stylesheet");

/* stores the current theme applied */
var currentTheme =
   localStorage.getItem("current_theme"); /* stores the current theme applied */

/* if no theme is cached, default to slothtime */
if (currentTheme == null) currentTheme = "serika_dark.css";

/* HACK Remove slothtime.css from cache if loaded */
/* can be removed in a week or two                */
if (currentThemeStylesheet == "../styles/themes/slothtime.css") 
   currentThemeStylesheet = "https://slothtime.dev/static/styles/themes/serika_dark.css";
if (currentTheme == "slothtime.css") 
   currentTheme = "serika_dark.css";


/* directly set the link tag's href */
if (currentThemeStylesheet != null)
   $("#currentTheme")[0].href = fileLocation + currentThemeStylesheet;
/* set the theme */ else changeTheme(currentTheme);

/* load the themes stylesheet */
/* removes the loaded stylesheet if it's already loaded */
function changeTheme(theme) {
   $("#currentTheme")[0].href = "https://slothtime.dev/static/styles/themes/" + theme;
   currentTheme = theme;
   localStorage.setItem("current_theme", currentTheme);
   localStorage.setItem(
      "current_theme_stylesheet",
      "../styles/themes/" + theme
   );   
}
