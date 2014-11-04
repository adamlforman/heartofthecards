﻿//Holds characters corresponding to terrain
var world : Array; //Array to hold the world
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
public var rockParent : GameObject;		//Parent Object for the rocks
public var groundParent : GameObject;		//Parent Object for the grounds

//Start building the world
function init(a : Array, exampleMesh : Mesh) {
	world = a; //Set the world array to reference the array passed in
	this.exampleMesh = exampleMesh;
	
	rockParent = new GameObject("Rocks");
	groundParent = new GameObject("Grounds");
	
	buildWorld(); //Builds the world
	
}
//Builds the world
function buildWorld() {
	var maxX = 60; //Max x value of map, explicitely set for now
	var maxY = 50; //Max y value of map, explicitely set for now (never used atm)
	var R : String = "R"; //Represents a tile of rock in the environment
	var G : String = "G"; //Represents a tile of ground in the environment
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
	world[55] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
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
		}
	}
	buildLevelEnd(); //Builds the level end portal
}

//Builds a rock object
function buildRock(x : float, y : float){
	var terrainObject = new GameObject(); //Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent(TerrainScript);  //Add the terrain script to the object.
	terrainType = "ROCK"; //Setting the terrain type that will be passed to the terrainScript to ROCK
	terrainScript.transform.position = Vector3(x,y,-1); //Position the terrain at x,y.
	
	terrainScript.transform.parent = this.rockParent.transform;	//Sets the parent to be rock parent
	
	//add a rigidbody and boxcollider for collisions
	
	var boxCollider2D = terrainObject.AddComponent(BoxCollider2D); //Add a box collider
	var rigidModel = terrainObject.AddComponent(Rigidbody2D); //Add a rigid body for collisions
	
	var childCollider = new GameObject();						// 3D colliders needed to raycast through walls
	childCollider.transform.parent = terrainObject.transform;
	childCollider.transform.localPosition = Vector3(0,0,0);
	childCollider.AddComponent(BoxCollider);
	
	rigidModel.isKinematic = true; //Set kinematic to true
	rigidModel.fixedAngle = true; //Set fixed angle to true
	rigidModel.gravityScale = 0; 								//Turn off gravity
	
	//TESTTEST
	
	//var boxCollider2D = terrainObject.AddComponent(BoxCollider2D); //Add a box collider
	//var rigidModel = terrainObject.AddComponent(Rigidbody2D); //Add a rigid body for collisions
	//rigidModel.isKinematic = false;
	//rigidModel.gravityScale = 0;
	
	//TESTTEST
	
	terrainScript.init(terrainType, exampleMesh); //Initialize the terrain script.
	terrainScript.name = "ROCK"; //Give the terrain object a name in the Hierarchy pane.
	
}

//Builds a ground object
function buildGround(x : float, y : float){
	var terrainObject = new GameObject(); //Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent(TerrainScript); //Add the terrain script to the object.
	var rand = Random.Range(1, 4); //Temp variable to store a random number between 1 and 4 (inclusive)
	terrainType = "Ground" + rand; //Sets the terrain type that will be passed to the terrainScript to Ground + rand
	terrainScript.transform.position = Vector3(x,y,0); //Position the terrain at x,y.
	terrainScript.init(terrainType, exampleMesh); //Initialize the terrain script.
	terrainScript.name = "Ground"; //Give the terrain object a name in the Hierarchy pane.
	terrainScript.transform.parent = groundParent.transform;
}

//Builds the level end
function buildLevelEnd() {
	var levelEndObject = new GameObject(); //Creates a new empty game object that will hold the level end portal
	var levelEndScript = levelEndObject.AddComponent(LevelEndScript); //Adds the  levelEnd script to the object.	
	//CURRENTLY EXPLICITELY SET PER THE DEFAULT LEVEL, NEED TO PASS IN X AND Y OR SOMETHING?
	var boxCollider2D = levelEndObject.AddComponent(BoxCollider2D); //Add a box collider
	boxCollider2D.isTrigger = true; //It is a trigger	
	levelEndScript.transform.position = Vector3(22,48,-1);	// Position the at x,y.
	levelEndScript.init(exampleMesh); //Initialize the script.
	levelEndScript.name = "LevelEnd";// Give the object a name in the Hierarchy pane.
}

//COMMENTS ARE FUN!