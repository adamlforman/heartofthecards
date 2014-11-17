var buildWorldScript : BuildWorldScript; //Script to build environment
var spawnWorldScript : SpawnWorldScript; //Script to spawn enemies and player and set camera
var enemySpellbookScript : EnemySpellbook; //Enemy spellbook
var world : Array; //Array to hold the world
var player : GameObject;	//The player object
var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

var boss : GameObject;	 // So we can tell when level is done
var done : boolean = false;
var playerClass : String;

private var pressedW : boolean;
private var pressedA : boolean;
private var pressedS : boolean;
private var pressedD : boolean;
private var movementLearned : boolean;
private var pressedClick : boolean;
private var pressedOne : boolean;
private var pressedTwo : boolean;
private var pressedThree : boolean;
private var pressedPause : boolean;
private var abilitiesLearned : boolean;
private var spawnedEnemies : boolean;
private var killedEnemies : boolean;
private var enemyWarrior : GameObject;
private var enemyArcher : GameObject;
private var doneTut : boolean;


public static var isPaused : boolean;

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
	//SPAWN TEXT TO TELL THEM TO MOVE/HOW
	isPaused = false;
	pressedW = false;
	pressedA = false;
	pressedS = false;
	pressedD = false;
	movementLearned = false;
	pressedClick =false;
	pressedOne = false;
	pressedTwo = false;
	pressedThree = false;
	pressedPause = false;
	abilitiesLearned = false;
	spawnedEnemies = false;
	killedEnemies = false;
	done = false;
	world = new Array(); //Initializes the world array
	
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	
	spawnWorldScript = gameObject.AddComponent(SpawnWorldScript);
	

	
	playerClass = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).lastArg;
	

	buildWorldScript.bossInit(world, exampleMesh,1);
	spawnWorldScript.init(world, exampleMesh,0, playerClass);
	
	
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape) == true) {
		Pause();
	}
	if (pressedW == false) {
		if (Input.GetKeyDown("w") == true) {
			pressedW = true;
		}
	}
	if (pressedA == false) {
		if (Input.GetKeyDown("a") == true) {
			pressedA = true;
		}
	}
	if (pressedS == false) {
		if (Input.GetKeyDown("s") == true) {
			pressedS = true;
		}
	}
	if (pressedD == false) {
		if (Input.GetKeyDown("d") == true) {
			pressedD = true;
		}
	}
	if (movementLearned == false) {
		if ((pressedW == true) && (pressedA == true) && (pressedS == true) && (pressedD == true)) {
			movementLearned = true;
			//SPAWN SOME TEXT TO TELL to click to shoot
		}
	}
	else if (movementLearned == true) {
		if (pressedClick == false) {
			if(Input.GetMouseButtonDown) {
				pressedClick = true;
				//SPAWN SOME TEXT TO TELL THEM TO CLICK 1, 2, 3
			}
		}
		else if (pressedClick == true) {
			if (pressedOne == false) {
				if(Input.GetKeyDown("1")) {
					pressedOne = true;
				}
			}
			if (pressedTwo == false) {
				if(Input.GetKeyDown("2")) {
					pressedTwo = true;
				}
			}
			if (pressedThree == false) {
				if(Input.GetKeyDown("3")) {
					pressedThree = true;
				}
			}
			if (abilitiesLearned == false) {
				if ((pressedOne == true) && (pressedTwo == true) && (pressedThree == true)) {
					abilitiesLearned = true;
					//SPAWN SOME TEXT TO TELL to pause
				}
			}
			else if (abilitiesLearned == true) {
				if(pressedPause == false) {
					if (Input.GetKeyDown(KeyCode.Escape)) {
						pressedPause = true;
						//tell them to pick up the chest, and go over slow tile
						buildWorldScript.buildInteractables("Chest", 5,16);
						buildWorldScript.buildInteractables("Tar", 6,6);
					}
				}
				else if (pressedPause == true) {
					if (killedEnemies == false) {
						if(spawnedEnemies == false) {
							if ((gameObject.GetComponent(PlayerStatus).tutorialHelperTar == true) && (gameObject.GetComponent(PlayerStatus).tutorialHelperChest == true)) {
								enemyArcher = spawnWorldScript.spawnEnemy(10, 10, "Enemy Archer", "archer");
								enemyWarrior = spawnWorldScript.spawnEnemy(12, 12, "Enemy Warrior", "warrior");
								spawnedEnemies = true;
							}
						}
						else if (spawnedEnemies == true) {
							if (doneTut == false) {
								if ((!enemyArcher) && (!enemyWarrior)) {
									buildWorldScript.buildInteractables("LevelEnd", 16,16);
									buildWorldScript.buildInteractables("Key", 16,10);
									doneTut = true;
								}
							}
						}
						//HOW TO DETECT IF THEY'VE BEEN KILLED
					}
				}
			}
		}
	}
	//If click and pressed 1, 2, and 3, then attack learned
	//If p clicked then pause learned
	//If picked up a chest/moved over speed up spot then special tiles learned
	//If killed both enemies then enemies learned
	
}

function OnGUI(){

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



























