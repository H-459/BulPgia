//main js

//create random 4 digit array with no repeating numbers.  

//commentes

const MAX_RETRIES = 10;
const NUM_LENGTH = 4

const renderHistory = (max_retries) =>{
	let historyTable = document.querySelector("#history_table");
	let tableText;
	let newRow;
	for (let i = 0; i < max_retries; i++){
		tableText = `<tr><td class="table_player_guess_${i}" headers="guess_col"></td><td class="res_row_${i}" style="display: flex;" headers="res_col"><div class="res blank"></div><div class="res blank"></div><div class="res blank"></div><div class="res blank"></div></td> </tr>`;
		newRow = historyTable.insertRow(-1);
		newRow.innerHTML = tableText
	}	
	
}

const gameInit = () =>{

	//render history table
	renderHistory(MAX_RETRIES);

	//define 1-9 range
	let digits = ["1","2","3","4","5","6","7","8","9"];
	let randomArray = [];

	//pick 4 random elements from array
	for (let i = 0; i < NUM_LENGTH; i++){
		let randomizer = Math.floor((Math.random() * (digits.length-i)));
		let temp = digits.splice(randomizer,1);
		randomArray.push(temp[0]);	
	}
	return randomArray;


}


const boardCheck = (playerGuess, opponentBoard) => {

	boole = 0;
	pgia = 0;
	playerGuess.forEach(e => {
		if (opponentBoard.includes(e)){
			pgia++;
			if (playerGuess.indexOf(e) == opponentBoard.indexOf(e)){
				pgia --;
				boole++;
			}
		}
	})
}


const addToHistory =  (playerGuess, boolim, pgiot,guessNumber) =>{
	let historyTable = document.querySelector("#history_table");
	guessNumber = (MAX_RETRIES - 1) - guessNumber;
	document.querySelector(".table_player_guess_" + guessNumber).innerHTML = playerGuess;

	if (boolim > 0 || pgiot > 0){
	for (let i = 0; i < boolim; i++){

		document.querySelector(".res_row_" + guessNumber + "> .res.blank").classList.add("b");
		document.querySelector(".res_row_" + guessNumber + "> .res.blank").classList.remove("blank");
	}

	for (let j = 0; j < pgiot; j++){

		document.querySelector(".res_row_" + guessNumber + "> .res.blank").classList.add("p");
		document.querySelector(".res_row_" + guessNumber + "> .res.blank").classList.remove("blank");

	}
	}

	
}


let boole;
let pgia;
let i = MAX_RETRIES;      
const historyWindow = document.querySelector("#history");
let playerInputElement = document.querySelector("#user_guess");
let checkButton = document.querySelector("#checkResult");
let resetButton = document.querySelector("#reset");
let messages = document.querySelector("#messages");
let instructionsButton = document.querySelector("#instructions_button");
let instructionsElement = document.querySelector("#instructions");
let triesElement = document.querySelector("#tries");
let opponentBoard = gameInit();
triesElement.textContent = `you have ${MAX_RETRIES}/${MAX_RETRIES} tries left`;

instructionsButton.addEventListener("click", () => {
	instructionsElement.classList.toggle("visible");
	instructionsElement.classList.toggle("hidden");
})

checkButton.addEventListener("click", () =>{
	let playerGuess = playerInputElement.value; 
	messages.textContent ="";
	console.log(playerGuess);
	if( i != 0 ){
		if( (Number(playerGuess) < 1000) || (Number(playerGuess) > 9999 )){
			messages.textContent = "INVALID NUMBER";
		} else {

			i--;
			playerGuess = playerGuess.split('');
			boardCheck(playerGuess, opponentBoard);
			addToHistory(playerGuess, boole, pgia,i );
			triesElement.textContent = `you have ${i}/${MAX_RETRIES} tries left`;
			console.log(`opponent board is ${opponentBoard} and you guessed ${playerGuess}`)
			console.log(`you have ${boole} boolim and ${pgia} pgiot`)
			if (boole > 3){
				messages.textContent = "You Win!";
				checkButton.classList.add("hidden");
			}
		}
	} else {
		messages.textContent = "You Lose!";
		checkButton.classList.add("hidden");
		checkButton.classList.remove("visible");
	}
})

resetButton.addEventListener("click", () => {
	let oldTable = document.getElementsByTagName("tr");
	for (let i = MAX_RETRIES; i > 0; i-- ){
		oldTable[i].remove();
	}
	triesElement.textContent = `you have ${MAX_RETRIES}/${MAX_RETRIES} tries left`;
	opponentBoard = gameInit();
	checkButton.classList.remove("hidden");
	checkButton.classList.add("visible");
	i = MAX_RETRIES;


})

//boardCheck(playerGuess, opponentBoard);



	


	

 