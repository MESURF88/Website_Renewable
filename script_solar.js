//solar generator script
//<!-- Author: Kevin Hill -->
//<!-- Program Name: Final Web Project -->
//<!-- Date: Aug 4 2019 -->
//<!-- Course: CS 290 -->
//constants
const GRAVITY = 9.807;//m^2/s
const PI = 3.14159;


//define api key
var DEMO_KEY='NgssJnSYepOAZhaD63rZbpimlhcPCH16JpXYqzGB&format=JSON';
//define arrays for dni, ghi, tilt and dictionary fro referencing months
var dict = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10:"nov",
  11:"dec"
};
var dni = [];
var ghi = [];
var avg_tilt = [];


/*push values of JSON solar energy data*/
function select(){
	//information and assumptions shown once submitted location
	var degree_info1 = " Some assumptions made for this calculation is that the tilt of the solar arrays are at a(n) ";
    var degree_info2 = " degree angle, fixed tilt with no tracking and facing the equator.";
	var monthly_stats1 = " Monthly average solar insolation per day is given below for each month in (kwh/m^2/day).";
	var monthly_stats2 = " Solar insolation is a complex equation that takes into account how the Earth orbits the sun and beam and background radiation from it.";
	var lat = document.getElementById("lat_input").value;
	var lon = document.getElementById("lon_input").value;
	var api = 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key='+DEMO_KEY+'&lat='+lat+'&lon='+lon;
	
	//GET request
	var request = new XMLHttpRequest();
	request.open('GET', api);
	request.onload = function () {
		var data = JSON.parse(request.responseText);
		var err = data.errors;//check if response
		renderWeatherData(data, err);
		printResults(data);
		console.log(data.errors);//print response if error
		console.log('https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key='+DEMO_KEY+'&lat='+lat+'&lon='+lon);//print URL city JSON
		if (data.errors.length == 0){
			document.getElementById("error_out").innerHTML = "";//no errors
		}
		else{
			document.getElementById("error_out").innerHTML = "There are: " + data.errors.length + " errors with this location";//show errors if necessary
		}
	};
    document.getElementById("degrees").innerHTML = degree_info1 + Math.abs(lat) + degree_info2;//show assumptions
	document.getElementById("months1").innerHTML = monthly_stats1;//show monthly data
	document.getElementById("months2").innerHTML = monthly_stats2;//show monthly data and more detail on solar insolation
	request.send();
	
};


/*renders data from JSON to print on webpage*/
function renderWeatherData(theData, error) {
	var htmlOutput = "";
	var str = '<ul>';
	if (error==0){
		//parse data if error is equal to zero
		for (var i = 0; i < 12; i++){
			dni[i] = theData.outputs.avg_dni.monthly[dict[i]];
			ghi[i] = theData.outputs.avg_ghi.monthly[dict[i]];
			avg_tilt[i] = theData.outputs.avg_lat_tilt.monthly[dict[i]];
		}
		htmlOutput += theData.outputs.avg_lat_tilt.annual+" kwh/m^2/day ";
		//print out monthly solar insolation values
		for (var j = 0; j < 12; j++){
			
			str += '<li>'+ dict[j] + ":  "+ avg_tilt[j] + '</li>';
		
		}
		str += '</ul>';
	}
	else{htmlOutput = "Invalid, latitude exceeds [-90, 90] or longitude exceeds [-180, 180]";}
	document.getElementById("show_avg").innerHTML = htmlOutput;
	document.getElementById("monthly_avg").innerHTML = str;
	document.getElementById("error_out").innerHTML = "";//remove errors
};

/*shows data after clicked the results button and fills out visual of panels using colored table*/
function printResults(theData){
	if (theData!=-1){//if not a recall of function
		energy_val = theData.outputs.avg_lat_tilt.annual;
	}
	var htmlAvail_d = "";
	var htmlAvail_y = "";
	var energy_avail_panels_d = energy_val;
	var energy_avail_panels_y = energy_val;
	var panel_size = 2;//m^2
	var number_panels = document.getElementById("panel_num").value;
	energy_avail_panels_d = panel_size*number_panels*number_panels*energy_avail_panels_d;
	energy_avail_panels_y = panel_size*number_panels*number_panels*365*energy_avail_panels_y;
	htmlAvail_d += energy_avail_panels_d;
	htmlAvail_y += energy_avail_panels_y;
	document.getElementById("show_avail1").innerHTML = htmlAvail_d + " kwh/day, ";
	document.getElementById("show_avail2").innerHTML = htmlAvail_y + " kwh/year";
	//generate visual of panels


	  var cell_val = "  ";
	  tbl.style.width = '100%';
	  tbl.setAttribute('border', '1');
	  var tbdy = document.createElement('tbody');
	  for (var i = 0; i < number_panels; i++) {
		var index = i;
		var tr = document.createElement('tr');
		tr.style.backgroundColor= "black";
		for (var j = 0; j < number_panels; j++) {
			var td = document.createElement('td');
			td.style.backgroundColor= "black";
			td.setAttribute("style", "border-width: thick");
			td.appendChild(document.createTextNode(cell_val));
			tr.appendChild(td);

			}
		tbdy.appendChild(tr);
	}
	tbl.appendChild(tbdy);
	panel_show.appendChild(tbl);
	
	document.getElementById("panel_show").style.display= "none";
	document.getElementById("show_avail1").style.display= "none";
	document.getElementById("show_avail2").style.display = "none";
};

/*removes table each time and prints out information using user data*/
function showResults(){
	//remove old table
	var Outer = document.getElementById("tbl");
    while(Outer.hasChildNodes())
    {
       Outer.removeChild(Outer.firstChild);
    }
	//call print results
	printResults(-1);//make sure energy_value is not overwritten
	//show the panels and results
	document.getElementById("panel_show").style.display= "block";
	document.getElementById("show_avail1").style.display= "block";
	document.getElementById("show_avail2").style.display = "block";
};

