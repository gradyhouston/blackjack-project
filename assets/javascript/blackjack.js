
function buildDeck() {
    
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
            
var thisDeck = [];

var suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
var cardNames = ["ace", "king", "queen", "jack", "ten", "nine", "eight", "seven", "six", "five", "four", "three", "two"];

thisDeck = buildDeck();
console.log('the final deck is ',thisDeck);