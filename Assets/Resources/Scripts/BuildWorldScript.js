//Holds characters corresponding to terrain
private var world : Array; //Array to hold the world
private var models : Array; //Array of the ground/rock models
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
	models = new Array();
	models.length=maxY;
	for(var i = 0; i<models.length;i++){
		models[i] = new Array();
		models[i].length = maxX;
	}
	world = plg.createLevel(maxX,maxY, world); //Create the world
	
	//Build the world
	for(i = 0; i<maxY;i++){
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
	
	seeds = new Array();
	seeds.length = maxY;
	
	for(i = 0;i<maxY;i++){
		randX = Random.Range(0, maxX-1);
		randY = Random.Range(0, maxY-1);
		//models[randY][randX].transform.GetChild(0).renderer.material.color = Color(1-(Random.value/2), 1-(Random.value/2), 1-(Random.value/2));
		models[randY][randX].transform.GetChild(0).renderer.material.color = seedColor();// Color(Random.value,Random.value,Random.value);
		seeds[i] = [randY, randX];
	}
	
	spreadColor(seeds);
	
	return world;

	
	
	
}
function seedColor() {
	var newColor : Color;
	
	var newRed : float = Random.value;
	var newGreen : float = Random.value;
	var newBlue : float = Random.value;
	
	if (newRed + newGreen + newBlue < 1.5) {
		newRed += 0.2;
		newGreen += 0.2;
		newBlue += 0.2;
	}
	else if (newRed + newGreen + newBlue > 2.4) {
		newRed -= 0.1;
		newGreen -= 0.1;
		newBlue -= 0.1;
	}
	
	newColor = Color(newRed,newGreen,newBlue);
	//var newColor : Color = Color(1-(Random.value/2), 1-(Random.value/2), 1-(Random.value/2));
	return newColor;
}

function spreadColor(seeds : Array){
	for(i =0; i<seeds.length;i++){
		for(j=-1;j<=1;j++){
			for(k=-1;k<=1;k++){
				if(models[myRoundY(seeds[i][0]+j)][myRoundX(seeds[i][1]+k)].transform.GetChild(0).renderer.material.color == Color(1, 1, 1)){
					//WILL BE CHANGED
					models[myRoundY(seeds[i][0]+j)][myRoundX(seeds[i][1]+k)].transform.GetChild(0).renderer.material.color = similarColor(models[seeds[i][0]][seeds[i][1]].transform.GetChild(0).renderer.material.color);
					seeds.Add([myRoundY(seeds[i][0]+j), myRoundX(seeds[i][1]+k)]);
				}
			}
		}
	}
}

/*function spreadColor(){
	counter=10;
	//while(counter>0){
	counter = 0;
	print("TEST");
	for(i = 0; i<models.length;i++){
		for(j = 0; j<models[i].length;j++){
			if(models[i][j].transform.GetChild(0).renderer.material.color != Color(1,1,1)){
				for(k = -1; k<2; k++){
					for(l = -1; l<2; l++){
						if(models[myRoundY(i+k)][myRoundX(j+l)].transform.GetChild(0).renderer.material.color == Color(1,1,1)){
							print("TEST" + i + ", " + j);
							models[myRoundY(i+k)][myRoundX(j+l)].transform.GetChild(0).renderer.material.color = models[i][j].transform.GetChild(0).renderer.material.color;
						}
					}	
				}
			}
			else{
				counter++;
			}
		}
	}
//	}
}*/

function myRoundY(i : int){
	if(i<0){
		return 0;
	}
	if(i>maxY-1){
		return maxY-1;
	}
	return i;
}

function myRoundX(i : int){
	if(i<0){
		return 0;
	}
	if(i>maxX-1){
		return maxX-1;
	}
	return i;
}


//Builds a boss room
function bossInit(a : Array, exampleMesh : Mesh, bossNum : int) {
	maxY = 23;
	maxX = 23;
	world = a; //Set the world array to reference the array passed in
	this.exampleMesh = exampleMesh; //exampleMesh for objects
	models = new Array();
	models.length=maxY;
	for(var i = 0; i<models.length;i++){
		models[i] = new Array();
		models[i].length = maxX;
	}
	rockParent = new GameObject("Rocks"); //parents for inspector window
	groundParent = new GameObject("Grounds"); //parents for inspector window
	interactableParent = new GameObject("Interactables"); //parents for hierachy pane
	if (bossNum == 1) { //if the first boss
		buildSpiderRoom(); //build BOB'S SPIDER ROOM
	}
	seeds = new Array();
	seeds.length = maxY;
	
	for(i = 0;i<maxY;i++){
		randX = Random.Range(0, maxX-1);
		randY = Random.Range(0, maxY-1);
		models[randY][randX].transform.GetChild(0).renderer.material.color = seedColor();// Color(1-(Random.value/2), 1-(Random.value/2), 1-(Random.value/2));
		seeds[i] = [randY, randX];
	}
	
	spreadColor(seeds);

}


function buildSpiderRoom() {
	maxY = 23; //Max y value of map, explicitely set for now (never used atm)
	maxX = 23;
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
				buildRock(j, world.length-i-1);
			}
			if(world[i][j]=="G"){
				buildGround(j, world.length-i-1);
			}
			if (world[i][j] == "P") {
				buildGround(j,world.length-i-1);
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

	//Debug.Log("X: "+x+", Y: "+y);
	models[y][x] = terrainObject;
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
	
	models[y][x] = terrainObject;
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
		PlayerHUD.arrowIndicator = true;
		keyLocation = Vector2(x, y);
	}
	else if(name == "LevelEnd") {
		levelEndLocation = Vector2(x, y);
	}
}

function similarColor(oldColor : Color) {
	var newColor : Color;
	var amount : float = 0.1;
	var randR : float = Random.Range(-amount,amount);
	var randB : float = Random.Range(-amount,amount);
	var randG : float = Random.Range(-amount,amount);
	
	var newR = Mathf.Min(oldColor.r + randR,1);
	var newG = Mathf.Min(oldColor.g + randG,1);
	var newB = Mathf.Min(oldColor.b + randB,1);
	
	newColor = Color(newR,newG,newB);
	return newColor;
}

//COMMENTS ARE FUN!