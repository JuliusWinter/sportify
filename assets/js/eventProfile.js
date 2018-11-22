// fake current event array with one event
// delete later and get current event array from local storage
// var currentEvent = JSON.parse(localStorage.getItem("currentEvent"));
//     date: "2017-10-29",
//     description: "Here is the description",
//     difficulty: "1",
//     eventID: "07eff11b-5009-adad-a0f8-f2c81793f9d3",
//     frequency: "single",
//     location: "djnajkn",
//     maxPart: 2,
//     name: "Hello",
//     price: 2,
//     privacy: "public",
//     sportType: "Canoeing",
//     time: "22:58",
//     type: "course",
//     userID: "481ccb0b-f451-a271-32d6-86144a772970",
// }];

// get current event from local storage
if(!JSON.parse(localStorage.getItem("currentUser"))){
    document.location.href = "login.html";
}else{
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var users = JSON.parse(localStorage.getItem("users"));
    var events = JSON.parse(localStorage.getItem("events"));
    var currentEvent = JSON.parse(localStorage.getItem("currentEvent"))
}
// NAVBAR
// select anchor tags that should be manipulated 
var userProfile = document.querySelector("#userProfile");
var createEvent = document.querySelector("#createEvent");
var eventCatalogue = document.querySelector("#eventCatalogue");
var learnMore = document.querySelector("#learnMore");
var about = document.querySelector("#about");
var registerBtn = document.querySelector("#registerBtn");
var loginBtn = document.querySelector("#loginBtn");
var logoutBtn = document.querySelector("#logoutBtn");
// check if a user is logged in
if(currentUser){
    userProfile.style.display = "inline";
    createEvent.style.display = "inline";
    eventCatalogue.style.display = "inline";
    learnMore.style.display = "none";
    about.style.display = "none";
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
}
else{
    userProfile.style.display = "none";
    createEvent.style.display = "none";
    eventCatalogue.style.display = "none";
    learnMore.style.display = "inline";
    about.style.display = "inline";
    registerBtn.style.display = "inline";
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
}

// select all html elements to manipulate
var editBtn = document.getElementById("editEventBtn");
var eventName = document.getElementById("name");
var date = document.getElementById("date");
var time = document.getElementById("time");
var privacy = document.getElementById("privacy");
var sportType = document.getElementById("sportType");
var description = document.getElementById("description");
var difficulty = document.getElementById("difficulty");
var frequency = document.getElementById("frequency");
var maxPart = document.getElementById("maxPart");
var eventLocation = document.getElementById("location");
var price = document.getElementById("price");

// if current users own events is equal to event id
// show edit button
for(var i = 0; i < users.length; i++){
    if(users[i].ID === currentUser[0]){
        for(var j = 0; j < users[i].ownEvents.length; j++){
            if(users[i].ownEvents[j] === currentEvent[0]){  
                // when this statement matches display btn inline
                editBtn.style.display = "inline";
                // after that exit the loop with the break statement
                break;
            }
            else{
                editBtn.style.display = "none";
            }
        }
    }   
}

// get event id of the selected event and compare it to events array
// if match -> 
for(var i = 0; i < events.length; i++){
    if(currentEvent[0] === events[i].eventID){
        eventName.innerHTML = events[i].name;
        date.innerHTML = events[i].date.day.long + ", "+ events[i].date.month.long + " " + events[i].date.date + ", " + events[i].date.year ;
        time.innerHTML = events[i].time;
        privacy.innerHTML = events[i].privacy;
        sportType.innerHTML = events[i].sportType;
        description.innerHTML = events[i].description;
        difficulty.innerHTML = events[i].difficulty;
        frequency.innerHTML = events[i].frequency;
        maxPart.innerHTML = events[i].maxPart;
        eventLocation.innerHTML = events[i].location.formatted_address;
        price.innerHTML = events[i].price;
        // localStorage.setItem("events", JSON.stringify(events));
        }
    }


