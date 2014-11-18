private var buildWorldScript : BuildWorldScript; //Script to build environment
private var spawnWorldScript : SpawnWorldScript; //Script to spawn enemies and player and set camera
private var enemySpellbookScript : EnemySpellbook; //Enemy spellbook
private var world : Array; //Array to hold the world
private var player : GameObject;	//The player object
private var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

public static var isPaused : boolean; //Boolean to tell if the game is paused, public for player spellbook so that the player cannot activate abilities while paused

private var playerClass : String; //Which class the player is using

//Takes care of player progress
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
	isPaused = false; //Game is not paused
	world = new Array(); //Initializes the world array
	
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	//Build World, attaches a script responsible for building the environment
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	
	//Spawn World, attaches a script which spawns the player and the enemies
	spawnWorldScript = gameObject.AddComponent(SpawnWorldScript);
	
	//Grab the playerclass from the levelloader
	playerClass = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).lastArg;
	
	// inits the scripts
	world = buildWorldScript.proceduralInit(world, exampleMesh); //Sets the world array
	spawnWorldScript.init(world, exampleMesh,25,playerClass);
}

//Pause if needed
function Update () {
	if (Input.GetKeyDown(KeyCode.Escape) == true) {
		Pause();
	}
	
}

//Main menu
function OnGUI(){
	/*if(GUI.Button (Rect (Screen.width*0.85, Screen.height*0.05, Screen.width*0.12, Screen.height*0.07), "Pause")){
		Pause();
	}*/
	if(isPaused==true){
		GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "Menu");
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.35, Screen.width*0.25, Screen.height*0.07), "Resume")){
			Pause();
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Restart")){
			if (isPaused) {
			
				Pause();
			}
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop");
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.55, Screen.width*0.25, Screen.height*0.07), "Main Menu")){
			if(isPaused) {
				Pause();
			}
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("mainMenu");
		}
	}
}

//Pauses the game
function Pause() {
	if (isPaused == true) {
		Time.timeScale = 1;
		isPaused = false;
	}
	else {
		Time.timeScale = 0;
		isPaused = true;
	}
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




























