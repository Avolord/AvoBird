Animation(true);
let AvoBird = new Bird();
let Pipe = new Pipes();
function setup() {
}

let frameCount = 0;

function draw() {
	frameCount++;
	updatePipes();
	AvoBird.checkPipe();
	AvoBird.update();
	AvoBird.show();
	if(frameCount == 60*3) {
		new Pipes();
		frameCount=0;
	}
	document.getElementById("Count").innerHTML = AvoBird.score;
}

function NoLoop() {
	Animation(false);
}
function Loop() {
	Animation(true);
}
function reload() {
	location.reload();
}
