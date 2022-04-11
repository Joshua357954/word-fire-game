const WORD_LENGTH=5
const ALL_TILES_LENGTH=30
let TOADYS_WORD="ksoft"
const letterBox=()=> {

	return document.querySelectorAll(".w-box")
}

// ALL Selectors
	let WORD_GRID=document.querySelector('.w-container')
	let ALL_Letters=document.querySelectorAll(".key")
	let keyboard=document.querySelector(".key-box")
	let allLetters='qwertyuiopasdfghjklzxcvbnm'
	let boxLen=letterBox().length
	const FLIP_DURATION=250
	let typed=""

function startPlay(){
	ALL_Letters.forEach(letter => letter.addEventListener("click",handleLetters))
	window.addEventListener("keypress",handleKeyboard)
}

function pauseGame(){
	letters.forEach(letter => removeEventListener('click',handleLetters))
	removeEventListener('keypress',handleKeyboard)
}

startPlay()

function handleLetters(e){
	const lett= e.target.innerText

	if(lett=="Del"){
		deleteTile()
	}else if (lett=="Enter"){
		checkWord()
	}else{
		clickTile(lett)
	}
}

function handleKeyboard(e){
	
	const lett= e.key.toLowerCase()


	if (lett.match(/^[a-z]$/)){
		clickTile(lett)
	}

	else if(e.key=='Enter'){
		checkWord(typed)
	}

	else if(e.code=="Backslash" || e.key=="Backspace"){
		deleteTile()
	}
}

function pressedLetters(){

	return WORD_GRID.querySelectorAll("[data-pressed]")
}


function clickTile(letter){
	let currentTile=WORD_GRID.querySelector(":not([data-pressed])")
	
	if (pressedLetters().length < ALL_TILES_LENGTH){

		currentTile.innerText=letter
		currentTile.dataset.pressed="true"
		currentTile.dataset.active="true"
	}

	runNext()


	function runNext(){

		if ((dataActiveTiles().length) % WORD_LENGTH==0){

			checkWord()
		}
	}

}

function dataActiveTiles(){

	return  WORD_GRID.querySelectorAll('[data-active="true"]')
}


function deleteTile(){
	
	let toDelete=dataActiveTiles()[dataActiveTiles().length-1]
	console.log(toDelete)
	console.log(dataActiveTiles().length)

	if (dataActiveTiles().length >0 ){
		console.log("less Than Zero ...")
		delete toDelete.dataset.active
		delete toDelete.dataset.pressed
		toDelete.innerText=""
	}

	else{
		return 
	}
	
}

function getWord(){
	let newWord=""
	dataActiveTiles().forEach(item => newWord+=item.innerText)
	return newWord
}

let isGameOver=false

function checkWord(){
	let actLen=dataActiveTiles().length 

	if (actLen== WORD_LENGTH && isGameOver==false){
		console.log(getWord())
		if (getWord()==TOADYS_WORD)
			showAlert("correct word")

		dataActiveTiles().forEach((...iteM) => flipTiles(...iteM,getWord()))
		completeWord()

	}

	if (actLen < WORD_LENGTH && isGameOver==false){		
		showAlert("Incomplete ")	
		console.log(dataActiveTiles().length)
		doAnimation()
		// completeWord()
	}


	if(pressedLetters().length==ALL_TILES_LENGTH){
		gameOver()
	}
}

function gameOver(){
	isGameOver=true
	console.log("game is over oh ...")
}

function showAlert(message){
	let gb=document	.querySelector(".a-box")
	div=`<div class="alert ">	
		<p>${message}</p>
	</div>`
	gb.innerHTML=div
	document.querySelector('.alert').classList.remove("hide")

	setTimeout(()=>{
		document.querySelector('.alert').classList.add("hide")
	} ,1500)
}

function doAnimation(){
	let alert=document.querySelector(".alert")
	let tiles=dataActiveTiles()

	tiles.forEach(el=> { 
			el.classList.add('shake-tile')
			el.addEventListener('animationend',()=>{
			el.classList.remove('shake-tile')
		},{once:true})

	} )
}

function completeWord(){

	dataActiveTiles().forEach(item => {

		item.dataset.complete="true"

		delete item.dataset.active

	})

}



function flipTiles(tile,idx,array,guess){
	let ges=[...guess]
	let rword=[...TOADYS_WORD]
	let leta = tile.innerText
	let keys=keyboard.querySelector(`[data-letter="${leta}"]`)
	console.log(rword)
	setTimeout(()=>{
		tile.classList.add('flip-tile')

		if (guess[idx]==TOADYS_WORD[idx]){
			tile.classList.add("correct")
			keys.classList.add('correct')}


		else if (TOADYS_WORD.includes(guess[idx])){
			tile.classList.add("wrong-location")
			keys.classList.add("wrong-location")}

		else{
			tile.classList.add("wrong")
			keys.classList.add("wrong")}
	tile.addEventListener('animationend',()=> tile.classList.remove("flip-tile"))
	
	},idx*FLIP_DURATION/2)
}




// Local Storage
localStorage.setItem()
let local=localStorage.setItem("WordFireP",new Date())
console.log(new Date())

function checkPlayed(){
	let idxx=0
	let store=localStorage.getItem("WordFire")
	store.forEach(item => {
		if (item==new Date())
			idxx++
	})
	return idxx
}

console.log(checkPlayed())
// 	if (localStorage.getItem("WordFire")=="Played" )
// 		return true
// }









