/*
 * contains functions for website1.html
*/

/*
 * The following function is called on page load.
 * prompts the user for information
 * if cookies are enabled, stores the information in cookies.
 * note : if information has to be retrieved from cookies,
 * this has to be run on a server.
*/
function init() {
    var eventTitle = prompt("Please enter the event title.", "Rummage Sale");
    var eventDate = prompt("Please enter the event date.", "10/10/2017");
    if (navigator.cookieEnabled) {
        document.cookie = "eventTitle=" + eventTitle;
        document.cookie = "eventDate=" + eventDate;
    }

    (document.getElementById("event_title")).textContent = eventTitle;
    (document.getElementById("event_date")).textContent = eventDate;

}