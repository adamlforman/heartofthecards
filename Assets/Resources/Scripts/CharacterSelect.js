function Awake () {
	var titleO = new GameObject("AnnounceText");
	titleO.transform.position = Vector3(.1, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "Use upper buttons to fight the boss";
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

function OnGUI() {
	if(GUI.Button (Rect (Screen.width*0.2, Screen.height*0.45, Screen.width*0.1, Screen.height*0.1), "Warrior")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel("Circle");
	}
	if(GUI.Button (Rect (Screen.width*0.45, Screen.height*0.45, Screen.width*0.1, Screen.height*0.1), "Archer")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel("Triangle");
	}
	if(GUI.Button (Rect (Screen.width*0.7, Screen.height*0.45, Screen.width*0.1, Screen.height*0.1), "Mage")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel("Square");
	}
	if(GUI.Button (Rect (Screen.width*0.2, Screen.height*0.25, Screen.width*0.1, Screen.height*0.1), "Warrior")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("boss1","Circle");
	}
	if(GUI.Button (Rect (Screen.width*0.45, Screen.height*0.25, Screen.width*0.1, Screen.height*0.1), "Archer")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("boss1","Triangle");
	}
	if(GUI.Button (Rect (Screen.width*0.7, Screen.height*0.25, Screen.width*0.1, Screen.height*0.1), "Mage")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("boss1","Square");
		
	}
}