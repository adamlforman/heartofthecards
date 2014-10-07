var title : GUIText;
var reminder : GUIText;
var fireBlast : GUIText;
var iceBreath : GUIText;
var webTrap : GUIText;
var dart : GUIText;
var bow : GUIText;
var longsword : GUIText;
var arcaneCataclysm : GUIText;
var gas : GUIText;
var leap : GUIText;
var armor : GUIText;

var fireCount : int;
var armorCount : int;
var iceCount : int;
var catCount : int;
var webCount : int;
var dartCount : int;
var longswordCount : int;
var bowCount : int;
var gasCount : int;
var leapCount : int;

var normalSpell : String;
var specialSpell : String;


static var theDeck : Array;

function Start () {
	normalSpell = "/4";
	specialSpell = "/1";

	fireCount = 0;
	armorCount = 0;
	iceCount = 0;
	catCount = 0;
	webCount = 0;
	dartCount = 0;
	longswordCount = 0;
	bowCount = 0;
	gasCount = 0;
	leapCount = 0;


	theDeck = ["FIRE","FIRE","FIRE", "ARMOR","ARMOR", "ICE","ICE","DEMACIA","WEB","WEB","DART","DART", "LONGSWORD", "LONGSWORD", "BOW", "Bow", "GAS", "GAS", "LEAP", "LEAP"];
	if (player2D.deck != null) {
		theDeck = player2D.library;
	}
	
	for (var i = 0; i < theDeck.length; i++) {
		if (theDeck[i] == "FIRE") {
			fireCount++;
		}
		if (theDeck[i] == "ARMOR") {
			armorCount++;
		}
		if (theDeck[i] == "ICE") {
			iceCount++;
		}
		if (theDeck[i] == "DEMACIA") {
			catCount++;
		}
		if (theDeck[i] == "WEB") {
			webCount++;
		}
		if (theDeck[i] == "DART") {
			dartCount++;
		}
		if (theDeck[i] == "LONGSWORD") {
			longswordCount++;
		}
		if (theDeck[i] == "BOW") {
			bowCount++;
		}
		if (theDeck[i] == "GAS") {
			gasCount++;
		}
		if (theDeck[i] == "LEAP") {
			leapCount++;
		}
	}
	var titleO = new GameObject("TitleText");
	titleO.transform.position = Vector3(.35, .95, -1);
	title = titleO.AddComponent(GUIText); 
	title.text = "Build Your Deck!";
	title.fontSize = 30;
	
	var reminderO = new GameObject("TitleText");
	reminderO.transform.position = Vector3(.25, .25, -1);
	reminder = reminderO.AddComponent(GUIText); 
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
	reminder.fontSize = 20;
	
	var fireBlastO = new GameObject("fireblastText");
	fireBlastO.transform.position = Vector3(.02, .77, -1);
	fireBlast = fireBlastO.AddComponent(GUIText); 
	fireBlast.text = "Fire Blast" + " " + fireCount + normalSpell;
	fireBlast.fontSize = 24;
	
	var iceBreathO = new GameObject("icebreathText");
	iceBreathO.transform.position = Vector3(.02, .67, -1);
	iceBreath = iceBreathO.AddComponent(GUIText); 
	iceBreath.text = "Ice Breath" + " " + iceCount + normalSpell;
	iceBreath.fontSize = 24;
	
	var webTrapO = new GameObject("webtrapText");
	webTrapO.transform.position = Vector3(.02, .57, -1);
	webTrap = webTrapO.AddComponent(GUIText); 
	webTrap.text = "Web Trap" + " " + webCount + normalSpell;
	webTrap.fontSize = 24;
	
	var dartO = new GameObject("dartText");
	dartO.transform.position = Vector3(.02, .47, -1);
	dart = dartO.AddComponent(GUIText); 
	dart.text = "Dart" + " " + dartCount + normalSpell;
	dart.fontSize = 24;
	
	var bowO = new GameObject("bowText");
	bowO.transform.position = Vector3(.02, .37, -1);
	bow = bowO.AddComponent(GUIText); 
	bow.text = "Bow" + " " + bowCount + normalSpell;
	bow.fontSize = 24;
	
	var longswordO = new GameObject("longswordText");
	longswordO.transform.position = Vector3(.52, .77, -1);
	longsword = longswordO.AddComponent(GUIText); 
	longsword.text = "Longsword" + " " + longswordCount + normalSpell;
	longsword.fontSize = 24;
	
	var arcaneCataclysmO = new GameObject("arcanecataclysmText");
	arcaneCataclysmO.transform.position = Vector3(.52, .67, -1);
	arcaneCataclysm = arcaneCataclysmO.AddComponent(GUIText); 
	arcaneCataclysm.text = "ArcaneC"  + " " + catCount + specialSpell;
	arcaneCataclysm.fontSize = 24;
	
	var gasO = new GameObject("gasText");
	gasO.transform.position = Vector3(.52, .57, -1);
	gas = gasO.AddComponent(GUIText); 
	gas.text = "Gas"  + " " + gasCount + normalSpell;
	gas.fontSize = 24;
	
	var leapO = new GameObject("leapText");
	leapO.transform.position = Vector3(.52, .47, -1);
	leap = leapO.AddComponent(GUIText); 
	leap.text = "Leap" + " " + leapCount + normalSpell;
	leap.fontSize = 24;
	
	var armorO = new GameObject("armorText");
	armorO.transform.position = Vector3(.52, .37, -1);
	armor = armorO.AddComponent(GUIText); 
	armor.text = "Armor" + " " + armorCount + normalSpell;
	armor.fontSize = 24;
}

function Update () {
	fireBlast.text = "Fire Blast" + " " + fireCount + normalSpell;
	iceBreath.text = "Ice Breath" + " " + iceCount + normalSpell;
	webTrap.text = "Web Trap" + " " + webCount + normalSpell;
	dart.text = "Dart" + " " + dartCount + normalSpell;
	bow.text = "Bow" + " " + bowCount + normalSpell;
	longsword.text = "Longsword" + " " + longswordCount + normalSpell;
	arcaneCataclysm.text = "ArcaneC"  + " " + catCount + specialSpell;
	gas.text = "Gas"  + " " + gasCount + normalSpell;
	leap.text = "Leap" + " " + leapCount + normalSpell;
	armor.text = "Armor" + " " + armorCount + normalSpell;
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
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
function spawnBackground() {
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
}
function OnGUI() {
	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	//AutoResize(1024, 768);
	//GUI.Text(Rect(150,25,200,40),"Build Your theDeck!");
	
	if (GUI.Button(Rect(Screen.width/4,Screen.height/4.5,40,40),"+")) {
		if ((fireCount < 4) && (theDeck.length < 20)) {
			fireCount++;
			add("FIRE");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +40,Screen.height/4.5,40,40),"-")) {
		if (fireCount > 0) {
			fireCount--;
			remove("FIRE");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height/4.5 + 60,40,40),"+")) {
		if ((iceCount < 4) && (theDeck.length < 20)) {
			iceCount++;
			add("ICE");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +40,Screen.height/4.5 + 60,40,40),"-")) {
		if (iceCount > 0) {
			iceCount--;
			remove("ICE");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height/4.5 + 120,40,40),"+")) {
		if ((webCount < 4) && (theDeck.length < 20)) {
			webCount++;
			add("WEB");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +40,Screen.height/4.5 + 120, 40,40),"-")) {
		if (webCount > 0) {
			webCount--;
			remove("WEB");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height/4.5 + 180,40,40),"+")) {
		if ((dartCount < 4) && (theDeck.length < 20)) {
			dartCount++;
			add("DART");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +40,Screen.height/4.5 + 180,40,40),"-")) {
		if (dartCount > 0) {
			dartCount--;
			remove("DART");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height/4.5 + 240,40,40),"+")) {
		if ((bowCount < 4) && (theDeck.length < 20)) {
			bowCount++;
			add("BOW");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +40,Screen.height/4.5 + 240,40,40),"-")) {
		if (bowCount > 0) {
			bowCount--;
			remove("BOW");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height/4.5,40,40),"+")) {
		if ((longswordCount < 4) && (theDeck.length < 20)) {
			longswordCount++;
			add("LONGSWORD");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + 40,Screen.height/4.5,40,40),"-")) {
		if (longswordCount > 0) {
			longswordCount--;
			remove("LONGSWORD");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height/4.5 + 60,40,40),"+")) {
		if ((catCount < 1) && (theDeck.length < 20)) {
			catCount++;
			add("DEMACIA");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + 40,Screen.height/4.5 + 60,40,40),"-")) {
		if (catCount > 0) {
			catCount--;
			remove("DEMACIA");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height/4.5 + 120,40,40),"+")) {
		if ((gasCount < 4) && (theDeck.length < 20)) {
			gasCount++;
			add("GAS");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + 40,Screen.height/4.5 + 120,40,40),"-")) {
		if (gasCount > 0) {
			gasCount--;
			remove("GAS");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height/4.5 + 180,40,40),"+")) {
		if ((leapCount < 4) && (theDeck.length < 20)) {
			leapCount++;
			add("LEAP");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + 40,Screen.height/4.5 + 180,40,40),"-")) {
		if (leapCount > 0) {
			leapCount--;
			remove("LEAP");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height/4.5 + 240,40,40),"+")) {
		if ((armorCount < 4) && (theDeck.length < 20)) {
			armorCount++;
			add("ARMOR");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 + 40,Screen.height/4.5 + 240,40,40),"-")) {
		if (armorCount > 0) {
			armorCount--;
			remove("ARMOR");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/3,Screen.height/1.2,200,40),"Play Level 1 Again!")) {
		if (theDeck.length == 20) {
			Application.LoadLevel("Level 1");
		}
	}
	/*GUI.Button(Rect(120,10,100,100),Resources.Load("Textures/"+spell2,Texture2D));
	GUI.Button(Rect(10,10,100,100),Resources.Load("Textures/"+spell3,Texture2D));
	GUI.Button(Rect(230,10,150,50),health+"hp",customButton);*/
}