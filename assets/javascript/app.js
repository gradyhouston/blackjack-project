// Blackjack App
// TODO:
// build in logic for ties
// build in logic for if dealer gets 5 cards, dealer wins
// build logic for Aces to be 1 point or 11
// build logic for player win message on getting dealt 21
// Make a "play again?" button

// Card variables
var suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
var values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

// DOM variables
var textArea = document.getElementById("text-area");
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");

// Game variables
var gameStarted = false;
var gameOver = false;
var playerWon = false;
var dealerCards = [];
var playerCards = [];
var dealerScore = 0;
var playerScore = 0;
var deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

// Click listener for Hit Button
hitButton.addEventListener("click", function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

// Click listener for Stay Button
stayButton.addEventListener("click", function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck() {
    var deck = [];
      for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
          var card = {
            suit: suits[i],
            value: values[j]
          };
          deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
  for (var i = 0; i < deck.length; i++) {
    var shuffle = Math.trunc(Math.random() * deck.length);
    var temp = deck[shuffle];
    deck[shuffle] = deck[i];
    deck[i] = temp;
  }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function getCardNumericalValue(card) {
  switch(card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  var score = 0;
  var hasAce = false;
  for (var i = 0; i < cardArray.length; i++) {
    var card = cardArray[i];
    score += getCardNumericalValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {

  updateScores();

  if (gameOver) {
    // Lets the dealer take cards
    while (dealerScore < playerScore
        && playerScore <= 21
        && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }

  var dealerCardString = "";
  for (var i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(playerCards[i]) + "\n";
  }

  var playerCardString = "";
  for (var i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + "\n";
  }

  updateScores();

  textArea.innerText =
    "Dealer has:\n" +
    dealerCardString +
    "(score: " + dealerScore + ")\n\n" +

    "Player has: \n" +
    playerCardString +
    "(score: " + playerScore + ")\n\n";

    if (gameOver) {
      if (playerWon) {
        textArea.innerText += "You win!";
      }
      else {
        textArea.innerText += "You lose. Dealer wins";
      }
      newGameButton.style.display = "none";
      hitButton.style.display = "inline";
      stayButton.style.display = "inline";
    }
}
