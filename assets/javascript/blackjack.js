
function createDeck() {
    
    var newDeck = [];
        
    for (var i = 0; i < suits.length; i++) {
        console.log('this is iteration ',i, ' of the first loop');
        for (var j = 0; j < cardNames.length; j++) {
            console.log('this is iteration ',j, ' of the second loop');
            console.log('card name ', cardNames[j]);
            console.log('suit name ', suits[i]);

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
            console.log(card);
            newDeck.push(card);
        }
    }
    return(newDeck);
}

function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
      var shuffle = Math.trunc(Math.random() * deck.length);
      var temp = deck[shuffle];
      deck[shuffle] = deck[i];
      deck[i] = temp;
    }
  }

  function getNextCard() {
    return deck.shift();
  }

  function getScore(cardArray) {
    var score = 0;
    var hasAce = false;
    for (var i = 0; i < cardArray.length; i++) {
      var card = cardArray[i];
      console.log('cardArray[i]',cardArray[i]);
      console.log('card',card);
      score += card.value;
      if (card.name === "ace") {
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
      dealerCardString += dealerCards[i].title + "\n";
    }
  
    var playerCardString = "";
    for (var i = 0; i < playerCards.length; i++) {
      playerCardString += playerCards[i].title + "\n";
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

// Card variables
var suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
var cardNames = ["ace", "king", "queen", "jack", "ten", "nine", "eight", "seven", "six", "five", "four", "three", "two"];

// DOM variables
var textArea = document.getElementById("text-area");
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");
var playerOneHand = document.getElementById("player-1");
var playerTwoHand = document.getElementById("player-2");
var playerThreeHand = document.getElementById("player-3");

// Game variables
var gameStarted = false;
var gameOver = false;
var playerWon = false;
var dealerCards = [];
var playerCards = [];
var dealerScore = 0;
var playerScore = 0;
var deck = [];
var decks = [];

hitButton.style.display = "none";
stayButton.style.display = "none";

showStatus();

//Click listener for New Game Button
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