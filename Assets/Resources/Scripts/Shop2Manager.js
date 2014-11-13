var title : GUIText;
var reminder : GUIText;
var ice2 : GUIText;
var poison2 : GUIText;
var fork2 : GUIText;
var reflect : GUIText;
var pierce2 : GUIText;
var giant2 : GUIText;
var splash2 : GUIText;
var leech2 : GUIText;
var sword : GUIText;
var blind2 : GUIText;
var rapid2 : GUIText;
var homing : GUIText;
var meteor : GUIText;

//Counters for all of the cards
public static var ice2Count : int;
public static var poison2Count : int;
public static var fork2Count : int;
public static var reflectCount : int;
public static var pierce2Count : int;
public static var giant2Count : int;
public static var splash2Count : int;
public static var leech2Count : int;
public static var swordCount : int;
public static var blind2Count : int;
public static var rapid2Count : int;
public static var homingCount : int;
public static var meteorCount : int;

var normalSpell : String;
var specialSpell : String;
var badSpell : String;

private var audioS: AudioSource; 

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
    audioS = gameObject.AddComponent(AudioSource);
    audioS.clip = Resources.Load("Sounds/shopmusic");
 	audioS.Play();
    audioS.loop = true;
    
	normalSpell = "/4";
	specialSpell = "/1";
	badSpell = "/0";
	
	//Start with none of anything
	ice2Count = 0;
	poison2Count = 0;
	fork2Count = 0;
	reflectCount = 0;
	pierce2Count = 0;
	giant2Count = 0;
	splash2Count = 0;
	leech2Count = 0;
	swordCount = 0;
	blind2Count = 0;
	rapid2Count = 0;
	homingCount = 0;
	meteorCount = 0;


	
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < ShopManager.cardsOwned.length; i++) {
		if (ShopManager.cardsOwned[i] == "ice2") {
			ice2Count++;
		}
		if (ShopManager.cardsOwned[i] == "poison2") {
			poison2Count++;
		}
		if (ShopManager.cardsOwned[i] == "fork2") {
			fork2Count++;
		}
		if (ShopManager.cardsOwned[i] == "REFLECT") {
			reflectCount++;
		}
		if (ShopManager.cardsOwned[i] == "pierce2") {
			pierce2Count++;
		}
		if (ShopManager.cardsOwned[i] == "giant2") {
			giant2Count++;
		}
		if (ShopManager.cardsOwned[i] == "splash2") {
			splash2Count++;
		}
		if (ShopManager.cardsOwned[i] == "leech2") {
			leech2Count++;
		}
		if (ShopManager.cardsOwned[i] == "SWORD") {
			swordCount++;
		}
		if (ShopManager.cardsOwned[i] == "blind2") {
			blind2Count++;
		}
		if (ShopManager.cardsOwned[i] == "rapid2") {
			rapid2Count++;
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
	reminder.text = "You have $" + PlayerStatus.money + ".";
	reminder.fontSize = Screen.height/22;
	
	var ice2O = new GameObject("ice2Text");
	ice2O.transform.position = Vector3(.02, .8, -1);
	ice2 = ice2O.AddComponent(GUIText); 
	ice2.text = "Ice2" + " " + ice2Count + normalSpell;
	ice2.fontSize = Screen.height/24;
	
	var poison2O = new GameObject("poison2Text");
	poison2O.transform.position = Vector3(.02, .72, -1);
	poison2 = poison2O.AddComponent(GUIText); 
	poison2.text = "Poison2" + " " + poison2Count + normalSpell;
	poison2.fontSize = Screen.height/24;
	
	var fork2O = new GameObject("fork2Text");
	fork2O.transform.position = Vector3(.02, .64, -1);
	fork2 = fork2O.AddComponent(GUIText); 
	fork2.text = "Fork2" + " " + fork2Count + normalSpell;
	fork2.fontSize = Screen.height/24;
	
	/*var reflectO = new GameObject("reflectText");
	reflectO.transform.position = Vector3(.02, .56, -1);
	reflect = reflectO.AddComponent(GUIText); 
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	reflect.fontSize = Screen.height/24;*/
	
	var pierce2O = new GameObject("pierce2Text");
	pierce2O.transform.position = Vector3(.02, .48, -1);
	pierce2 = pierce2O.AddComponent(GUIText); 
	pierce2.text = "Pierce2" + " " + pierce2Count + normalSpell;
	pierce2.fontSize = Screen.height/24;
	
	var giant2O = new GameObject("giant2Text");
	giant2O.transform.position = Vector3(.02, .40, -1);
	giant2 = giant2O.AddComponent(GUIText); 
	giant2.text = "Giant2" + " " + giant2Count + normalSpell;
	giant2.fontSize = Screen.height/24;
	
	var splash2O = new GameObject("splash2Text");
	splash2O.transform.position = Vector3(.02, .32, -1);
	splash2 = splash2O.AddComponent(GUIText); 
	splash2.text = "Splash2"  + " " + splash2Count + normalSpell;
	splash2.fontSize = Screen.height/24;
	
	var leech2O = new GameObject("leech2Text");
	leech2O.transform.position = Vector3(.52, .8, -1);
	leech2 = leech2O.AddComponent(GUIText); 
	leech2.text = "Leech2"  + " " + leech2Count + normalSpell;
	leech2.fontSize = Screen.height/24;
	
/*	var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blind2O = new GameObject("blind2Text");
	blind2O.transform.position = Vector3(.52, .64, -1);
	blind2 = blind2O.AddComponent(GUIText); 
	blind2.text = "Blind2" + " " + blind2Count + normalSpell;
	blind2.fontSize = Screen.height/24;
	
	var rapid2O = new GameObject("rapid2Text");
	rapid2O.transform.position = Vector3(.52, .56, -1);
	rapid2 = rapid2O.AddComponent(GUIText); 
	rapid2.text = "Rapid2" + " " + rapid2Count + normalSpell;
	rapid2.fontSize = Screen.height/24;
	
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
	ice2.text = "Ice2" + " " + ice2Count + normalSpell;
	poison2.text = "Poison2" + " " + poison2Count + normalSpell;
	fork2.text = "Fork2" + " " + fork2Count + normalSpell;
	//reflect.text = "Reflect" + " " + reflectCount + badSpell;
	pierce2.text = "Pierce2" + " " + pierce2Count + normalSpell;
	giant2.text = "Giant2" + " " + giant2Count + normalSpell;
	splash2.text = "Splash2"  + " " + splash2Count + normalSpell;
	leech2.text = "Leech2"  + " " + leech2Count + normalSpell;
	//sword.text = "Sword" + " " + swordCount + badSpell;
	blind2.text = "Blind2" + " " + blind2Count + normalSpell;
	rapid2.text = "Rapid2"  + " " + rapid2Count + normalSpell;
	//homing.text = "Homing" + " " + homingCount + badSpell;
	//meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have $" + PlayerStatus.money + ".";
	
	ice2.fontSize = Screen.height/24;
	poison2.fontSize = Screen.height/24;
	fork2.fontSize = Screen.height/24;
	//reflect.fontSize = Screen.height/24;
	pierce2.fontSize = Screen.height/24;
	giant2.fontSize = Screen.height/24;
	splash2.fontSize = Screen.height/24;
	leech2.fontSize = Screen.height/24;
	//sword.fontSize = Screen.height/24;
	blind2.fontSize = Screen.height/24;
	rapid2.fontSize = Screen.height/24;
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
	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	//AutoResize(1024, 768);
	//GUI.Text(Rect(150,25,200,40),"Build Your theDeck!");
	
	if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((ice2Count < 4) && (PlayerStatus.money >= 200)) {
			ice2Count++;
			PlayerStatus.money -=200;
			add("ice2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((poison2Count < 4)  && (PlayerStatus.money >= 200)) {
			poison2Count++;
			PlayerStatus.money -=200;
			add("poison2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((fork2Count < 4)  && (PlayerStatus.money >= 200)) {
			fork2Count++;
			PlayerStatus.money -=200;
			add("fork2");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((reflectCount < 0)  && (PlayerStatus.money >= 200)) {
			//reflectCount++;
			//PlayerStatus.money -=200;
			//add("REFLECT");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((pierce2Count < 4)  && (PlayerStatus.money >= 200)) {
			pierce2Count++;
			PlayerStatus.money -=200;
			add("pierce2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((giant2Count < 4)  && (PlayerStatus.money >= 200)) {
			giant2Count++;
			PlayerStatus.money -=200;
			add("giant2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.32,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((splash2Count < 4) && (PlayerStatus.money >= 200)) {
			splash2Count++;
			PlayerStatus.money -=200;
			add("splash2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((leech2Count < 4)  && (PlayerStatus.money >= 200)) {
			leech2Count++;
			PlayerStatus.money -=200;
			add("leech2");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((swordCount < 0)  && (PlayerStatus.money >= 200)) {
			//swordCount++;
			//PlayerStatus.money -=200;
			//add("SWORD");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((blind2Count < 4)  && (PlayerStatus.money >= 200)) {
			blind2Count++;
			PlayerStatus.money -=200;
			add("blind2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((rapid2Count < 4)  && (PlayerStatus.money >= 200)) {
			rapid2Count++;
			PlayerStatus.money -=200;
			add("rapid2");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((homingCount < 0)  && (PlayerStatus.money >= 200)) {
			homingCount++;
			PlayerStatus.money -=200;
			add("HOMING");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $200")) {
		if ((meteorCount < 0)  && (PlayerStatus.money >= 200)) {
			//meteorCount++;
			//PlayerStatus.money -=200;
			//add("METEOR");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/3,Screen.height/1.2,Screen.width*0.30,Screen.height*0.10),"Go to Deck Building!")) {
		audioS.loop = false;
        audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();
	}
	else if (GUI.Button(Rect(Screen.width/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"<---")) {
		audioS.loop = false;
        audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop");
	}
	else if (GUI.Button(Rect(Screen.width*6/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"--->")) {
		audioS.loop = false;
        audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop3");
	}
}