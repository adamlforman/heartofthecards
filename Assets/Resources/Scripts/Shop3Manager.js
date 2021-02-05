var title : GUIText;
var reminder : GUIText;
var ice3 : GUIText;
var poison3 : GUIText;
var fork3 : GUIText;
var boost3 : GUIText;
var pierce3 : GUIText;
var giant3 : GUIText;
var splash3 : GUIText;
var leech3 : GUIText;
var blind3 : GUIText;
var rapid3 : GUIText;

var ice3Texture : Texture2D;
var poison3Texture : Texture2D;
var fork3Texture : Texture2D;
var boost3Texture : Texture2D;
var pierce3Texture : Texture2D;
var giant3Texture : Texture2D;
var splash3Texture : Texture2D;
var leech3Texture : Texture2D;
var blind3Texture : Texture2D;
var rapid3Texture : Texture2D;
var shopTexture : Texture2D;

//Counters for all of the cards
public static var ice3Count : int;
public static var poison3Count : int;
public static var fork3Count : int;
public static var boost3Count : int;
public static var pierce3Count : int;
public static var giant3Count : int;
public static var splash3Count : int;
public static var leech3Count : int;
public static var swordCount : int;
public static var blind3Count : int;
public static var rapid3Count : int;
public static var homingCount : int;
public static var meteorCount : int;

var normalSpell : String;
var specialSpell : String;
var badSpell : String;

//private var audioS: AudioSource; 

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

function Start () {
    
    var background = new GameObject().CreatePrimitive(PrimitiveType.Quad);
	background.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/shop",Texture2D); //Set the texture.  Must be in Resources folder
	background.GetComponent.<Renderer>().material.shader = Shader.Find ("Diffuse");	
	background.transform.localScale = Vector3(13.8,10,1);					// Tell the renderer that our textures have transparency. 
    
    //audioS = gameObject.AddComponent(AudioSource);
    //audioS.clip = Resources.Load("Sounds/shopmusic");
 	//audioS.Play();
    //audioS.loop = true;
    
	normalSpell = "/4";
	specialSpell = "/1";
	badSpell = "/0";
	
	//Start with none of anything
	ice3Count = 0;
	poison3Count = 0;
	fork3Count = 0;
	boost3Count = 0;
	pierce3Count = 0;
	giant3Count = 0;
	splash3Count = 0;
	leech3Count = 0;
	swordCount = 0;
	blind3Count = 0;
	rapid3Count = 0;
	homingCount = 0;
	meteorCount = 0;
	
	ice3Texture = Resources.Load("Textures/ice3",Texture2D);
	poison3Texture = Resources.Load("Textures/poison3",Texture2D);
	fork3Texture = Resources.Load("Textures/fork3",Texture2D);
	boost3Texture = Resources.Load("Textures/boost3",Texture2D);
	pierce3Texture = Resources.Load("Textures/pierce3",Texture2D);
	giant3Texture = Resources.Load("Textures/giant3",Texture2D);
	splash3Texture = Resources.Load("Textures/splash3",Texture2D);
	leech3Texture = Resources.Load("Textures/leech3",Texture2D);
	blind3Texture = Resources.Load("Textures/blind3",Texture2D);
	rapid3Texture = Resources.Load("Textures/rapid3",Texture2D);
	shopTexture = Resources.Load("Textures/shop",Texture2D);



	
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < ShopManager.cardsOwned.length; i++) {
		if (ShopManager.cardsOwned[i] == "ice3") {
			ice3Count++;
		}
		if (ShopManager.cardsOwned[i] == "poison3") {
			poison3Count++;
		}
		if (ShopManager.cardsOwned[i] == "fork3") {
			fork3Count++;
		}
		if (ShopManager.cardsOwned[i] == "boost3") {
			boost3Count++;
		}
		if (ShopManager.cardsOwned[i] == "pierce3") {
			pierce3Count++;
		}
		if (ShopManager.cardsOwned[i] == "giant3") {
			giant3Count++;
		}
		if (ShopManager.cardsOwned[i] == "splash3") {
			splash3Count++;
		}
		if (ShopManager.cardsOwned[i] == "leech3") {
			leech3Count++;
		}
		if (ShopManager.cardsOwned[i] == "SWORD") {
			swordCount++;
		}
		if (ShopManager.cardsOwned[i] == "blind3") {
			blind3Count++;
		}
		if (ShopManager.cardsOwned[i] == "rapid3") {
			rapid3Count++;
		}
		if (ShopManager.cardsOwned[i] == "HOMING") {
			homingCount++;
		}
		if (ShopManager.cardsOwned[i] == "meteor") {
			meteorCount++;
		}
	}
	
	
	//*****************************SETTING ALL THE OF TEXT**************************************
	var titleO = new GameObject("TitleText");
	titleO.transform.position = Vector3(.44, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "Shop!";
	title.fontSize = Screen.height/19;
	
	var reminderO = new GameObject("TitleText");
	reminderO.transform.position = Vector3(.38, .23, -1);
	reminder = reminderO.AddComponent(GUIText); 
	reminder.text = "You have $" + ShopManager.money + ".";
	reminder.fontSize = Screen.height/22;
	
	var ice3O = new GameObject("ice3Text");
	ice3O.transform.position = Vector3(.02, .8, -1);
	ice3 = ice3O.AddComponent(GUIText); 
	ice3.text = "Ice3" + " " + ice3Count + normalSpell;
	ice3.fontSize = Screen.height/24;
	
	var poison3O = new GameObject("poison3Text");
	poison3O.transform.position = Vector3(.02, .72, -1);
	poison3 = poison3O.AddComponent(GUIText); 
	poison3.text = "Poison3" + " " + poison3Count + normalSpell;
	poison3.fontSize = Screen.height/24;
	
	var fork3O = new GameObject("fork3Text");
	fork3O.transform.position = Vector3(.02, .64, -1);
	fork3 = fork3O.AddComponent(GUIText); 
	fork3.text = "Fork3" + " " + fork3Count + normalSpell;
	fork3.fontSize = Screen.height/24;
	
	var boost3O = new GameObject("boostText");
	boost3O.transform.position = Vector3(.02, .56, -1);
	boost3 = boost3O.AddComponent(GUIText); 
	boost3.text = "Boost3" + " " + boost3Count + normalSpell;
	boost3.fontSize = Screen.height/24;
	
	var pierce3O = new GameObject("pierce3Text");
	pierce3O.transform.position = Vector3(.02, .48, -1);
	pierce3 = pierce3O.AddComponent(GUIText); 
	pierce3.text = "Pierce3" + " " + pierce3Count + normalSpell;
	pierce3.fontSize = Screen.height/24;
	
	var giant3O = new GameObject("giant3Text");
	giant3O.transform.position = Vector3(.02, .40, -1);
	giant3 = giant3O.AddComponent(GUIText); 
	giant3.text = "Giant3" + " " + giant3Count + normalSpell;
	giant3.fontSize = Screen.height/24;
	
	var splash3O = new GameObject("splash3Text");
	splash3O.transform.position = Vector3(.02, .32, -1);
	splash3 = splash3O.AddComponent(GUIText); 
	splash3.text = "Splash3"  + " " + splash3Count + normalSpell;
	splash3.fontSize = Screen.height/24;
	
	var leech3O = new GameObject("leech3Text");
	leech3O.transform.position = Vector3(.52, .8, -1);
	leech3 = leech3O.AddComponent(GUIText); 
	leech3.text = "Leech3"  + " " + leech3Count + normalSpell;
	leech3.fontSize = Screen.height/24;
	
/*	var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blind3O = new GameObject("blind3Text");
	blind3O.transform.position = Vector3(.52, .64, -1);
	blind3 = blind3O.AddComponent(GUIText); 
	blind3.text = "Blind3" + " " + blind3Count + normalSpell;
	blind3.fontSize = Screen.height/24;
	
	var rapid3O = new GameObject("rapid3Text");
	rapid3O.transform.position = Vector3(.52, .56, -1);
	rapid3 = rapid3O.AddComponent(GUIText); 
	rapid3.text = "Rapid3" + " " + rapid3Count + normalSpell;
	rapid3.fontSize = Screen.height/24;
	
/*	var homingO = new GameObject("homingText");
	homingO.transform.position = Vector3(.52, .48, -1);
	homing = homingO.AddComponent(GUIText); 
	homing.text = "Homing" + " " + homingCount + badSpell;
	homing.fontSize = Screen.height/24;
	
	var meteorO = new GameObject("meteorText");
	meteorO.transform.position = Vector3(.52, .40, -1);
	meteor = meteorO.AddComponent(GUIText); 
	meteor.text = "Meteor" + " " + meteorCount + badSpell;
	meteor.fontSize = Screen.height/24;*/
}

function Update () {
	ice3.text = "Ice3" + " " + ice3Count + normalSpell;
	poison3.text = "Poison3" + " " + poison3Count + normalSpell;
	fork3.text = "Fork3" + " " + fork3Count + normalSpell;
	boost3.text = "Boost3" + " " + boost3Count + normalSpell;
	pierce3.text = "Pierce3" + " " + pierce3Count + normalSpell;
	giant3.text = "Giant3" + " " + giant3Count + normalSpell;
	splash3.text = "Splash3"  + " " + splash3Count + normalSpell;
	leech3.text = "Leech3"  + " " + leech3Count + normalSpell;
	//sword.text = "Sword" + " " + swordCount + badSpell;
	blind3.text = "Blind3" + " " + blind3Count + normalSpell;
	rapid3.text = "Rapid3"  + " " + rapid3Count + normalSpell;
	//homing.text = "Homing" + " " + homingCount + badSpell;
	//meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have $" + ShopManager.money + ".";
	
	ice3.fontSize = Screen.height/24;
	poison3.fontSize = Screen.height/24;
	fork3.fontSize = Screen.height/24;
	boost3.fontSize = Screen.height/24;
	pierce3.fontSize = Screen.height/24;
	giant3.fontSize = Screen.height/24;
	splash3.fontSize = Screen.height/24;
	leech3.fontSize = Screen.height/24;
	//sword.fontSize = Screen.height/24;
	blind3.fontSize = Screen.height/24;
	rapid3.fontSize = Screen.height/24;
	//homing.fontSize = Screen.height/24;
	//meteor.fontSize = Screen.height/24;
	title.fontSize = Screen.height/19;
	reminder.fontSize = Screen.height/22;
	
}
function remove(card : String) {
	for (var i = 0; i < ShopManager.cardsOwned.length; i++) {
		if (ShopManager.cardsOwned[i] == card) {
			ShopManager.cardsOwned.RemoveAt(i);
			i = ShopManager.cardsOwned.length + 6;
		}
	}
}

function add(card : String) {
	ShopManager.cardsOwned.Push(card);
}
/*function spawnBackground() {
	var backgroundObject = new GameObject();					// Create a new empty game object that will hold a
	var backgroundScript = backgroundObject.AddComponent("background");		// Add the  script to the object.
														// We can now refer to the object via this script.
	
	backgroundScript.transform.position = Vector3(0,0,-1);	// Position the at x,y.
	
	backgroundScript.init();							// Initialize the script.
	
	
	backgroundScript.name = "background";	
}
public static function AutoResize(screenWidth:int, screenHeight:int):void
{
    var resizeRatio:Vector2 = Vector2(Screen.width / parseFloat(screenWidth), Screen.height / parseFloat(screenHeight));
    GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, Vector3(resizeRatio.x, resizeRatio.y, 1.0));
}*/
function OnGUI() {



	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.8,Screen.height/15,Screen.height/15),ice3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.72,Screen.height/15,Screen.height/15),poison3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.64,Screen.height/15,Screen.height/15),fork3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.56,Screen.height/15,Screen.height/15),boost3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.48,Screen.height/15,Screen.height/15),pierce3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.40,Screen.height/15,Screen.height/15),giant3Texture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.32,Screen.height/15,Screen.height/15),splash3Texture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.8,Screen.height/15,Screen.height/15),leech3Texture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.64,Screen.height/15,Screen.height/15),blind3Texture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.56,Screen.height/15,Screen.height/15),rapid3Texture);

	


	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	//AutoResize(1024, 768);
	//GUI.Text(Rect(150,25,400,40),"Build Your theDeck!");
	
	if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((ice3Count < 4) && (ShopManager.money >= 400)) {
			ice3Count++;
			ShopManager.money -=400;
			add("ice3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((poison3Count < 4)  && (ShopManager.money >= 400)) {
			poison3Count++;
			ShopManager.money -=400;
			add("poison3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((fork3Count < 4)  && (ShopManager.money >= 400)) {
			fork3Count++;
			ShopManager.money -=400;
			add("fork3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((boost3Count < 4)  && (ShopManager.money >= 400)) {
			boost3Count++;
			ShopManager.money -=400;
			add("boost3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((pierce3Count < 4)  && (ShopManager.money >= 400)) {
			pierce3Count++;
			ShopManager.money -=400;
			add("pierce3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((giant3Count < 4)  && (ShopManager.money >= 400)) {
			giant3Count++;
			ShopManager.money -=400;
			add("giant3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.32,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((splash3Count < 4) && (ShopManager.money >= 400)) {
			splash3Count++;
			ShopManager.money -=400;
			add("splash3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((leech3Count < 4)  && (ShopManager.money >= 400)) {
			leech3Count++;
			ShopManager.money -=400;
			add("leech3");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((swordCount < 0)  && (ShopManager.money >= 400)) {
			//swordCount++;
			//ShopManager.money -=400;
			//add("SWORD");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((blind3Count < 4)  && (ShopManager.money >= 400)) {
			blind3Count++;
			ShopManager.money -=400;
			add("blind3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((rapid3Count < 4)  && (ShopManager.money >= 400)) {
			rapid3Count++;
			ShopManager.money -=400;
			add("rapid3");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((homingCount < 0)  && (ShopManager.money >= 400)) {
			homingCount++;
			ShopManager.money -=400;
			add("HOMING");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $400")) {
		if ((meteorCount < 0)  && (ShopManager.money >= 400)) {
			//meteorCount++;
			//ShopManager.money -=400;
			//add("METEOR");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/3,Screen.height/1.2,Screen.width*0.30,Screen.height*0.10),"Go to Deck Building!")) {
		//audioS.loop = false;
        //audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();;
	}
	else if (GUI.Button(Rect(Screen.width/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"<---")) {
		//audioS.loop = false;
        //audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop2");
	}
}