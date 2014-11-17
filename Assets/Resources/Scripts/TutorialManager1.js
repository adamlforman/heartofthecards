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

private var tellWASD : GameObject;
private var tellClick : GameObject;
private var tellAbilities : GameObject;
private var tellPause : GameObject;
private var tellSpecial : GameObject;
private var tellEnemies : GameObject;
private var tellEnd : GameObject;
private var cam : Camera;


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
	pressedClick = false;
	pressedOne = false;
	pressedTwo = false;
	pressedThree = false;
	pressedPause = false;
	abilitiesLearned = false;
	spawnedEnemies = false;
	killedEnemies = false;
	doneTut = false;
	cam = Camera.main;
	world = new Array(); //Initializes the world array
	
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	buildWorldScript = gameObject.AddComponent(BuildWorldScript);
	
	spawnWorldScript = gameObject.AddComponent(SpawnWorldScript);
	

	
	playerClass = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).lastArg;
	

	buildWorldScript.bossInit(world, exampleMesh,1);
	spawnWorldScript.init(world, exampleMesh,0, playerClass);
	
	tellWASD = GameObject.CreatePrimitive(PrimitiveType.Quad);
	tellWASD.transform.parent = cam.transform;															// Makes child of cam
	tellWASD.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
	tellWASD.transform.localScale = Vector3(4,1,1);
	tellWASD.renderer.material.mainTexture = Resources.Load("Textures/WASD", Texture2D);
	tellWASD.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	tellWASD.name = "WASD";	
	
	
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
			Destroy(tellWASD);
			tellClick = GameObject.CreatePrimitive(PrimitiveType.Quad);
			tellClick.transform.parent = cam.transform;															// Makes child of cam
			tellClick.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
			tellClick.transform.localScale = Vector3(4,1,1);
			tellClick.renderer.material.mainTexture = Resources.Load("Textures/mouse", Texture2D);
			tellClick.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
			tellClick.name = "Click";	
		}
	}
	else if (movementLearned == true) {
		if (pressedClick == false) {
			if(Input.GetMouseButtonDown(0)) {
				pressedClick = true;
				Destroy(tellClick);
				tellAbilities = GameObject.CreatePrimitive(PrimitiveType.Quad);
				tellAbilities.transform.parent = cam.transform;															// Makes child of cam
				tellAbilities.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
				tellAbilities.transform.localScale = Vector3(8,1,1);
				tellAbilities.renderer.material.mainTexture = Resources.Load("Textures/abilities", Texture2D);
				tellAbilities.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
				tellAbilities.name = "Abilities";	
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
					Destroy(tellAbilities);
					tellPause = GameObject.CreatePrimitive(PrimitiveType.Quad);
					tellPause.transform.parent = cam.transform;															// Makes child of cam
					tellPause.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
					tellPause.transform.localScale = Vector3(4,1,1);
					tellPause.renderer.material.mainTexture = Resources.Load("Textures/pause", Texture2D);
					tellPause.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
					tellPause.name = "Pause";	
				}
			}
			else if (abilitiesLearned == true) {
				if(pressedPause == false) {
					if (Input.GetKeyDown(KeyCode.Escape)) {
						pressedPause = true;
						Destroy(tellPause);
						tellSpecial = GameObject.CreatePrimitive(PrimitiveType.Quad);
						tellSpecial.transform.parent = cam.transform;															// Makes child of cam
						tellSpecial.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
						tellSpecial.transform.localScale = Vector3(10,1,1);
						tellSpecial.renderer.material.mainTexture = Resources.Load("Textures/specialTiles", Texture2D);
						tellSpecial.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
						tellSpecial.name = "Special Tiles";	
						buildWorldScript.buildInteractables("Chest", 5,16);
						buildWorldScript.buildInteractables("Tar", 7,16);
					}
				}
				else if (pressedPause == true) {
					if (killedEnemies == false) {
						if(spawnedEnemies == false) {
							if ((gameObject.GetComponent(PlayerStatus).tutorialHelperTar == true) && (gameObject.GetComponent(PlayerStatus).tutorialHelperChest == true)) {
								Destroy(tellSpecial);
								tellEnemies = GameObject.CreatePrimitive(PrimitiveType.Quad);
								tellEnemies.transform.parent = cam.transform;															// Makes child of cam
								tellEnemies.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
								tellEnemies.transform.localScale = Vector3(10,1.5,1);
								tellEnemies.renderer.material.mainTexture = Resources.Load("Textures/enemies", Texture2D);
								tellEnemies.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
								tellEnemies.name = "Enemies";	
								enemyArcher = spawnWorldScript.spawnEnemy(10, 10, "Enemy Archer", "archer");
								enemyWarrior = spawnWorldScript.spawnEnemy(12, 12, "Enemy Warrior", "warrior");
								spawnedEnemies = true;
							}
						}
						else if (spawnedEnemies == true) {
							if (doneTut == false) {
								if ((!enemyArcher) && (!enemyWarrior)) {
									Destroy(tellEnemies);
									tellEnd = GameObject.CreatePrimitive(PrimitiveType.Quad);
									tellEnd.transform.parent = cam.transform;															// Makes child of cam
									tellEnd.transform.localPosition = Vector3(-cam.orthographicSize + 5, cam.orthographicSize*0.5,10);	// Position in top center
									tellEnd.transform.localScale = Vector3(10,2,1);
									tellEnd.renderer.material.mainTexture = Resources.Load("Textures/keyPortal", Texture2D);
									tellEnd.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
									tellEnd.name = "End";
									buildWorldScript.buildInteractables("LevelEnd", 16,16);
									buildWorldScript.buildInteractables("Key", 16,10);
									doneTut = true;
								}
							}
						}
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



























