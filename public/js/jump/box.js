let jumpTime = false;

export class Box {
	constructor(stageWidth, stageHeight, boxWidth, boxHeight) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.boxWidth = boxWidth;
		this.boxHeight = boxHeight
		this.speed = 0;
		this.gravity = 2.0;
		
		this.x = Math.random() * (this.stageWidth - this.boxWidth);
		this.y = Math.random() * (this.stageHeight - this.boxHeight);
		this.firstY = this.y;
	}
	
	draw(ctx, stageWidth, stageHeight) {
		if(!jumpTime) {
			this.boxDown(stageHeight);
			this.y += this.speed;
		} else {
			this.boxUp();
			this.y += this.speed;
		}

		ctx.fillStyle = '#ffc300';
		ctx.beginPath();
		ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
		ctx.shadowBlur = 5;
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 2;
		ctx.fillRect(this.x, this.y, this.boxWidth, this.boxHeight);
	}
	
	resize(stageWidth, stageHeight) {
		this.boxDown(stageHeight);
		if(this.x + this.boxWidth > stageWidth) {
			this.x = stageWidth - this.boxWidth;
		}
	}
	
	boxDown(stageHeight) {
		if(this.y + this.boxHeight >= stageHeight) {
			this.speed = 0;
			this.y = stageHeight - this.boxHeight;
		} else {
			if(this.speed == 0) {
				this.speed = 0.001;
				this.firstY = this.y;
			} else {
				this.speed = Math.sqrt(2 * this.gravity * (this.y - this.firstY));
			}
		}
	}

	boxUp() {
		if(this.speed >= 0) {
			jumpTime = false;
		} else if(this.speed < 0) {
			this.speed += 2.0;
		}
	}

	jump() {
		this.speed = -20;
		jumpTime = true;
	}
}