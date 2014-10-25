var world : Array; //Array to hold the world
var player : GameObject; //Player object
var maxX : int; //Max X value of the map
var maxY : int; //Max Y value of the map
var cam : GameCamera; //Forgot what type, will fix later
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites

//Start spawning the world
function init(a : Array, exampleMesh : Mesh) {
	world = a; //Set the world array to reference the array passed in
	maxY = world.length; //Sets the max Y value of the map to be the length of the world array
	maxX = world[0].length; //Sets the max X value of the map to be the length of the first array within the world array;
	this.exampleMesh = exampleMesh;
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
	//var enemyScript = enemyObject.AddComponent(EnemyScript); //Attaches the enemyScript
	enemyObject.transform.position = Vector3(enemyObject.transform.position.x, enemyObject.transform.position.y, -1); //WHY IS THIS NOT USING THE X AND Y PASSED IN
	//enemyScript.init(gameObject,enemyObject,player,name, type,x,y);	//Initializes the enemyScript
}

//Spawns a player at a specific location
function spawnPlayer() {
	var playerObject = new GameObject(); //Creates a new empty gameObject
	playerObject.transform.position = Vector3(3, 3, -1);
	playerObject.name = "Player";
	//var playerScript = playerObject.AddComponent(PlayerScript); //Attaches the playerScript
	//var playerAudio = playerObject.AddComponent(AudioSource); //Attaches an audioSource, WHY?
	//playerScript.init(gameObject,playerObject, "Player", "FACE",3,3); //AGAIN BOTH NAME AND TYPE (JUST RENAME TEXTURE AND USE NAME?)
	//player = playerScript; //set a reference to the playerScript
	
	var playerMoveScript = playerObject.AddComponent(PlayerMove);			//Add the PlayerMove Script
	var playerSpellbookScript = playerObject.AddComponent(PlayerSpellbook); //Add the PlayerSpellbook script
	
	var playerModel = new GameObject(); 						//Create a quad object to hold the tile texture.
	var meshFilter = playerModel.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	playerModel.AddComponent(MeshRenderer); 					//Add a renderer for textures
	playerModel.SetActive(false); 								//Turn off the object so its script doesn't do anything until we're ready.
	model = playerModel.AddComponent(CharModel); 				//Add a PlayerModel script to control visuals of the Player.
	model.init(playerObject, "FACE"); 							//Initialize the PlayerModel.
	
	//add a rigidbody and boxcollider for collisions
	
	var boxCollider2D = playerObject.AddComponent(BoxCollider2D);//Add a box collider
	var rigidModel = playerObject.AddComponent(Rigidbody2D); 	//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 								//Turn off gravity
	rigidModel.fixedAngle = true; 								//Set fixed angle to true
	playerModel.SetActive(true);								//Turn on the object.
	player = playerObject;
}



























