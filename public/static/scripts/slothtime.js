/***** Globals *****/
/* TODO - remove all these globals. Yikes */
var rowBuffer = []; /* store an array of deleted rows as a history buffer */
var rowCounter; /* stores the number of rows   */
rowCounter = 0;
var hoursToggle = true; /* toggle between start/end time and total hours */
var trackingArray =
   []; /* stores the tracking objects that contain the input field details */
var hideClock = false; /* toggles the clock visibility */
var isFabMenuOpen; /* tracks if the FAB button menu is open */
var isFabsHovered; /* tracks if the fabs div is being hovered */
var switchingTheme; /* tracks if the theme is currently being changed */
var exportType = "comma"; /* the format the table will be exported in */
let errorMessage; /* stores error messages. Empty after each error is logged */
let errorTarget; /* stores targets from errors. Empty after each error is logged */
let errorAction; /* stores actions from errors. Empty after each error is logged */
let showChangelogModal = false; /* toggles whether to show the modal or not */

/* Check and retrieve any stored data in the cache */
var cacheTracking = JSON.parse(localStorage.getItem("Time_Tracking"));

if (cacheTracking != null) trackingArray = cacheTracking;
updateTimeTrackingTableDisplay();

var currentTheme =
   localStorage.getItem("current_theme"); /* stores the current theme applied */
if (currentTheme == null) currentTheme = "slothtime.css";
changeTheme(currentTheme);
/**** Initializing Components *****/

/* initialize Bootstrap modals */
/* large Jira entry modal */
var largeEntryModal = new bootstrap.Modal(
   document.getElementById("expanded-jira-entry-modal")
);
/* Theme list modal */
var themeModal = new bootstrap.Modal(document.getElementById("theme-modal"));
/* Settings menu modal */
var settingsModal = new bootstrap.Modal(
   document.getElementById("settings-modal")
);
/* Information modal */
var informationModal = new bootstrap.Modal(
   document.getElementById("information-modal")
);
/* Delete table modal */
var deleteTableModal = new bootstrap.Modal(
   document.getElementById("delete-table-modal")
);
/* Changelog modal */
var changelogModal = new bootstrap.Modal(
   document.getElementById("changelog-modal")
);

/* Initialize Bootstrap's Toast Utility */
var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
   return new bootstrap.Toast(toastEl);
});
/* hide mini-fab buttons */
$(".mini-fab").hide();
/* hide total task time column */
$(".task_time").hide();
/* Trigger the first row */
newRow();
/* get theme list */
getThemeList();
/****** Keyboard Shortcuts *******/

/* 
Shortcuts legend:
   Shift Alt N:
      New row
   Shift Alt R:
      Remove last row
   Shit Ctrl Space:
      Expand textarea into modal
*/

/* Shift + Ctrl + Space              */
/* Opens modal for larger jira entry */
document.onkeyup = function (event) {
   let key = event;
   let textArea = event.target;

   /* open large jira entry modal shortcut */
   if (key.ctrlKey && key.shiftKey && key.key == " ") {
      /* if the target is a text area inside a td tag          */
      /* prevents non-table row textareas from triggering this */
      if (
         textArea.name == "jira_entry"
      ) {
         /* update the tracking array so we have the newest content */
         updateTrackingArray(event);
         setupModal(event);
         /* show the modal */
         largeEntryModal.toggle();
      }
      /* copy to clipboard listener for space bar when focused on button */
   } else if (key.key == " ") {
      /* else if space is pressed */
      /* listener for copy the clipboard */
      if (event.target.classList.contains("btn-copy-to-clipboard")) {
         copyToClipboard(event, "space");
      }
      /* new row shortcut */
   } else if (key.ctrlKey && key.shiftKey && key.key == ">") {
      newRow();
   }
};

/****** Event Listeners ******/
/* when any field is changed on the table */
/* update the trackingArray's object      */
/* and populate the modal's fields        */
$("#time-tracking-table").on("change", "tr .form-control", function (e) {
   updateTrackingArray(e);
   setupModal(e);
});

/* whenever the table is clicked, check the event   */
/* if the target is the copy to clipboard btn, copy */
/* that row's jira entry to the clipboard           */
$("#time-tracking-table").click(function (e) {
   if (
      e.target.parentElement.classList.contains("btn-copy-to-clipboard") ||
      e.target.classList.contains("btn-copy-to-clipboard")
   ) {
      copyToClipboard(e, "click");
   }
});

/* when a modal is opened, update      */
/* the respective row's tracking array */
$("#expanded-jira-entry-modal .modal-body #modal-jira-entry").on(
   "change",
   function (e) {
      updateTrackingFromModal(e);
   }
);

/* when jira entry  modal is opened, focus */
/* on the textarea                         */
/* this uses 'shown' which means the end   */
/* of the modal fade-in animation          */
document
   .getElementById("expanded-jira-entry-modal")
   .addEventListener("shown.bs.modal", () => {
      $("#modal-jira-entry").focus();
   });

/* when jira entry modal is closed, focus */
/* on the origin row's textarea           */
document
   .getElementById("expanded-jira-entry-modal")
   .addEventListener("hidden.bs.modal", (e) => {
      const rowNumber = $(e.target).parents("[row]");
      const tableRow = $(e.target).parents("[row]");
      if (typeof tableRow == "undefined") {
         logDeveloperError("badRowFind", e);
         return;
      }
      const taskField = tableRow.find('input[name="task_number"]');
      const workCode = tableRow.find('select[name="work_code"]');
      const inputField = tableRow.find('textarea[name="jira_entry"]');
      const startTime = tableRow.find('input[name="start_time"]');
      const endTime = tableRow.find('input[name="end_time"]');
      const taskTime = tableRow.find('input[name="task_time"]');
      //get the row number

      // let updateRow = findRowElement(rowNumber);

      inputField.focus();
   });

/* when theme modal is closed, set */
/* switching theme to false        */
document
   .getElementById("theme-modal")
   .addEventListener("hidden.bs.modal", (e) => {
      switchingTheme = false;
   });

/* when information modal is closed */
document
   .getElementById("information-modal")
   .addEventListener("hidden.bs.modal", (e) => {
      if (showChangelogModal) changelogModal.toggle();
      showChangelogModal = false;
   });

/* when an end_time cell is */
/* changed, start a new row */
$("#time-tracking-table").on(
   "change",
   ".end_time, .task_time",
   function (event) {
      /* only call new row if you are editing the last row */
      if (
         event.target.parentElement.parentElement.attributes[0] ==
         $("tr").last()[0].attributes[0]
      )
         newRow();
   }
);

/* changes the theme. Currently */
/* just toggles to AtomOne Dark */
/* exits if switching theme     */
$(".trigger-change-theme").hover(
   function (e) {
      if (switchingTheme) return;
      previewTheme($("#" + e.target.id.toString()).attr("data-theme"), "show");
   },
   function (e) {
      if (switchingTheme) return;
      previewTheme($("#" + e.target.id.toString()).attr("data-theme"), "hide");
   }
);

/* When textarea is focused  */
/* expand it for readability */
$("#time-tracking-table").on("focus", "textarea", function () {
   $(this).attr("rows", 5);
});

/* When textarea is unfocused  */
/* shrink it back to 1 row     */
$("#time-tracking-table").on("focusout", "textarea", function () {
   $(this).attr("rows", 1);
});

/*------------------------------------------------
   universal confirm event listener. When a confirm 
   button is clicked triggers this listener, which 
   triggers a function based on the event's data
   ------------------------------------------------*/
$("body").on("click", "[data-st-action]", function (event) {
   /* get the action to be performed from the action attr */
   let action = $(this).attr("data-st-action").toString();
   /* check if function exists */
   if (typeof action === "function")
      /* call the function */
      try {
         window[action]();
      } catch (e) {
         logDeveloperError("badFunction", e);
      }
   /* sometimes above fails, last ditch attempt */ else if (
      typeof action !== "undefined"
   )
      try {
         window[action]();
      } catch (e) {
         logDeveloperError("badFunction", e);
      }
   else logDeveloperError("badFunction", event);
});

/* FAB Buttons */

/* ---------------------------------------------------------
   Fab event explainer:
   When fab menu is opened with hover, clicking is disabled.
   This makes clicking on desktop essentially impossible, which
   is fine, we can't really notice the difference.
   We have to keep the click listener though for mobile.
   ---------------------------------------------------------*/

/* show fab menu when hovered */
$(".fabs").hover(
   function () {
      isFabsHovered = true;
      showFabMenu();
   },
   function () {
      isFabsHovered = false;
      showFabMenu();
   }
);

/* show fab menu when clicked */
$(".fab").click(function () {
   if (isFabsHovered) return;
   showFabMenu();
});

/***** Functions *****/

/* Updates the trackingArray */
function updateTrackingArray(e) {
   const tableRow = $(e.target).parents("[row]");
   if (typeof tableRow == "undefined") {
      logDeveloperError("badRowFind", e);
      return;
   }
   const taskField = tableRow.find('input[name="task_number"]');
   const workCode = tableRow.find('select[name="work_code"]');
   const inputField = tableRow.find('textarea[name="jira_entry"]');
   const startTime = tableRow.find('input[name="start_time"]');
   const endTime = tableRow.find('input[name="end_time"]');
   const taskTime = tableRow.find('input[name="task_time"]');
   //get the row number
   const rowNumber = tableRow.attr("row");

   //setup date and time vars
   let startDate = new Date();
   let endDate = new Date();

   /* if values not set yet, just use placedholders */
   if (typeof taskField == 'undefined') taskField[0].value = 'Task #';
   if (typeof inputField == 'undefined') inputField[0].value = 'Jira Entry';
   if (typeof startTime == 'undefined') startTime[0].value = 'Start Time';
   if (typeof endTime == 'undefined') endTime[0].value = 'End Time';

   //populate the object from the table row input fields
   let trackingObject = {
      row: rowNumber,
      taskNumber: taskField[0].value,
      workCode: workCode[0].value,
      jiraEntry: inputField[0].value,
      startTime: startTime[0].value,
      endTime: endTime[0].value,
      taskTime: taskTime[0].value,
   };

   if (trackingObject.taskTime == "") {
      /* if start and end times are 09:00 or 0900 formats */
      if (
         (trackingObject.startTime.length == 5 ||
            trackingObject.startTime.length == 4) &&
         (trackingObject.endTime.length == 5 ||
            trackingObject.endTime.length == 4)
      ) {
         startDate.setHours(
            trackingObject.startTime.substring(0, 2),
            trackingObject.startTime.substring(3)
         );
         endDate.setHours(
            trackingObject.endTime.substring(0, 2),
            trackingObject.endTime.substring(3)
         );
         let taskHours = endDate.getHours() - startDate.getHours();
         let taskMinutes = endDate.getMinutes() - startDate.getMinutes();
         if (taskHours < 0) taskHours *= -1;
         if (taskMinutes < 0) taskMinutes *= -1;
         trackingObject.taskTime = taskHours + ":" + taskMinutes;
      }
   }

   //store in tracking array, -1 to offset the row counter
   trackingArray[rowNumber - 1] = trackingObject;

   localStorage.setItem("Time_Tracking", JSON.stringify(trackingArray));
}

/* updates the tracking array and the        */
/* text area from the row it was called from */
function updateTrackingFromModal(e) {
   let textArea = e.target;
   let modalBody = textArea.parentElement;
   let modalRowNum = parseInt(modalBody.children[0].textContent);
   let modalSubLabel = modalBody.children[1];
   let tableRow = findRowElement(modalRowNum);

   trackingArray[modalRowNum - 1].jiraEntry = textArea.value;

   tableRow.children[3].firstElementChild.value =
      trackingArray[modalRowNum - 1].jiraEntry;
}

/* clones the template and appens to table */
function newRow() {
   rowCounter += 1;
   let rowTemplate = $("#templateRow")
      .clone()
      .removeAttr("id")
      .attr("row", rowCounter);

   rowTemplate[0].firstElementChild.textContent = rowCounter;

   rowTemplate.appendTo($("#time-tracking-table-body"));

   $("tr").last()[0].children[1].firstElementChild.focus();
}

/* shows a modal to verify the action */
function actionVerification(action) {}

/* hides the last row */
function removeRow() {
   rowBuffer.push($("tr").last());

   /* if the row has a row arribute     */
   /* prevents from deleting the header */
   if ($("tr").last().attr("row")) {
      $("tr").last().remove();
      rowCounter -= 1;
   }
}

/* undos the last remove */
function undoRemoveRow() {
   if (rowBuffer[rowBuffer.length - 1] == null) {
      alert("Nothing to undo");
      return;
   }
   rowCounter += 1;
   rowBuffer[rowBuffer.length - 1]
      .removeAttr("row")
      .attr("row", rowCounter)
      .appendTo($("#time-tracking-table-body"));
   rowBuffer.pop();
}

/* Export the table to a downloadable file */
function exportTable() {
   let currentDate = new Date();
   let exportData = "";

   /* set the file name, based on date */
   const fileName =
      currentDate.toLocaleString("default", {
         month: "long",
      }) +
      "_" +
      currentDate.getDate() +
      "_" +
      currentDate.getFullYear() +
      "_" +
      "slothtime";

   /* exportType downloads in different formats */
   /* json: Stringifies the tracking array, no additional formatting required */
   /* comma: prints them out in comma delimited rows */
   switch (exportType) {
      case "json":
         exportData = JSON.stringify(trackingArray);
         break;
      case "comma":
         trackingArray.forEach((element) => {
            exportData +=
               element.row +
               "," +
               element.taskNumber +
               "," +
               element.workCode +
               "," +
               element.jiraEntry +
               "," +
               element.startTime +
               "," +
               element.endTime +
               "," +
               element.taskTime +
               "\n";
         });
         break;
   }

   let file = document.createElement("a");
   file.download = fileName + ".txt";
   let textBlob = new Blob([exportData], {
      type: "text/plain",
   });
   file.href = window.URL.createObjectURL(textBlob);
   file.click();
}

/* finds the current element based on row number */
/* returns the element                           */
function findRowElement(rowNumber) {
   /* retrieve a list of all rows */
   let prevObjectArray = $("#time-tracking-table-body tr ")
      .find("tr")
      .attr("row", rowNumber).prevObject;
   let correctRow;
   let looper;

   /* loop through list (skipping non-indexed properties) */
   /* until correct row is found via the row index        */
   for (looper = 0; looper < prevObjectArray.length; looper++) {
      if (prevObjectArray[looper] != "undefined") {
         if (prevObjectArray[looper].rowIndex == rowNumber) {
            correctRow = prevObjectArray[looper];
         }
      }
   }

   return correctRow;
}

/* Toggles the display of the Total Time column and */
/* the start/end time columns                       */
function toggleHoursColumns() {
   hoursToggle ? (hoursToggle = false) : (hoursToggle = true);
   hoursToggle
      ? $(".end_time, .start_time").show()
      : $(".end_time, .start_time").hide();
   hoursToggle ? $(".task_time").hide() : $(".task_time").show();
}

/* Populates the fields in the large jira entry modal */
function setupModal(e) {
   const tableRow = $(e.target).parents("[row]");
   if (typeof tableRow == "undefined") {
      logDeveloperError("badRowFind", e);
      return;
   }
   const taskField = tableRow.find('input[name="task_number"]');
   const workCode = tableRow.find('select[name="work_code"]');
   //get the row number
   const rowNumber = tableRow.attr("row");

   /* set the modal's title */
   $("#expanded-jira-entry-modal .modal-header h1")[0].textContent =
      taskField[0].value;

   /* set the modals subtitle */
   $(
      "#expanded-jira-entry-modal .modal-body #expanded-jira-entry-modal-sub-label"
   )[0].textContent = workCode[0].value;

   /* set the modal's row num and row attribute */
   $(
      "#expanded-jira-entry-modal .modal-body #expanded-jira-entry-modal-row-label"
   )[0].textContent = "Row " + rowNumber;
   $(
      "#expanded-jira-entry-modal .modal-body #expanded-jira-entry-modal-row-label"
   )[0].attributes.row.value = rowNumber;

   /* set the modal's content */
   $("#expanded-jira-entry-modal .modal-body #modal-jira-entry")[0].value =
      trackingArray[rowNumber - 1].jiraEntry;
}

/* Copies the content of the selected row to the clipboard */
/* finds the textArea and badge based on event source      */
function copyToClipboard(event, source) {
   let textArea;

   /* First, go up one element and grab the first child */
   textArea = event.target.parentElement.children[0];

   /* if the event is from the SVG level, need to go up 2 levels */
   if (!textArea.classList.contains("jira-entry-field"))
      textArea = event.target.parentElement.parentElement.children[0];

   /* if textArea still wasn't found, log error and leave */
   if (!textArea.classList.contains("jira-entry-field")) {
      console.error("Can't find text field for copy function!");
      return;
   }

   /* copy text to clipboard, async proc */
   navigator.clipboard.writeText(textArea.value).then(
      () => {
         console.log("Content copied to clipboard");
      },
      () => {
         console.error("Failed to copy");
      }
   );

   /* display the Bootstrap Toast message */
   $("#copied_toast").toast("show");
}

/* gets the list of themes from _list.json */
function getThemeList() {
   let myThemeListString =
      "https://raw.githubusercontent.com/LostRhapsody/slothtime/main/public/static/styles/themes/_list.json";

   fetch(myThemeListString)
      .then((response) => response.json())
      .then((json) => loadThemeList(json));
}

/* loads the list of themes from _list.json */
function loadThemeList(themes) {
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
         theme.name +
         "</li>";
      $("#theme-list").append(liElement);
   });
   const themeElements = $(".trigger-change-theme");
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
         changeTheme(e.target.attributes[4].value);
         themeModal.toggle();
      });
   });
}

/* load the themes stylesheet */
/* removes the loaded stylesheet if it's already loaded */
function changeTheme(theme) {
   $("#currentTheme")[0].href = "static/styles/themes/" + theme;
   currentTheme = theme;
   localStorage.setItem("current_theme", currentTheme);
}

/* load the themes stylesheet */
/* removes the loaded stylesheet if it's already loaded */
/* only for previews */
function previewTheme(theme, mode) {
   if (mode == "show") {
      $("#currentTheme")[0].href = "static/styles/themes/" + theme;
   } else {
      $("#currentTheme")[0].href = "static/styles/themes/" + currentTheme;
   }
}

function showFabMenu() {
   isFabMenuOpen ? (isFabMenuOpen = false) : (isFabMenuOpen = true);
   isFabMenuOpen ? $(".mini-fab").show() : $(".mini-fab").hide();
}

function updateTimeTrackingTableDisplay() {
   trackingArray.forEach((entry) => {
      /* if element is null, (empty row), remove from array */
      if (entry == null) {
         trackingArray.splice(trackingArray.indexOf(entry));
      } else populateNewRow(entry);
   });
}

function populateNewRow(row_data) {
   let new_row;
   newRow();
   new_row = findRowElement(row_data.row);
   $(new_row).find('input[name="task_number"]')[0].value = row_data.taskNumber;
   $(new_row).find('select[name="work_code"]')[0].value = row_data.workCode;
   $(new_row).find('textarea[name="jira_entry"]')[0].value = row_data.jiraEntry;
   $(new_row).find('input[name="start_time"]')[0].value = row_data.startTime;
   $(new_row).find('input[name="end_time"]')[0].value = row_data.endTime;
   $(new_row).find('input[name="task_time"]')[0].value = row_data.taskTime;
}

function clearTrackingTable() {
   /* clear trackingArray */
   trackingArray.length = 0;
   /* update cache with new empty array */
   localStorage.setItem("Time_Tracking", JSON.stringify(trackingArray));
   $("[row]").remove();
   newRow();
}

function logDeveloperError(errorType, event) {
   if (typeof event.target == "undefined") {
      errorTarget = "Unknown";
      errorAction = "Unknown";
   } else {
      errorTarget = event.target.id.toString();
      errorAction = $("#" + event.target.id.toString()).attr("data-st-action");
   }
   switch (errorType) {
      case "badFunction":
         errorMessage =
            "Bad function call. Action does not exist.\n" +
            "Target: " +
            errorTarget +
            "\n" +
            "Action: " +
            errorAction;
         break;
      case "badRowFind":
         errorMessage =
            "Bad row find, could not find edited row.\n" +
            "Target: " +
            errorTarget +
            "\n" +
            "Action: " +
            errorAction;
         break;
   }
   console.error(errorMessage);
   console.error("Event:");
   console.error(event);
}

function sendErrorLogs() {
   /* set the value of the form */
   $("#errorLog").value = errorMessage;
   /* submit the form */
   $("#sendErrorLog").click();
   /* clear the error message and form */
   errorMessage = "";
   $("#errorLog").value = errorMessage;
}

function showChangelog() {
   informationModal.toggle();
   showChangelogModal = true;
   const myChangelogString =
      "https://raw.githubusercontent.com/LostRhapsody/slothtime/main/public/data/changelog/changelog.json";
   /* check if log has already been loaded */
   if (typeof $("#changelog-body").attr("data-st-loaded") == "undefined")
      fetch(myChangelogString)
         .then((response) => response.json())
         .then((json) => updateChangelog(json));
}

function updateChangelog(data) {
   data.forEach((versionNote) => {
      $("#changelog-body").append(
         "<h3>" +
            versionNote.update.substr(0, 2) +
            "." +
            versionNote.update.substr(2, 2) +
            "." +
            versionNote.update.substr(4, 2) +
            "</h3>" +
            "<ul id=" +
            versionNote.update +
            ">"
      );
      versionNote.commitMessage.forEach((bullet) => {
         $("#" + versionNote.update).append("<li>" + bullet.message + "</li>");
      });
   });
   /* set loaded to true so we only fetch once */
   $("#changelog-body").attr("data-st-loaded", "true");
}
