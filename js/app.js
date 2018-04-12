/*
 * Create a list that holds all of your cards
 */
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
			 "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb",
			 "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cards = shuffle(cards);

const deck = document.querySelector('.deck');
const fragment = document.createDocumentFragment();
let counter = 0;

for (card of cards) {
	let item = document.createElement('li');
	let icon = document.createElement('i');
	item.appendChild(icon);
	item.className = 'card ' + card;
	item.id = counter;
	fragment.appendChild(item);
	counter++;
}

deck.appendChild(fragment);


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

let openCards = [];

deck.addEventListener('click', function(e) {
	if (e.target.nodeName === 'LI' && !e.target.classList.contains('show')) {
		// Show card
		displayCard();
		// Add card to 'open cards' list
		addOpenCard(e.target.id);
	}

	if (openCards.length == 2) {
		checkMatch();


	}


});



function displayCard() {
	event.target.classList.add('show');
	event.target.classList.add('open');
}

function addOpenCard(cardId) {
	openCards.push(cardId);
}

function checkMatch() {
	let firstCard = document.getElementById(String(openCards[0]));
	let secondCard = document.getElementById(String(openCards[1]));
	
	if (firstCard.className === secondCard.className) {
		firstCard.classList.add('match');
		secondCard.classList.add('match');
		openCards = [];
	} else {
		firstCard.classList.remove('open');
		firstCard.classList.remove('show');
		secondCard.classList.remove('open');
		secondCard.classList.remove('show');
		openCards = [];
	}


}

function hideCards() {
	event.target.classList.remove('show');
	event.target.classList.remove('open');	
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