
//if ( navigator.platform.indexOf('Win') != -1 ) {
 // window.document.getElementById("wrapper").setAttribute("class", "windows");
//} else if ( navigator.platform.indexOf('Mac') != -1 ) {
 // window.document.getElementById("wrapper").setAttribute("class", "mac");
//}

//var

// functions

var animals = {
	an1: ["silkworm", "silkworm.jpg"],
	an2: ["siamang", "siamang.jpg"],
	an3: ["aardwolf", "aardwolf.jpg"],
	an4: ["agouti", "agouti.jpg"],
	an5: ["bandicoot", "bandicoot.jpg"],
	an6: ["catamount", "catamount.jpg"],
	an7: ["cassowary", "cassowary.jpg"],
	an7: ["dromedary", "dromedary.jpg"],
	an8: ["dodo", "dodo.jpg"],
	an9: ["echidna", "echidna.jpg"],
	an10: ["eland", "eland.jpg"],
	an11: ["fossa", "fossa.jpg"],
	an12: ["fugu", "fugu.jpg"],
	an13: ["serval", "serval.jpg"]
};
var selectedWord = "";
var lettersInWord =[];
var dashNum = 0;
var dashLetters =[];
var letterKey ="";
var wrongLetters =[];
var win =0;
var loss=0;
var numGuess=10;
var img_src ="";
var place=-1;
var isIn=false;
var hanfImgNum=0;
var isLetter= false;

function startGame() {
	rando= Math.floor(Math.random()*Object.keys(animals).length);
	selectedAn = Object.entries(animals)[rando][1];
	selectedWord=selectedAn[0];
	lettersInWord=selectedWord.split("");
	dashNum=lettersInWord.length;
	var img_src= selectedAn[1];
	wrongLetters=[];
	for (var i = 0; i < dashNum; i++) {
		dashLetters.push(" _ ");
	};
	var fullimg= "assets/images/"+img_src;
	$("#dash").text(dashLetters.join(" "));
	$("#pic").attr('src', fullimg);
	$("#wrongGuess").text(wrongLetters);
	$("#numGuess").text(numGuess);
	$("#win").text(win);
	$("#loss").text(loss);
	$("#hang").attr('src', "assets/images/logo.png");
};
lettersInWord.includes(letterKey);
wrongLetters.includes(letterKey);
function letterPlace() {
	if(isIn) {
		for (var i = 0; i < selectedWord.length; i++) {
			if(lettersInWord[i]==letterKey) {
				dashLetters[i]=letterKey;
				$("#dash").text(dashLetters.join(" "));
				$("#numGuess").text(numGuess);
				playSound("in");
				roundEnd();
			}
		} 
	} 
	else if(wriongIsIn) {
		console.log("same letter");
	}
	else  {
		if(isLetter) {
			wrongLetters.push(letterKey);
			$("#wrongGuess").text(wrongLetters);
			numGuess--;
			hanfImgNum++;
			var hanfImg="assets/images/Hangman-"+ hanfImgNum+".png";
			$("#numGuess").text(numGuess);
			$("#hang").attr('src', hanfImg);
			playSound("wrong");
			roundEnd()
		}
	} 
}
function letterCheck(){

  if (event.keyCode > 64 && event.keyCode <91) {
  	return isLetter=true;
  }
  else{
  	isLetter=false;
  }
}
function roundEnd() {
	if (lettersInWord.toString()==dashLetters.toString()) {
		win++;
		$("#win").text(win);
		playSound("win")
		dashLetters=[];
		numGuess=10;
		$("hang").attr('src', "assets/images/logo.png");
		hanfImgNum=0;
		startGame();
	}
	else if(numGuess===0) {
		loss++
		$("#loss").text(loss);
		dashLetters=[];
		$("#hang").attr('src', "assets/images/logo.png");
		playSound("loss");
		numGuess=10;
		hanfImgNum=0;
		startGame();
	}

}
function playSound(type){
  var audio = $("<audio>");
  $("#audio_div").find("audio").remove();
  $("#audio_div").append(audio);
  var audio_src = "assets/audio/";
	switch(type){
	    case "win" : 
	      audio.attr("src", audio_src+"win.mp3");
	      audio.attr("id", "win_sound");
	      break;
	    case "loss" : 
	      audio.attr("src", audio_src+"loss.mp3");
	      audio.attr("id", "loss_sound"); 
	      break;
	    case "in":
		  audio.attr("src", audio_src+"in.mp3");
	      audio.attr("id", "in_sound"); 
	      break;
	    case "wrong":
	      audio.attr("src", audio_src+"wrong.mp3");
	      audio.attr("id", "wrong_sound"); 
	      break;
		}
  audio.attr("autoplay","true");
}
$(document).ready(function() {
	startGame()
	$(document).on("keyup", function(event) {
		letterKey = (event.key).toLowerCase();
	  	letterCheck();
	  	isIn=lettersInWord.includes(letterKey);
	  	wriongIsIn=wrongLetters.includes(letterKey);
	  	letterPlace();
	})
});




