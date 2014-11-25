private var world : Array; //Array to hold the world
private var player : GameObject; //Player object

private var maxX : int; //Max X value of the map
private var maxY : int; //Max Y value of the map
private var cam : GameCamera; //GameCamera
private var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
private var maxEnemies : int; //Max number of enemies

private var playerClass : String; //Player class

private var enemiesParent : GameObject; //enemies parent for hierachy pane

var hyper : float;
var juggernaut : float;
var raging : float;
var armored : float;

var curHealth : float;

//Start spawning the world
function init(a : Array, exampleMesh : Mesh, maxEnemies : int, playerClass : String, hyper : float, juggernaut : float, raging : float, armored : float, curHealth : float) {
	enemiesParent = new GameObject("Enemies"); //initialize parent
	world = a; //Set the world array to reference the array passed in
	maxY = world.length; //Sets the max Y value of the map to be the length of the world array
	maxX = world[0].length; //Sets the max X value of the map to be the length of the first array within the world array;
	this.maxEnemies = maxEnemies; //Set the maxenemies
	this.exampleMesh = exampleMesh; //Set the exampleMesh
	this.playerClass = playerClass; //Set the playerClass
	
	this.hyper = hyper;
	this.juggernaut = juggernaut;
	this.raging = raging;
	this.armored = armored;
	
	this.curHealth = curHealth;
	
	spawnWorld(); //Spawns the world
}

//Spawns the world
//OUR Y VALUES ARE INVERTED? SHOULD FIX THAT PROBABLY
function spawnWorld() {
	var randX : int; //Temp variable to hold a random x variable
	var randY : int; //Temp variable to hold a random y variable
	
	// Spawns player -- done before enemies so enemies can have target set
	//I really hate that this is the way we spawn the player
	var spawned : boolean = false;
	for (i = 0; i < maxX; i++) {
		for (j = 0; j < maxY; j++) {
			if (world[j][i] == "P") {
				spawnPlayer(i, j);
				spawned = true;
			}
		}
	}
	
	
	//Spawns all the enemies, (half archers, half warriors)
	for(i = 0; i<maxEnemies; i++) {			//for numEnemies
		randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
		randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
		var xDist = Mathf.Abs(randX - player.transform.position.x);
		var yDist = Mathf.Abs(randY - player.transform.position.y);
		//While the randomly selected tile of the map is not just ground, reroll numbers
		var iterateCount = 0;
		while(((world[randY][randX]!= "G") || (xDist < 9 && yDist < 9)) && iterateCount < 100) {
			iterateCount++;
			randX = Random.Range(0,maxX-1); //Random variable between 0 and max map X value
			randY = Random.Range(0,maxY-1); //Random variable between 0 and max map Y value
			xDist = Mathf.Abs(randX - player.transform.position.x);
			yDist = Mathf.Abs(randY - player.transform.position.y);
		}
		world[randY][randX] = world[randY][randX] + "E"; //Update the world array to show that there is also an enemy there
		//Spawn half archers, half warriors
		if(i<(maxEnemies /2)) {
			spawnEnemy(randX, randY, "Enemy Archer", "archer"); //Spawns an archer, 
		}
		else {
			spawnEnemy(randX, randY, "Enemy Warrior", "warrior"); //Spawns a warrior
		}
		//spawnEnemy(randX,randY, "Enemy Mage", "mage"); // Spawns a mage
	}
	
	//set camera
	cam = Camera.main.GetComponent(GameCamera);
	cam.init(player,0,0,maxX-1,maxY-1);
}

//Spawns an enemy at a specific location given a name and type;
function spawnEnemy(x: float, y: float, name: String, type: String) { //I DON'T THINK WE NEED BOTH NAME AND TYPE, ONE COULD BE THE OTHER
	//THE ORDERING OF ALL THESE THINGS IS VERY IMPORTANT, BECAUSE THEY ARE ALL INTERDEPENDENT IN A SHITTY WAY
	//CARE
	
	//Prefix/Suffix system
	var prefix = "prefix";
	var suffix = "suffix";
	var hyperThreshold = hyper;
	var juggernautThreshold = hyperThreshold + juggernaut;
	var ragingThreshold = juggernautThreshold + raging;
	var armoredThreshold = ragingThreshold + armored;
	var randTest = Random.value;
	if(randTest < hyperThreshold){
		prefix = "hyper";
	}
	else if(randTest < juggernautThreshold){
		prefix = "armored";
	}
	else if(randTest < ragingThreshold){
		prefix = "raging";
	}
	else if(randTest < armoredThreshold){
		suffix = "juggernaut";
	}
	
	
	var enemyObject = new GameObject(); //Creates a new empty gameObject
	enemyObject.AddComponent(AudioSource); //Addes an audiosource
	enemyObject.transform.position = Vector3(x, y, -1); //move to spot
	enemyObject.name = name; //set enemyObject name
	
	
	var circleCol : CircleCollider2D;
	circleCol = enemyObject.AddComponent(CircleCollider2D);//Add a circle collider
	circleCol.radius = .3;
	
	var rigidModel = enemyObject.AddComponent(Rigidbody2D); 	//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 								//Turn off gravity
	rigidModel.fixedAngle = true; 								//Set fixed angle to true
	
	
   
	
	
	var enemyModel = new GameObject(); //Create enemyModel
	enemyModel.SetActive(false); //Turn off the object so its script doesn't do anything until we're ready.
	var meshFilter = enemyModel.AddComponent(MeshFilter); //Add a meshfilter
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	enemyModel.AddComponent(MeshRenderer); //Add a renderer for textures
	
	var model = enemyModel.AddComponent(CharModel); //Add a CharModel script to control visuals of the Player.
	model.init(enemyObject, type); //Initialize the model
	model.name = name + " Model"; //Name the Model
	enemyModel.transform.parent = enemyObject.transform; //Sets the parent of the model to the enemyObject
	
	var enemySpellbookScript = enemyObject.AddComponent(EnemySpellbook); //Add the PlayerSpellbook script
	var enemyMoveScript = enemyObject.AddComponent(EnemyMove);	// attaches the other enemyscript
	
	enemyMoveScript.init(circleCol, exampleMesh,type,enemySpellbookScript, prefix, suffix);
	enemyMoveScript.setTarget(player); //Sets the enemies targer to the player
	enemySpellbookScript.init(type);
	
	var enemyStatusScript = enemyObject.AddComponent(EnemyStatus); //Attaches the enemyScript
	enemyStatusScript.init(exampleMesh,type,enemySpellbookScript, prefix, suffix);
	//enemyStatusScript.transform.parent = enemiesParent.transform; //Gives it a parent in hierarchy pane
	
	enemyModel.SetActive(true);								//Turn on the object.
	
	
	
	
	return enemyObject;
	
	
	/*if(type == "warrior"){		//Give it a circle collider if it is a circle
		circleCol = enemyObject.AddComponent(CircleCollider2D);//Add a circle collider
		circleCol.radius = .3;
	}
	else if(type == "archer"){	//Give it a triangle collider (NOT YET IMPLEMENTED)
		circleCol = enemyObject.AddComponent(CircleCollider2D);//Add a circle collider
		circleCol.radius = .3;
	}
	else if(type == "mage"){	//Give it a box collider (i think the mage actually wants this?
		enemyObject.AddComponent(BoxCollider2D);//Add a box collider
	}*/
	//enemyScript.init(gameObject,enemyObject,player,name, type,x,y);	//Initializes the enemyScript
	
}

//Spawns a player at a specific location
function spawnPlayer(x : int, y : int) {
	if (playerClass == "null") {
		playerClass = "Circle";
	}
	var playerObject = new GameObject(); //Creates a new empty gameObject
	playerObject.transform.position = Vector3(x, y, -1); //Sets the playerObject's location
	playerObject.name = "Player";								//Names the player
	playerObject.AddComponent(AudioSource);						//Gives the player an audiosource
	
	
	var playerModel = new GameObject(); 						//Create a quad object to hold the tile texture.
	var meshFilter = playerModel.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	playerModel.AddComponent(MeshRenderer); 					//Add a renderer for textures
	playerModel.SetActive(false); 								//Turn off the object so its script doesn't do anything until we're ready.
	model = playerModel.AddComponent(CharModel); 				//Add a CharModel script to control visuals of the Player.
	model.name = "Player Model";								//Name the PlayerModel
	model.init(playerObject, playerClass); 							//Initialize the PlayerModel.
	playerModel.transform.parent = playerObject.transform;		//sets the playerModel's position
	
	
	
	var playerMoveScript = playerObject.AddComponent(PlayerMove);			//Add the PlayerMove Script
	var playerStatusScript = playerObject.AddComponent(PlayerStatus);		//Add the PlayerStatus Script
	playerStatusScript.init(playerClass,curHealth);
	
	var playerSpellbookScript = playerObject.AddComponent(PlayerSpellbook); //Add the PlayerSpellbook script
	playerSpellbookScript.init(playerClass);
	
	var playerHUDScript = playerObject.AddComponent(PlayerHUD);				//Add the PlayerHUD Script
	playerHUDScript.init(Camera.main, playerObject);
	playerStatusScript.HUD = playerHUDScript;
	playerMoveScript.init();
	
	//add a rigidbody and boxcollider for collisions
	
	var circleCol = playerObject.AddComponent(CircleCollider2D);//Add a circle collider
	circleCol.radius = .3;										//Change radius
	var rigidModel = playerObject.AddComponent(Rigidbody2D); 	//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 								//Turn off gravity
	rigidModel.fixedAngle = true; 								//Set fixed angle to true
	playerModel.SetActive(true);								//Turn on the object.
	
	player = playerObject;
	
	
	//var playerScript = playerObject.AddComponent(PlayerScript); //Attaches the playerScript
	//var playerAudio = playerObject.AddComponent(AudioSource); //Attaches an audioSource, WHY?
	//playerScript.init(gameObject,playerObject, "Player", "FACE",3,3); //AGAIN BOTH NAME AND TYPE (JUST RENAME TEXTURE AND USE NAME?)
	//player = playerScript; //set a reference to the playerScript
}



























