"use strict";
const getElement = selector => document.querySelector(selector);

// image constants 
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

let score = 0;
let cardsSelected = 0;
let previousCards = [];

let name;
let highScore = 0;
let correct = 0;

let cards = [
	

]

let card = "<a href='#'><img src='./images/back.png' /></a>";

let cardRow = [];

let numCards;

window.onload = function(){
	//localStorage.setItem("numCards", 6);
	console.log("Card Rows: " + localStorage.numCards / 8);
	newGame();

	document.getElementById("player").innerText = localStorage.name;
	document.getElementById("player_name").value = localStorage.name;
	document.getElementById("num_cards").value = localStorage.numCards;
	document.getElementById("high_score").innerHTML = localStorage.highScore;
	document.getElementById("correct").innerHTML = localStorage.correct;
}

function newGame(){
	numCards = localStorage.getItem("numCards")
	for(let i = 0; i < numCards / 2; i++){
		cards.push({id: i + 1, shown: false});
	}
	for(let j = 0; j < numCards / 2; j++){
		cards.push({id: j + 24 + 1, shown: false});
	}
	let index = cards.length;
	console.log(cards);
	for (var i = cards.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
	
	addRow(numCards / 8);
}

function setActive(tab){
	document.getElementById("tabs_cards_link").classList.remove('active');
	document.getElementById("tabs_rules_link").classList.remove('active');
	document.getElementById("tabs_settings_link").classList.remove('active');
	document.getElementById("tabs_cards").classList.add('hide');
	document.getElementById("tabs_rules").classList.add('hide');
	document.getElementById("tabs_settings").classList.add('hide');
	if(tab == "cards"){
		document.getElementById("tabs_cards_link").classList.add('active');
		document.getElementById("tabs_cards").classList.remove('hide');
	}
	if(tab == "rules"){
		document.getElementById("tabs_rules_link").classList.add('active');
		document.getElementById("tabs_rules").classList.remove('hide');
	}
	if(tab == "settings"){
		document.getElementById("tabs_settings_link").classList.add('active');
		document.getElementById("tabs_settings").classList.remove('hide');
	}
	console.log(localStorage.numCards);
}

function saveSettings(){
	let name = document.getElementById("player_name").value;
	let numCards = document.getElementById("num_cards").value;

	localStorage.setItem("name", name);
	localStorage.setItem("numCards", numCards);

	document.getElementById("player").innerText = name;
	alert("Settings Saved Successfully");
}

function createRow(rowNum){
	for(let i = 0; i < 8; i++){
		let cardNum = cards[(i + 1 + (rowNum * 8)) - 1].id;
		card = "<a id='" + cardNum + "' href='#' onclick='userSelectCard(" + cardNum + ")'><img src='./images/back.png' /></a>"
		cardRow.push(card);
	}

}

function userSelectCard(cardNum){
	if(!cards.find(({id}) => id === cardNum).shown){
		if(cardsSelected <= 1){
			setInterval(flipCard(cardNum), 2500);
			cardsSelected++;
			previousCards.push(cardNum);
		}
		else{
			setInterval(flipCard(previousCards[0]), 2500);
			setInterval(flipCard(previousCards[1]), 2500);
			previousCards = [];
			cardsSelected = 0;
		}
		if(cardsSelected == 2 && previousCards[0] % 24 == previousCards[1] % 24){
			previousCards = [];
			cardsSelected = 0;
			correct = correct + 2;
		}
		localStorage.setItem("correct", correct);
		if(correct > localStorage.highScore){
			highScore = correct;
			localStorage.setItem("highScore", highScore);
		}
		console.log("Correct: " + correct + " High: " + highScore);
		document.getElementById("high_score").innerHTML = (localStorage.highScore).toString();
		document.getElementById("correct").innerHTML = (localStorage.correct).toString();
	}
}


function flipCard(cardID){
		console.log(cards.find(({id}) => id === cardID));
		if(cards.find(({id}) => id === cardID).shown){
			cards.find(({id}) => id === cardID).shown = false;
			document.getElementById(cardID).children[0].setAttribute("style", "opacity: 0; transition: opacity 0.5s;");
			setTimeout(function(){
				document.getElementById(cardID).children[0].setAttribute("src", "./images/back.png");
				document.getElementById(cardID).children[0].setAttribute("style", "opacity: 1; transition: opacity 0.5s;");
			}, 250);
		}
		else{
			cards.find(({id}) => id === cardID).shown = true;
			document.getElementById(cardID).children[0].setAttribute("style", "opacity: 0; transition: opacity 0.5s;");
			setTimeout(function(){
				document.getElementById(cardID).children[0].setAttribute("src", "./images/card_" + ((cardID % 24) + 1) + ".png");
				document.getElementById(cardID).children[0].setAttribute("style", "opacity: 1; transition: opacity 0.5s;");
			}, 250);
		}
}

function clearRow(){
	cardRow = [];
}

function addRow(count){
	for(let i = 0; i < count; i++){
		console.log(card);
		createRow(i);
		document.getElementById("cards").innerHTML += cardRow;
		document.getElementById("cards").innerHTML += "</br>";
		document.getElementById("cards").innerHTML = document.getElementById("cards").innerHTML.replaceAll(",", "");
		
		clearRow();
	}
	document
}