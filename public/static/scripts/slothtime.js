/***** Globals *****/
/* TODO move any code that handles caching to a new file */
/* TODO check cache for a difference between stored changelog 
version and most recent version on the server, and open changelog window if server is newer */

/* 
TODO Switch to using proper date times or at least integers for start/end/total time 
*/

/* Grab the currently loaded page source */
var fileLocation = $('script[src*="slothtime"]').attr("src");
fileLocation = fileLocation.replace("slothtime.js", "");
/* HACK - remove all these globals. Yikes */
var rowBuffer = []; /* store an array of deleted rows as a history buffer */
var cardBuffer = []; /* store an array of deleted cards as a history buffer */
var rowCounter; /* stores the number of rows   */
rowCounter = 0;
var hoursToggle = !slothtime_config.use_total_time; /* toggle between start/end time and total hours */
var tracking_array = slothtime_config.tracking_array; /* stores the tracking objects that contain the input field details */
var isFabMenuOpen = false; /* tracks if the FAB button menu is open */
var isFabsHovered; /* tracks if the fabs div is being hovered */
var exportType = "comma"; /* the format the table will be exported in */
let errorMessage; /* stores error messages. Empty after each error is logged */
let errorTarget; /* stores targets from errors. Empty after each error is logged */
let errorAction; /* stores actions from errors. Empty after each error is logged */
let showChangelogModal = false; /* toggles whether to show the modal or not */
let use24hrFormat = false; /* toggles whether to use 24hr format or not */ /* TODO add this to the config file */
let autoCalcTaskTime = true; /* toggles whether to auto calculate the task time or not */ /* TODO add this to the config file */

pageInit();

/* handles instantiating the page, event lsiteners, etc */
function pageInit() {

   /* only load on the home page */
   if(!isHomePage) return;
   /* if  tracking is cached but [] empty, new row       */
   if (tracking_array.length != 0) {
      updateTimeTrackingTableDisplay();
   } else {
      /* Trigger the first row */
      newRow(true);
   }

   toggleHoursColumns(true);

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
   /* Mobile Entry modal */
   var mobileModal = new bootstrap.Modal(
      document.getElementById("mobile-entry-modal")
   );   

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
         if (textArea.name == "jira_entry") {
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
         newRow(true);
      }
   };

   /****** Event Listeners ******/
   /* when any field is focues on the table  */
   /* populate the modal's fields and add    */
   /* highlight                              */
   $("#time-tracking-table").on("focus", "tr .form-control", function (e) {
      setupModal(e);
      highlghtRow(e,true);
   });

   /* whenever you lose focus on a field in  */
   /* the table, remove highlight            */
   $("#time-tracking-table").on("focusout", "tr .form-control", function (e) {
      setupModal(e);
      highlghtRow(e,false);
   });

   /* when any field is changed on the table */
   /* update the trackingArray's object      */
   /* and populate the modal's fields        */
   $("#time-tracking-table").on("change", "tr .form-control", function (e) {
      formatTime(e);
      updateTrackingArray(e);
      setupModal(e);
   });

   /* whenever the table is clicked, check the event   */
   /* if the target is the copy to clipboard btn, copy */
   /* that row's jira entry to the clipboard and       */
   /* highlight row                                    */
   $("#time-tracking-table").click(function (e) {
      if (
         e.target.parentElement.classList.contains("btn-copy-to-clipboard") ||
         e.target.classList.contains("btn-copy-to-clipboard")
      ) {
         copyToClipboard(e, "click");
         highlghtRow(e,true);
      }
   });

   /* when large jira entry is updated, */
   /* update the tracking array         */
   $("#expanded-jira-entry-modal .modal-body #modal-jira-entry").on(
      "change",
      function (e) {
         updateTrackingFromModal(e);
      }
   );

   /* when mobile modal is updated, */
   /* update the tracking array     */
   $("#mobile-entry-modal .form-control").on("change", function (e) {
      updateTrackingArrayMobile(e);
   });

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
         const rowNumber = $(e.target).find("[row]").attr("row");
         if (typeof rowNumber == "undefined") {
            logDeveloperError("badRowFind", e);
            return;
         }

         const updateRow = findRowElement(rowNumber);

         $(updateRow).find('textarea[name="jira_entry"]').focus();
      });

   /* when mobile modal is triggered, setup the     */
   /* fields with any existing date in the tracking */
   /* array                                         */
   document
      .getElementById("mobile-entry-modal")
      .addEventListener("show.bs.modal", (e) => {
         setupMobileModal(e);
      });

   /* when theme modal is activated */
   /* get theme list                */
   document
      .getElementById("theme-modal")
      .addEventListener("show.bs.modal", (e) => {
         getThemeList();
      });

   /* when theme modal is shown. */
   /* focus on search box       */
   document
      .getElementById("theme-modal")
      .addEventListener("shown.bs.modal", (e) => {
         $("#theme-search-box")[0].focus();
      });

   /* when an end_time cell is */
   /* changed, start a new row */
   $("#time-tracking-table").on(
      "change",
      ".end_time, .task_time, .task_time",
      function (event) {
         /* only call new row if you are editing the last row */
         if (
            event.target.parentElement.parentElement.attributes[0] ==
            $("tr").last()[0].attributes[0]
         )
            newRow(true);
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
      const action = $(this).attr("data-st-action").toString();
      let paramList;
      let paramArray = [];

      /* get the comma delimited list of params */
      paramList = $(this).attr("data-st-params");

      /* if params attribute doesn't exst, do nothing */
      if (typeof paramList != "undefined")
         if (paramList.length != 0)
            /* if there are any params */
            /* split by each comma and load into array */
            paramList.split(",").forEach((x, y) => (paramArray[y] = x));

      /* check if function exists */
      if (typeof action === "function")
         /* call the function */
         try {
            if (paramArray.length != 0) window[action](paramArray[0]);
            else window[action]();
         } catch (e) {
            logDeveloperError("badFunction", e);
         }
      /* sometimes above fails, last ditch attempt */ else if (
         typeof action !== "undefined"
      )
         try {
            if (paramArray.length != 0) window[action](paramArray[0]);
            else window[action]();
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

   /* commented out until I can figued out how to make it play
   nicely on mobile and desktop screens */
   /* show fab menu when hovered */
   // $(".fabs").hover(
   //    function () {
   //       isFabsHovered = true;
   //       showFabMenu();
   //    },
   //    function () {
   //       isFabsHovered = false;
   //       showFabMenu();
   //    }
   // );

   /* show fab menu when clicked */
   $("#fab_menu_btn").click(function () {
      // if (isFabMenuOpen)
      showFabMenu();
   });
} /* end of pageInit() */

/***** Functions *****/

/* Updates the trackingArray */
function updateTrackingArray(e) {
   const tableRow = $(e.target).parents("[row]");
   if (typeof tableRow == "undefined") {
      logDeveloperError("badRowFind", e);
      return;
   }
   const taskField = tableRow.find('input[name="task_number"]')[0];
   const workCode = tableRow.find('select[name="work_code"]')[0];
   const inputField = tableRow.find('textarea[name="jira_entry"]')[0];
   const startTime = tableRow.find('input[name="start_time"]')[0];
   const endTime = tableRow.find('input[name="end_time"]')[0];
   const taskTime = tableRow.find('input[name="task_time"]')[0];
   //get the row number
   const rowNumber = tableRow.attr("row");

   //setup date and time vars
   let startDate = new Date();
   let endDate = new Date();

   /* if values not set yet, just use placedholders */
   if (typeof taskField == "undefined") taskField.value = "Task Number";
   if (typeof workCode == "undefined") workCode.value = "Work Code";
   if (typeof inputField == "undefined") inputField.value = "Jira Entry";
   if (typeof startTime == "undefined") startTime.value = "Start Time";
   if (typeof endTime == "undefined") endTime.value = "End Time";
   if (typeof taskTime == "undefined") taskTime.value = "Task Time";

   //populate the object from the table row input fields
   let trackingObject = {
      row: rowNumber,
      taskNumber: taskField.value,
      workCode: workCode.value,
      jiraEntry: inputField.value,
      startTime: startTime.value,
      endTime: endTime.value,
      taskTime: taskTime.value,
   };

   if(autoCalcTaskTime) {
      startDate.setHours(
         trackingObject.startTime.substring(0, 2),
         trackingObject.startTime.substring(3,5)
      );
      endDate.setHours(
         trackingObject.endTime.substring(0, 2),
         trackingObject.endTime.substring(3,5)
      );
      let taskHours = endDate.getHours() - startDate.getHours();
      let taskMinutes = endDate.getMinutes() - startDate.getMinutes();
      if (taskHours < 0) taskHours *= -1;
      if (taskMinutes < 0) taskMinutes *= -1;
      trackingObject.taskTime = taskHours + ":" + taskMinutes;
   }
   //store in tracking array, -1 to offset the row counter
   tracking_array[rowNumber - 1] = trackingObject;

   cacheTrackingArray(tracking_array);

   setupMobileCardRow(rowNumber);
}

/* updates the tracking array and the        */
/* text area from the row it was called from */
function updateTrackingFromModal(e) {
   let textArea = e.target;
   let modalBody = textArea.parentElement;
   let modalRowNum = $(
      "#expanded-jira-entry-modal .modal-body #expanded-jira-entry-modal-row-label"
   )[0].attributes.row.value;
   let modalSubLabel = modalBody.children[1];
   let tableRow = findRowElement(modalRowNum);

   tracking_array[modalRowNum - 1].jiraEntry = textArea.value;
   cacheTrackingArray(tracking_array);

   $(tableRow).find('textarea[name="jira_entry"]')[0].value =
      tracking_array[modalRowNum - 1].jiraEntry;
}

/* clones the templates and appends to table */
function newRow(generateNewRecord) {
   rowCounter += 1;

   /* rows for desktop */
   let rowTemplate = $("#templateRow")
      .clone()
      .removeAttr("id")
      .attr("row", rowCounter);

   rowTemplate[0].firstElementChild.textContent = rowCounter;

   rowTemplate.appendTo($("#time-tracking-table-body"));

   $("tr").last()[0].children[1].firstElementChild.focus();

   /* cards for mobile */
   let cardTemplate = $("#templateCard")
      .clone()
      .removeAttr("id")
      .attr("row", rowCounter);

   $(cardTemplate).find(".card-header h3")[0].textContent = rowCounter;

   cardTemplate.appendTo($("#mobile-tracking-body"));

   if (generateNewRecord)
      updateAndCacheTrackingArray(rowCounter);
}

/* shows a modal to verify the action */
function actionVerification(action) {}

/* Removes last row/card, adds to temp client buffer, removes from cache */
function removeRow() {
   /* if the row has a row arribute     */
   /* prevents from deleting the header */
   if ($("tr").last().attr("row")) {
      rowBuffer.push($("tr").last());
      cardBuffer.push($(".card").last());
      $("tr").last().remove();
      $(".card").last().remove();
      tracking_array.pop();
      cacheTrackingArray(tracking_array);
      rowCounter -= 1;
   }
}

/* undos remove, re-adds rows/cards from buffer, removes from buffer, adds to cache */
function undoRemoveRow() {
   if (rowBuffer[rowBuffer.length - 1] == null) {
      alert("Nothing to undo");
      return;
   }
   rowCounter += 1;
   rowBuffer[rowBuffer.length - 1]
      .removeAttr("row")
      .attr("row", '"' + rowCounter.toString() + '"')
      .appendTo($("#time-tracking-table-body"));
   rowBuffer.pop();
   cardBuffer[cardBuffer.length - 1]
      .removeAttr("row")
      .attr("row", rowCounter.toString())
      .appendTo($("#mobile-tracking-body"));
   cardBuffer.pop();

   updateAndCacheTrackingArray(rowCounter);
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
         exportData = JSON.stringify(tracking_array);
         break;
      case "comma":
         tracking_array.forEach((element) => {
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

/* finds a time entry card based on row number */
function findCardElement(rowNumber) {
   /* retrieve a list of all rows */
   const card = $("#mobile-tracking-body [row='" + rowNumber + "']")[0];
   return card;
}

/* Toggles the display of the Total Time column and */
/* the start/end time columns                       */
function toggleHoursColumns(isStartup) {
   if (!isStartup)
      hoursToggle = !hoursToggle;

   if (hoursToggle) {
      $(".end_time, .start_time").show();
      $(".mobile-end-time-col, .mobile-start-time-col").show();
      $(".task_time").hide();
      $(".mobile-total-time-col").hide();
   } else {
      $(".end_time, .start_time").hide();
      $(".mobile-end-time-col, .mobile-start-time-col").hide();
      $(".task_time").show();
      $(".mobile-total-time-col").show();
   }

   if(!isStartup)
      cacheUseTotalTime(!hoursToggle);
}

/* Populates the fields in the large jira entry modal */
function setupModal(e) {
   /* table elements in the actual table */
   const tableRow = $(e.target).parents("[row]");
   if (typeof tableRow == "undefined") {
      logDeveloperError("badRowFind", e);
      return;
   }
   const taskField = tableRow.find('input[name="task_number"]');
   const workCode = tableRow.find('select[name="work_code"]');
   const rowNumber = tableRow.attr("row");

   /* elements in the modal */
   const modal = $("#expanded-jira-entry-modal")[0];
   const modalHeader = $(modal).find("#expanded-jira-entry-modal-label")[0];
   const modalSubHeader = $(modal).find(
      "#expanded-jira-entry-modal-sub-label"
   )[0];
   const modalRowNum = $(modal).find("#expanded-jira-entry-modal-row-label")[0];
   const modalTextArea = $(modal).find("#modal-jira-entry")[0];

   /* set the modal's title */
   modalHeader.textContent = taskField[0].value;

   /* set the modals subtitle */
   modalSubHeader.textContent = workCode[0].value;

   /* set the modal's row num and row attribute */
   modalRowNum.textContent = "Row " + rowNumber;
   modalRowNum.attributes.row.value = rowNumber;

   /* set the modal's content */
   try {
      modalTextArea.value = tracking_array[rowNumber - 1].jiraEntry;
   } catch (e) {
      /* would log error, buuuut, it's not really important */
      modalTextArea.value = "";
   }
}

/* TODO prevent editing a row that's been deleted */
/* used to clear the modal when the row that was populating the modal last is deleted */
function clearModal() {}

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
         //console.log("Content copied to clipboard");
         //do nothing, we already get the toast message
      },
      () => {
         console.error("Failed to copy");
      }
   );

   /* display the Bootstrap Toast message */
   $("#copied_toast").toast("show");
}

function showFabMenu() {
   isFabMenuOpen ? (isFabMenuOpen = false) : (isFabMenuOpen = true);
   isFabMenuOpen ? $(".mini-fab").show() : $(".mini-fab").hide();
}

function updateTimeTrackingTableDisplay() {
   tracking_array.forEach((entry) => {
      /* if element is null, (empty row), remove from array */
      populateNewRow(entry);
   });
}

function setupTimeTrackingTableRow(row) {
   const new_row = findRowElement(row);

   $(new_row).find('input[name="task_number"]')[0].value =
      tracking_array[row - 1].taskNumber;
   $(new_row).find('select[name="work_code"]')[0].value =
      tracking_array[row - 1].workCode;
   $(new_row).find('textarea[name="jira_entry"]')[0].value =
      tracking_array[row - 1].jiraEntry;
   $(new_row).find('input[name="start_time"]')[0].value =
      tracking_array[row - 1].startTime;
   $(new_row).find('input[name="end_time"]')[0].value =
      tracking_array[row - 1].endTime;
   $(new_row).find('input[name="task_time"]')[0].value =
      tracking_array[row - 1].taskTime;
}

function populateNewRow(row_data) {
   let new_row;
   /* create the new row first, to increment row number */
   /* important if there is void data */
   newRow(false);

   if (row_data == null) {
      row_data = {
         row: rowCounter,
         taskNumber: "",
         workCode: "Work Code",
         jiraEntry: "",
         startTime: "",
         endTime: "",
         taskTime: "",
      };
   }
   new_row = findRowElement(row_data.row);

   $(new_row).find('input[name="task_number"]')[0].value = row_data.taskNumber;
   $(new_row).find('select[name="work_code"]')[0].value = row_data.workCode;
   $(new_row).find('textarea[name="jira_entry"]')[0].value = row_data.jiraEntry;
   $(new_row).find('input[name="start_time"]')[0].value = row_data.startTime;
   $(new_row).find('input[name="end_time"]')[0].value = row_data.endTime;
   $(new_row).find('input[name="task_time"]')[0].value = row_data.taskTime;

   setupMobileCardRow(row_data.row);
}

function clearTrackingTable() {
   /* clear tracking_array */
   tracking_array.length = 0;
   /* reset row counter */
   rowCounter = 0;
   /* update cache with new empty array */
   cacheTrackingArray(tracking_array);
   $("#time-tracking-table-body [row]").remove();
   $("#mobile-tracking-body [row]").remove();
   newRow(true);
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

/* update the tracking array from the mobile modal when edited */
function updateTrackingArrayMobile(event) {
   const target = event.target;
   let mobileModalConent = $(target).parents(".modal-content");
   const tableRow = $("#time-tracking-table #time-tracking-table-body tr")[0];

   /* depending on event source, target may already be the modal */
   if (target.id == "mobile-entry-modal") mobileModalConent = target;

   const rowLabel = $(mobileModalConent).find("#mobile-entry-row-label")[0];
   let rowNumber = $(rowLabel).attr("row");
   /* If row number is not set on modal, set from table */
   if (rowNumber == "") rowNumber = $(tableRow).attr("row");

   const taskField = $(mobileModalConent).find("#mobile-entry-task-number")[0];
   const workCode = $(mobileModalConent).find("#mobile-entry-work-code")[0];
   const inputField = $(mobileModalConent).find("#mobile-entry-time-entry")[0];
   const startTime = $(mobileModalConent).find("#mobile-entry-start-time")[0];
   const endTime = $(mobileModalConent).find("#mobile-entry-end-time")[0];
   const taskTime = $(mobileModalConent).find("#mobile-entry-total-time")[0];

   const trackingObject = {
      row: rowNumber,
      taskNumber: taskField.value,
      workCode: workCode.value,
      jiraEntry: inputField.value,
      startTime: startTime.value,
      endTime: endTime.value,
      taskTime: taskTime.value,
   };

   //store in tracking array, -1 to offset the row counter
   tracking_array[rowNumber - 1] = trackingObject;

   cacheTrackingArray(tracking_array);

   setupMobileCardRow(rowNumber);
   setupTimeTrackingTableRow(rowNumber);
}

function setupMobileCardRow(row) {
   const card = findCardElement(row);
   const taskNumber = $(card).find(".card-header h2")[0];
   const workCode = $(card).find(".card-footer h2")[0];
   const timeEntry = $(card).find(".card-text")[0];
   const taskTime = $(card).find(".card-footer h3")[0];

   /* since we don't want the card values being blank,
   if array value is blank, set to default value */
   if (tracking_array[row - 1].taskNumber == "")
      taskNumber.textContent = "Task Number";
   else taskNumber.textContent = tracking_array[row - 1].taskNumber;

   if (tracking_array[row - 1].workCode == "")
      workCode.textContent = "Work Code";
   else workCode.textContent = tracking_array[row - 1].workCode;

   if (tracking_array[row - 1].jiraEntry == "")
      timeEntry.textContent = "Time Entry";
   else timeEntry.textContent = tracking_array[row - 1].jiraEntry;

   if (tracking_array[row - 1].taskTime == "")
      taskTime.textContent = "Task Time";
   else taskTime.textContent = tracking_array[row - 1].taskTime;
}

/* populate the mobile task entry modal fields */
function setupMobileModal(event) {
   var mobileModal = new bootstrap.Modal(
      document.getElementById("mobile-entry-modal")
   );   
   const mobileModalElement = mobileModal._element;
   const card = event.relatedTarget.parentElement;
   const rowNumber = $(card).attr("row");
   const rowLabel = $(mobileModalElement).find("#mobile-entry-row-label")[0];
   const taskNumber = $(mobileModalElement).find(
      "#mobile-entry-task-number"
   )[0];
   const workCode = $(mobileModalElement).find("#mobile-entry-work-code")[0];
   const timeEntry = $(mobileModalElement).find("#mobile-entry-time-entry")[0];
   const startTime = $(mobileModalElement).find("#mobile-entry-start-time")[0];
   const endTime = $(mobileModalElement).find("#mobile-entry-end-time")[0];
   const taskTime = $(mobileModalElement).find("#mobile-entry-total-time")[0];

   try {
      rowLabel.textContent = "Row " + rowNumber;
      $(rowLabel).attr("row", rowNumber);
      taskNumber.value = tracking_array[rowNumber - 1].taskNumber;
      workCode.value = tracking_array[rowNumber - 1].workCode;
      timeEntry.value = tracking_array[rowNumber - 1].jiraEntry;
      startTime.value = tracking_array[rowNumber - 1].startTime;
      endTime.value = tracking_array[rowNumber - 1].endTime;
      taskTime.value = tracking_array[rowNumber - 1].taskTime;
   } catch (e) {
      console.log(e);
      rowLabel.textContent = "Row";
      $(rowLabel).attr("row", "");
      taskNumber.value = "";
      workCode.value = "Work Code";
      timeEntry.value = "";
      startTime.value = "";
      endTime.value = "";
      taskTime.value = "";
   }
}

/* 
Updates the tracking array and then caches it
row - the row from the time entry table to update 
*/
function updateAndCacheTrackingArray(row) {
   /* get row */
   const new_row = findRowElement(row);

   /* set values */
   const taskNumber = $(new_row).find('input[name="task_number"]')[0].value;
   const workCode = $(new_row).find('select[name="work_code"]')[0].value;
   const jiraEntry = $(new_row).find('textarea[name="jira_entry"]')[0].value;
   const startTime = $(new_row).find('input[name="start_time"]')[0].value;
   const endTime = $(new_row).find('input[name="end_time"]')[0].value;
   const taskTime = $(new_row).find('input[name="task_time"]')[0].value;

   /* create new tracking object */
   let trackingObject = {
      row: row,
      taskNumber: taskNumber,
      workCode: workCode,
      jiraEntry: jiraEntry,
      startTime: startTime,
      endTime: endTime,
      taskTime: taskTime,
   };

   //store in tracking array, -1 to offset the row counter
   tracking_array[row - 1] = trackingObject;

   /* cache said array */
   cacheTrackingArray(tracking_array);
}

/* cacheTrackingArray moved to config.js */

function backdropShow() {
   // Show the backdrop
   $('<div class="modal-backdrop"></div>').appendTo(document.body);
}

function backdropHide() {
   // Remove it
   $(".modal-backdrop").remove();
}

/**
 * Applies a class that highlights a given row
 * using the event passed in
 * @param e an event triggered from an input inside the table
 * @param isFocused boolean that indicates if the event 
 * was focus in or focus out, which will add or remove
 * the class respectivley. 
 */
function highlghtRow(e,isFocused) {
   const table = $("#time-tracking-table");
   const tableRow = $(e.target).parents("[row]");
   if(isFocused) {
      /* first check for any rows that are
      already highlighted and remove it */
      table.find(".st-row-highlight").removeClass("st-row-highlight");
      tableRow.addClass("st-row-highlight");
   }
   else   
      tableRow.removeClass("st-row-highlight");
}

/**
 * Formats the time to be in the format of HH:MM
 */
function formatTime(e){

   /* find the row */
   const tableRow = $(e.target).parents("[row]");
   if (typeof tableRow == "undefined") {
      logDeveloperError("badRowFind", e);
      return;
   }

   /* get the time values */
   const startTime = tableRow.find('input[name="start_time"]')[0].value;
   const endTime = tableRow.find('input[name="end_time"]')[0].value;
   const taskTime = tableRow.find('input[name="task_time"]')[0].value;

   let formattedStartTime;
   let formattedEndTime;
   let formattedTaskTime;

   /* Check if it's in HH:MM or HHMM format then format it */
   if (startTime.indexOf(":") > 0)
      formattedStartTime = formatTimeArray(startTime,"HH:MM");
   else
      formattedStartTime = formatTimeArray(startTime,"HHMM");

   if (endTime.indexOf(":") > 0)
      formattedEndTime = formatTimeArray(endTime,"HH:MM");
   else
      formattedEndTime = formatTimeArray(endTime,"HHMM");

   if (taskTime.indexOf(":") > 0)
      formattedTaskTime = formatTimeArray(taskTime,"HH:MM");
   else
      formattedTaskTime = formatTimeArray(taskTime,"HHMM");

   /* set the values */
   tableRow.find('input[name="start_time"]')[0].value = formattedStartTime;
   tableRow.find('input[name="end_time"]')[0].value = formattedEndTime;
   tableRow.find('input[name="task_time"]')[0].value = formattedTaskTime;
}

/* actually does the formatting */
function formatTimeArray(time, format) {

   /* don't format empty cells */
   if(time == "")
      return time;
      
   /* if only 3 digits are entered, assume its hhm   */
   /* or, if it's 4 digits with a colon, assume hh:m */
   if(time.length == 3 ||
   format == "HH:M" && time.length == 4) {

      /* if its starting with a double digit */
      if(Number(time.substring(0,2)) >= 10 &&
      Number(time.substring(0,2)) <= 23) {
         /* append a zero to the end */
         /* this way, entering 123 or 12:3 will be 12:30, not 12:03 */
         time += "0";
      } else { /* else, it will be a single digit, and a zero needs to be appended to the front */
         /* this way, entering 444 or 4:44 it will be 04:44, not 44:40 (which would get formatted to 12:40) */
         time = "0" + time;

         /* if time starts with 00, it's a single digit starting with a zero,
         like 013, which should be formatted to 01:30, so add 0 to end to make 0130 */
         if (time.substring(0,2) == "00") {
            time = time.substring(1,4) + "0";
         }
         
      }
   }

   /* if format includes a colon, retain the first 5 characters */
   /* else, only retain the first 4 (HHMM) */
   if(format == "HH:MM")
      time = time.substring(0, 5).trim();
   else
      time = time.substring(0, 4).trim();

   /* automatically format it to include the : */
   if(format == "HHMM")
      time = time.substring(0, 2) + ":" + time.substring(2, 4);

   /* split the time up into hours and minutes */
   const timeArray = time.split(":"); 
   let hours = timeArray[0];
   let minutes = timeArray[1];

   /* don't allow use of 24hr format for now */
   if(!use24hrFormat){

      /* if gt 12, use it's 12hr equivalent */
      if(hours > 12 && hours < 24){
         hours = hours - 12;
         if(hours.length == 1)
            hours = "0" + hours;
      }
      /* if 0/midnight or gt 24, just set to 12 */
      else if(hours == 0 || hours >= 24)
         hours = 12;

      hours = hours.toString();
   }

   /* if minutes are gt 59, set to 00 */
   if (Number(minutes) > 59) {
      minutes = "00";
   }

   /* append 0 if single digit */
   if(hours.length == 1)
      hours = "0" + hours;
   if(minutes.length == 1)
      minutes = minutes + "0";
   if(minutes.length == 0)
      minutes = "00";
   
   /* return the formatted time in HH:MM */
   return hours + ":" + minutes;
}
