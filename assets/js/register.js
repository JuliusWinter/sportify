// Introduce Array of registered Users
// Call Users array string from localStorage and parse it back into an array of objects
if(!JSON.parse(localStorage.getItem("users"))){
    var users = [];
}else{
    var users = JSON.parse(localStorage.getItem("users"));
}
// remove currentUser from local storage
localStorage.removeItem("currentUser");
// set currentUser array 
var currentUser = [];
// Introduce User Object Model
class user {
    constructor(_ID, _userName, _firstName, _lastName, _gender, _birthday, _email, _password){
        this.ID = _ID;
        this.userName = _userName;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.birthday = _birthday;
        this.gender = _gender;
        this.email = _email;
        this.password = _password;
        this.ownEvents = [];
        this.intEvents = [];
        this.attEvents = [];
        this.sports = [];
        this.slogan = "";
        this.awards = [];
    }
}

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
                    }
        this.days = {
                        long : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        short : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']};
        this.day = { 
                        short: this.days.short[this.fullDate.getDay()],
                        long: this.days.long[this.fullDate.getDay()]
                    }   
        this.date = this.fullDate.getDate();
    }
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
userProfile.style.display = "none";
createEvent.style.display = "none";
eventCatalogue.style.display = "none";
registerBtn.style.display = "none";
loginBtn.style.display = "inline";
logoutBtn.style.display = "none";


// Unique User ID Generator Function
function guid() {
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


// Where does this event come from and what is it?
document.getElementById("registrationForm").addEventListener("submit", function(event){
    // Prevent the page to automatically push the input into the URL and prevent the page to reload
    event.preventDefault();
    // reset error signs
    document.getElementById("userNameTaken").innerHTML = "";
    document.getElementById("regUserName").style.border = "none";
    document.getElementById("emailTaken").innerHTML = "";
    document.getElementById("regEmail").style.border = "none";
    // check if user name is already taken
    if(JSON.parse(localStorage.getItem("users"))){
        for(var i = 0; i < users.length; i++){
            if(users[i].userName === event.target.regUserName.value){
                document.getElementById("userNameTaken").innerHTML = "This username is already taken";
                document.getElementById("regUserName").style.border = "2px solid red";
                if(users[i].email === event.target.regEmail.value){
                    document.getElementById("emailTaken").innerHTML = "There already exists an account with this email address";
                    document.getElementById("regEmail").style.border = "2px solid red";
                }
            }
            else if(users[i].email === event.target.regEmail.value){
                document.getElementById("emailTaken").innerHTML = "There already exists an account with this email address";
                document.getElementById("regEmail").style.border = "2px solid red";
                break;
            }
            else{
                // generate User ID
                var ID = guid();
                // hash password
                password = window.btoa(event.target.regPassword.value);
                // push new user to users array
                users.push(new user (ID, event.target.regUserName.value, event.target.regFirstName.value, event.target.regLastName.value, event.target.gender.value, new myDate(event.target.regBirthday.value), event.target.regEmail.value, password));
                // store stringified version of users array in localStorage
                localStorage.setItem("users", JSON.stringify(users));
                // push the same user to current User array
                currentUser.push(ID);
                // safe stringified version of current user array to local storage
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                // redirect to loginSuccessful.html
                document.location.href = "loginSuccessful.html";
            }
        }
    }
    else{
        // generate User ID
        var ID = guid();
        // hash password
        password = window.btoa(event.target.regPassword.value);
        // push new user to users array
        users.push(new user (ID, event.target.regUserName.value, event.target.regFirstName.value, event.target.regLastName.value, event.target.gender.value, new myDate(event.target.regBirthday.value), event.target.regEmail.value, password));
        // store stringified version of users array in localStorage
        localStorage.setItem("users", JSON.stringify(users));
        // push the same user to current User array
        currentUser.push(ID);
        // safe stringified version of current user array to local storage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // redirect to loginSuccessful.html
        document.location.href = "loginSuccessful.html";
    }
});


//     // check if they are all filled out and email = confirmed email + password = confirmed password
//         if(userName && firstName && lastName && birthday && email && password && email === conEmail && password === conPassword && checkbox){
//             // if true, push input values to user object model
//             let _user = new user (userName, firstName, lastName, birthday, email, password)
//             // ASSIGN individual ID to User



//             // push new user to users array
//             users.push (_user);
//             // stringify users array, because localStorage can only safe strings
//             var usersString = JSON.stringify(users);
//             // save users array to local storage
//             localStorage.setItem("users", usersString);

//         }
//         else{
//             // console.log(userName);
//             // console.log(firstName);
//             // console.log(lastName);
//             // console.log(birthday);
//             // console.log(email);
//             // console.log(conEmail);
//             // console.log(password);
//             // console.log(checkbox);

//             // Loop over form elements
//             // Check which are filled out
//             // for the ones who are not filled out -> toggle class to get red border
//             // Change placeholdertext 

//             // PROCEED FURTHER FROM HERE - DISPLAY ERROR MESSAGES IN REGISTER
//             for(var i = 0; i < elements.length; i++){
//                 if(elements[i].value == null || elements[i].value == "" || elements[i].value == false){
//                     console.log("hi");
//                 }
//             }
            
//         }
// })

