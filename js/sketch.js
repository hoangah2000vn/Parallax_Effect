let agent_n;
let object_n;
var agents = [];
let seed_agent;
let started;
let n_dead;
let year;
let frameInterval;
var scriptArray;
let frameIndex;
let agentSize;
let agentColor;
let narration;
let country = 'SLV';
let narrText;
let agentStep;

function setup() {
var canvas = createCanvas(windowWidth/1.25,windowHeight/1.5);
canvas.parent("canvasForHTML");
background(255);
noStroke();
started = false;
console.log(width);
console.log('hello');

//initialize parameters
agent_n = 10000;
year = 0;
frameInterval = 20;
frameIndex = 0;
agentSize = 3;
agentStep = 10;

//initialise arrays
//create empty agent array
for (i = 0;i<agent_n;i++){
  agents.push([0,0,0,0,0,0,0,0,0,agentColor,0])
}

//initialise script array
defScript();

//initialize agent information
//xpos = 0; ypos = 1 ;heading = 2; step = 3; x_step = 4; y_step = 5;size  = 6; visibility = 7; wander = 8; color = 9;score = 10;
for (i = 0; i < agent_n; i++) {
  agents[i][0] = 0;
  agents[i][1] = random(height*0.85);
  agents[i][2] = 0;
  agents[i][3] = agentStep;
  agents[i][4] = agents[i][3]*cos(radians(agents[i][2]));
  agents[i][5] = agents[i][3]*sin(radians(agents[i][2]));
  agents[i][6] = agentSize; //size
  agents[i][7] = 5;
  agents[i][8] = 20;
  agents[i][9] = agentColor; //color
  agents[i][10] = 0;
}
}

function draw() { 

background(255);
 
 //update year
if (frameCount%frameInterval == 0){
  year = year+1;
  frameIndex = 0;
}

//check year and reset agents and year
if (year == 8){
year = 0;

for (i = 0; i < agent_n; i++) {
  agents[i][0] = 0;
  agents[i][1] = random(height*0.85);
  agents[i][2] = 0;
  agents[i][3] = agentStep;
  agents[i][4] = agents[i][3]*cos(radians(agents[i][2]));
  agents[i][5] = agents[i][3]*sin(radians(agents[i][2]));
  agents[i][6] = agentSize; //size
  agents[i][7] = 5;
  agents[i][8] = 20;
  agents[i][9] = agentColor; //color
  agents[i][10] = 0;
}
}
 
//write text

countryText = {"SLV":"El Salvador",
               "HND":"Honduras",
               "GT" : "Guatemala"};

thisText = (year + 2014).toString();
narrText = narration[country][year];

fill(0);
textAlign(LEFT);
textSize(25);
text(thisText, width*.8, 40);
text(countryText[country], width*.8, 80);
textSize(20);
textAlign(CENTER);
text(narrText, width/2, height*0.95); 
 
//draw legend

fill(agentColor);
ellipse(width*0.75,height*0.75,agentSize*2,agentSize*2);
fill([255,0,0]);
ellipse(width*0.75,height*0.8,agentSize*2,agentSize*2);

textAlign(LEFT);
fill(0);
textSize(15);
text("100 women/girls in "+countryText[country], width*.76, height*0.75);
text("100 victims of feminicide in "+countryText[country], width*.76, height*0.80);


 //draw agents
 for (i = 0; i < agent_n; i++) {
   fill(agents[i][9][0],agents[i][9][1],agents[i][9][2]);
   ellipse(agents[i][0],agents[i][1],agents[i][6],agents[i][6]);
}
 
//check positon of agents with env boundary

 for (i = 0; i < agent_n; i++) {
   
     if (agents[i][0]>= width || agents[i][0]<= 0){
       //change heading
       agents[i][2] = agents[i][2]+180;
   }
   
     if (agents[i][1]>= height || agents[i][1]<= 0){
       //change heading
     agents[i][2] = agents[i][2]+180;
   }
}

 //update agent parameters
 for (i = 0; i < agent_n; i++) {
   if(agents[i][10]==1){
     //set step
    agents[i][3] = 0;
    
   } 

    agents[i][4] = random(1)*agents[i][3]*cos(radians(agents[i][2]));
    agents[i][5] = random(1)*agents[i][3]*sin(radians(agents[i][2]));

    agents[i][0] = agents[i][0]+agents[i][4];
    agents[i][1] = agents[i][1]+agents[i][5];
  }
  
 if (scriptArray[year][frameIndex] == 1){
   
 deadIndex = int(random(agent_n - 1));
 
 agents[deadIndex][9] = [255,0,0]; //color
 agents[deadIndex][6] = 7; //size
 agents[deadIndex][10] = 1; //indicator variable (dead or alive)
 }
 

//update frameIndex at each frame
frameIndex = frameIndex + 1;
//delay(50);

}

function setGT(){
  country = "GT"
  defScript();
  year = 8;
}

function setHND(){
  country = "HND"
  defScript();
  year = 8;
}

function setSLV(){
  country = "SLV"
  defScript();
  year = 8;
}

function defScript(){
  scriptArray = [];
arrays = {"SLV" : [4, 8, 8, 8, 7, 3, 2, 2],
          "HND" : [7, 8, 6, 5, 5, 6, 5, 5],
          "GT" :  [3, 2, 2, 2, 2, 2, 1, 2]}

deathsArray = arrays[country];
//initialise script array
for (i = 0; i < 8; i++){
  let emptyArray = [];
  for(j = 0; j < frameInterval; j++){
    if(j<deathsArray[i]){
    emptyArray.push(1);
    }
    else{
      emptyArray.push(0);
    }
  }
  scriptArray.push(emptyArray);
}
agentColors = {"SLV": [33, 129, 194],
              "HND": [99, 135, 77],
              "GT": [171, 141, 50]}
agentColor = agentColors[country];

narration = {
  "SLV":{
    0:"El Salvador has one of the highest rates of violence against girls and women in the world.",
    1:"El Salvador has one of the highest rates of violence against girls and women in the world.",
    2:"El Salvador has one of the highest rates of violence against girls and women in the world.",
    3:"El Salvador has one of the highest rates of violence against girls and women in the world.",
    4:"Fortunately, there hase been a steady decline in instances of feminicide since 2017",
    5:"Fortunately, there hase been a steady decline in instances of feminicide since 2017",
    6:"Fortunately, there hase been a steady decline in instances of feminicide since 2017",
    7:"Fortunately, there hase been a steady decline in instances of feminicide since 2017"
  },
  "HND":{
    0:"Honduras has one of the highest rates of violence against girls and women in the world.",
    1:"Honduras has one of the highest rates of violence against girls and women in the world.",
    2:"Honduras has one of the highest rates of violence against girls and women in the world.",
    3:"Honduras has one of the highest rates of violence against girls and women in the world.",
    4:"While feminicide is gradually decreasing, residents continue to live in fear of gang violence",
    5:"While feminicide is gradually decreasing, residents continue to live in fear of gang violence",
    6:"While feminicide is gradually decreasing, residents continue to live in fear of gang violence",
    7:"While feminicide is gradually decreasing, residents continue to live in fear of gang violence"
  },
  "GT":{
    0:"Of all the countries in the Northern Triangle, Guatemala has very low feminicide rates",
    1:"Of all the countries in the Northern Triangle, Guatemala has very low feminicide rates",
    2:"Of all the countries in the Northern Triangle, Guatemala has very low feminicide rates",
    3:"Currently, it has lower rates of violence against women and girls than the Central American Average",
    4:"Currently, it has lower rates of violence against women and girls than the Central American Average",
    5:"Currently, it has lower rates of violence against women and girls than the Central American Average",
    6:"Threats of gang violence however persist, and present a strong motivation for migtation",
    7:"Threats of gang violence however persist, and present a strong motivation for migtation"
  },
  };

}
