/*

var spellType : String;
var player : GameObject;
var armorTimer : float;
var longSwordTimer : float;
var Longsword : String = "Longsword";

function Start () {
	spawnFace(0,0);
}

function Update () {
	if(armorTimer<0){
		armorTimer = 0;
		player.transform.GetChild(0).renderer.material.color = Color(1, 1, 1);
	}
	if(armorTimer>0){
		armorTimer -= Time.deltaTime;
	}
	if(longSwordTimer>0){
		longSwordTimer -= Time.deltaTime;
	}
	if(longSwordTimer<0){
		longSwordTimer = 0;
		Longsword = "Longsword";
	}
}



function spawnFire(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript = spellObject.AddComponent("spell");		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	spellObject.AddComponent("temporary");
	spellObject.GetComponent("temporary").life = 1;
	spellType = "FIRE";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "FIRE";				// Give the spell object a name in the Hierarchy pane.
}

function spawnIce(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript = spellObject.AddComponent("spell");		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	spellObject.AddComponent("temporary");
	spellObject.GetComponent("temporary").life = 1;
	spellType = "ICE";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "ICE";				// Give the spell object a name in the Hierarchy pane.
}

function spawnWeb(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript = spellObject.AddComponent("spell");		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	spellObject.AddComponent("temporary");
	spellObject.GetComponent("temporary").life = 5;
	spellType = "WEB";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "WEB";				// Give the spell object a name in the Hierarchy pane.
}

function spawnSlash(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript = spellObject.AddComponent("spell");		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	spellObject.AddComponent("temporary");
	spellObject.GetComponent("temporary").life = 1;
	spellType = "SLASH";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "SLASH";				// Give the spell object a name in the Hierarchy pane.
}

function spawnFace(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript = spellObject.AddComponent("spell");		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	spellType = "FACE";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "FACE";				// Give the spell object a name in the Hierarchy pane.
	player=spellObject;
}



function OnGUI () {
	if (GUI.Button (Rect (100,400,100,30), "Armor")) {
		player.transform.GetChild(0).renderer.material.color = Color(0.6, 0.5, 0.4);
		armorTimer = 5;
	}
	
	if (GUI.Button (Rect (100,500,100,30), Longsword)) {
		if(longSwordTimer>0){
			front(spawnSlash);
		}
		else {
			longSwordTimer=5;
			Longsword = "Swing";
		}
	}
	
	if (GUI.Button (Rect (250,400,100,30), "Fire")) {
		 surround(spawnFire);
	}
	
	if (GUI.Button (Rect (250,500,100,30), "Ice")) {
		cone(spawnIce);
	}
	
	if (GUI.Button (Rect (400,400,100,30), "Stealth")) {
		player.transform.GetChild(0).gameObject.AddComponent("translucent");
	}
	
	if (GUI.Button (Rect (400,500,100,30), "Web Trap")) {
		surround(spawnWeb);
	}
}

function surround (fnct : function(float, float, GameObject), x : float, y : float, angle : Quaternion){
	var spellParent = new GameObject();
	fnct(player.transform.position.x+1, player.transform.position.y+1, spellParent);
	fnct(player.transform.position.x+1, player.transform.position.y, spellParent);
	fnct(player.transform.position.x+1, player.transform.position.y-1, spellParent);
	fnct(player.transform.position.x, player.transform.position.y+1, spellParent);
	fnct(player.transform.position.x, player.transform.position.y-1, spellParent);
	fnct(player.transform.position.x-1, player.transform.position.y+1, spellParent);
	fnct(player.transform.position.x-1, player.transform.position.y, spellParent);
	fnct(player.transform.position.x-1, player.transform.position.y-1, spellParent);
	
}

function cone (fnct : function(float, float)){
	fnct(player.transform.position.x, player.transform.position.y+1);
	fnct(player.transform.position.x+1, player.transform.position.y+2);
	fnct(player.transform.position.x, player.transform.position.y+2);
	fnct(player.transform.position.x-1, player.transform.position.y+2);
	fnct(player.transform.position.x+2, player.transform.position.y+3);
	fnct(player.transform.position.x+1, player.transform.position.y+3);
	fnct(player.transform.position.x, player.transform.position.y+3);
	fnct(player.transform.position.x-1, player.transform.position.y+3);
	fnct(player.transform.position.x-2, player.transform.position.y+3);
}

function front (fnct : function(float,float)){
	fnct(player.transform.position.x+1, player.transform.position.y+1);
	fnct(player.transform.position.x, player.transform.position.y+1);
	fnct(player.transform.position.x-1, player.transform.position.y+1);
}

function beam (fnct : function(float, float)){
	
}
*/












