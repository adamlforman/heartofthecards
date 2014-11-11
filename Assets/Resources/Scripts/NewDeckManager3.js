var title : GUIText;
var reminder : GUIText;
var ice3 : GUIText;
var poison3 : GUIText;
var fork3 : GUIText;
var reflect : GUIText;
var pierce3 : GUIText;
var giant3 : GUIText;
var splash3 : GUIText;
var leech3 : GUIText;
var sword : GUIText;
var blind3 : GUIText;
var rapid3 : GUIText;
var homing : GUIText;
var meteor : GUIText;

//Counters for all of the cards
var ice3Count : int;
var poison3Count : int;
var fork3Count : int;
var reflectCount : int;
var pierce3Count : int;
var giant3Count : int;
var splash3Count : int;
var leech3Count : int;
var swordCount : int;
var blind3Count : int;
var rapid3Count : int;
var homingCount : int;
var meteorCount : int;

//Max for all of the cards
var ice3Max : int;
var poison3Max : int;
var fork3Max : int;
var reflectMax : int;
var pierce3Max : int;
var giant3Max : int;
var splash3Max : int;
var leech3Max : int;
var swordMax : int;
var blind3Max : int;
var rapid3Max : int;
var homingMax : int;
var meteorMax : int;


var normalSpell : String;
var badSpell : String;

function Start () {
	normalSpell = "/4";
	badSpell = "/0";
	
	//Start with none of anything
	ice3Count = 0;
	poison3Count = 0;
	fork3Count = 0;
	reflectCount = 0;
	pierce3Count = 0;
	giant3Count = 0;
	splash3Count = 0;
	leech3Count = 0;
	swordCount = 0;
	blind3Count = 0;
	rapid3Count = 0;
	homingCount = 0;
	meteorCount = 0;

	
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < NewDeckManager.theDeck.length; i++) {
		if (NewDeckManager.theDeck[i] == "ice3") {
			ice3Count++;
		}
		if (NewDeckManager.theDeck[i] == "poison3") {
			poison3Count++;
		}
		if (NewDeckManager.theDeck[i] == "fork3") {
			fork3Count++;
		}
		if (NewDeckManager.theDeck[i] == "REFLECT") {
			reflectCount++;
		}
		if (NewDeckManager.theDeck[i] == "pierce3") {
			pierce3Count++;
		}
		if (NewDeckManager.theDeck[i] == "giant3") {
			giant3Count++;
		}
		if (NewDeckManager.theDeck[i] == "splash3") {
			splash3Count++;
		}
		if (NewDeckManager.theDeck[i] == "leech3") {
			leech3Count++;
		}
		if (NewDeckManager.theDeck[i] == "SWORD") {
			swordCount++;
		}
		if (NewDeckManager.theDeck[i] == "blind3") {
			blind3Count++;
		}
		if (NewDeckManager.theDeck[i] == "rapid3") {
			rapid3Count++;
		}
		if (NewDeckManager.theDeck[i] == "HOMING") {
			homingCount++;
		}
		if (NewDeckManager.theDeck[i] == "meteor") {
			meteorCount++;
		}
	}
	
	for (i = 0; i < ShopManager.cardsOwned.length; i++) {
		if (ShopManager.cardsOwned[i] == "ice3") {
			ice3Max++;
		}
		if (ShopManager.cardsOwned[i] == "poison3") {
			poison3Max++;
		}
		if (ShopManager.cardsOwned[i] == "fork3") {
			fork3Max++;
		}
		if (ShopManager.cardsOwned[i] == "REFLECT") {
			reflectMax++;
		}
		if (ShopManager.cardsOwned[i] == "pierce3") {
			pierce3Max++;
		}
		if (ShopManager.cardsOwned[i] == "giant3") {
			giant3Max++;
		}
		if (ShopManager.cardsOwned[i] == "splash3") {
			splash3Max++;
		}
		if (ShopManager.cardsOwned[i] == "leech3") {
			leech3Max++;
		}
		if (ShopManager.cardsOwned[i] == "SWORD") {
			swordMax++;
		}
		if (ShopManager.cardsOwned[i] == "blind3") {
			blind3Max++;
		}
		if (ShopManager.cardsOwned[i] == "rapid3") {
			rapid3Max++;
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
	
	var ice3O = new GameObject("ice3Text");
	ice3O.transform.position = Vector3(.02, .8, -1);
	ice3 = ice3O.AddComponent(GUIText); 
	ice3.text = "Ice3" + " " + ice3Count + "/" + ice3Max;
	ice3.fontSize = Screen.height/24;
	
	var poison3O = new GameObject("poison3Text");
	poison3O.transform.position = Vector3(.02, .72, -1);
	poison3 = poison3O.AddComponent(GUIText); 
	poison3.text = "Poison3" + " " + poison3Count + "/" + poison3Max;
	poison3.fontSize = Screen.height/24;
	
	var fork3O = new GameObject("fork3Text");
	fork3O.transform.position = Vector3(.02, .64, -1);
	fork3 = fork3O.AddComponent(GUIText); 
	fork3.text = "Fork3" + " " + fork3Count + "/" + fork3Max;
	fork3.fontSize = Screen.height/24;
	
	/*var reflectO = new GameObject("reflectText");
	reflectO.transform.position = Vector3(.02, .56, -1);
	reflect = reflectO.AddComponent(GUIText); 
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	reflect.fontSize = Screen.height/24;*/
	
	var pierce3O = new GameObject("pierce3Text");
	pierce3O.transform.position = Vector3(.02, .48, -1);
	pierce3 = pierce3O.AddComponent(GUIText); 
	pierce3.text = "Pierce3" + " " + pierce3Count + "/" + pierce3Max;
	pierce3.fontSize = Screen.height/24;
	
	var giant3O = new GameObject("giant3Text");
	giant3O.transform.position = Vector3(.02, .40, -1);
	giant3 = giant3O.AddComponent(GUIText); 
	giant3.text = "Giant3" + " " + giant3Count + "/" + giant3Max;
	giant3.fontSize = Screen.height/24;
	
	var splash3O = new GameObject("splash3Text");
	splash3O.transform.position = Vector3(.02, .32, -1);
	splash3 = splash3O.AddComponent(GUIText); 
	splash3.text = "Splash3"  + " " + splash3Count + "/" + splash3Max;
	splash3.fontSize = Screen.height/24;
	
	var leech3O = new GameObject("leech3Text");
	leech3O.transform.position = Vector3(.52, .8, -1);
	leech3 = leech3O.AddComponent(GUIText); 
	leech3.text = "Leech3"  + " " + leech3Count + "/" + leech3Max;
	leech3.fontSize = Screen.height/24;
	
	/*var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blind3O = new GameObject("blind3Text");
	blind3O.transform.position = Vector3(.52, .64, -1);
	blind3 = blind3O.AddComponent(GUIText); 
	blind3.text = "Blind3" + " " + blind3Count + "/" + blind3Max;
	blind3.fontSize = Screen.height/24;
	
	var rapid3O = new GameObject("rapid3Text");
	rapid3O.transform.position = Vector3(.52, .56, -1);
	rapid3 = rapid3O.AddComponent(GUIText); 
	rapid3.text = "Rapid3" + " " + rapid3Count + "/" + rapid3Max;
	rapid3.fontSize = Screen.height/24;
	
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
	ice3.text = "Ice3" + " " + ice3Count + "/" + ice3Max;
	poison3.text = "Poison3" + " " + poison3Count + "/" + poison3Max;
	fork3.text = "Fork3" + " " + fork3Count + "/" + fork3Max;
	//reflect.text = "Reflect" + " " + reflectCount + badSpell;
	pierce3.text = "Pierce3" + " " + pierce3Count + "/" + pierce3Max;
	giant3.text = "Giant3" + " " + giant3Count + "/" + giant3Max;
	splash3.text = "Splash3"  + " " + splash3Count + "/" + splash3Max;
	leech3.text = "Leech3"  + " " + leech3Count + "/" + leech3Max;
	//sword.text = "Sword" + " " + swordCount + badSpell;
	blind3.text = "Blind3" + " " + blind3Count + "/" + blind3Max;
	rapid3.text = "Rapid3"  + " " + rapid3Count + "/" + rapid3Max;
	//homing.text = "Homing" + " " + homingCount + badSpell;
	//meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have " + NewDeckManager.theDeck.length + " card out of 20 needed.";
	
	ice3.fontSize = Screen.height/24;
	poison3.fontSize = Screen.height/24;
	fork3.fontSize = Screen.height/24;
	//reflect.fontSize = Screen.height/24;
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
		if ((ice3Count < 4) && (NewDeckManager.theDeck.length < 20) && (ice3Count < Shop3Manager.ice3Count)) {
			ice3Count++;
			add("ice3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (ice3Count > 0) {
			ice3Count--;
			remove("ice3");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((poison3Count < 4) && (NewDeckManager.theDeck.length < 20) && (poison3Count < Shop3Manager.poison3Count)) {
			poison3Count++;
			add("poison3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (poison3Count > 0) {
			poison3Count--;
			remove("poison3");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((fork3Count < 4) && (NewDeckManager.theDeck.length < 20)  && (fork3Count < Shop3Manager.fork3Count)) {
			fork3Count++;
			add("fork3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (fork3Count > 0) {
			fork3Count--;
			remove("fork3");
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
		if ((pierce3Count < 4) && (NewDeckManager.theDeck.length < 20) && (pierce3Count < Shop3Manager.pierce3Count)) {
			pierce3Count++;
			add("pierce3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"-")) {
		if (pierce3Count > 0) {
			pierce3Count--;
			remove("pierce3");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"+")) {
		if ((giant3Count < 4) && (NewDeckManager.theDeck.length < 20) && (giant3Count < Shop3Manager.giant3Count)) {
			giant3Count++;
			add("giant3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (giant3Count > 0) {
			giant3Count--;
			remove("giant3");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"+")) {
		if ((splash3Count < 4) && (NewDeckManager.theDeck.length < 20) && (splash3Count < Shop3Manager.splash3Count)) {
			splash3Count++;
			add("splash3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"-")) {
		if (splash3Count > 0) {
			splash3Count--;
			remove("splash3");
		}
	}
	
	if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"+")) {
		if ((leech3Count < 4) && (NewDeckManager.theDeck.length < 20) && (leech3Count < Shop3Manager.leech3Count)) {
			leech3Count++;
			add("leech3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (leech3Count > 0) {
			leech3Count--;
			remove("leech3");
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
		if ((blind3Count < 4) && (NewDeckManager.theDeck.length < 20)  && (blind3Count < Shop3Manager.blind3Count)) {
			blind3Count++;
			add("blind3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (blind3Count > 0) {
			blind3Count--;
			remove("blind3");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((rapid3Count < 4) && (NewDeckManager.theDeck.length < 20) && (rapid3Count < Shop3Manager.rapid3Count)) {
			rapid3Count++;
			add("rapid3");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (rapid3Count > 0) {
			rapid3Count--;
			remove("rapid3");
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
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("deckBuilder2");
	}
}