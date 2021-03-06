// introduce events binding that carries event array that are saved in the local storage
// JSON.parse is the opposite operation of stringify and turns the string back into an array
if(!JSON.parse(localStorage.getItem("currentUser"))){
    document.location.href = "login.html";
}else{
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var users = JSON.parse(localStorage.getItem("users"));
}
// var currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!JSON.parse(localStorage.getItem("events"))){
    var events = [];
}else{
    var events = JSON.parse(localStorage.getItem("events"));
}

// setting the minimum choosable date to today
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#eventDate").min = today;

var placeSearch, autocomplete;
class Address {
    constructor (streetNr, route, locality, adminAreaLvl1, country, postalCode){
        this.ID;
        this.name;
        this.formatted_address;
        this.street_number = 'short_name';
        this.route = 'long_name';
        this.locality = 'long_name';
        this.sublocality_level_1 = 'long_name';
        this.administrative_area_level_1 = 'short_name';
        this.country = 'long_name';
        this.postal_code = 'short_name'
    }
};

class myDate {
    constructor (fullDate){
        this.datePickerDate = fullDate;
        this.fullDate = new Date(fullDate);
        this.year = this.fullDate.getFullYear();
        this.months = {
                        long:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
                    };
        this.month = {
                        short: this.months.short[this.fullDate.getMonth()],
                        long: this.months.long[this.fullDate.getMonth()]
                    };
        this.days = {
                        long : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        short : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
                    };
        this.day = { 
                        short: this.days.short[this.fullDate.getDay()],
                        long: this.days.long[this.fullDate.getDay()]
                    };   
        this.date = this.fullDate.getDate();
    }
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('eventLocation')))
    //   {types: ['geocode']};

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}
// create new address object to work with, when the google places api autocomplete function is triggerd
var address = new Address;

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  // Get each component of the address from the place details
  // and build up the address object
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (address[addressType]) {
      var val = place.address_components[i][address[addressType]];
      address[addressType] = val;
    }
  }
  address.ID = place.id;
  address.formatted_address = place.formatted_address;
  address.name = place.name;
}

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
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
}
else{
    userProfile.style.display = "none";
    createEvent.style.display = "none";
    eventCatalogue.style.display = "none";
    registerBtn.style.display = "inline";
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
}

// introduce our event object model
class Event {
    constructor(_ID, _creatorID, _type, _privacy, _name, _date, _time, _sportType, _description, _difficulty, _maxPart, _frequency, _location, _price){
        this.eventID = _ID;
        this.userID = _creatorID;
        this.type = _type;
        this.privacy = _privacy;
        this.name = _name;
        this.date = _date;
        this.time = _time;
        this.sportType = _sportType;
        this.description = _description;
        this.difficulty = _difficulty;
        this.maxPart = _maxPart;
        this.attendees = [];
        this.interested = [];
        this.frequency = _frequency;
        this.location = _location;
        this.price = _price;
        }
    }
// select all input fileds of the create course html page
var eventType = document.getElementById("eventType");
var eventPrivacy = document.getElementById("privacyDropdown");
// var eventPic = document.getElementById("eventPic");
var eventName = document.getElementById("eventName");
var eventDate = document.getElementById("eventDate");
var eventTime = document.getElementById("eventTime");
var eventSportType = document.getElementById("eventSportType");
var eventDescription = document.getElementById("eventDescription");
var eventDifficulty = document.getElementById("eventDifficulty");
var eventMaxPart = document.getElementById("eventMaxPart");
var eventFrequency = document.getElementById("eventFrequency");
var eventLocation = document.getElementById("eventLocation");
var eventPrice = document.getElementById("eventPrice");
var eventSubmitButton = document.getElementById("submit");

// Unique Event ID Generator Function
function geid() {
    function s4() {
        // Math.floor -> Round Number
        // Math.random -> generate random Number between 0 and 1
        // *0x1000 gives us a 4 digit number
      return Math.floor((1 + Math.random())* 0x10000)
        // toString(16)-> gives us a mix of numbers and char
        .toString(16)
        // tosubstring(1) shortens the random string to 3 char
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

// add click event listener
// on click trigger function
document.getElementById("eventForm").addEventListener("submit", function(event){
    // Prevent the page to automatically push the input into the URL and prevent the page to reload
    event.preventDefault();
    // generate unique event ID
    var eventID = geid();
    var creatorID = currentUser[0];
    // check if all fields are filled out
        // if yes -> get all values of the fields and push them to the event object
        // push new event to events array
        events.push(new Event(eventID, creatorID, event.target.eventType.value, event.target.privacyDropdown.value, event.target.eventName.value, new myDate(event.target.eventDate.value), event.target.eventTime.value, event.target.eventSportType.value, event.target.eventDescription.value, event.target.eventDifficulty.value, event.target.eventMaxPart.value, event.target.eventFrequency.value, address, event.target.eventPrice.value));
        // store stringified version of events array in localStorage
        localStorage.setItem("events", JSON.stringify(events));
        for(var i = 0; i < users.length; i++){
            if(currentUser[0] === users[i].ID){
                users[i].ownEvents.push(eventID);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("users", JSON.stringify(users));
            }
        }
        document.location.href = "eventCatalogue.html";
});

// Create Tags functionality
// [].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
//     let hiddenInput = document.createElement('input'),
//         mainInput = document.createElement('input'),
//         tags = [];
    
//     hiddenInput.setAttribute('type', 'hidden');
//     hiddenInput.setAttribute('name', el.getAttribute('data-name'));

//     mainInput.setAttribute('type', 'text');
//     mainInput.classList.add('main-input');
//     mainInput.addEventListener('input', function () {
//         let enteredTags = mainInput.value.split(',');
//         if (enteredTags.length > 1) {
//             enteredTags.forEach(function (t) {
//                 let filteredTag = filterTag(t);
//                 if (filteredTag.length > 0)
//                     addTag(filteredTag);
//             });
//             mainInput.value = '';
//         }
//     });

//     mainInput.addEventListener('keydown', function (e) {
//         let keyCode = e.which || e.keyCode;
//         if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
//             removeTag(tags.length - 1);
//         }
//     });

//     el.appendChild(mainInput);
//     el.appendChild(hiddenInput);

//     addTag();

//     function addTag (text) {
//         let tag = {
//             text: text,
//             element: document.createElement('span'),
//         };

//         tag.element.classList.add('tag');
//         tag.element.textContent = tag.text;

//         let closeBtn = document.createElement('span');
//         closeBtn.classList.add('close');
//         closeBtn.addEventListener('click', function () {
//             removeTag(tags.indexOf(tag));
//         });
//         tag.element.appendChild(closeBtn);

//         tags.push(tag);

//         el.insertBefore(tag.element, mainInput);

//         refreshTags();
//     }

//     function removeTag (index) {
//         let tag = tags[index];
//         tags.splice(index, 1);
//         el.removeChild(tag.element);
//         refreshTags();
//     }

//     function refreshTags () {
//         let tagsList = [];
//         tags.forEach(function (t) {
//             tagsList.push(t.text);
//         });
//         hiddenInput.value = tagsList.join(',');
//     }

//     function filterTag (tag) {
//         return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
//     }
// });

// add click event listener
// on click trigger function
// eventSubmitButton.addEventListener("click", function(){
    // this function saves all input values to new variables
    // var privacy = eventPrivacy.value;
    // var pic = eventPic.value;
    // var name = eventName.value;
    // var date = eventDate.value;
    // var time = eventTime.value;
    // var sportType = eventSportType.value;
    // var description = eventDescription.value;
    // var difficulty = eventDifficulty.value;
    // var maxPart = eventMaxPart.value;
    // var frequency = eventFrequency.value;
    // var location = eventLocation.value;
    // var price = eventPrice.value;
    // then stores these values in the event object
    // check if all fields are filled out
    // if(privacy && name && date && sportType){
    // if yes -> get all values of the fields and push them to the event object
        // event.privacy = privacy;
        // event.pic = pic;
        // event.name = name;
        // event.date = date;
        // event.time = time;
        // event.sportType = sportType;
        // event.description = description;
        // event.difficulty = difficulty;
        // event.maxPart = maxPart;
        // event.frequency = frequency;
        // event.location = location;
        // event.price = price;
        // push our new event to the events array
        // events.push(event);
        // stringify events array to be able to save it in localStorage
        // eventsString = JSON.stringify(events);
        // save strinified version of events array (eventsString) to the localStorage
        // localStorage.setItem("events", eventsString);
        // redirect user to the events catalogue page
        // document.location.href = "eventCatalogue.html"
    // }
    // if not -> display error message an mark input field that is not filled out
//     else{
//         alert("You fool!");
//     }
//     events = JSON.parse(localStorage.getItem("events"));
// })





