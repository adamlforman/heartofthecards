var buildWorldScript : BuildWorldScript; //Script to build environment
var spawnWorldScript : SpawnWorldScript; //Script to spawn enemies and player and set camera
var playerSpellbookScript : PlayerSpellbookScript; //Player spellbook
var enemySpellbookScript : EnemySpellbookScript; //Enemy spellbook
var world : Array; //Array to hold the world

function Start() {
	world = new Array(); //Initializes the world array
	//Build World, attaches and inits a script responsible for building the environment
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	buildWorldScript.init(world);
	//Spawn World, attaches and intits a script which spawns the player and the enemies
	spawnWorldScript = gameObject.AddComponent(SpawnWorldScript);
	spawnWorldScript.init(world);
	//Add the spellbooks to the game manager object
	playerSpellbookScript = gameObject.AddComponent(PlayerSpellbookScript);
	enemySpellbookScript = gameObject.AddComponent(EnemySpellbookScript);
	
}
