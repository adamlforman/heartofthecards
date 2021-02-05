var circle : Texture2D;
var triangle : Texture2D;



function Awake () {

	circle = Resources.Load("Textures/circle",Texture2D);
	triangle = Resources.Load("Textures/triangle",Texture2D);

	var background = new GameObject().CreatePrimitive(PrimitiveType.Quad);
	background.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/shop",Texture2D); //Set the texture.  Must be in Resources folder
	background.GetComponent.<Renderer>().material.shader = Shader.Find ("Diffuse");	
	background.transform.localScale = Vector3(13.8,10,1);					// Tell the renderer that our textures have transparency. 

	var titleO = new GameObject("AnnounceText");
	titleO.transform.position = Vector3(.3, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "CHOOSE YOUR CLASS";
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
	if(GUI.Button (Rect (Screen.width*0.1, Screen.height*0.3, Screen.width*0.3, Screen.height*0.4), circle)) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel("Circle");
	}
	if(GUI.Button (Rect (Screen.width*0.6, Screen.height*0.3, Screen.width*0.3, Screen.height*0.4), triangle)) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel("Triangle");
	}
	GUI.Box (Rect (Screen.width*0.1, Screen.height*0.3, Screen.width*0.3, Screen.height*0.4), "Warrior");
	GUI.Box (Rect (Screen.width*0.6, Screen.height*0.3, Screen.width*0.3, Screen.height*0.4), "Archer");
}