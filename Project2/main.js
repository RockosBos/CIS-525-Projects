"use strict";
const getElement = selector => document.querySelector(selector);

// image constants 
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

let cards = [
	{id: 1, shown: false},
	{id: 2, shown: false},
	{id: 3, shown: false},
	{id: 4, shown: false},
	{id: 5, shown: false},
	{id: 6, shown: false},
	{id: 7, shown: false},
	{id: 8, shown: false},
	{id: 9, shown: false},
	{id: 10, shown: false},
	{id: 11, shown: false},
	{id: 12, shown: false},
	{id: 13, shown: false},
	{id: 14, shown: false},
	{id: 15, shown: false},
	{id: 16, shown: false},
	{id: 17, shown: false},
	{id: 18, shown: false},
	{id: 19, shown: false},
	{id: 20, shown: false},
	{id: 21, shown: false},
	{id: 22, shown: false},
	{id: 23, shown: false},
	{id: 24, shown: false},
	{id: 25, shown: false},
	{id: 26, shown: false},
	{id: 27, shown: false},
	{id: 28, shown: false},
	{id: 29, shown: false},
	{id: 30, shown: false},
	{id: 31, shown: false},
	{id: 32, shown: false},
	{id: 33, shown: false},
	{id: 34, shown: false},
	{id: 35, shown: false},
	{id: 36, shown: false},
	{id: 37, shown: false},
	{id: 38, shown: false},
	{id: 39, shown: false},
	{id: 40, shown: false},
	{id: 41, shown: false},
	{id: 42, shown: false},
	{id: 43, shown: false},
	{id: 44, shown: false},
	{id: 45, shown: false},
	{id: 46, shown: false},
	{id: 47, shown: false},
	{id: 48, shown: false},

]

let card = "<a href='#'><img src='./images/back.png' /></a>";

let cardRow = [];


document.addEventListener("DOMContentLoaded", () => {
    // display cards and player info
    

    // load settings data
    
 
	// add click event handler for each card link


    // add click event handler for each tab link button

    

    // add click event handler for Save Settings button
    
    
}); 

window.onload = function(){
	//localStorage.setItem("numCards", 6);
	console.log("Card Rows: " + localStorage.numCards / 8);
	newGame();
}

function newGame(){
	addRow(localStorage.getItem("numCards") / 8);
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
	alert("Settings Saved Successfully");
}

function createRow(rowNum){
	for(let i = 0; i < 8; i++){
		let cardNum = (i + 1 + (rowNum * 8)).toString()
		card = "<a id='" + cardNum + "' href='#' onclick='flipCard(" + cardNum + ")'><img src='./images/back.png' /></a>"
		cardRow.push(card);
	}

}

function flipCard(cardID){
	if(cards[cardID - 1].shown){
		cards[cardID - 1].shown = false;
		document.getElementById(cardID).children[0].setAttribute("src", "./images/back.png");
	}
	else{
		cards[cardID - 1].shown = true;
		document.getElementById(cardID).children[0].setAttribute("src", "./images/card_" + ((cardID % 24) + 1) + ".png");
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