var world : Array; //Array to hold the world
var player : GameObject; //Player object

var maxX : int; //Max X value of the map
var maxY : int; //Max Y value of the map
var cam : GameCamera; //Forgot what type, will fix later
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites

var playerClass : String;
var bossType : String;

var curHealth : float;

function init(a : Array, exampleMesh : Mesh, playerClass : String, curHealth : float, bossType : String) {
	world = a; //Set the world array to reference the array passed in
	maxY = world.length; //Sets the max Y value of the map to be the length of the world array
	maxX = world[0].length; //Sets the max X value of the map to be the length of the first array within the world array;
	this.exampleMesh = exampleMesh;
	this.playerClass = playerClass;
	this.curHealth = curHealth;
	this.bossType = bossType;
	return spawnWorld(); //Spawns the world
	
}

function spawnWorld() {
	for (i = 0; i < maxX; i++) {
		for (j = 0; j < maxY; j++) {
			if (world[j][i] == "P") {
				spawnPlayer(i, j);
			}
		}
	}
	
	
	//set camera
	cam = Camera.main.GetComponent(GameCamera);
	cam.init(player,0,0,maxX-1,maxY-1);
	cam.setZoom(7);
	
	var x = 10;
	var y = 10;
	if (bossType == "Bob") {
		x = 15;
		y = 15;
	}
	else if (bossType == "Joe") {
		x = 7;
		y = 12;
	}
	return spawnBoss(x,y,bossType);
	
}

function spawnBoss(x : int, y : int, type : String) {
	var bossObject = new GameObject();
	bossObject.transform.position = Vector3(x, y, -1);
	bossObject.name = "Enemy Warrior";		/// We're lazy and this lets it take damage
	var boxCollider2D : BoxCollider2D = bossObject.AddComponent(BoxCollider2D);
	boxCollider2D.size = Vector2(1.1,1.1);
	boxCollider2D.isTrigger = true;
	
	bossObject.AddComponent(AudioSource);
	
	var bossModel = new GameObject();
	var meshFilter = bossModel.AddComponent(MeshFilter);
	meshFilter.mesh = exampleMesh;
	bossModel.AddComponent(MeshRenderer);
	bossModel.AddComponent(BoxCollider2D);
	bossModel.SetActive(false);
	var model = bossModel.AddComponent(BossModel);
	model.name = "Boss Model";
	bossModel.transform.parent = bossObject.transform;
	
	var bossMoveScript;
	if (type == "Bob") {
		bossMoveScript = bossObject.AddComponent(BobController);
	}
	else if (type == "Fire") {
		bossMoveScript = bossObject.AddComponent(FireController);
	}
	else if (type == "Warrior") {
		//bossMoveScript = bossObject.AddComponent(HueyController);
	}
	else if (type == "Archer") {
		//bossMoveScript = bossObject.AddComponent(DeweyController);
	}
	else if (type == "Mage") {
		//bossMoveScript = bossObject.AddComponent(LouieController);
	}
	else if (type == "Joe") {
		bossMoveScript = bossObject.AddComponent(JoeController);
	}
	var bossStatusScript = bossObject.AddComponent(BossStatus);
	var bossSpellbookScript = bossObject.AddComponent(EnemySpellbook);
	
	var rigidModel = bossObject.AddComponent(Rigidbody2D);
	rigidModel.gravityScale = 0;
	rigidModel.fixedAngle = true;
	
	
	bossSpellbookScript.init(type);
	bossMoveScript.init(player,bossSpellbookScript);
	bossStatusScript.init(exampleMesh,type,bossSpellbookScript);
	model.init(bossObject, type);
	
	bossModel.SetActive(true);
	
	return bossObject;
	
}

function spawnPlayer(x : int, y : int) {
	if (playerClass == null) {
		playerClass = "Circle";
	}
	var playerObject = new GameObject(); //Creates a new empty gameObject
	playerObject.transform.position = Vector3(x, y, -1);
	playerObject.name = "Player";
	playerObject.AddComponent(AudioSource);
	
	var playerModel = new GameObject(); 						//Create a quad object to hold the tile texture.
	var meshFilter = playerModel.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	playerModel.AddComponent(MeshRenderer); 					//Add a renderer for textures
	playerModel.SetActive(false); 								//Turn off the object so its script doesn't do anything until we're ready.
	var model = playerModel.AddComponent(CharModel); 				//Add a CharModel script to control visuals of the Player.
	model.name = "Player Model";								//Name the PlayerModel
	model.init(playerObject, playerClass); 							//Initialize the PlayerModel.
	playerModel.transform.parent = playerObject.transform;
	
	//var playerScript = playerObject.AddComponent(PlayerScript); //Attaches the playerScript
	//var playerAudio = playerObject.AddComponent(AudioSource); //Attaches an audioSource, WHY?
	//playerScript.init(gameObject,playerObject, "Player", "FACE",3,3); //AGAIN BOTH NAME AND TYPE (JUST RENAME TEXTURE AND USE NAME?)
	//player = playerScript; //set a reference to the playerScript
	

	var playerStatusScript = playerObject.AddComponent(PlayerStatus);		//Add the PlayerStatus Script
	playerStatusScript.init(playerClass,curHealth);
	var playerSpellbookScript = playerObject.AddComponent(PlayerSpellbook); //Add the PlayerSpellbook script
	playerSpellbookScript.init(playerClass);
	var playerHUDScript = playerObject.AddComponent(PlayerHUD);				//Add the PlayerHUD Script
	playerHUDScript.init(Camera.main, playerObject);
	playerStatusScript.HUD = playerHUDScript;
	var playerMoveScript = playerObject.AddComponent(PlayerMove);			//Add the PlayerMove Script
	playerMoveScript.init();
	
	//add a rigidbody and boxcollider for collisions
	
	var circleCol = playerObject.AddComponent(CircleCollider2D);//Add a circle collider
	circleCol.radius = .3;
	var rigidModel = playerObject.AddComponent(Rigidbody2D); 	//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 								//Turn off gravity
	rigidModel.fixedAngle = true; 								//Set fixed angle to true
	playerModel.SetActive(true);								//Turn on the object.
	
	player = playerObject;
}