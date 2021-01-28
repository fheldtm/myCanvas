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
		this.boxSpeedY(stageHeight);
		this.y += this.speed;
		// console.log(this.speed, this.y);
		
		ctx.fillStyle = '#ffc300';
		ctx.beginPath();
		ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
		ctx.shadowBlur = 5;
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 2;
		ctx.fillRect(this.x, this.y, this.boxWidth, this.boxHeight);
	}
	
	resize(stageWidth, stageHeight) {
		this.boxSpeedY(stageHeight);
	}
	
	boxSpeedY(stageHeight) {
		if(this.y + this.boxHeight >= this.stageHeight) {
			this.speed = 0;
			this.y = this.stageHeight - this.boxHeight;
		} else {
			if(this.speed == 0) {
				this.speed = 0.1;
			} else {
				this.speed = Math.sqrt(2 * this.gravity * (this.y - this.firstY));
				console.log(this.firstY);
			}
		}
	}
}