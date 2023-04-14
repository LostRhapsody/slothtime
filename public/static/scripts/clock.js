/* Should be using this for disabling accordion */
// $('#accordion').on('show.bs.collapse', function () {
//    $('#accordion .in').collapse('hide');
// });
// $(".collapse.in").removeClass('collapse in');


/* Time Stuff */
var twentyFour = true;
var showTimer = false;
var showMilli = false;
var showClock =  false;
var clockInterval = 1000;
var timerInterval = 10;
const timer = new Date();
var clockIntervalID;
var timerIntervalID;
var timerSetup;
var timerhour, timerminutes, timerseconds, timermseconds;

updateClock();

clockIntervalID = window.setInterval(updateClock, clockInterval);

$("#24hrToggle").click(function () {
   twentyFour ? (twentyFour = false) : (twentyFour = true);
   updateClock();
});

$("#timerToggle").click(function () {
   showTimer ? (showTimer = false) : (showTimer = true);
   if (showTimer) {
      $("#timer").removeClass("d-none");
      $("#timerToggle").addClass("clicked");
      $("#time").addClass("clock-face-unfocus");
      $("#timer").addClass("timer-face-focus");
      timerSetup = true;
      updateTimerInterval();
   } else {
      $("#timer").addClass("d-none");
      $("#timerToggle").removeClass("clicked");
      $("#time").removeClass("clock-face-unfocus");
      $("#timer").removeClass("timer-face-focus");
      clearInterval(timerIntervalID);
   }
});

$("#milliToggle").click(function () {
   showMilli ? (showMilli = false) : (showMilli = true);
   showMilli ? updateInterval(true) : updateInterval(false);
   updateClock();
});

$("#btn-hide-clock").click(function(){
   hideClock();
});

function updateClock() {
   const date = new Date();
   let ampm;
   var [hour, minutes, seconds, mseconds] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
   ];
   ampm = hour >= 12 ? "pm" : "am";
   if (hour < 10) {
      hour = "0" + hour;
   }
   if (minutes < 10) {
      minutes = "0" + minutes;
   }
   if (seconds < 10) {
      seconds = "0" + seconds;
   }
   if (mseconds < 10) {
      mseconds = "00" + mseconds;
   }
   if (mseconds < 100 && mseconds > 10) {
      mseconds = "0" + mseconds;
   }
   if (twentyFour) {
      $("#time").html(hour + ":" + minutes + ":" + seconds);
   } else {
      hour = hour % 12;
      hour = hour ? hour : 12;
      $("#time").html(hour + ":" + minutes + ":" + seconds);
   }
   if (showMilli) {
      mseconds = mseconds.toString();
      $("#time").html($("#time").text() + ":" + mseconds.substring(0, 2));
   }
   // sets the length of the clock to 10 characters long
   // if ($("#time").html().length < 10) {
   //    for(let x = $("#time").html().length; x < 10; x++) {
   //       $("#time").html($("#time").text() + '&#160;');
   //    }
   // }
   $("#time").html($("#time").text() + "&#160;" + ampm);
}

function updateInterval(showMilliseconds) {
   clearInterval(clockIntervalID);
   if (showMilliseconds) {
      clockInterval = 10;
      clockIntervalID = window.setInterval(updateClock, clockInterval);
   } else {
      clockInterval = 1000;
      clockIntervalID = window.setInterval(updateClock, clockInterval);
   }
}

function updateTimerInterval() {
   clearInterval(timerIntervalID);
   timerInterval = 10;
   timerIntervalID = window.setInterval(updateTimer,timerInterval);
}

function updateTimer() {
   if (timerSetup){
      [timerhour, timerminutes, timerseconds, timermseconds] = [0,0,0,0];
      timerSetup = false;
   }
   timermseconds += timerInterval;
   /* increment section */
   if (timermseconds >= 1000) {
      timermseconds = 0;
      timerseconds += 1;
   }
   if (timerseconds >= 60) {
      timerseconds = 0;
      timerminutes += 1;
   }
   if (timerminutes >= 60) {
      timerminutes = 0;
      timerhour += 1;
   }
   if (showTimer) {
      // timermseconds = timermseconds.toString();
      // timermseconds = timermseconds.substring(0,2);
      let s_hours    = timerhour.toString();
      let s_minutes  = timerminutes.toString();
      let s_seconds  = timerseconds.toString();
      let s_mseconds = timermseconds.toString();
      if (s_hours.length < 2) {
         s_hours = "0" + s_hours;
      }
      if (s_minutes.length < 2) {
         s_minutes = "0" + s_minutes;
      }
      if (s_seconds.length < 2) {
         s_seconds = "0" + s_seconds;
      }
      if (s_mseconds.length < 2) {
         s_mseconds = "0" + s_mseconds;
      }
      $("#timer").html(s_hours + ":" + s_minutes + ":" + s_seconds + ":" + s_mseconds.substring(0,2));
   }
}

function hideClock(){
   if(showClock){
      showClock = false;
      $("#clock").hide();
   } else {
      showClock = true;
      $("#clock").show();
   }
}