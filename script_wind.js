//wind generator script
//<!-- Author: Kevin Hill -->
//<!-- Program Name: Final Web Project -->
//<!-- Date: Aug 4 2019 -->
//<!-- Course: CS 290 -->
const GRAVITY = 9.807;//m^2/s
const DENSITY_AIR = 1.225;//kg/m^3
const PI = 3.14159;

/*function that calculates power of turbine based on user input diameter*/
function powerDisplay(){
	var diameter = document.getElementById("dia_input").value;
	var power = 0;
	power = (1/2)*DENSITY_AIR*((PI*diameter*diameter)/4)*3375;
	power = Math.trunc(power);
	document.getElementById("show_power").innerHTML = power + " kW";
};

