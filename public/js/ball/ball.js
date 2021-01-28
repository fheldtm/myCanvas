export class Ball {
	constructor(stageWidth, stageHeight, radius, speed) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.radius = radius;
		this.vx = speed;
		this.vy = speed;
		
		this.x = this.radius + (Math.random() * (this.stageWidth - this.radius * 2));
		this.y = this.radius + (Math.random() * (this.stageHeight - this.radius * 2));
		console.log(this.x, this.y);
	}
	
	draw(ctx, stageWidth, stageHeight) {
		if(this.x < this.radius || this.x > stageWidth - this.radius) {
			this.vx *= -1;
			this.x += this.vx;
		} else if(this.y < this.radius || this.y > stageHeight - this.radius) {
			this.vy *= -1;
			this.y += this.vy;
		}
		
		this.x += this.vx;
		this.y += this.vy;
		
		ctx.fillStyle = "#f2ff03";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
}