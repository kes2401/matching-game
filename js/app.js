/*
 * Create a list that holds all of your cards
 */
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
			 "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb",
			 "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"]; // all cards available in the game
let moves; // Counts the number of moves the user has made
let openCards; // Holds the current open cards

const deck = document.querySelector('.deck');
const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.close-btn');
const restart = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function init() {

	moves = 0;
	openCards = [];

	document.querySelector('.moves').textContent = moves; // reset moves to zero onscreen
	
	// remove any styles used to hide stars	in score panel
	const stars = document.getElementsByClassName('fa-star');
	for (star of stars) {
		if (star.style) {
			star.removeAttribute("style");
		}
	}

	cards = shuffle(cards); // shuffles the deck of cars

	// check if deck contains any child elements and if so remove them all
	if (deck.firstChild) {
		while (deck.firstChild) {
    		deck.removeChild(deck.firstChild);
		}
	}
	// create a new offscreen Document Fragment to add new shuffled cards
	const fragment = document.createDocumentFragment();
	let idCounter = 0;
	for (card of cards) {
		let item = document.createElement('li');
		let icon = document.createElement('i');
		item.appendChild(icon);
		item.className = 'card ' + card;
		item.id = idCounter;
		fragment.appendChild(item);
		idCounter++;
	}

	deck.appendChild(fragment); // add Document Fragment to the DOM
}

init(); // initialise the game

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function(e) {
	if (e.target.nodeName === 'LI' && !e.target.classList.contains('show')) {
		// Show card
		displayCard();
		// Add card to 'open cards' list
		addOpenCard(e.target.id);
	}

	if (openCards.length == 2) {
		incrementMoves();
		checkMatch();
	}
});

backdrop.addEventListener('click', hideModal);
closeBtn.addEventListener('click', hideModal);
restart.addEventListener('click', init);

// function to display card when it is clicked
function displayCard() {
	event.target.classList.add('show', 'open');
}

// function to add clicked card to open cards list
function addOpenCard(cardId) {
	openCards.push(cardId);
}

// function called to check if both open cards match
function checkMatch() {
	const firstCard = document.getElementById(String(openCards[0]));
	const secondCard = document.getElementById(String(openCards[1]));
	
	if (firstCard.className === secondCard.className) {
		setTimeout(function() {
			firstCard.classList.add('match');
			secondCard.classList.add('match');
			openCards = [];
			checkForWin();			
		}, 500);
	} else {
		setTimeout(function() {
			firstCard.classList.remove('open', 'show');
			secondCard.classList.remove('open', 'show');
			openCards = [];
		}, 1000);
	}
}

// function called to increment the moves counter, update the DOM and reduce star rating depending on total moves taken
function incrementMoves() {
	moves++;
	document.querySelector('.moves').textContent = moves;
	if (moves === 10) {
		document.querySelector('.star-3').style.display = 'none';
	} else if (moves === 20) {
		document.querySelector('.star-2').style.display = 'none';
	}
}

// function called to check if the game is won by matching all cards
function checkForWin() {
	// Check if all cards contain the class 'match', if so then game is won
	const fullDeck = document.querySelectorAll('.card');
	const win = Array.prototype.every.call(fullDeck, function(item){
		return item.classList.contains('match');
	});

	if (win) {
		showModal();
	}
}

// function called to show win modal once game is won
function showModal() {
	document.querySelector('.backdrop').style.display = 'block';
	document.querySelector('.modal').style.display = 'block';
	document.querySelector('.total').textContent = moves;
}

// function called to remove win modal
function hideModal() {
	document.querySelector('.backdrop').style.display = 'none';
	document.querySelector('.modal').style.display = 'none';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}