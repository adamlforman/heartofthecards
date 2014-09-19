#pragma strict

var environmentFolder : GameObject; //Holds all environment objects


var playerFolder: GameObject; //Holds all player objects (probably just 1)
var players : Array; // Array of all players (probably just 1)

var floorFolder : GameObject; //Holds the floor
var floors : Array; //Holds the different floor objects (could be a couple if i implement jumping)

//On game start
function Start () {
	populateWorld(); //Call the populateWorld function
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
	
	var floorObject = new GameObject();
	var floorScript = floorObject.AddComponent(floor);
	
	
	//Finish creating floorObject, floorScript, and floorModel
	
	

}

//create the player
function createPlayer() {
	playerFolder = new GameObject(); //Initialize the playerFolder
	playerFolder.name = "Players"; //Name the playerFolder
	players = new Array(); //Initialize the players array

	var playerObject = new GameObject(); //Empty game obejct to hold the player
	var playerScript = playerObject.AddComponent(player); //add player behavior script
	
	playerScript.transform.parent = playerFolder.transform; //set the parent of the player to be the player folder
	playerScript.transform.position = Vector3(0, 0, 0); //set player position
	playerScript.init(); //Initialize playerscript
	playerScript.name = "Player"; //Name player
	players.Add(playerScript); //adds the player to the players array
}