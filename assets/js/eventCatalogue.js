//define a function that searches for event categories and displays only applicable events//
function categorySearchFunction (){
  //declare variables - getting values from search box//
  var searchInputCat = document.getElementById('userCategoryInput').value.toUpperCase();
  //Declare variables - getting values from the div elements
  var catItems = document.getElementById('catalogueItems');
  var events = catItems.getElementsByClassName('event');

  //loop through the divs to search for elements, and hide those that do not match the search query//
  for (var i=0; i<events.length; i++){
    var cat = events[i].getElementsByClassName('sportCategory');
    
    if(cat[0].innerHTML.toUpperCase().includes(searchInputCat)){
      events[i].style.display ="";
    }else{
      events[i].style.display ="none";
    }
  }
}

//define a function that searches for event categories and displays only applicable events//
function locationSearchFunction (){
  //declare variables - getting values from search box//
  var searchInputLoc = document.getElementById('userLocationInput').value.toUpperCase();
  //Declare variables - getting values from the div elements
  var catItems = document.getElementById('catalogueItems');
  var events = catItems.getElementsByClassName('event');

  //loop through the divs to search for elements, and hide those that do not match the search query//
  for (var i=0; i<events.length; i++){
    var loc = events[i].getElementsByClassName('city');
    
    if(loc[0].innerHTML.toUpperCase().includes(searchInputLoc)){
      events[i].style.display ="";
    }else{
      events[i].style.display ="none";
    }
  }
}

//dropdown sport category selection 
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


//create an array including all sports categories

var select = document.getElementById("content"); 
var options = ['American Football', 'Athletics','Badminton','Basketball','Boxing ','Canoeing','Cricket','Cross-Fit','Cycling ','Dancing','Darts','Disability Sports','Diving','Fitness-Training','Football','Golf','Handball','Hiking','Hockey','Ice Hockey','Longboarding','Mixed Martial Arts','Modern Pentathlon','Motor Sports','Netball','Parkour','Rowing','Rugby','Running','Sailing','Shooting','Skateboarding','Skiing','Snooker','Snowboarding','Squash','Surfing','Swimming','Table Tennis','Tai Chi','Tennis','Triathlon','Tricking','Ultimate Frisbee','Volleyball','Weightlifting','Winter Sports','Wrestling','Yoga'];


//     var el = document.createElement("");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// }

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var div = document.createElement('DIV');
    div.setAttribute('class', 'checkboxCat');
    var para = document.createElement("INPUT");
    para.setAttribute("type", "checkbox",);
    para.setAttribute('id', options[i]);
    var lab = document.createElement('LABEL');
    lab.setAttribute('for', options[i]);
    lab.innerHTML = options[i];
    var element = document.getElementById("content");
    element.appendChild(div);
    element.appendChild(para);
    element.appendChild(lab);
}