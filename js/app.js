var victoryCounter = 0;

var canvasWidth = 505;
var canvasHeight = 606;

var numberHorBlocks = 5;
var numberVerBlocks = 6;

var blockWidth = 101;
var blockHeight = 171;

/**
 * @name Player
 * @description Character whose position is controlled by the player through keyboard inputs.
 */
var Player = function() {
  this.sprite = 'images/char-boy.png';

  // Initial position
  this.x = 200;
  this.y = 400;
};


/**
 * @name Enemy
 * @param x initial x position
 * @param y initial y position
 * @description Vehicle that the player should avoid in order to win the game. It crosses the canvas from left to right and has a random speed.
 */
 var Enemy = function(x, y) {
  this.sprite = 'images/enemy-bug.png';

  // width of the image in pixels
  this.width = 107;
  this.x_radius = this.width / 2;

  // Initial position
  this.x = x;
  this.y = y;

  // enemy's speed is randomly chosen in the interval: [100, 600]
  this.speed = (Math.random() * 500) + 100;
};

/**
 * @name update
 * @description Update the enemy's position
 * @param dt A time delta between ticks
 */
Enemy.prototype.update = function(dt) {

  // If the enemy is within the canvas, make it move to the right
  if(this.x <= (505 + this.width)) {
    this.x += this.speed * dt;
  } else { // if the enemy goes off screen, then reset its position
    this.x = -1 * this.width;
  }

  // reset the player if he is found within the horizontal radius of the enemy
  if  (player.x >= this.x - this.x_radius
    && player.x <= this.x + this.x_radius
    && player.y >= this.y - this.x_radius
    && player.y <= this.y + this.x_radius) {
      player.reset();
  }
};

/**
 * @name render
 * @description Renders the enemy
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @name reset
 * @description Resets the player's position
 */
Player.prototype.reset = function() {
  this.x = (blockWidth * numberHorBlocks / 2) - blockWidth / 2;
  this.y = (blockHeight * numberVerBlocks / 2) - blockHeight / 1.5 + 1;
};

/**
 * @name render
 * @module Player
 * @description Renders the player
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @name update
 * @module Player
 * @description Updates player's position while making sure to keep him within the canvas
 */
Player.prototype.update = function() {

  // handle input keys and make sure that the player stays within the canvas  
  if(this.ctlKey === 'left' && this.x >= 0){
    this.x = this.x - blockWidth;
  } else if(this.ctlKey === 'right' && this.x < 400){
    this.x = this.x + blockWidth;
  } else if(this.ctlKey === 'up'){
    this.y = this.y - blockHeight/2;
  } else if (this.ctlKey === 'down' && this.y < 400){
    this.y = this.y + blockHeight/2;
  }
  this.ctlKey = null;

  // Reset player's position if he managed to reach the river
  if(this.y < 25){
    this.reset();

    // update and display the victory counter
    victoryCounter++;
    $('p').html("Points: " + victoryCounter);
  }
};

/**
 * @name handleInput
 * @param event
 * @description Update to the latest key that was pressed
 */
Player.prototype.handleInput = function(event) {
  this.ctlKey = event;
};

var player = new Player();
var allEnemies = [];

// Define y coordinates of the vehicle rows
var yFirstRow = 230;
var ySecondRow = 142;
var yThirdRow = 57;

// Add the enemies
allEnemies.push(new Enemy(-2, yFirstRow));
allEnemies.push(new Enemy(-2, yFirstRow));
allEnemies.push(new Enemy(-2, ySecondRow));
allEnemies.push(new Enemy(-2, yThirdRow));
allEnemies.push(new Enemy(-2, yThirdRow));

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});