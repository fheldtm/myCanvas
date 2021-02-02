let jumpTime = false;
let jumpStack = 2;

export class Box {
	constructor(stageWidth, stageHeight, boxWidth, boxHeight) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.boxWidth = boxWidth;
		this.boxHeight = boxHeight
		this.speed = 0;
		this.speedX = 0.0;
		this.rightPlus = 1.1;
		this.leftPlus = 1.1;
		this.gravity = 2.0;

		this.x_check = false;
		
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

		if(!this.x_check) {
			this.speedX *= 0.8;
			this.rightPlus = 1.1;
			this.leftPlus = 1.1;
		}
		if(this.speedX > 10) {
			this.speedX = 10;
		} else if(this.speedX < -10) {
			this.speedX = -10;
		}
		this.x += this.speedX;

		this.checkInsideBox(stageWidth); // 박스 안에 있는지 확인

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
		this.checkInsideBox(stageWidth);
	}

	checkInsideBox(stageWidth) {
		if(this.x + this.boxWidth > stageWidth) { // 오른쪽 기준
			this.x = stageWidth - this.boxWidth;
		} 
		if(this.x <= 0) {
			this.x = 0;
		} 
		if(this.y <= 0) {
			this.y = 0;
		}
	}
	
	boxDown(stageHeight) {
		if(this.y + this.boxHeight >= stageHeight) {
			this.speed = 0;
			this.y = stageHeight - this.boxHeight;
			jumpStack = 0;
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
			this.speed += 3.0;
		}
	}

	jump() {
		if(jumpStack < 2) {
			this.speed = -30;
		}
		jumpStack++;
		jumpTime = true;
	}

	rightMove() {
		if(this.x_check) {
			this.rightPlus *= 2.1;
			this.speedX += this.rightPlus;
		}
	}

	leftMove() {
		if(this.x_check) {
			this.leftPlus *= 2.1;
			this.speedX -= this.leftPlus;
		}
	}

	passXCheck(x_check) {
		this.x_check = x_check;
	}
}