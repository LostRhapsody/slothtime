/* Action Tray */
var actionTrayToggled    = false;
var actionTrayAnimating  = false;
const action_tray_button = document.getElementById("flush-heading-action");

action_tray_button.addEventListener("click", (event) => {
   if (actionTrayAnimating) { return; }
   actionTrayToggled ? actionTrayToggled = false : actionTrayToggled = true;
   actionTrayAnimating = true;   
   toggleActionTrayButton();
});

function toggleActionTrayButton(){
   if (!actionTrayToggled) {
      $("#action-tray-button").addClass("caret-spin-up");
      $("#action-tray-button").removeClass("caret-spin-down");
   } else {
      $("#action-tray-button").addClass("caret-spin-down");
      $("#action-tray-button").removeClass("caret-spin-up");
   }
}
action_tray_button.addEventListener("animationend",   listener, false);
action_tray_button.addEventListener("animationstart", listener, false);

function listener(event){
   switch(event.type) {
      case "animationstart":
         $("#flush-heading-action").attr("data-bs-target", "");         
         break;
      case "animationend":
         actionTrayAnimating = false;
         $("#flush-heading-action").attr("data-bs-target", "#flush-collapse-action");
         break;
         
   }
}