let Boundries;
let tileSize;
let snake;
let food;
function setup() {
	createCanvas(600, 600);
	tileSize = 20;
	Boundries = [
		[0, 0, tileSize, height],//left
		[width-tileSize, 0, tileSize, height],//right
		[0, 0, width, tileSize],//upper
		[0, height-tileSize, width, tileSize]//bottom
	];
	snake = new Snake(int(random(10, 20)) * tileSize, int(random(10, 20)) * tileSize, tileSize);
	frameRate(15);
	gen_food();
}

let left = [-1, 0];
let right = [1, 0];
let up = [0, -1];
let down = [0, 1];
let dir = right;
function keyPressed() {
	if (keyCode == UP_ARROW && dir != down) {
		dir = up;
	}
	if (keyCode == DOWN_ARROW && dir != up) {
		dir = down;
	}
	if (keyCode == RIGHT_ARROW && dir != left) {
		dir = right;
	}
	if (keyCode == LEFT_ARROW && dir != right) {
		dir = left;
	}
	snake.set_dir(dir);
}

function gen_food() {
	food = createVector(int(random(2, 28)) * tileSize, int(random(2, 28)) * tileSize);
}

function draw() {
	background(100);
	// Drawing the Boundries;
	for (let i = 0; i < Boundries.length; i++) {	
		fill(0);
		rect(Boundries[i][0], Boundries[i][1], Boundries[i][2], Boundries[i][3]);
	}
	// Drawing the food;
	fill(255, 70, 10);
	rect(food.x, food.y, tileSize, tileSize);
	
	snake.update();
	snake.draw();
	if (snake.eatFood(food)) {
		gen_food();
	}
}