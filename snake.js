class Snake {
	constructor(x, y, tileSize) {
		this.x = x;
		this.y = y;
		this.tail = [createVector(x,y), createVector(x+this.tileSize, y), createVector(x+2*this.tileSize, y)];
		this.tileSize = 20;
	}
	
	draw() {
		for (let i = 0; i < this.tail.length; i++) {
			fill(230);
			rect(this.tail[i].x * this.tileSize, this.tail[i].y * this.tileSize, this.tileSize, this.tileSize);
		}
	}
	
}