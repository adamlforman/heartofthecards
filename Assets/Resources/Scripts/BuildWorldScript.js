﻿//Holds characters corresponding to terrain
private var world : Array; //Array to hold the world
private var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
private var rockParent : GameObject;		//Parent Object for the rocks
private var groundParent : GameObject;		//Parent Object for the grounds
private var interactableParent : GameObject;		//Parent Object for interactables
private var maxX : int;  //Max X of the world
private var maxY : int;  //Max Y of the world

public static var keyLocation : Vector2;
public static var levelEndLocation : Vector2;

function proceduralInit(a : Array, exampleMesh : Mesh){
	var plg : CreateLevel = gameObject.AddComponent(CreateLevel); //Something to do with random level generation?
	world = a; //World array is the array passed in
	this.exampleMesh = exampleMesh; //assign the exampleMesh
	
	//Object parents for sanity
	rockParent = new GameObject("Rocks");  
	groundParent = new GameObject("Grounds");
	interactableParent = new GameObject("Interactables");
	
	maxX = 60; //Max x value of map, explicitely set for now
	maxY = 50; //Max y value of map, explicitely set for now
	world.length=maxY;	//world length = maximum Y value
	world = plg.createLevel(maxX,maxY, world); //Create the world
	
	//Build the world
	for(var i = 0; i<maxY;i++){
		for(var j = 0; j<world[i].length;j++){
			if(world[i][j]=="R"){
				buildRock(j,i);
			}
			else if(world[i][j]=="G"){
				buildGround(j,i);
			}
			else {
				Debug.Log("Invalid tile type: " +j+ " " + i + " " + world[i][j]);
			}
		}
	}
	
	
	//Build interactables, and the player
	var randomGroundXY : Array;
	var thingsToAdd : Array;
	var hashNames = new Object();
	var randXT : int;
	var randYT : int;
	var stringName : String;
	var stringCharacter : String;
	
	hashNames = {"L" : "LevelEnd", "K" : "Key", "C" : "Chest", "V" : "Vrom", "S" : "Spikes", "T" : "Tar"};
	thingsToAdd = ["L", "K", "V", "V", "V", "V", "V", "V", "V", "V", "V", "V", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S", "C", "C", "P"];
	
	for (var k : int = 0; k < thingsToAdd.length; k++) {
		stringCharacter = thingsToAdd[k];
		randomGroundXY = getRandomGround();
		randX = randomGroundXY[0];
		randY = randomGroundXY[1];
		if (stringCharacter != "P") {
			stringName = hashNames[stringCharacter];
			buildInteractables(stringName, randX, randY);
			world[randY][randX] = world[randY][randX] + stringCharacter;
		}
		else {
			world[randY][randX] = stringCharacter; //Why do i have to set to P and not GP?
		}
	}
	
	return world;

	
	/*
	//WHHHHHY
	var randX : int = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
	var randY : int = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	//While the randomly selected tile of the map is not just ground, reroll numbers
	while(world[randY][randX]!= "G") {
		randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	}
	world[randY][randX] = world[randY][randX] + "L"; //Update the world array to show that there is also a levelend there
	buildInteractables(hashNames["L"], randX,randY); //Builds the level end portal 
	
	randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
	randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	//While the randomly selected tile of the map is not just ground, reroll numbers
	while(world[randY][randX]!= "G") {
		randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	}
	world[randY][randX] = world[randY][randX] + "K"; //Update the world array to show that there is also a levelend there
	buildInteractables(hashNames["K"], randX,randY); //Builds the level end portal
	
	
	// designate the player start location
	randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
	randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	//While the randomly selected tile of the map is not just ground, reroll numbers
	while(world[randY][randX]!= "G") {
		randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	}
	world[randY][randX] = "P"; //Update the world array to show that there is a player there
	*/
	
}


//Start building the world
/*function init(a : Array, exampleMesh : Mesh) {
	world = a; //Set the world array to reference the array passed in
	this.exampleMesh = exampleMesh; //exampleMesh for objects
	rockParent = new GameObject("Rocks"); //parents for sanity
	groundParent = new GameObject("Grounds"); //parents for sanity
	buildWorld(); //Builds the world
}*/

//Builds a boss room
function bossInit(a : Array, exampleMesh : Mesh, bossNum : int) {
	world = a; //Set the world array to reference the array passed in
	this.exampleMesh = exampleMesh; //exampleMesh for objects
	rockParent = new GameObject("Rocks"); //parents for inspector window
	groundParent = new GameObject("Grounds"); //parents for inspector window
	interactableParent = new GameObject("Interactables"); //parents for hierachy pane
	if (bossNum == 1) { //if the first boss
		buildSpiderRoom(); //build BOB'S SPIDER ROOM
	}

}
/*
//Builds the world
function buildWorld() {
	//var maxX = 60; //Max x value of map, explicitely set for now
	var maxY = 50; //Max y value of map, explicitely set for now (never used atm)
	var R : String = "R"; //Represents a tile of rock in the environment
	var G : String = "G"; //Represents a tile of ground in the environment
	var P : String = "P"; // Represents the player's starting location
	world.length=maxY;	//world length = maximum Y value
	world[0] =  [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[1] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[2] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[3] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[4] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[5] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[6] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[7] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[8] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[9] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[10] = [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[11] = [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[12] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[13] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[14] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[15] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[16] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[17] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[18] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[19] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[20] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[21] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[22] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[23] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[24] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[25] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[26] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[27] = [R, G, G, G, G, G, G, G, G, G, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[28] = [R, G, G, G, G, G, G, G, G, G, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[29] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[30] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[31] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[32] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[33] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[34] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[35] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[36] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[37] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[38] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[39] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	world[40] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[41] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[42] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[43] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[44] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[45] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[46] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[47] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[48] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[49] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	world[50] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[51] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[52] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[53] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[54] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[55] = [R, G, G, G, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[56] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[57] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[58] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	world[59] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	
	//Uses the array representation of the world to spawn the actual objects
	for(var i = 0; i<world.length;i++){
		for(var j = 0; j<world[i].length;j++){
			if(world[i][j]=="R"){
				buildRock(j, world.length-i);
			}
			if(world[i][j]=="G"){
				buildGround(j, world.length-i);
			}
			if (world[i][j] == "P") {
				buildGround(j,world.length-i);
			}
		}
	}
	//buildLevelEnd(22, 48); //Builds the level end portal
}*/

function buildSpiderRoom() {
	var maxY = 23; //Max y value of map, explicitely set for now (never used atm)
	var R : String = "R"; //Represents a tile of rock in the environment
	var G : String = "G"; //Represents a tile of ground in the environment
	var P : String = "P"; // Represents the player's starting location
	world.length=maxY;	//world length = maximum Y value
	world[0]  = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[1]  = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[2]  = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[3]  = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[4]  = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[5]  = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[6]  = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[7]  = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[8]  = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[9]  = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[10] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[11] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[12] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[13] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[14] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[15] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[16] = [R,R,R,R,R,G,G,G,G,G,G,P,G,G,G,G,G,G,R,R,R,R,R];
	world[17] = [R,R,R,R,R,G,G,G,G,G,G,G,G,G,G,G,G,G,R,R,R,R,R];
	world[18] = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[19] = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[20] = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[21] = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	world[22] = [R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R];
	//Actually builds the world
	for(var i = 0; i<world.length;i++){
		for(var j = 0; j<world[i].length;j++){
			if(world[i][j]=="R"){
				buildRock(j, world.length-i);
			}
			if(world[i][j]=="G"){
				buildGround(j, world.length-i);
			}
			if (world[i][j] == "P") {
				buildGround(j,world.length-i);
			}
		}
	}
}
//Return a random ground tile
function getRandomGround() {
	//Random tile within the map
	var randX : int = Random.Range(0, maxX-1); 
	var randY : int = Random.Range(0, maxY-1);
	while(world[randY][randX] != "G") { //grab a new one if its not ground
		randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
	}
	return [randX, randY];
}

//Builds a rock object
function buildRock(x : float, y : float){
	var terrainObject = new GameObject(); //Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent(TerrainScript);  //Add the terrain script to the object.
	
	terrainType = "ROCK"; //Setting the terrain type that will be passed to the terrainScript to ROCK
	terrainScript.transform.position = Vector3(x,y,-1); //Position the terrain at x,y.
	terrainScript.transform.parent = this.rockParent.transform;	//Sets the parent to be rock parent
	
	//add a rigidbody and boxcollider for collisions
	terrainObject.AddComponent(BoxCollider2D); //Add a box collider
	
	var rigidModel = terrainObject.AddComponent(Rigidbody2D); //Add a rigid body for collisions
	rigidModel.isKinematic = true; //Set kinematic to true
	rigidModel.fixedAngle = true; //Set fixed angle to true
	rigidModel.gravityScale = 0; 		
	
	terrainScript.init(terrainType, exampleMesh); //Initialize the terrain script.
	terrainScript.name = "ROCK"; //Give the terrain object a name in the Hierarchy pane.
	
	
	
	
	/*var childCollider = new GameObject();// 3D colliders needed to raycast through walls
	childCollider.transform.parent = terrainObject.transform;
	childCollider.transform.localPosition = Vector3(0,0,0);
	childCollider.AddComponent(BoxCollider); */
	
							//Turn off gravity
	
	//TESTTEST
	
	//var boxCollider2D = terrainObject.AddComponent(BoxCollider2D); //Add a box collider
	//var rigidModel = terrainObject.AddComponent(Rigidbody2D); //Add a rigid body for collisions
	//rigidModel.isKinematic = false;
	//rigidModel.gravityScale = 0;
	
	//TESTTEST
	
	
	
}

//Builds a ground object
function buildGround(x : float, y : float){
	var terrainObject = new GameObject(); //Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent(TerrainScript); //Add the terrain script to the object.
	var rand = Random.Range(1, 3); //Temp variable to store a random number between 1 and 4 (inclusive)
	terrainType = "Ground" + rand; //Sets the terrain type that will be passed to the terrainScript to Ground + rand
	terrainScript.transform.position = Vector3(x,y,0); //Position the terrain at x,y.
	terrainScript.init(terrainType, exampleMesh); //Initialize the terrain script.
	terrainScript.name = "Ground"; //Give the terrain object a name in the Hierarchy pane.
	terrainScript.transform.parent = groundParent.transform; //Gives it a parent in hierarchy pane
}

/*
//Builds the level end
function buildLevelEnd(x: float, y : float) {
	var levelEndObject = new GameObject(); //Creates a new empty game object that will hold the level end portal
	var levelEndScript = levelEndObject.AddComponent(LevelEndScript); //Adds the  levelEnd script to the object.	
	//CURRENTLY EXPLICITELY SET PER THE DEFAULT LEVEL, NEED TO PASS IN X AND Y OR SOMETHING?
	var boxCollider2D = levelEndObject.AddComponent(BoxCollider2D); //Add a box collider
	boxCollider2D.isTrigger = true; //It is a trigger	
	levelEndScript.transform.position = Vector3(x,y,-1);	// Position the at x,y.
	levelEndScript.init(exampleMesh); //Initialize the script.
	levelEndScript.name = "LevelEnd";// Give the object a name in the Hierarchy pane.
}

//Builds the key
function buildKey(x: float, y : float) {
	var levelEndObject = new GameObject(); //Creates a new empty game object that will hold the level end portal
	var levelEndScript = levelEndObject.AddComponent(KeyScript); //Adds the  levelEnd script to the object.	
	//CURRENTLY EXPLICITELY SET PER THE DEFAULT LEVEL, NEED TO PASS IN X AND Y OR SOMETHING?
	var boxCollider2D = levelEndObject.AddComponent(BoxCollider2D); //Add a box collider
	boxCollider2D.isTrigger = true; //It is a trigger	
	levelEndScript.transform.position = Vector3(x,y,-1);	// Position the at x,y.
	levelEndScript.init(exampleMesh); //Initialize the script.
	levelEndScript.name = "Key";// Give the object a name in the Hierarchy pane.
}*/

function buildInteractables(name : String, x: float, y : float) {
	var interactableObject = new GameObject(); //Creates a new empty game object that will hold the chest
	var interactableScript = interactableObject.AddComponent(InteractableScript); //Adds the  script to the object.	
	var boxCollider2D = interactableObject.AddComponent(BoxCollider2D); //Add a box collider
	boxCollider2D.isTrigger = true; //It is a trigger	
	interactableScript.transform.position = Vector3(x,y,-1);	// Position the at x,y.
	interactableScript.init(name, exampleMesh); //Initialize the script.
	interactableScript.name = name;// Give the object a name in the Hierarchy pane.
	interactableScript.transform.parent = this.interactableParent.transform; //Give parent in heirarchy pane
	if (name == "Key") {
		keyLocation = Vector2(x, y);
	}
	else if(name == "LevelEnd") {
		levelEndLocation = Vector2(x, y);
	}
}


//COMMENTS ARE FUN!