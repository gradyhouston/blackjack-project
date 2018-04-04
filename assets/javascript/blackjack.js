
function createDeck() {

    var newDeck = [];

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < cardNames.length; j++) {

            var card = {
                image: "",
                name: "",
                suit: "",
                title: ""
            };

            card.name = cardNames[j];
            card.suit = suits[i];
            card.image = "../images/" + suits[i] + "/" + cardNames[j];
            card.title = cardNames[j] + " of " + suits[i];

            switch(cardNames[j]) {
                case "ace":
                    card.value = [1,11];
                    break;
                case "two":
                    card.value = 2;
                    break;
                case "three":
                    card.value = 3;
                    break;
                case "four":
                    card.value = 4;
                    break;
                case "five":
                    card.value = 5;
                    break;
                case "six":
                    card.value = 6;
                    break;
                case "seven":
                    card.value = 7;
                    break;
                case "eight":
                    card.value = 8;
                    break;
                case "nine":
                    card.value = 9;
                    break;
                default:
                    card.value = 10;
            }
            newDeck.push(card);
        }
    }
    return(newDeck);
}

  function manageGameResults() {
  // This function ONLY handles end-of-game cases
  if (gameOver) {

  // Trivial end-of-game cases

    if (player.score === 21 && dealer.score < 21) {
      playerWon = true;
      player.finalScore = player.score;
      dealer.finalScore = dealer.score;
      return;
    }// Player wins

    if (dealer.score === 21 && player.score < 21) {
      playerWon = false;
      player.finalScore = player.score;
      dealer.finalScore = dealer.score;
      return;
    }// Dealer wins

    if (player.score > dealer.score) {
      playerWon = true;
    }
    else if (player.score === dealer.score) {
      push = true;
      }
    else {
      playerWon = false;
    }
    return;
    }

  //Conditions that should end the game before the dealer finishes playing his hand

    else {
      if (player.score > 21) {
        playerWon = false;
        gameOver = true;
        player.finalScore = player.score;
        dealer.finalScore = dealer.score;
        return;
      }// Dealer wins

      if (dealer.score > 21) {
        playerWon = true;
        gameOver = true;
        player.finalScore = player.score;
        dealer.finalScore = dealer.score;
        return;
      }// Player wins

  // More complex end-of-game cases

      if (player.score === 21 &&
        player.cards.length === 2 &&
        dealer.score === 21 &&
        dealer.cards.length > 2) {
          playerWon = true;
          gameOver = true;
          blackjack = true;
          player.finalScore = player.score;
          dealer.finalScore = dealer.score;
          return;
      }// Player wins

      if (player.score === 21 &&
        player.cards.length === 2 &&
        dealer.score < 21) {
          playerWon = true;
          gameOver = true;
          blackjack = true;
          player.finalScore = player.score;
          dealer.finalScore = dealer.score;
          return;
      }// Player wins

      if (dealer.score === 21 &&
        dealer.cards.length === 2 &&
        player.score === 21 &&
        player.cards.length > 2) {
          playerWon = false;
          gameOver = true;
          blackjack = true;
          player.finalScore = player.score;
          dealer.finalScore = dealer.score;
          return;
      }// Dealer wins
    }
  }

  function showStatus() {

    if (!gameStarted) {
      textArea.innerText = "Welcome to Blackjack!";
      return;
    }

    var dealerCardString = "";
    if (player.status === "stay") {
      for (var i = 0; i < dealer.cards.length; i++) {
        dealerCardString += dealer.cards[i].title + "\n";
      }
    }
    else {
      dealerCardString += dealer.cards[0].title + "\n";
    }

    var playerCardString = "";
    for (var i = 0; i < player.cards.length; i++) {
      playerCardString += player.cards[i].title + "\n";
    }

    textArea.innerText =
      "Dealer has:\n" +
      dealerCardString +
      "(score: " + dealer.score + ")\n\n" +

      "Player has: \n" +
      playerCardString +
      "(score: " + player.score + ")\n\n";

      if (gameOver) {
        if (playerWon) {
          textArea.innerText += "You win!";
        }
        else if (push) {
          textArea.innerText += "Player and Dealer push. No one wins.";
        }
        else {
          textArea.innerText += "You lose. Dealer wins";
        }
        setTimeout(function() {resetGame();}, 5000);
      }
  }

  function resetGame() {
    player.cards = [];
    dealer.cards = [];

    player.score = 0;
    dealer.score = 0;

    player.status = "";
    newGameButtonProperty.style.display = "inline";
    hitButtonProperty.style.display = "none";
    stayButtonProperty.style.display = "none";

    gameOver = false;
    gameStarted = false;
    showStatus();
  }

  function saveGameData() {
    var playerName = player.screenName;
    table.players.push(playerName);
    tableID = database.ref('table').push(table).key;
    console.log(tableID);
  }

// Card variables
var suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
var cardNames = ["ace", "king", "queen", "jack", "ten", "nine", "eight", "seven", "six", "five", "four", "three", "two"];

// DOM variables
var textArea = document.getElementById("text-area");
var newGameButton = "#new-game-button";
var hitButton = "#hit-button";
var stayButton = "#stay-button";
var newGameButtonProperty = document.getElementById('new-game-button');
var hitButtonProperty = document.getElementById('hit-button');
var stayButtonProperty = document.getElementById('stay-button');
var playerOneHand = document.getElementById("player-1");
var playerTwoHand = document.getElementById("player-2");
var playerThreeHand = document.getElementById("player-3");

// Game variables
var gameStarted = false;
var gameOver = false;
var playerWon = false;
var blackjack = true;
var push = false;


var decks = [];
var stayCount = 0;

// Initialize Firebase DB
var config = {
    apiKey: "AIzaSyAetl9uxbX0cwIibK_H1PUydPLuDtaZOho",
    authDomain: "blackjack-project.firebaseapp.com",
    databaseURL: "https://blackjack-project.firebaseio.com",
    projectId: "blackjack-project",
    storageBucket: "blackjack-project.appspot.com",
    messagingSenderId: "17576552103"
  };
  firebase.initializeApp(config);


// Database variables

var database = firebase.database();
var deck = [];

// Table Concept
var table = {
  gameDeck: [],
  uniqueID: "",
  minBet: 25,
  players: []
};

// Dealer Concept
var dealer = {


  score: 0,
  hasAce: false,
  cards: [],
  finalScore: 0,

  shuffleDeck: function (deck) {
      for (var i = 0; i < deck.length; i++) {
        var shuffle = Math.trunc(Math.random() * deck.length);
        var temp = deck[shuffle];
        deck[shuffle] = deck[i];
        deck[i] = temp;
      }
    },

  getNextCard:  function () {
      return deck.shift();
    },

  dealCards: function () {
    player.cards = [this.getNextCard(),this.getNextCard()];
    this.cards = [this.getNextCard(), this.getNextCard()];
  },

  playHand: function () {
      // Lets the dealer take cards
      while (dealer.score < 17) {
        dealer.cards.push(this.getNextCard());
        dealer.updateDealerScore();
        console.log('after playing hand, dealer score is ',dealer.score);
        manageGameResults();
        showStatus();
      }
      gameOver = true;
      showStatus();
  },

  revealCard: function () {
    // Reset the image path to the one associated with the dealer's hidden card
    showStatus();
  },

  updateDealerScore: function () {
    if (player.status === "stay") {
      this.score = 0;
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].name === "ace") {
          this.score += this.cards[i].value[0];
          this.hasAce = true;
        }
        else {
          this.score += this.cards[i].value;
        }
      }
        if (this.hasAce && this.score + 10 <= 21) {
          return this.score + 10;
        }
        return this.score;
      }
    else {
      this.score = 0;
      if (this.cards[0].name === "ace") {
        this.score += this.cards[0].value[0];
      }
      else {
        this.score += this.cards[0].value;
      }
    }
  }
}

var player = {

  score: 0,
  cards: [],
  hasAce: false,
  status: "",
  screenName: "Pocket Rockets",
  chipCount: 100,

  hitMe: function() {
    this.cards.push(dealer.getNextCard());
  },

  updatePlayerScore: function() {

    if (this.status === "stay") {
      return this.score
    }
    else {
      this.score = 0;
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].name === "ace") {
        this.score += this.cards[i].value[0];
        console.log('player score is ',this.score);
        this.hasAce = true;
        }
        else {
          this.score += this.cards[i].value;
          console.log('player score is ',this.score);
        }
      }
        if (this.hasAce && this.score + 10 <= 21) {
          this.score += 10;
          console.log('player score is ',this.score);
          return this.score
        }
      return this.score;
    }
  }
}

$(document).ready(function() {
// Main section of code
  hitButtonProperty.style.display = "none";
  stayButtonProperty.style.display = "none";
  textArea.innerText = "Welcome to Blackjack!";
  deck = createDeck();
  table.gameDeck = deck;

  // displays the modal
  $('#myModal').modal('show');

  var playButton = $("#play-button");
  var nameField = $("#name-field");


  $(playButton).on("click", function(event) {
    console.log(nameField.val());
  })

  //Click listener for New Game Button
  $('body').on("click", newGameButton, function(event) {
    event.preventDefault();
    gameStarted = true;

    dealer.shuffleDeck(deck);
    dealer.dealCards();

    newGameButtonProperty.style.display = "none";
    hitButtonProperty.style.display = "inline";
    stayButtonProperty.style.display = "inline";

    player.updatePlayerScore();
    dealer.updateDealerScore();
    manageGameResults();
    saveGameData();
    showStatus();
    });

  // Click listener for Hit Button
  $('body').on("click", hitButton, function(event) {
    event.preventDefault();
    player.hitMe();
    player.updatePlayerScore();
    manageGameResults();
    showStatus();
    });

  // Click listener for Stay Button
  $('body').on("click", stayButton, function(event) {
    event.preventDefault();
    player.status = "stay";
    dealer.revealCard();
    dealer.updateDealerScore();
    manageGameResults();
    showStatus();
    console.log('after player stays the dealer score is ', dealer.score);
    dealer.playHand();
    });
  });
