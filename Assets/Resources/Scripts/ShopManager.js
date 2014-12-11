var title : GUIText;
var reminder : GUIText;
var ice : GUIText;
var poison : GUIText;
var boost : GUIText;
var fork : GUIText;
var pierce : GUIText;
var giant : GUIText;
var splash : GUIText;
var leech : GUIText;
var blind : GUIText;
var rapid : GUIText;

var iceTexture : Texture2D;
var poisonTexture : Texture2D;
var boostTexture : Texture2D;
var forkTexture : Texture2D;
var pierceTexture : Texture2D;
var giantTexture : Texture2D;
var splashTexture : Texture2D;
var leechTexture : Texture2D;
var blindTexture : Texture2D;
var rapidTexture : Texture2D;
var shopTexture : Texture2D;



//Counters for all of the cards
public static var iceCount : int;
public static var poisonCount : int;
public static var forkCount : int;
public static var boostCount : int; 
public static var pierceCount : int;
public static var giantCount : int;
public static var splashCount : int;
public static var leechCount : int;
public static var swordCount : int; //does not exist
public static var blindCount : int;
public static var rapidCount : int;
public static var homingCount : int; //does not exist
public static var meteorCount : int; //does not exist

public static var money : int;


var normalSpell : String;
var specialSpell : String;
var badSpell : String;

public static var theDeck : Array;
public static var cardsOwned: Array;

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
	if (money == null) {
		money = 0;
	}

	var background = new GameObject().CreatePrimitive(PrimitiveType.Quad);
	background.renderer.material.mainTexture = Resources.Load("Textures/shop",Texture2D); //Set the texture.  Must be in Resources folder
	background.renderer.material.shader = Shader.Find ("Diffuse");	
	background.transform.localScale = Vector3(13.8,10,1);					// Tell the renderer that our textures have transparency. 

    //audioS = gameObject.AddComponent(AudioSource);
    //audioS.clip = Resources.Load("Sounds/shopmusic");
 	//audioS.Play();
    //audioS.loop = true;

    
	normalSpell = "/4";
	specialSpell = "/1";
	badSpell = "/0";
	
	//Start with none of anything
	iceCount = 0;
	poisonCount = 0;
	forkCount = 0;
	boostCount = 0;
	pierceCount = 0;
	giantCount = 0;
	splashCount = 0;
	leechCount = 0;
	swordCount = 0;
	blindCount = 0;
	rapidCount = 0;
	homingCount = 0;
	meteorCount = 0;
	
	
	iceTexture = Resources.Load("Textures/ice",Texture2D);
	poisonTexture = Resources.Load("Textures/poison",Texture2D);
	forkTexture = Resources.Load("Textures/fork",Texture2D);
	boostTexture = Resources.Load("Textures/boost",Texture2D);
	pierceTexture = Resources.Load("Textures/pierce",Texture2D);
	giantTexture = Resources.Load("Textures/giant",Texture2D);
	splashTexture = Resources.Load("Textures/splash",Texture2D);
	leechTexture = Resources.Load("Textures/leech",Texture2D);
	blindTexture = Resources.Load("Textures/blind",Texture2D);
	rapidTexture = Resources.Load("Textures/rapid",Texture2D);
	shopTexture = Resources.Load("Textures/shop",Texture2D);

	if(this.cardsOwned != null){
		
	}
	else if (PlayerSpellbook.cardsOwned != null) {
		cardsOwned = PlayerSpellbook.cardsOwned;
	}
	else {
		cardsOwned = ["blind", "blind", "blind", "pierce", "ice", "ice", "ice", "pierce", "poison", "poison", "poison", "poison", "leech", "leech", "leech", "leech", "pierce", "rapid", "rapid", "rapid"];
	}
	//Goes through the deck and increments the card count variables
	for (var i = 0; i < cardsOwned.length; i++) {
		if (cardsOwned[i] == "ice") {
			iceCount++;
		}
		if (cardsOwned[i] == "poison") {
			poisonCount++;
		}
		if (cardsOwned[i] == "fork") {
			forkCount++;
		}
		if (cardsOwned[i] == "boost") {
			boostCount++;
		}
		if (cardsOwned[i] == "pierce") {
			pierceCount++;
		}
		if (cardsOwned[i] == "giant") {
			giantCount++;
		}
		if (cardsOwned[i] == "splash") {
			splashCount++;
		}
		if (cardsOwned[i] == "leech") {
			leechCount++;
		}
		if (cardsOwned[i] == "SWORD") {
			swordCount++;
		}
		if (cardsOwned[i] == "blind") {
			blindCount++;
		}
		if (cardsOwned[i] == "rapid") {
			rapidCount++;
		}
		if (cardsOwned[i] == "HOMING") {
			homingCount++;
		}
		if (cardsOwned[i] == "meteor") {
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
	
	var boostO = new GameObject("boostText");
	boostO.transform.position = Vector3(.02, .56, -1);
	boost = boostO.AddComponent(GUIText); 
	boost.text = "Boost" + " " + boostCount + normalSpell;
	boost.fontSize = Screen.height/24;
	
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
	
	/*var swordO = new GameObject("swordText");
	swordO.transform.position = Vector3(.52, .72, -1);
	sword = swordO.AddComponent(GUIText); 
	sword.text = "Sword" + " " + swordCount + badSpell;
	sword.fontSize = Screen.height/24;*/
	
	var blindO = new GameObject("blindText");
	blindO.transform.position = Vector3(.52, .64, -1);
	blind = blindO.AddComponent(GUIText); 
	blind.text = "Blind" + " " + blindCount + normalSpell;
	blind.fontSize = Screen.height/24;
	
	var rapidO = new GameObject("rapidText");
	rapidO.transform.position = Vector3(.52, .56, -5);
	rapid = rapidO.AddComponent(GUIText); 
	rapid.text = "Rapid" + " " + rapidCount + normalSpell;
	rapid.fontSize = Screen.height/24;
	
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
	ice.text = "Ice" + " " + iceCount + normalSpell;
	poison.text = "Poison" + " " + poisonCount + normalSpell;
	fork.text = "Fork" + " " + forkCount + normalSpell;
	boost.text = "Boost" + " " + boostCount + normalSpell;
	pierce.text = "Pierce" + " " + pierceCount + normalSpell;
	giant.text = "Giant" + " " + giantCount + normalSpell;
	splash.text = "Splash"  + " " + splashCount + normalSpell;
	leech.text = "Leech"  + " " + leechCount + normalSpell;
	//sword.text = "Sword" + " " + swordCount + badSpell;
	blind.text = "Blind" + " " + blindCount + normalSpell;
	rapid.text = "Rapid"  + " " + rapidCount + normalSpell;
	//homing.text = "Homing" + " " + homingCount + badSpell;
	//meteor.text = "Meteor" + " " + meteorCount + badSpell;
	reminder.text = "You have $" + ShopManager.money + ".";
	
	ice.fontSize = Screen.height/24;
	poison.fontSize = Screen.height/24;
	fork.fontSize = Screen.height/24;
	boost.fontSize = Screen.height/24;
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
	reminder.fontSize = Screen.height/22;
	
}
function remove(card : String) {
	for (var i = 0; i < cardsOwned.length; i++) {
		if (cardsOwned[i] == card) {
			cardsOwned.RemoveAt(i);
			i = cardsOwned.length + 6;
		}
	}
}

function add(card : String) {
	cardsOwned.Push(card);
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
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.8,Screen.height/15,Screen.height/15),iceTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.72,Screen.height/15,Screen.height/15),poisonTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.64,Screen.height/15,Screen.height/15),forkTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.56,Screen.height/15,Screen.height/15),boostTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.48,Screen.height/15,Screen.height/15),pierceTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.40,Screen.height/15,Screen.height/15),giantTexture);
	GUI.Box(Rect(2.1*Screen.width/5,Screen.height-Screen.height*0.32,Screen.height/15,Screen.height/15),splashTexture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.8,Screen.height/15,Screen.height/15),leechTexture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.64,Screen.height/15,Screen.height/15),blindTexture);
	GUI.Box(Rect(Screen.width/1.45+1.05*Screen.width/5,Screen.height-Screen.height*0.56,Screen.height/15,Screen.height/15),rapidTexture);
	
	
	
	
	
	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	//AutoResize(1024, 768);
	//GUI.Text(Rect(150,25,200,40),"Build Your theDeck!");
	
	if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((iceCount < 4) && (ShopManager.money >= 50)) {
			iceCount++;
			ShopManager.money -=50;
			add("ice");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((poisonCount < 4)  && (ShopManager.money >= 50)) {
			poisonCount++;
			ShopManager.money -=50;
			add("poison");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((forkCount < 4)  && (ShopManager.money >= 50)) {
			forkCount++;
			ShopManager.money -=50;
			add("fork");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((boostCount < 4)  && (ShopManager.money >= 50)) {
			boostCount++;
			ShopManager.money -=50;
			add("boost");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((pierceCount < 4)  && (ShopManager.money >= 50)) {
			pierceCount++;
			ShopManager.money -=50;
			add("pierce");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((giantCount < 4)  && (ShopManager.money >= 50)) {
			giantCount++;
			ShopManager.money -=50;
			add("giant");
		}
	}
	else if (GUI.Button(Rect(Screen.width/5,Screen.height-Screen.height*0.32,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((splashCount < 4) && (ShopManager.money >= 50)) {
			splashCount++;
			ShopManager.money -=50;
			add("splash");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.8,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((leechCount < 4)  && (ShopManager.money >= 50)) {
			leechCount++;
			ShopManager.money -=50;
			add("leech");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.72,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((swordCount < 0)  && (ShopManager.money >= 50)) {
			//swordCount++;
			//ShopManager.money -=50;
			//add("SWORD");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.64,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((blindCount < 4)  && (ShopManager.money >= 50)) {
			blindCount++;
			ShopManager.money -=50;
			add("blind");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.56,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((rapidCount < 4)  && (ShopManager.money >= 50)) {
			rapidCount++;
			ShopManager.money -=50;
			add("rapid");
		}
	}
	/*else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.48,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((homingCount < 0)  && (ShopManager.money >= 50)) {
			homingCount++;
			ShopManager.money -=50;
			add("HOMING");
		}
	}
	else if (GUI.Button(Rect(Screen.width/1.45,Screen.height-Screen.height*0.40,Screen.width/5,Screen.height/15),"Buy, $50")) {
		if ((meteorCount < 0)  && (ShopManager.money >= 50)) {
			//meteorCount++;
			//ShopManager.money -=50;
			//add("METEOR");
		}
	}*/
	else if (GUI.Button(Rect(Screen.width/3,Screen.height/1.2,Screen.width*0.30,Screen.height*0.10),"Go to Deck Building!")) {
		//audioS.loop = false;
        //audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel();;
	}
	else if (GUI.Button(Rect(Screen.width*6/8,Screen.height/1.2,Screen.width*0.10,Screen.height*0.10),"--->")) {
		//audioS.loop = false;
        //audioS.Stop();
        GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadLevel("shop2");
	}
}