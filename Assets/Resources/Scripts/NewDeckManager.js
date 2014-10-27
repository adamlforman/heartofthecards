var title : GUIText;
var reminder : GUIText;
var ice : GUIText;
var poison : GUIText;
var fork : GUIText;
var reflect : GUIText;
var pierce : GUIText;
var giant : GUIText;
var splash : GUIText;
var leech : GUIText;
var sword : GUIText;
var blind : GUIText;
var rapid : GUIText;
var homing : GUIText;
var meteor : GUIText;

//Counters for all of the cards
var iceCount : int;
var poisonCount : int;
var forkCount : int;
var reflectCount : int;
var pierceCount : int;
var giantCount : int;
var splashCount : int;
var leechCount : int;
var swordCount : int;
var blindCount : int;
var rapidCount : int;
var homingCount : int;
var meteorCount : int;

var normalSpell : String;
var badSpell : String;


public static var theDeck : Array;

function Start () {
	normalSpell = "/4";
	badSpell = "/0";
	
	//Start with none of anything
	iceCount = 0;
	poisonCount = 0;
	forkCount = 0;
	reflectCount = 0;
	pierceCount = 0;
	giantCount = 0;
	splashCount = 0;
	leechCount = 0;
	swordCount = 0;
	blindCount = 0;
	rapidCount = 0;
	homingCount = 0;
	meteorCount = 0;


	


	if (PlayerSpellbook.deck != null) {
		theDeck = PlayerSpellbook.library;
	}
	else {
		theDeck = [];
	}

	
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < theDeck.length; i++) {
		if (theDeck[i] == "ICE") {
			iceCount++;
		}
		if (theDeck[i] == "POISON") {
			poisonCount++;
		}
		if (theDeck[i] == "FORK") {
			forkCount++;
		}
		if (theDeck[i] == "REFLECT") {
			reflectCount++;
		}
		if (theDeck[i] == "PIERCE") {
			pierceCount++;
		}
		if (theDeck[i] == "GIANT") {
			giantCount++;
		}
		if (theDeck[i] == "SPLASH") {
			splashCount++;
		}
		if (theDeck[i] == "LEECH") {
			leechCount++;
		}
		if (theDeck[i] == "SWORD") {
			swordCount++;
		}
		if (theDeck[i] == "BLIND") {
			blindCount++;
		}
		if (theDeck[i] == "RAPID") {
			rapidCount++;
		}
		if (theDeck[i] == "HOMING") {
			homingCount++;
		}
		if (theDeck[i] == "meteor") {
			meteorCount++;
		}
	}
	
	
	//*****************************SETTING ALL THE OF TEXT**************************************
	var titleO = new GameObject("TitleText");
	titleO.transform.position = Vector3(.35, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "Build Your Deck!";
	title.fontSize = Screen.height/19;
	
	var reminderO = new GameObject("TitleText");
	reminderO.transform.position = Vector3(.25, .25, -1);
	reminder = reminderO.AddComponent(GUIText); 
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
	reminder.fontSize = Screen.height/28;
	
	var iceO = new GameObject("iceText");
	iceO.transform.position = Vector3(.02, .8, -1);
	ice = iceO.AddComponent(GUIText); 
	ice.text = "Ice" + " " + iceCount + normalSpell;
	ice.fontSize = Screen.height/24;
	
	var poisonO = new GameObject("poisonText");
	poisonO.transform.position = Vector3(.02, .72, -1);
	poison = poisonO.AddComponent(GUIText); 
	poison.text = "Poison" + " " + poisonCount + normalSpell;
	poison.fontSize = Screen.height/24;
	
	var forkO = new GameObject("forkText");
	forkO.transform.position = Vector3(.02, .64, -1);
	fork = forkO.AddComponent(GUIText); 
	fork.text = "Fork" + " " + forkCount + normalSpell;
	fork.fontSize = Screen.height/24;
	
	var reflectO = new GameObject("reflectText");
	reflectO.transform.position = Vector3(.02, .56, -1);
	reflect = reflectO.AddComponent(GUIText); 
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	reflect.fontSize = Screen.height/24;
	
	var pierceO = new GameObject("pierceText");
	pierceO.transform.position = Vector3(.02, .48, -1);
	pierce = pierceO.AddComponent(GUIText); 
	pierce.text = "Pierce" + " " + pierceCount + normalSpell;
	pierce.fontSize = Screen.height/24;
	
	var giantO = new GameObject("giantText");
	giantO.transform.position = Vector3(.02, .40, -1);
	giant = giantO.AddComponent(GUIText); 
	giant.text = "Giant" + " " + giantCount + normalSpell;
	giant.fontSize = Screen.height/24;
	
	var splashO = new GameObject("splashText");
	splashO.transform.position = Vector3(.02, .32, -1);
	splash = splashO.AddComponent(GUIText); 
	splash.text = "Splash"  + " " + splashCount + normalSpell;
	splash.fontSize = Screen.height/24;
	
	var leechO = new GameObject("leechText");
	leechO.transform.position = Vector3(.52, .8, -1);
	leech = leechO.AddComponent(GUIText); 
	leech.text = "Leech"  + " " + leechCount + normalSpell;
	leech.fontSize = Screen.height/24;
	
	var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;
	
	var blindO = new GameObject("blindText");
	blindO.transform.position = Vector3(.52, .64, -1);
	blind = blindO.AddComponent(GUIText); 
	blind.text = "Blind" + " " + blindCount + normalSpell;
	blind.fontSize = Screen.height/24;
	
	var rapidO = new GameObject("rapidText");
	rapidO.transform.position = Vector3(.52, .56, -1);
	rapid = rapidO.AddComponent(GUIText); 
	rapid.text = "Rapid" + " " + rapidCount + normalSpell;
	rapid.fontSize = Screen.height/24;
	
	var homingO = new GameObject("homingText");
	homingO.transform.position = Vector3(.52, .48, -1);
	homing = homingO.AddComponent(GUIText); 
	homing.text = "Homing" + " " + homingCount + badSpell;
	homing.fontSize = Screen.height/24;
	
	var meteorO = new GameObject("meteorText");
	meteorO.transform.position = Vector3(.52, .40, -1);
	meteor = meteorO.AddComponent(GUIText); 
	meteor.text = "Meteor" + " " + meteorCount + badSpell;
	meteor.fontSize = Screen.height/24;
}

function Update () {
	ice.text = "Ice" + " " + iceCount + normalSpell;
	poison.text = "Poison" + " " + poisonCount + normalSpell;
	fork.text = "Fork" + " " + forkCount + normalSpell;
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	pierce.text = "Pierce" + " " + pierceCount + normalSpell;
	giant.text = "Giant" + " " + giantCount + normalSpell;
	splash.text = "Splash"  + " " + splashCount + normalSpell;
	leech.text = "Leech"  + " " + leechCount + normalSpell;
	sword.text = "Sword" + " " + swordCount + badSpell;
	blind.text = "Blind" + " " + blindCount + normalSpell;
	rapid.text = "Rapid"  + " " + rapidCount + normalSpell;
	homing.text = "Homing" + " " + homingCount + badSpell;
	meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
	
	ice.fontSize = Screen.height/24;
	poison.fontSize = Screen.height/24;
	fork.fontSize = Screen.height/24;
	reflect.fontSize = Screen.height/24;
	pierce.fontSize = Screen.height/24;
	giant.fontSize = Screen.height/24;
	splash.fontSize = Screen.height/24;
	leech.fontSize = Screen.height/24;
	sword.fontSize = Screen.height/24;
	blind.fontSize = Screen.height/24;
	rapid.fontSize = Screen.height/24;
	homing.fontSize = Screen.height/24;
	meteor.fontSize = Screen.height/24;
	title.fontSize = Screen.height/19;
	reminder.fontSize = Screen.height/28;
	
}
function remove(card : String) {
	for (var i = 0; i < theDeck.length; i++) {
		if (theDeck[i] == card) {
			theDeck.RemoveAt(i);
			i = theDeck.length + 6;
		}
	}
}

function add(card : String) {
	theDeck.Push(card);
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
		if ((iceCount < 4) && (theDeck.length < 20)) {
			iceCount++;
			add("ICE");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (iceCount > 0) {
			iceCount--;
			remove("ICE");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((poisonCount < 4) && (theDeck.length < 20)) {
			poisonCount++;
			add("POISON");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (poisonCount > 0) {
			poisonCount--;
			remove("POISON");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((forkCount < 4) && (theDeck.length < 20)) {
			forkCount++;
			add("FORK");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (forkCount > 0) {
			forkCount--;
			remove("FORK");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((reflectCount < 0) && (theDeck.length < 20)) {
			reflectCount++;
			add("REFLECT");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (reflectCount > 0) {
			reflectCount--;
			remove("REFLECT");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"+")) {
		if ((pierceCount < 4) && (theDeck.length < 20)) {
			pierceCount++;
			add("PIERCE");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"-")) {
		if (pierceCount > 0) {
			pierceCount--;
			remove("PIERCE");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"+")) {
		if ((giantCount < 4) && (theDeck.length < 20)) {
			giantCount++;
			add("GIANT");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (giantCount > 0) {
			giantCount--;
			remove("GIANT");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"+")) {
		if ((splashCount < 4) && (theDeck.length < 20)) {
			splashCount++;
			add("SPLASH");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"-")) {
		if (splashCount > 0) {
			splashCount--;
			remove("SPLASH");
		}
	}
	
	if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"+")) {
		if ((leechCount < 4) && (theDeck.length < 20)) {
			leechCount++;
			add("LEECH");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (leechCount > 0) {
			leechCount--;
			remove("LEECH");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((swordCount < 0) && (theDeck.length < 20)) {
			swordCount++;
			add("SWORD");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (swordCount > 0) {
			swordCount--;
			remove("SWORD");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((blindCount < 4) && (theDeck.length < 20)) {
			blindCount++;
			add("BLIND");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (blindCount > 0) {
			blindCount--;
			remove("BLIND");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((rapidCount < 4) && (theDeck.length < 20)) {
			rapidCount++;
			add("RAPID");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (rapidCount > 0) {
			rapidCount--;
			remove("RAPID");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"+")) {
		if ((homingCount < 0) && (theDeck.length < 20)) {
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
		if ((meteorCount < 0) && (theDeck.length < 20)) {
			meteorCount++;
			add("METEOR");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (meteorCount > 0) {
			meteorCount--;
			remove("METEOR");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/3,Screen.height/1.2,Screen.width*0.25,Screen.height*0.07),"Play Level 1 Again!")) {
		if (theDeck.length == 20) {
			Application.LoadLevel("level1refactor");
		}
	}
}