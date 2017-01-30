// Note: The snake can not run into it's own tail.
var snake = [0]; // Each position in the array is it's body segment. So 0 is the head and every position after is the body, with the last being the tail. Values of each position represent position on the grid.
var posApple;
var width = 34; // The width of the grid will be used for positional calculations. The grid is 33x33 cells.
var direction = "right";
var moving = "right";
var apple = 0; // location of the apple
var gameOn;
var gameStart = false;
var snakeDied = false;

// Controls
$(document).keydown(function(event){
// Start game
if(!gameStart && !snakeDied) {
    gameOn = setInterval(moveSnake, 100); // Start the moving function.
    appleTime(); // call the apple generating function
    gameStart = true;
}
  if(event.which === 38 && moving !== "down") {
    direction = "up";
  } else if(event.which === 39 && moving !== "left") {
    direction = "right";
  } else if(event.which === 37 && moving !== "right") {
    direction = "left";
  } else if(event.which === 40 && moving !== "up") {
    direction = "down";
  }
});

$(document).ready(function(){
  // Grid generation
	for(i=0; i<34*34; i++) {
  		$("#grid").append("<div class='cell' data-pos='"+i+"'></div>");
	}
  // Color head position.
	$(".cell").eq(0).css("background-color","purple");
});


function appleTime() {
  appleHere = false;
  while(!appleHere) {
    var n = Math.floor(Math.random()*1155);
    if(snake.indexOf(n) === -1) {
      $(".cell").eq(n).css("background-color", "green");
      appleHere = true;
      apple = n;
    }
  }
}


function moveSnake() {
  // Initialize two temp variables to get the body moving.
  var temp1 = snake[0] // store snake head's position
  var temp2;
  // If you're just a head, set last position to current head position before moving.
  if(snake.length === 1) {
    lastPos = snake[0];
  }


  // Move head
  // Uncolor current head cell.
  $(".cell").eq(snake[0]).css("background-color", "white");
  // Move current position to the right. If it is on the right edge, start back at the far left.
  
  // Moving right:
  if(direction === "right") {
    moving = "right";
	  if(snake[0] === 0 || (snake[0]-33)%width !== 0) {
	  	snake[0] += 1;
	  } else {
	  	snake[0] -= width-1;
	  }
  }

  // Moving left:
  if(direction === "left") {
    moving = "left";
    if(snake[0]%width !== 0) {
      snake[0] -= 1;
    } else {
      snake[0] += width-1;
    }
  }

  // Moving Up:
  if(direction === "up") {
    moving = "up";
    if(snake[0] > width-1) {
      snake[0] -= width;
    } else {
      snake[0] += 1122;
    }
  }

  // Moving Down:
  if(direction === "down") {
    moving = "down";
    if(snake[0] < 1122) {
      snake[0] += width;
    } else {
      snake[0] -= 1122;
    }
  }

  // Color new head cell.
  $(".cell").eq(snake[0]).css("background-color","purple");

  // Move body
  for(i=1; i<snake.length; i++) {
  	// If this position is the tail, store it's current position. We can then use this stored position to properly position any additional body segments gained from eating an apple.
  	if(i === snake.length-1) {
  		lastPos = snake[snake.length-1];
  	}
  	// Uncolor current position
  	$(".cell").eq(snake[i]).css("background-color","white");
    // Move body
    temp2 = snake[i]; // store current position
    snake[i] = temp1; // take from temp1
    temp1 = temp2; // set temp1 to your old position
  	// Color new location
  	$(".cell").eq(snake[i]).css("background-color","black");
  }

  // Apple eating and lose code.
  if(snake[0] === apple) {
    snake.push(lastPos);
    $(".cell").eq(lastPos).css("background-color", "black");
    appleTime();
  } else if(snake.indexOf(snake[0], 1) !== -1) {
    alert("Aw, fuck! You took a bite out of yourself! That's disgusting!");
    $(".cell").css("background-color", "red");
      clearInterval(gameOn);
      snakeDied = true;
  }
}
