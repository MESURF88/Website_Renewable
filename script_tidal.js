//tidal generator script
const GRAVITY = 9.807;//m^2/s
const DENSITY_SEA = 1025;//kg/m^3
const PI = 3.14159;

var form = document.querySelector("form");
var log = document.querySelector("#log");

var results_toshow = false;
var list = document.getElementById('display');

/*function setChoices(input){
  console.log(input);
  var number_id = 0;
  if(input === "protocol_1"){
    number_id = 1;
    return number_id;
  }
  else if(input === "protocol_2"){
    number_id = 2;
    return number_id;
  }
}*/



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
      console.log('number 2');
    }
    energy_avail_units = Math.trunc(energy_avail).toString() + " kWh";

    list.innerHTML = '';//Remove old data so it can be replace with new data
    var display_result = document.createElement('pre');
    display_result.appendChild(document.createTextNode(energy_avail_units));
    list.appendChild(display_result);
    console.log(energy_avail);
    return energy_avail;
  }
}

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

form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  var protocol_choice = "";
  for (const entry of data) {
      protocol_choice = entry[1];
    };

    displayChoices(protocol_choice);
    //log.innerText = output;
    event.preventDefault();
  }, false);
