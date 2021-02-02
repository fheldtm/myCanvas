import { Box } from './box.js';

class App {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
		this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

		// this.FPS = 1000/60;
		
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;
		this.box = new Box(this.stageWidth, this.stageHeight, 30, 20);

		this.keydown_check = false;
		this.left_check = false;
		this.right_check = false;

		window.addEventListener("keypress", this.keyDown.bind(this), false);
		window.addEventListener("keyup", this.keyUp.bind(this), false);
		
		this.resize();
		window.addEventListener('resize', this.resize.bind(this), false);
		
		window.requestAnimationFrame(this.animate.bind(this));
		// this.animate();
	}
	
	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;
		
		this.canvas.width = this.stageWidth * this.pixelRatio;
		this.canvas.height = this.stageHeight * this.pixelRatio;
		this.ctx.scale(this.pixelRatio, this.pixelRatio);
		
		this.box.resize(this.stageWidth, this.stageHeight);
	}
	
	animate(t) {
		window.requestAnimationFrame(this.animate.bind(this));
		
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
		
		this.box.draw(this.ctx, this.stageWidth, this.stageHeight);

		// setTimeout(this.animate.bind(this), this.FPS);
	}

	keyDown(e) {
		if(this.keydown_check == false && e.keyCode == 105) { // 스페이스바 = 점프
			this.keydown_check = true;
			this.box.jump();
		} 
		if(e.keyCode == 106) {
			this.left_check = true;
			this.box.passXCheck(this.left_check, this.right_check);
			this.box.leftMove(); // 왼쪽 : J KEY
		}
		if(e.keyCode == 108) {
			this.right_check = true;
			this.box.passXCheck(this.left_check, this.right_check);
			this.box.rightMove(); // 오른쪽 : L KEY
		} 
		if(e.keyCode == 107) {
			this.box.stop(); // STOP : K KEY
		}
	}

	keyUp(e) {
		e.preventDefault();

		if(e.keyCode == 74) { this.left_check = false; } 
		if(e.keyCode == 76) { this.right_check = false; }
		this.box.passXCheck(this.left_check, this.right_check);

		if(e.keyCode == 73) {
			if(this.keydown_check == true) this.keydown_check = false;
		}
	}
}

window.onload = () => {
	new App();
}