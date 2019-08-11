//home page script
//<!-- Author: Kevin Hill -->
//<!-- Program Name: Final Web Project -->
//<!-- Date: Aug 4 2019 -->
//<!-- Course: CS 290 -->

/*clickable pictures in the carousel provides additional text */
function showInfo(choice){
	if (choice == 0){
		document.getElementById("choice1").style.display = "block";
		document.getElementById("choice2").style.display = "none";
		document.getElementById("choice3").style.display = "none";
		document.getElementById("choice4").style.display = "none";
	}
	else if (choice == 1){
		document.getElementById("choice1").style.display = "none";
		document.getElementById("choice2").style.display = "block";
		document.getElementById("choice3").style.display = "none";
		document.getElementById("choice4").style.display = "none";
	}
	else if (choice == 2){
		document.getElementById("choice1").style.display = "none";
		document.getElementById("choice2").style.display = "none";
		document.getElementById("choice3").style.display = "block";
		document.getElementById("choice4").style.display = "none";
	}
	else if (choice == 3){
		document.getElementById("choice1").style.display = "none";
		document.getElementById("choice2").style.display = "none";
		document.getElementById("choice3").style.display = "none";
		document.getElementById("choice4").style.display = "block";
	}
	
}