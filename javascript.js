let firstPick = -1;
let secondPick = false;
let firstValue;
let secondValue;
let counter = 0;
let activePlayer = 0;
let name1;
let name2;

const gameOver = document.querySelector("#game-over");
const startGame = document.querySelector("#start-game");

let win = [];
let values = [];
let picks = [];
let cards = [];
let isOk = [];

playerOne = {
  name: name1,
  points: 0,
};

playerTwo = {
  name: name2,
  points: 0,
};

/*
function addPlayers() {
  let players = document.getElementById("addPlayers").value;
  for (let i = 1; i <= players; i++) {
    let playerInput = document.createElement("input");
    playerInput.id = "player" + i;
    playerInput.placeholder = "Spelare " + i;
    document.getElementById("playerContainer").appendChild(playerInput);
    const player = Object.create(playerOne);
    player.name = name;
    player.points = 0;
    console.log(player);
  }
}
  */

function players() {
  activePlayer = Math.floor(Math.random() * 2);
  playerOne.name = document.getElementById("playerOne").value;
  playerTwo.name = document.getElementById("playerTwo").value;
  name1 = playerOne.name || "guest 1";
  name2 = playerTwo.name || "guest 2";

  document.getElementById("playerTurn").style.display = "block";

  if (activePlayer % 2 === 0) {
    document.getElementById("playerTurn").innerHTML = "Spelare: " + name1;
  } else {
    document.getElementById("playerTurn").innerHTML = "Spelare: " + name2;
  }

  document.getElementById("con").style.display = "grid";
  startGame.style.display = "none";
  document.querySelector("#memory").style.display = "none";
}

shuffle();
nameCards();

function nameCards() {
  for (let i = 1; i <= 16; i++) {
    let card = document.getElementById(i.toString());
    cards.push(card);
  }
}

function shuffle() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  const container = document.getElementById("con");
  const shuffleCards = allCards.sort(() => Math.random() - 0.5);

  shuffleCards.forEach((card) => container.appendChild(card));
}

function pressed(num) {
  if (isOk.some((element) => element === num)) {
    console.log("error");
  } else {
    pressCard(num);
  }
}

function pressCard(num) {
  cards[num].style.opacity = "1";

  if (firstPick === -1) {
    firstValue = cards[num].getAttribute("data-value");
    firstPick = num;
    picks.push(firstPick);
    values.push(firstValue);
  } else {
    if (num != firstPick) {
      secondValue = cards[num].getAttribute("data-value");
      picks.push(num);

      secondPick = true;
      values.push(secondValue);
    }
  }
  checkRight(values, cards, picks);
}

function checkRight(values, pick, picks) {
  if (secondPick) {
    if (values[0] === values[1]) {
      win.push(picks);
      isOk.push(picks[0], picks[1]);
      counter++;

      if (activePlayer % 2 === 0) {
        playerOne.points++;
      } else {
        playerTwo.points++;
      }

      youWon(win);
    } else {
      counter++;
      activePlayer++;
      if (activePlayer % 2 === 0) {
        document.getElementById("playerTurn").innerHTML = "Spelare: " + name1;
      } else {
        document.getElementById("playerTurn").innerHTML = "Spelare: " + name2;
      }

      for (let i = 0; i < picks.length; i++) {
        const card = pick[picks[i]];
        if (card) {
          setTimeout(() => {
            card.style.opacity = "0";
          }, 1000);
        }
      }
    }

    firstPick = -1;
    secondPick = false;

    picks.length = 0;
    values.length = 0;
  }
}

function youWon(win) {
  if (win.length === 8) {
    document.getElementById("con").style.display = "none";
    document.body.style.backgroundColor = "black";

    gameOver.style.display = "block";

    document.getElementById("playerTurn").style.display = "none";

    if (playerOne.points > playerTwo.points) {
      document.getElementById("text").innerHTML = name1 + " won!";
    } else if (playerOne.points < playerTwo.points) {
      document.getElementById("text").innerHTML = name2 + " won!";
    } else {
      document.getElementById("text").innerHTML = "It´s a tie!";
    }

    document.getElementById(
      "playerOneScore"
    ).innerHTML = `${name1}: ${playerOne.points}`;
    document.getElementById(
      "playerTwoScore"
    ).innerHTML = `${name2}: ${playerTwo.points}`;

    document.getElementById("counter").innerHTML =
      "Antal gissningar: " + counter;
  }
}
function reset() {
  gameOver.style.display = "none";
  startGame.style.display = "block";

  isOk.length = 0;
  activePlayer = 0;
  playerOne.points = 0;
  playerTwo.points = 0;
  counter = 0;
  document.body.style.backgroundColor = "white";
  win.length = 0;
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = "0";
  }
  shuffle();
}
