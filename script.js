/* 
🌟 APP: Fighting Game

#1 ID 👉 'play' = Button to run simulation
#2 ID 👉 'result' = Div that holds the winner of the match
#3 ID 👉 'p1Health' = Div that holds player 1's health
#4 ID 👉 'p2Health' = Div that holds player 2's health
*/

let playButton = document.getElementById("play");
let resultDiv = document.getElementById("result");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, p1HealthDiv, p2HealthDiv, gameState) => {
  // Update the DOM with the latest health of players
  console.log(p1.health, p1, "👈👈👈👈");
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    result.innerText = game.declareWinner(game.isOver, p1, p2);
    return gameState;
  }
};

// ** Player class which can create a player with all it's attributes and methods **
// andrej = Player('Andrej', 100, 7)
// andrej.name 👉 'Andrej'
// andrej.health 👉 100
// andrej.attackDmg 👉 7
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg);
    enemy.health -= damageAmount;

    updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);

    return `${player.name} attacks ${enemy.name} for ${damageAmount}`;
  }
  // ** Heal the player for random number from  1 to 5 **
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5);
    player.health += hpAmount;

    updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState);
    return `${player.name} heals for ${hpAmount} + HP!`;
  }
}

// ** Game class - with all it's attributes and methods to run a match **
class Game {
  constructor(p1HealthDiv, p2HealthDiv) {
    this.isOver = false;
    this.p1HealthDiv = p1HealthDiv;
    this.p2HealthDiv = p2HealthDiv;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {
    let message;
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    } else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`;
    }
    console.log(isOver, message, "🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀", p2.health, p1.health);
    return message;
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    resultDiv.innerText = "";
    updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
  }

  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    this.reset(p1, p2);
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg);
      p2.heal(p2);
      p2.strike(p2, p1, p2.attackDmg);
      p1.heal(p1);
      updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
    }
    return this.declareWinner(this.isOver, player1, player2);
  }
}

// ** Creating 2 players using the player class **
let player1 = new Player("Joshua", 100, 15);
let player2 = new Player("Tyson", 100, 15);

// ** Save original Player Data **
let p1 = player1;
let p2 = player2;

// ** Create the game object from the Game class **
let game = new Game(p1HealthDiv, p2HealthDiv);

// ** Save original Game Data **
let gameState = game.isOver;

// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
play.onclick = () => (result.innerText = game.play(player1, player2));

// ** Player 1 Controls **
document.addEventListener("keydown", function (e) {
  if (e.key == "q" && player2.health > 0) {
    player1.strike(player1, player2, player1.attackDmg);
    document.getElementById("p1attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "a" && player2.health > 0) {
    player1.heal(player1);
    document.getElementById("p1heal").play();
  }
});

// ** Player 2 Controls **
document.addEventListener("keydown", function (e) {
  if (e.key == "p" && player1.health > 0) {
    player2.strike(player2, player1, player2.attackDmg);
    document.getElementById("p2attack").play();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "l" && player2.health > 0) {
    player2.heal(player2);
    document.getElementById("p2heal").play();
  }
});
