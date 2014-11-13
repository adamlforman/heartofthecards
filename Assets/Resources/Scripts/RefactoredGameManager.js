var buildWorldScript : BuildWorldScript; //Script to build environment
var spawnWorldScript : SpawnWorldScript; //Script to spawn enemies and player and set camera
var enemySpellbookScript : EnemySpellbook; //Enemy spellbook
var world : Array; //Array to hold the world
var player : GameObject;	//The player object
var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

var playerClass : String;

function Awake () {
	var levelLoader = new GameObject();
	if (GameObject.Find("Level Loader")) {
		Destroy(levelLoader);
	}
	else {
		DontDestroyOnLoad(levelLoader);
		var levelScript = levelLoader.AddComponent(LevelLoaderScript);
		levelLoader.name = "Level Loader";
		levelScript.init();
	}
}

function Start() {
	world = new Array(); //Initializes the world array
	
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	//Build World, attaches a script responsible for building the environment
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	
	//Spawn World, attaches a script which spawns the player and the enemies
	spawnWorldScript = gameObject.AddComponent(SpawnWorldScript);
	
	//Add the spellbooks to the game manager object
	//enemySpellbookScript = gameObject.AddComponent(EnemySpellbook);
	
	playerClass = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).lastArg;
	
	// inits the scripts
	//enemySpellbookScript.init();
	//buildWorldScript.proceduralInit(world, exampleMesh);
	buildWorldScript.init(world, exampleMesh);
	spawnWorldScript.init(world, exampleMesh, 25,playerClass);
}

/*function buildPlayer(name : String) {
	var playerMoveScript = player.AddComponent(PlayerMove);
	
	var playerModel = new GameObject(); 						//Create a quad object to hold the tile texture.
	var meshFilter = playerModel.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = quadMesh; 								//Give the mesh filter a quadmesh
	playerModel.AddComponent(MeshRenderer); 					//Add a renderer for textures
	playerModel.SetActive(false); 								//Turn off the object so its script doesn't do anything until we're ready.
	model = playerModel.AddComponent(CharModel); 				//Add a PlayerModel script to control visuals of the Player.
	model.init(this, "FACE"); 									//Initialize the PlayerModel.


	
}
	
	

	//If it is a rock, add a rigidbody and boxcollider for collisions
	if (terrainType == "ROCK") {
		var boxCollider2D = playerModel.AddComponent(BoxCollider2D); //Add a box collider
		var rigidModel = playerModel.AddComponent(Rigidbody2D); //Add a rigid body for collisions
		rigidModel.isKinematic = true; //Set kinematic to true
		rigidModel.fixedAngle = true; //Set fixed angle to true
	}
	playerModel.SetActive(true); //Turn on the object (the Update function will start being called).
*/	




























