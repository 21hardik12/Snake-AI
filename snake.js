class Snake {
	constructor(x, y, tileSize) {
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.dir = [1, 0];
		this.xspeed = 1;
		this.yspeed = 1;
		this.total = 1;
	}	
	
	eatFood(food) {
		let dis = dist(this.x, this.y, food.x, food.y);
		if (dis < this.tileSize) {
			this.total++;
			return true;
		} else {
			return false;
		}
	}
	
	draw() {
		fill(255);
		rect(this.x, this.y, this.tileSize, this.tileSize);		
	}
	
	set_dir(dir) {
		this.dir = dir;
	}
	
	update() {
		this.x += this.xspeed * this.dir[0] * this.tileSize;
		this.y += this.yspeed * this.dir[1] * this.tileSize;
		this.x = constrain(this.x, this.tileSize, width-this.tileSize-this.tileSize);
		this.y = constrain(this.y, this.tileSize, height-this.tileSize-this.tileSize);
	}
}