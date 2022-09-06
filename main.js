


var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}



function buildDeck() {
    let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "king", "queen"];
    let suits = ["spades", "diamonds", "hearts", "clubs"];
    deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "_" + suits[i]);
        }
    }
    
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}


function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        var dealerCards = document.getElementById("dealers-cards")
        dealerCards.appendChild(cardImg);
    
    for(let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "cards/" + card + ".png";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        var playerCards = document.getElementById("player-cards")
        playerCards.appendChild(cardImg);
    }

    
    
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    var playerCards = document.getElementById("player-cards")
    playerCards.appendChild(cardImg);
    
    if(playerSum > 21) {
        let message = document.getElementById("message");
        message.innerText = "BUST"
    } else if (playerSum === 21) {
        let message = document.getElementById("message");
        message.innerText = "BLACKJACK";
    } 
    
    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
    console.log(playerSum)
    console.log(dealerSum)
}



function dealerHit() {
    if (dealerSum === 21) {
        let message = document.getElementById("message");
        message.innerText = "DEALER BLACKJACK"
    }
    if (dealerSum < playerSum) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    var playerCards = document.getElementById("player-cards")
    playerCards.appendChild(cardImg);
    }   
}
  
function stay() {
    cardFlip();
    dealerHit();
        if (dealerSum > 21) {
            let message = document.getElementById("message");
            message.innerText = "DEALER BUST"
        } else if (dealerSum > playerSum) {
            let message = document.getElementById("message");
            message.innerText = "DEALER WINS:("
        } else if (dealerSum < playerSum) {
            let message = document.getElementById("message");
            message.innerText = "PLAYER WINS:("
        } else if (dealerSum = 21) {
            let message = document.getElementById("message");
            message.innerText = "DEALER BLACKJACK"
        }
        
        console.log(playerSum)
        console.log(dealerSum)

}

function cardFlip() {
    let hiddenShow = document.getElementById("hidden");
    let hiddenImg = hidden;
    hiddenShow.src = "cards/" + hidden + ".png";
    hiddenShow.append(hiddenImg);
    console.log(hiddenShow)
}

function reduceAce(playerSum, playerAceCount) {
    
}


function getValue(card) {
    let data = card.split("_");
    let value = data[0];

    if(isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum> 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


