class Snake {
	constructor(x, y, tileSize) {
		this.x = x;
		this.y = y;
		this.tail = [createVector(this.x, this.y), createVector(this.x+1, this.y), createVector(this.x+2, this.y)];
		this.tileSize = tileSize;
	}
	
	draw() {
		for (let i = 0; i < this.tail.length; i++) {
			fill(230);
			rect(this.tail[i].x * this.tileSize, this.tail[i].y * this.tileSize, this.tileSize, this.tileSize);
		}
	}
	
	update() {
		
		
	}
	
}