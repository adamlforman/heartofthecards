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
var ice2Count : int;
var poison2Count : int;
var fork2Count : int;
var reflectCount : int;
var pierce2Count : int;
var giant2Count : int;
var splash2Count : int;
var leech2Count : int;
var swordCount : int;
var blind2Count : int;
var rapid2Count : int;
var homingCount : int;
var meteorCount : int;

//Max for all of the cards
var ice2Max : int;
var poison2Max : int;
var fork2Max : int;
var reflectMax : int;
var pierce2Max : int;
var giant2Max : int;
var splash2Max : int;
var leech2Max : int;
var swordMax : int;
var blind2Max : int;
var rapid2Max : int;
var homingMax : int;
var meteorMax : int;


var normalSpell : String;
var badSpell : String;

function Start () {
	normalSpell = "/4";
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
	for (var i = 0; i < NewDeckManager.theDeck.length; i++) {
		if (NewDeckManager.theDeck[i] == "ice2") {
			ice2Count++;
		}
		if (NewDeckManager.theDeck[i] == "poison2") {
			poison2Count++;
		}
		if (NewDeckManager.theDeck[i] == "fork2") {
			fork2Count++;
		}
		if (NewDeckManager.theDeck[i] == "REFLECT") {
			reflectCount++;
		}
		if (NewDeckManager.theDeck[i] == "pierce2") {
			pierce2Count++;
		}
		if (NewDeckManager.theDeck[i] == "giant2") {
			giant2Count++;
		}
		if (NewDeckManager.theDeck[i] == "splash2") {
			splash2Count++;
		}
		if (NewDeckManager.theDeck[i] == "leech2") {
			leech2Count++;
		}
		if (NewDeckManager.theDeck[i] == "SWORD") {
			swordCount++;
		}
		if (NewDeckManager.theDeck[i] == "blind2") {
			blind2Count++;
		}
		if (NewDeckManager.theDeck[i] == "rapid2") {
			rapid2Count++;
		}
		if (NewDeckManager.theDeck[i] == "HOMING") {
			homingCount++;
		}
		if (NewDeckManager.theDeck[i] == "meteor") {
			meteorCount++;
		}
	}
	
	for (i = 0; i < ShopManager.cardsOwned.length; i++) {
		if (ShopManager.cardsOwned[i] == "ice2") {
			ice2Max++;
		}
		if (ShopManager.cardsOwned[i] == "poison2") {
			poison2Max++;
		}
		if (ShopManager.cardsOwned[i] == "fork2") {
			fork2Max++;
		}
		if (ShopManager.cardsOwned[i] == "REFLECT") {
			reflectMax++;
		}
		if (ShopManager.cardsOwned[i] == "pierce2") {
			pierce2Max++;
		}
		if (ShopManager.cardsOwned[i] == "giant2") {
			giant2Max++;
		}
		if (ShopManager.cardsOwned[i] == "splash2") {
			splash2Max++;
		}
		if (ShopManager.cardsOwned[i] == "leech2") {
			leech2Max++;
		}
		if (ShopManager.cardsOwned[i] == "SWORD") {
			swordMax++;
		}
		if (ShopManager.cardsOwned[i] == "blind2") {
			blind2Max++;
		}
		if (ShopManager.cardsOwned[i] == "rapid2") {
			rapid2Max++;
		}
		if (ShopManager.cardsOwned[i] == "HOMING") {
			homingMax++;
		}
		if (ShopManager.cardsOwned[i] == "meteor") {
			meteorMax++;
		}
	}
	
	
	//*****************************SETTING ALL THE OF TEXT**************************************
	var titleO = new GameObject("TitleText");
	titleO.transform.position = Vector3(.35, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "Build Your Deck!";
	title.fontSize = Screen.height/19;
	
	var reminderO = new GameObject("TitleText");
	reminderO.transform.position = Vector3(.31, .25, -1);
	reminder = reminderO.AddComponent(GUIText); 
	reminder.text = "You have " + NewDeckManager.theDeck.length + " card out of 20 needed.";
	reminder.fontSize = Screen.height/28;
	
	var ice2O = new GameObject("ice2Text");
	ice2O.transform.position = Vector3(.02, .8, -1);
	ice2 = ice2O.AddComponent(GUIText); 
	ice2.text = "Ice2" + " " + ice2Count + "/" + ice2Max;
	ice2.fontSize = Screen.height/24;
	
	var poison2O = new GameObject("poison2Text");
	poison2O.transform.position = Vector3(.02, .72, -1);
	poison2 = poison2O.AddComponent(GUIText); 
	poison2.text = "Poison2" + " " + poison2Count + "/" + poison2Max;
	poison2.fontSize = Screen.height/24;
	
	var fork2O = new GameObject("fork2Text");
	fork2O.transform.position = Vector3(.02, .64, -1);
	fork2 = fork2O.AddComponent(GUIText); 
	fork2.text = "Fork2" + " " + fork2Count + "/" + fork2Max;
	fork2.fontSize = Screen.height/24;
	
	/*var reflectO = new GameObject("reflectText");
	reflectO.transform.position = Vector3(.02, .56, -1);
	reflect = reflectO.AddComponent(GUIText); 
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	reflect.fontSize = Screen.height/24;*/
	
	var pierce2O = new GameObject("pierce2Text");
	pierce2O.transform.position = Vector3(.02, .48, -1);
	pierce2 = pierce2O.AddComponent(GUIText); 
	pierce2.text = "Pierce2" + " " + pierce2Count + "/" + pierce2Max;
	pierce2.fontSize = Screen.height/24;
	
	var giant2O = new GameObject("giant2Text");
	giant2O.transform.position = Vector3(.02, .40, -1);
	giant2 = giant2O.AddComponent(GUIText); 
	giant2.text = "Giant2" + " " + giant2Count + "/" + giant2Max;
	giant2.fontSize = Screen.height/24;
	
	var splash2O = new GameObject("splash2Text");
	splash2O.transform.position = Vector3(.02, .32, -1);
	splash2 = splash2O.AddComponent(GUIText); 
	splash2.text = "Splash2"  + " " + splash2Count + "/" + splash2Max;
	splash2.fontSize = Screen.height/24;
	
	var leech2O = new GameObject("leech2Text");
	leech2O.transform.position = Vector3(.52, .8, -1);
	leech2 = leech2O.AddComponent(GUIText); 
	leech2.text = "Leech2"  + " " + leech2Count + "/" + leech2Max;
	leech2.fontSize = Screen.height/24;
	
	/*var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blind2O = new GameObject("blind2Text");
	blind2O.transform.position = Vector3(.52, .64, -1);
	blind2 = blind2O.AddComponent(GUIText); 
	blind2.text = "Blind2" + " " + blind2Count + "/" + blind2Max;
	blind2.fontSize = Screen.height/24;
	
	var rapid2O = new GameObject("rapid2Text");
	rapid2O.transform.position = Vector3(.52, .56, -1);
	rapid2 = rapid2O.AddComponent(GUIText); 
	rapid2.text = "Rapid2" + " " + rapid2Count + "/" + rapid2Max;
	rapid2.fontSize = Screen.height/24;
	
	/*var homingO = new GameObject("homingText");
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
	ice2.text = "Ice2" + " " + ice2Count + "/" + ice2Max;
	poison2.text = "Poison2" + " " + poison2Count + "/" + poison2Max;
	fork2.text = "Fork2" + " " + fork2Count + "/" + fork2Max;
	//reflect.text = "Reflect" + " " + reflectCount + badSpell;
	pierce2.text = "Pierce2" + " " + pierce2Count + "/" + pierce2Max;
	giant2.text = "Giant2" + " " + giant2Count + "/" + giant2Max;
	splash2.text = "Splash2"  + " " + splash2Count + "/" + splash2Max;
	leech2.text = "Leech2"  + " " + leech2Count + "/" + leech2Max;
	//sword.text = "Sword" + " " + swordCount + badSpell;
	blind2.text = "Blind2" + " " + blind2Count + "/" + blind2Max;
	rapid2.text = "Rapid2"  + " " + rapid2Count + "/" + rapid2Max;
	//homing.text = "Homing" + " " + homingCount + badSpell;
	//meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have " + NewDeckManager.theDeck.length + " card out of 20 needed.";
	
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
	reminder.fontSize = Screen.height/28;
	
}
function remove(card : String) {
	for (var i = 0; i < NewDeckManager.theDeck.length; i++) {
		if (NewDeckManager.theDeck[i] == card) {
			NewDeckManager.theDeck.RemoveAt(i);
			i = NewDeckManager.theDeck.length + 6;
		}
	}
}

function add(card : String) {
	NewDeckManager.theDeck.Push(card);
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
	
	if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"+")) {
		if ((ice2Count < 4) && (NewDeckManager.theDeck.length < 20) && (ice2Count < Shop2Manager.ice2Count)) {
			ice2Count++;
			add("ice2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (ice2Count > 0) {
			ice2Count--;
			remove("ice2");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((poison2Count < 4) && (NewDeckManager.theDeck.length < 20) && (poison2Count < Shop2Manager.poison2Count)) {
			poison2Count++;
			add("poison2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (poison2Count > 0) {
			poison2Count--;
			remove("poison2");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((fork2Count < 4) && (NewDeckManager.theDeck.length < 20)  && (fork2Count < Shop2Manager.fork2Count)) {
			fork2Count++;
			add("fork2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (fork2Count > 0) {
			fork2Count--;
			remove("fork2");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((reflectCount < 0) && (NewDeckManager.theDeck.length < 20) && (reflectCount < Shop2Manager.reflectCount)) {
			reflectCount++;
			add("REFLECT");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (reflectCount > 0) {
			reflectCount--;
			remove("REFLECT");
		}
	}*/
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"+")) {
		if ((pierce2Count < 4) && (NewDeckManager.theDeck.length < 20) && (pierce2Count < Shop2Manager.pierce2Count)) {
			pierce2Count++;
			add("pierce2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"-")) {
		if (pierce2Count > 0) {
			pierce2Count--;
			remove("pierce2");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"+")) {
		if ((giant2Count < 4) && (NewDeckManager.theDeck.length < 20) && (giant2Count < Shop2Manager.giant2Count)) {
			giant2Count++;
			add("giant2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (giant2Count > 0) {
			giant2Count--;
			remove("giant2");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"+")) {
		if ((splash2Count < 4) && (NewDeckManager.theDeck.length < 20) && (splash2Count < Shop2Manager.splash2Count)) {
			splash2Count++;
			add("splash2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"-")) {
		if (splash2Count > 0) {
			splash2Count--;
			remove("splash2");
		}
	}
	
	if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"+")) {
		if ((leech2Count < 4) && (NewDeckManager.theDeck.length < 20) && (leech2Count < Shop2Manager.leech2Count)) {
			leech2Count++;
			add("leech2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (leech2Count > 0) {
			leech2Count--;
			remove("leech2");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((swordCount < 0) && (NewDeckManager.theDeck.length < 20) && (swordCount < Shop2Manager.swordCount)) {
			swordCount++;
			add("SWORD");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (swordCount > 0) {
			swordCount--;
			remove("SWORD");
		}
	}*/
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((blind2Count < 4) && (NewDeckManager.theDeck.length < 20)  && (blind2Count < Shop2Manager.blind2Count)) {
			blind2Count++;
			add("blind2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (blind2Count > 0) {
			blind2Count--;
			remove("blind2");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((rapid2Count < 4) && (NewDeckManager.theDeck.length < 20) && (rapid2Count < Shop2Manager.rapid2Count)) {
			rapid2Count++;
			add("rapid2");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (rapid2Count > 0) {
			rapid2Count--;
			remove("rapid2");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"+")) {
		if ((homingCount < 0) && (NewDeckManager.theDeck.length < 20) && (homingCount < Shop2Manager.homingCount)) {
			homingCount++;
			add("HOMING");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"-")) {
		if (homingCount > 0) {
			homingCount--;
			remove("HOMING");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"+")) {
		if ((meteorCount < 0) && (NewDeckManager.theDeck.length < 20) && (meteorCount < Shop2Manager.meteorCount)) {
			meteorCount++;
			add("METEOR");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (meteorCount > 0) {
			meteorCount--;
			remove("METEOR");
		}
	}*/
	
	else if (GUI.Button(Rect(Screen.width/3.1,Screen.height/1.2,Screen.width*0.35,Screen.height*0.10),"Done Building")) {
		if (NewDeckManager.theDeck.length == 20) {
			GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();
		}
	}
	else if (GUI.Button(Rect(Screen.width/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"<---")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("deckBuilder");
	}
	else if (GUI.Button(Rect(Screen.width*6/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"--->")) {
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("deckBuilder3");
	}
}