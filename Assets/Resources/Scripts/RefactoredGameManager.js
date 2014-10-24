/*var buildWorldScript : buildWorldScript; //Script to build environment
var spawnWorldScript : spawnWorldScript; //Script to spawn enemies and player and set camera
var playerSpellbookScript : playerSpellbookScript; //Player spellbook
var enemySpellbookScript : enemySpellbookScript; //Enemy spellbook
var world : Array; //Array to hold the world

function Start() {
	world = new Array(); //Initializes the world array
	//Build World, attaches and inits a script responsible for building the environment
	buildWorldScript = gameObject.AddComponenet(buildWorldScript);
	buildWorldScript.init(world);
	//Spawn World, attaches and intits a script which spawns the player and the enemies
	spawnWorldScript = gameObject.AddComponenet(spawnWorldScript);
	spawnWorldScript.init(world);
	//Add the spellbooks to the game manager object
	playerSpellbookScript = gameObject.AddComponenet(playerSpellbookScript);
	enemySpellbookScript = gameObject.AddComponenet(enemySpellbookScript);
	
}
*/