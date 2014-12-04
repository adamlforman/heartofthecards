var buildWorldScript : BuildWorldScript; //Script to build environment
var spawnWorldScript : SpawnBoss; //Script to spawn enemies and player and set camera
var enemySpellbookScript : EnemySpellbook; //Enemy spellbook
var world : Array; //Array to hold the world
var player : GameObject;	//The player object
var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

var boss : GameObject;	 // So we can tell when level is done
var done : boolean;
var playerClass : String;

var curHealth : float;
var loaded : boolean = false;

public static var isPaused : boolean;
public static var victory : boolean;
public static var defeat : boolean;
public var buttonStyle : GUIStyle;
public var boxStyle : GUIStyle;

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
	Time.timeScale = 1;
	isPaused = false;
	victory = false;
	defeat = false;
	world = new Array(); //Initializes the world array
	
	
	getPrefixWeights();
	
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	//Build World, attaches a script responsible for building the environment
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	
	//Spawn World, attaches a script which spawns the player and the enemies
	spawnWorldScript = gameObject.AddComponent(SpawnBoss);
	
 
	
	playerClass = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).lastArg;
	
	// inits the scripts
	buildWorldScript.bossInit(world, exampleMesh,1);
	boss = spawnWorldScript.init(world, exampleMesh, playerClass, curHealth,"Fire");
	player = GameObject.Find("Player");
	loaded = true;
}

function Update () {
	//Allows pausing
	if (Input.GetKeyDown(KeyCode.Escape) == true) {
		Pause();
	}
	//if the boss is destroyed, and we're not done yet
	if (loaded) {
		if (!boss && !victory) {
			Time.timeScale = 0;
			victory = true;
		}
		if (!player && !defeat) {
			Time.timeScale = 0;
			defeat = true;
		}
	}
	
}

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
	if (victory == true) {
		GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "VICTORY!");
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Continue")){
			Time.timeScale = 1;
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop");
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.55, Screen.width*0.25, Screen.height*0.07), "Main Menu")){
			if(isPaused) {
				Pause();
			}
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("mainMenu");
		}
	}
	if (defeat == true) {
		GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "Defeat", boxStyle);
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.35, Screen.width*0.25, Screen.height*0.07), "Try Again")){
			if (isPaused) {
			
				Pause();
			}
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).reloadLevel();
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Replay Level")){
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

function getPrefixWeights() {
	var levelLoader : LevelLoaderScript = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript);
	if (levelLoader) {
		this.curHealth = levelLoader.curHealth;
	}
}

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



























