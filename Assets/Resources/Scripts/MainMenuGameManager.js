
function Awake () {
	var background = new GameObject().CreatePrimitive(PrimitiveType.Quad);
	background.renderer.material.mainTexture = Resources.Load("Textures/shop",Texture2D); //Set the texture.  Must be in Resources folder
	background.renderer.material.shader = Shader.Find ("Diffuse");	
	background.transform.localScale = Vector3(13.8,10,1);					// Tell the renderer that our textures have transparency. 

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
	
	var buttonStyle = GUI.skin.button;
	var boxStyle = GUI.skin.box;
	var labelStyle = GUI.skin.label;	// tooltips
	buttonStyle.fontSize = 24;
	buttonStyle.hover.textColor = Color.cyan;
	boxStyle.fontSize = 48;
	labelStyle.fontSize = 32;	// tooltips
	

	GUI.Box(Rect(Screen.width*0.25, Screen.height*0.25, Screen.width*0.5, Screen.height*0.6), "Main Menu");
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.35, Screen.width*0.25, Screen.height*0.07), "Play")){
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel(); //Ideally this would go to a level select sreen.
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.45, Screen.width*0.25, Screen.height*0.07), "Tutorial")){
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("tutorial1"); //Ideally this would go to a level select sreen.
		}
		if(GUI.Button (Rect (Screen.width*0.375, Screen.height*0.55, Screen.width*0.25, Screen.height*0.07), "Quit")){
			Application.Quit();
		}
		/*var yourInvisibleButtonRect = Rect(Screen.width*0.375, Screen.height*0.65, Screen.width*0.25, Screen.height*0.07);
		if (Event.current.type == EventType.MouseUp && yourInvisibleButtonRect.Contains(Event.current.mousePosition))
		{
   			ShopManager.money += 1234567;
		}*/
}