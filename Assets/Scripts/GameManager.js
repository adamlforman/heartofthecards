#pragma strict

var environmentFolder : GameObject; //Holds all environment objects


var playerFolder: GameObject; //Holds all player objects (probably just 1)
var players : Array; // Array of all players (probably just 1)

var floorFolder : GameObject; //Holds the floor
var floors : Array; //Holds the different floor objects (could be a couple if i implement jumping)

private var gameCamera cam;


//On game start
function Start () {
	populateWorld(); //Call the populateWorld function
	cam = GetComponent(GameCamera);
}

//every update
function Update () {

}

//create the world and player
function populateWorld() {
	createEnvironment(); //Calls the createEnvironment function
	createPlayer(); //Calls the create player function
}

//creates the Environment
function createEnvironment() {
	environmentFolder = new GameObject(); //initializes the environment folder
	environmentFolder.name = "Environment"; //names the folder
	createFloor(); //Calls the createFloor function
}

//creates the floor
function createFloor() {
	floorFolder = new GameObject(); //Initialize the floorFolder
	floorFolder.name = "Floors"; //names the folder
	floorFolder.transform.parent = environmentFolder.transform; //sets the eviornment to be the parent of the floor
	floors = new Array(); //initializes the floors array
	
	var floorObject = new GameObject(); //empty game object or hold the floor
	var floorScript = floorObject.AddComponent(floor); //add the floor behavior script
	
	floorScript.transform.parent = floorFolder.transform; //set the parent of the floor to be the floor folder
	floorScript.transform.position = Vector3(0, -2, 0); //set floors position
	floorScript.init(); //initialize the floorScript
	floorScript.name = "Floor"; //Name floor
	floorScript.transform.localScale.x = 10; //set localscale, THIS NEEDS TO BE BELOW INIT
	floors.Add(floorScript); //add the floor to the floorScript

	
	

}

//create the player
function createPlayer() {
	playerFolder = new GameObject(); //Initialize the playerFolder
	playerFolder.name = "Players"; //Name the playerFolder
	players = new Array(); //Initialize the players array

	var playerObject = new GameObject(); //Empty game obejct to hold the player
	var playerScript = playerObject.AddComponent(player); //add player behavior script
	var playerCollider : BoxCollider = playerObject.AddComponent(BoxCollider);
	
	//var rigidPlayer = playerObject.AddComponent(Rigidbody); //Add a 3d rigid body (in a 2d world mwahaha)
	//rigidPlayer.useGravity = true; //Use built in gravity for now
	
	playerScript.transform.parent = playerFolder.transform; //set the parent of the player to be the player folder
	playerScript.transform.position = Vector3(0, 0, 0); //set player position
	playerScript.init(playerCollider.size, playerCollider.center); //Initialize playerscript
	playerScript.name = "Player"; //Name player
	players.Add(playerScript); //adds the player to the players array
	cam.setTarget(playerScript);
}