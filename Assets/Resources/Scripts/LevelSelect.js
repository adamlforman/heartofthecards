var circle : Texture2D;
var triangle : Texture2D;



function Awake () {

	circle = Resources.Load("Textures/circle",Texture2D);
	triangle = Resources.Load("Textures/triangle",Texture2D);

	var background = new GameObject().CreatePrimitive(PrimitiveType.Quad);
	background.renderer.material.mainTexture = Resources.Load("Textures/shop",Texture2D); //Set the texture.  Must be in Resources folder
	background.renderer.material.shader = Shader.Find ("Diffuse");	
	background.transform.localScale = Vector3(13.8,10,1);					// Tell the renderer that our textures have transparency. 

	var titleO = new GameObject("AnnounceText");
	titleO.transform.position = Vector3(.3, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "CHOOSE YOUR LEVEL";
	title.fontSize = Screen.height/19;
	
	
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

/*
function OnGUI(){
	GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "Main Menu");
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.35, Screen.width*0.25, Screen.height*0.07), "Play")){
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop"); //Ideally this would go to a level select sreen.
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Tutorial")){
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("tutorial1"); //Ideally this would go to a level select sreen.
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.55, Screen.width*0.25, Screen.height*0.07), "Quit")){
			Application.Quit();
		}
}

*/

function OnGUI() {
	GUI.Box(Rect(Screen.width*0.1, Screen.height*0.6, Screen.width*0.2, Screen.height*0.3), "Many enemies will be tougher than normal.  Recommend using Piercing and Poison to ignore their armor.");
	GUI.Box(Rect(Screen.width*0.4, Screen.height*0.6, Screen.width*0.2, Screen.height*0.3), "Many enemies will be stronger than normal.  Recommend using Leech and Blind to counteract their strength.");
	GUI.Box(Rect(Screen.width*0.7, Screen.height*0.6, Screen.width*0.2, Screen.height*0.3), "Many enemies will be quicker than normal.  Recommend using Ice and Boost to keep up qith their speed.");
	if(GUI.Button (Rect (Screen.width*0.1, Screen.height*0.3, Screen.width*0.2, Screen.height*0.1), "Armor Level")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 0;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();
	}
	if(GUI.Button (Rect (Screen.width*0.4, Screen.height*0.3, Screen.width*0.2, Screen.height*0.1), "Strength Level")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 1;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();
	}
	if(GUI.Button (Rect (Screen.width*0.7, Screen.height*0.3, Screen.width*0.2, Screen.height*0.1), "Speed Level")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 2;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();
	}
	
	/*if(GUI.Button (Rect (Screen.width*0.1, Screen.height*0.7, Screen.width*0.2, Screen.height*0.1), "Bob")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 0;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextBoss();
	}
	if(GUI.Button (Rect (Screen.width*0.4, Screen.height*0.7, Screen.width*0.2, Screen.height*0.1), "Faiur")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 1;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextBoss();
	}
	if(GUI.Button (Rect (Screen.width*0.7, Screen.height*0.7, Screen.width*0.2, Screen.height*0.1), "Joe")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).bossCounter = 2;
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextBoss();
	}*/
}