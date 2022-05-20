var stepSize = 0.25;
var mysize = 360;
var sliderStepSize;
var sliderSize;
var btn;
var c;
var grid;
var goal;
var shots;
var btn;
var btnReplay;
let replay_data;

function preload(){
  replay_data=loadJSON("replay_113140909194.json");
}

function setup() {
  c = createCanvas(800, 800);
  background(0);
  grid=[];
  shots=[];
  goal=replay_data.goal;
  //drawShape();
  for(let x=0;x<8;x++){
    let tmp=[];
    for(let y=0;y<8;y++){
      tmp.push(0)
    }
    grid.push(tmp)
  }
  btn = createButton("Reset");
  btn.mousePressed(reset);
  btnReplay = createButton("Replay");
  btnReplay.mousePressed(replay);
}

function draw() {
  background(0);
  for(let x=0;x<8;x++){
    for(let y=0;y<8;y++){
      if(grid[y][x]==0){
        fill(255);
      }
      else if(grid[y][x]==1){
        fill("green");
      }
      else{
        fill("red");
      }
      ellipse(x*100+50,y*100+50,100,100);
    }
  }
}

function check_win(){
  var won = true;
  for(const goal_pos of goal) {
    var hit=false;
    for(const shot of shots){
      if(goal_pos[0]==shot[0] && goal_pos[1]==shot[1]){
        hit=true;
      }
    }
    won = won && hit;
  }
  if(won){
    alert("Won");
  }
}

function mousePressed(){
  for(let x=0;x<8;x++){
    for(let y=0;y<8;y++){
      if(dist(x*100+50,y*100+50,mouseX,mouseY)<=50){
        shoot(x,y);
      }
    }
  }
}

function shoot(x,y){
  if(grid[y][x]==0){
    shots.push([x,y]);
    var hit=false;
    for(const goal_pos of goal) {
      if(x==goal_pos[0] && y==goal_pos[1]){
        grid[y][x]=1;
        hit=true;
      }
    }
    if(!hit){
      grid[y][x]= -1;
    }
  }
  check_win();
}

function reset(){
  for(let x=0;x<8;x++){
    for(let y=0;y<8;y++){
      grid[y][x]=0;
    }
  }
  shots=[];
}

async function replay(){
  reset();
  console.log(replay_data)
  goal=replay_data.goal;
  for(const shot of replay_data.replay){
    const x=shot["shot"][0];
    const y=shot["shot"][1];
    await sleep(1000);
    shoot(x,y);
  }
}

function show_goal(){
  for(let x=0;x<8;x++){
    for(let y=0;y<8;y++){
      grid[y][x]=0;
    }
  }
  for(const gp of goal){
   grid[gp[1]][gp[0]]=1
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}