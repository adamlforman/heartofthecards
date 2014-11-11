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

//Max for all of the cards
var iceMax : int;
var poisonMax : int;
var forkMax : int;
var reflectMax : int;
var pierceMax : int;
var giantMax : int;
var splashMax : int;
var leechMax : int;
var swordMax : int;
var blindMax : int;
var rapidMax : int;
var homingMax : int;
var meteorMax : int;


var normalSpell : String;
var badSpell : String;


public static var theDeck : Array;
public static var cardsOwned: Array;

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
	
	
	if (ShopManager.cardsOwned != null) {
		cardsOwned = ShopManager.cardsOwned;
	}
	else{
		cardsOwned = ["blind", "blind", "blind", "blind", "ice", "ice", "ice", "ice", "poison", "poison", "poison", "poison", "leech", "leech", "leech", "leech", "rapid", "rapid", "rapid", "rapid"];
	}
	

	
	if (PlayerSpellbook.deck != null) {
		theDeck = PlayerSpellbook.library;
	}
	else if(NewDeckManager.theDeck == null){
		theDeck = [];
	}

	
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < theDeck.length; i++) {
		if (theDeck[i] == "ice") {
			iceCount++;
		}
		if (theDeck[i] == "poison") {
			poisonCount++;
		}
		if (theDeck[i] == "fork") {
			forkCount++;
		}
		if (theDeck[i] == "REFLECT") {
			reflectCount++;
		}
		if (theDeck[i] == "pierce") {
			pierceCount++;
		}
		if (theDeck[i] == "giant") {
			giantCount++;
		}
		if (theDeck[i] == "splash") {
			splashCount++;
		}
		if (theDeck[i] == "leech") {
			leechCount++;
		}
		if (theDeck[i] == "SWORD") {
			swordCount++;
		}
		if (theDeck[i] == "blind") {
			blindCount++;
		}
		if (theDeck[i] == "rapid") {
			rapidCount++;
		}
		if (theDeck[i] == "HOMING") {
			homingCount++;
		}
		if (theDeck[i] == "meteor") {
			meteorCount++;
		}
	}
	
	for (i = 0; i < cardsOwned.length; i++) {
		if (cardsOwned[i] == "ice") {
			iceMax++;
		}
		if (cardsOwned[i] == "poison") {
			poisonMax++;
		}
		if (cardsOwned[i] == "fork") {
			forkMax++;
		}
		if (cardsOwned[i] == "REFLECT") {
			reflectMax++;
		}
		if (cardsOwned[i] == "pierce") {
			pierceMax++;
		}
		if (cardsOwned[i] == "giant") {
			giantMax++;
		}
		if (cardsOwned[i] == "splash") {
			splashMax++;
		}
		if (cardsOwned[i] == "leech") {
			leechMax++;
		}
		if (cardsOwned[i] == "SWORD") {
			swordMax++;
		}
		if (cardsOwned[i] == "blind") {
			blindMax++;
		}
		if (cardsOwned[i] == "rapid") {
			rapidMax++;
		}
		if (cardsOwned[i] == "HOMING") {
			homingMax++;
		}
		if (cardsOwned[i] == "meteor") {
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
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
	reminder.fontSize = Screen.height/28;
	
	var iceO = new GameObject("iceText");
	iceO.transform.position = Vector3(.02, .8, -1);
	ice = iceO.AddComponent(GUIText); 
	ice.text = "Ice" + " " + iceCount + "/" + iceMax;
	ice.fontSize = Screen.height/24;
	
	var poisonO = new GameObject("poisonText");
	poisonO.transform.position = Vector3(.02, .72, -1);
	poison = poisonO.AddComponent(GUIText); 
	poison.text = "Poison" + " " + poisonCount + "/" + poisonMax;
	poison.fontSize = Screen.height/24;
	
	var forkO = new GameObject("forkText");
	forkO.transform.position = Vector3(.02, .64, -1);
	fork = forkO.AddComponent(GUIText); 
	fork.text = "Fork" + " " + forkCount + "/" + forkMax;
	fork.fontSize = Screen.height/24;
	
	/*var reflectO = new GameObject("reflectText");
	reflectO.transform.position = Vector3(.02, .56, -1);
	reflect = reflectO.AddComponent(GUIText); 
	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	reflect.fontSize = Screen.height/24;*/
	
	var pierceO = new GameObject("pierceText");
	pierceO.transform.position = Vector3(.02, .48, -1);
	pierce = pierceO.AddComponent(GUIText); 
	pierce.text = "Pierce" + " " + pierceCount + "/" + pierceMax;
	pierce.fontSize = Screen.height/24;
	
	var giantO = new GameObject("giantText");
	giantO.transform.position = Vector3(.02, .40, -1);
	giant = giantO.AddComponent(GUIText); 
	giant.text = "Giant" + " " + giantCount + "/" + giantMax;
	giant.fontSize = Screen.height/24;
	
	var splashO = new GameObject("splashText");
	splashO.transform.position = Vector3(.02, .32, -1);
	splash = splashO.AddComponent(GUIText); 
	splash.text = "Splash"  + " " + splashCount + "/" + splashMax;
	splash.fontSize = Screen.height/24;
	
	var leechO = new GameObject("leechText");
	leechO.transform.position = Vector3(.52, .8, -1);
	leech = leechO.AddComponent(GUIText); 
	leech.text = "Leech"  + " " + leechCount + "/" + leechMax;
	leech.fontSize = Screen.height/24;
	
	/*var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blindO = new GameObject("blindText");
	blindO.transform.position = Vector3(.52, .64, -1);
	blind = blindO.AddComponent(GUIText); 
	blind.text = "Blind" + " " + blindCount + "/" + blindMax;
	blind.fontSize = Screen.height/24;
	
	var rapidO = new GameObject("rapidText");
	rapidO.transform.position = Vector3(.52, .56, -1);
	rapid = rapidO.AddComponent(GUIText); 
	rapid.text = "Rapid" + " " + rapidCount + "/" + rapidMax;
	rapid.fontSize = Screen.height/24;
	
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
	ice.text = "Ice" + " " + iceCount + "/" + iceMax;
	poison.text = "Poison" + " " + poisonCount + "/" + poisonMax;
	fork.text = "Fork" + " " + forkCount + "/" + forkMax;
//	reflect.text = "Reflect" + " " + reflectCount + badSpell;
	pierce.text = "Pierce" + " " + pierceCount + "/" + pierceMax;
	giant.text = "Giant" + " " + giantCount + "/" + giantMax;
	splash.text = "Splash"  + " " + splashCount + "/" + splashMax;
	leech.text = "Leech"  + " " + leechCount + "/" + leechMax;
//	sword.text = "Sword" + " " + swordCount + badSpell;
	blind.text = "Blind" + " " + blindCount + "/" + blindMax;
	rapid.text = "Rapid"  + " " + rapidCount + "/" + rapidMax;
//	homing.text = "Homing" + " " + homingCount + badSpell;
//	meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have " + theDeck.length + " card out of 20 needed.";
	
	ice.fontSize = Screen.height/24;
	poison.fontSize = Screen.height/24;
	fork.fontSize = Screen.height/24;
	//reflect.fontSize = Screen.height/24;
	pierce.fontSize = Screen.height/24;
	giant.fontSize = Screen.height/24;
	splash.fontSize = Screen.height/24;
	leech.fontSize = Screen.height/24;
	//sword.fontSize = Screen.height/24;
	blind.fontSize = Screen.height/24;
	rapid.fontSize = Screen.height/24;
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
		if ((iceCount < 4) && (theDeck.length < 20) && (iceCount < ShopManager.iceCount)) {
			iceCount++;
			add("ice");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (iceCount > 0) {
			iceCount--;
			remove("ice");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((poisonCount < 4) && (theDeck.length < 20) && (poisonCount < ShopManager.poisonCount)) {
			poisonCount++;
			add("poison");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"-")) {
		if (poisonCount > 0) {
			poisonCount--;
			remove("poison");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.64,Screen.width/20,Screen.height/20),"+")) {
		if ((forkCount < 4) && (theDeck.length < 20)  && (forkCount < ShopManager.forkCount)) {
			forkCount++;
			add("fork");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (forkCount > 0) {
			forkCount--;
			remove("fork");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((reflectCount < 0) && (theDeck.length < 20) && (reflectCount < ShopManager.reflectCount)) {
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
		if ((pierceCount < 4) && (theDeck.length < 20) && (pierceCount < ShopManager.pierceCount)) {
			pierceCount++;
			add("pierce");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 +Screen.width/20,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"-")) {
		if (pierceCount > 0) {
			pierceCount--;
			remove("pierce");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"+")) {
		if ((giantCount < 4) && (theDeck.length < 20) && (giantCount < ShopManager.giantCount)) {
			giantCount++;
			add("giant");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.40,Screen.width/20,Screen.height/20),"-")) {
		if (giantCount > 0) {
			giantCount--;
			remove("giant");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/4,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"+")) {
		if ((splashCount < 4) && (theDeck.length < 20) && (splashCount < ShopManager.splashCount)) {
			splashCount++;
			add("splash");
		}
	}
	else if (GUI.Button(Rect(Screen.width/4 + Screen.width/20,Screen.height-Screen.height*0.32,Screen.width/20,Screen.height/20),"-")) {
		if (splashCount > 0) {
			splashCount--;
			remove("splash");
		}
	}
	
	if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"+")) {
		if ((leechCount < 4) && (theDeck.length < 20) && (leechCount < ShopManager.leechCount)) {
			leechCount++;
			add("leech");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.8,Screen.width/20,Screen.height/20),"-")) {
		if (leechCount > 0) {
			leechCount--;
			remove("leech");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.72,Screen.width/20,Screen.height/20),"+")) {
		if ((swordCount < 0) && (theDeck.length < 20) && (swordCount < ShopManager.swordCount)) {
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
		if ((blindCount < 4) && (theDeck.length < 20)  && (blindCount < ShopManager.blindCount)) {
			blindCount++;
			add("blind");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.64, Screen.width/20,Screen.height/20),"-")) {
		if (blindCount > 0) {
			blindCount--;
			remove("blind");
		}
	}
	
	else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"+")) {
		if ((rapidCount < 4) && (theDeck.length < 20) && (rapidCount < ShopManager.rapidCount)) {
			rapidCount++;
			add("rapid");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.3 +Screen.width/20,Screen.height-Screen.height*0.56,Screen.width/20,Screen.height/20),"-")) {
		if (rapidCount > 0) {
			rapidCount--;
			remove("rapid");
		}
	}
	
	/*else if (GUI.Button(Rect(Screen.width/1.3,Screen.height-Screen.height*0.48,Screen.width/20,Screen.height/20),"+")) {
		if ((homingCount < 0) && (theDeck.length < 20) && (homingCount < ShopManager.homingCount)) {
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
		if ((meteorCount < 0) && (theDeck.length < 20) && (meteorCount < ShopManager.meteorCount)) {
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
	else if (GUI.Button(Rect(Screen.width/3.1,Screen.height/1.2,Screen.width*0.35,Screen.height*0.10),"Play Level 1 Again!")) {
		if (theDeck.length == 20) {
			Application.LoadLevel("procedural");
		}
	}
	else if (GUI.Button(Rect(Screen.width*6/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"--->")) {
		Application.LoadLevel("deckBuilder2");
	}
}