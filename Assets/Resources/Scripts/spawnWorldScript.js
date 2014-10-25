var world : Array; //Array to hold the world
var player : PlayerScript; //Player object
var maxX : int; //Max X value of the map
var maxY : int; //Max Y value of the map
var cam; //Forgot what type, will fix later

//Start spawning the world
function init(a : Array) {
	world = a; //Set the world array to reference the array passed in
	maxY = world.length; //Sets the max Y value of the map to be the length of the world array
	maxX = world[0].length; //Sets the max X value of the map to be the length of the first array within the world array;
	spawnWorld(); //Spawns the world
}

//Spawns the world
//OUR Y VALUES ARE INVERTED? SHOULD FIX THAT PROBABLY
function spawnWorld() {
	var randX : int; //Temp variable to hold a random x variable
	var randY : int; //Temp variable to hold a random y variable
	
	//Spawns all the enemies, (half archers, half warriors)
	for(i = 0; i<maxX; i++) {
		randX = Random.Range(0,maxX); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY); //Random variable between 0 and max map Y value
		//While the randomly selected tile of the map is not just ground, reroll numbers
		while((world[randY][randX]!= "G") || (randX<15 && randY>49)) {
			randX = Random.Range(0,maxX); //Random variable between 0 and max map X value
			randY = Random.Range(0,maxY); //Random variable between 0 and max map Y value
		}
		world[randY][randX] = world[randY][randX] + "E"; //Update the world array to show that there is also an enemy there
		//Spawn half archers, half warriors
		if(i<(maxX /2)) {
			spawnEnemy(randX, world.length-randY, "Enemy Archer", "archer"); //Spawns an archer, 
		}
		else {
			spawnEnemy(randX, world.length-randY, "Enemy Warrior", "warrior"); //Spawns a warrior
		}
	}
	
	//Spawn player then set camera
	spawnPlayer();
	cam = Camera.main.GetComponent(GameCamera);
	cam.init(player,0,1,maxX,maxY);
}

//Spawns an enemy at a specific location given a name and type;
function spawnEnemy(x: float, y: float, name: String, type: String) { //I DON'T THINK WE NEED BOTH NAME AND TYPE, ONE COULD BE THE OTHER
	var enemyObject = new GameObject(); //Creates a new empty gameObject
	var enemyScript = enemyObject.AddComponent(EnemyScript); //Attaches the enemyScript
	enemyObject.transform.position = Vector3(enemyObject.transform.position.x, enemyObject.transform.position.y, -1); //WHY IS THIS NOT USING THE X AND Y PASSED IN
	enemyScript.init(gameObject,enemyObject,player,name, type,x,y);	//Initializes the enemyScript
}

//Spawns a player at a specific location
function spawnPlayer() {
	var playerObject = new GameObject(); //Creates a new empty gameObject
	var playerScript = playerObject.AddComponent(PlayerScript); //Attaches the playerScript
	var playerAudio = playerObject.AddComponent(AudioSource); //Attaches an audioSource, WHY?
	playerScript.init(gameObject,playerObject, "Player", "FACE",3,3); //AGAIN BOTH NAME AND TYPE (JUST RENAME TEXTURE AND USE NAME?)
	player = playerScript; //set a reference to the playerScript
}

