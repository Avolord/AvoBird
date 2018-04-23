let difficulty = 2;
let Pipe_Objects = [];
let Highscore = 0;

function Bird() {
  this.y = Canvas.Element.height/2;
  this.x = 100;
  this.vel = 0
  this.grav = 1;
  this.push = -15;
  this.size = 10;
  this.score = 0;
  this.lost = false;

  this.show = function() {
    if(this.lost) {
      console.log("You have lost!");
      if(Highscore<this.score) {
        Highscore = this.score;
        console.log("New Highscore!");
      }
      console.log("Your score: ["+this.score+"] Pts!");
      this.reset();
      return;
    }
    new V2D(this.x,this.y).draw(this.size,"white","fill");
  }

  this.update = function() {
    this.score++;
    this.vel += this.grav;
    this.vel *= 0.9;
    this.y += this.vel;

    if(this.y+this.size > Canvas.Element.height) {
      this.y = Canvas.Element.height-this.size;
      this.vel = 0;
    }
    if(this.y-this.size < 0) {
      this.y = this.size;
      this.vel = 0;
    }
  }

  this.reset = function() {
    this.y = Canvas.Element.height/2;
    this.vel = 0;
    this.score = 0;
    this.lost = false;
    Pipe_Objects = [new Pipes()];
    frameCount = 0;
  }

  this.checkPipe = function() {
    const index = (Pipe_Objects[0].x+Pipe_Objects[0].w+this.size < this.x) ? 1 : 0;
    if(this.y-this.size < Pipe_Objects[index].y && this.x+this.size > Pipe_Objects[index].x ) {
      this.lost = true;
    }
    if(this.y+this.size > Pipe_Objects[index].y+Pipe_Objects[index].spacing && this.x+this.size > Pipe_Objects[index].x ) {
      this.lost = true;
    }

  }

  this.lift = function() {
    this.vel = this.push;
    this.y += this.vel;
  }
}


Canvas.Element.onclick = function() {
  AvoBird.lift();
}


function Pipes() {
  this.x = Canvas.Element.width;
  this.w = 20;
  this.speed = -difficulty;
  this.spacing = 300/difficulty*1.5;
  this.y = AM.RandInt(0,Canvas.Element.height-this.spacing-20);
  Pipe_Objects.push(this);

  this.show = function() {
    Canvas.Rectangle(this.x,0,this.w,this.y,"fill","white");
    Canvas.Rectangle(this.x,this.y+this.spacing,this.w,Canvas.Element.height-this.y-this.spacing,"fill","white");
  }

  this.offscreen = function() {
    return (this.x+this.w < 0)
  }

  this.update = function() {
    this.x += this.speed;
  }

}

function updatePipes() {
  for(let i=Pipe_Objects.length-1;i>=0;i--) {
    Pipe_Objects[i].show();
    Pipe_Objects[i].update();

    if(Pipe_Objects[i].offscreen()) {
      Pipe_Objects.splice(i,1);
    }

  }
}
