//tidal generator script
//<!-- Author: Kevin Hill -->
//<!-- Program Name: Final Web Project -->
//<!-- Date: Aug 4 2019 -->
//<!-- Course: CS 290 -->
//constants
const GRAVITY = 9.807;//m^2/s
const DENSITY_SEA = 1025;//kg/m^3
const PI = 3.14159;

var form = document.querySelector("form");
var log = document.querySelector("#log");

var results_toshow = false;
var list = document.getElementById('display');

/*checks if radio button is active then displays correct form to user to then enter information and print results*/
function generateResults(){
  if(document.getElementById('choice1').checked == false && document.getElementById('choice2').checked == false){
    return;
  }
  //get the protocol number from radio button
  var protocol_name = document.querySelector('input[name="protocol"]:checked').value;
  console.log("generating results");
  console.log(protocol_name);

  if(results_toshow){
    var range_value = -1;
    var surface_area = -1;
	var time_val1 = -1;
	var time_val2 = -1;
	var end_term = 0;
    var energy_avail = 0;//Energy available in kWh

    //Calculate protocol 1
    if(protocol_name === "protocol1"){
      var range_value = document.getElementById('range').value;
      var surface_area = document.getElementById('surface_area').value;
      if(range_value < 0 || surface_area < 0){
        return;
      }
      //calculate the energy available
      energy_avail = ((1/2)*GRAVITY*DENSITY_SEA*surface_area*Math.pow(range_value,2.0))/3.6;
    }
    //Calculate protocol 2
    else if(protocol_name === "protocol2"){
      var range_value = document.getElementById('range2').value;
      var surface_area = document.getElementById('surface_area2').value;
	  var time_val1 = document.getElementById('time_1').value;
	  var time_val2 = document.getElementById('time_2').value;
      if(range_value < 0 || surface_area < 0){
        return;
      }
      //calculate the energy available
	  console.log(time_val1);
	  end_term = 0.06175*(Math.cos((PI*PI*time_val1)/1117.5)-Math.cos((PI*PI*time_val2)/1117.5)) - (0.00195*(Math.pow(time_val2,2)-Math.pow(time_val1,2)));
	  end_term = 0.06175*(Math.cos((PI*time_val1)/6.21)-Math.cos((PI*time_val2)/6.21)) - (0.00195*(Math.pow(time_val2,2)-Math.pow(time_val1,2)));
      energy_avail = ((1/2)*GRAVITY*DENSITY_SEA*surface_area*Math.pow(range_value,2.0) *  end_term)/3.6;
    }
    energy_avail_units = Math.trunc(energy_avail).toString() + " kWh";

	document.getElementById('output').innerHTML = energy_avail_units;
    console.log(energy_avail);
    return energy_avail;
  }
}

/*Changes what to show based on user radio button choice*/
function displayChoices(input){
  document.getElementById('protocol_1').style.display = "none";
  document.getElementById('protocol_2').style.display = "none";
  if(input === "protocol1"){
    document.getElementById('protocol_1').style.display = "block";
    console.log('1');
    results_toshow = true;
  }
  else if(input === "protocol2"){
    document.getElementById('protocol_2').style.display = "block";
      console.log('2');
      results_toshow = true;
    }
}

/*generates a form using javascript and recieves choices for each field then calls displayChoices*/
form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  var protocol_choice = "";
  for (const entry of data) {
      protocol_choice = entry[1];
    };

    displayChoices(protocol_choice);
    event.preventDefault();
  }, false);
