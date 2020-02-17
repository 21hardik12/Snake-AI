let Boundries;
let tileSize;
let snake;
function setup() {
	createCanvas(600, 600);
	tileSize = 20;
	Boundries = [
		[0, 0, tileSize, height],//left
		[width-tileSize, 0, tileSize, height],//right
		[0, 0, width, tileSize],//upper
		[0, height-tileSize, width, tileSize]//bottom
	];
	snake = new Snake(int(random(10, 20), int(random(10, 20)), tileSize));
}

function draw() {
	background(100);
	// Drawing the Boundries;
	for (let i = 0; i < Boundries.length; i++) {	
		fill(250);
		rect(Boundries[i][0], Boundries[i][1], Boundries[i][2], Boundries[i][3]);
	}
	snake.draw();
}