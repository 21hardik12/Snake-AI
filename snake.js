class Snake {
	constructor(x, y, tileSize) {
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.dir = [1, 0];
		this.xspeed = 1;
		this.yspeed = 1;
		this.total = 1;
		this.tail = [];
		this.score = 0;
	}	
	
	eatFood(food) {
		let dis = dist(this.x, this.y, food.x, food.y);
		if (dis < this.tileSize) {
			this.total++;
			this.score++;
			return true;
		} else {
			return false;
		}
	}
	
	display_score() {
		textSize(18);
		fill(255);
		text("Score : ", 10, 18);
		text(this.score, 70, 18); 
	}
	
	draw() {
		fill(255);
		for (let i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, this.tileSize, this.tileSize);
		}	
	}
	
	set_dir(dir) {
		this.dir = dir;
	}
	
	death() {
		let d;
		for (let i = 0; i < this.tail.length; i++) {			
			d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if (d < this.tileSize) {
				return true;
			}
		}	
		return false;
	}
	
	update() {
		for (let i = 0; i < this.tail.length-1; i++) {
			this.tail[i] = this.tail[i+1];			
		}
		if (this.total >= 1) {
			this.tail[this.total-1] = createVector(this.x, this.y);
		}
		this.x += this.xspeed * this.dir[0] * this.tileSize;
		this.y += this.yspeed * this.dir[1] * this.tileSize;
		this.x = constrain(this.x, this.tileSize, width-this.tileSize-this.tileSize);
		this.y = constrain(this.y, this.tileSize, height-this.tileSize-this.tileSize);
	}
}