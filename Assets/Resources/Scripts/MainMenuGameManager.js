#pragma strict

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

function OnGUI(){
	GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "Main Menu");
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.35, Screen.width*0.25, Screen.height*0.07), "Play")){
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop"); //Ideally this would go to a level select sreen.
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Quit")){
			Application.Quit();
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.55, Screen.width*0.25, Screen.height*0.07), "Main Menu")){
			//Pause();
		}
}