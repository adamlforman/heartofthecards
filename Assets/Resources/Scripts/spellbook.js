#pragma strict

function Start () {

}

function Update () {

}

function fireblast(x : float,y : float, angle : Vector3) {
	surround(spawnFire, x, y, angle);
}

function iceBreath(x : float,y : float, angle : Vector3) {
	cone(spawnIce,x,y,angle);
}

function webTrap(x : float,y : float, angle : Vector3) {
	surround(spawnWeb,x,y,angle);
}

function dart(x : float,y : float, angle : Vector3) {
	shot(spawnDart,x,y,angle);
}

function arcaneCataclysm(x : float,y : float, angle : Vector3) {
	beam(spawnArcane,x,y,angle);
}
//--------------------------------
//		Buff / debuff spells
//------------------------------


function armor(character : player2D) {
	character.armor = 0.9;
	character.armorTimer = 5;
}

//-----------------------------------------------------------------
//			Evaluate spells
//-----------------------------------------------------------------

function spellEffects(x : float, y : float, damage : float) {
	for (var other : Collider in Physics.OverlapSphere(Vector3(x,y,-1),0.7)) {
		//Debug.Log(other);
		var otherOb : enemy2D;
		if (other.gameObject.GetComponent("enemy2D"))
			otherOb = other.gameObject.GetComponent(enemy2D);
		if (other.gameObject.GetComponent("charModel2D")) {
			var dick : charModel2D = other.gameObject.GetComponent(charModel2D);
			if (dick.owner.GetComponent("enemy2D"))
				otherOb = dick.owner.GetComponent(enemy2D);
		}
		if (otherOb) {
			if (!otherOb.immune) {
				otherOb.takeDamage(damage);
			}
			otherOb.immune = true;
			otherOb.immuneTimer = 0.1;
		}
	}

}

//-----------------------------------------------------------------
//			Spawn spell objects
//-----------------------------------------------------------------

function spawnFire(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "FIRE";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "FIRE";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);

}

function spawnIce(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "ICE";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "ICE";				// Give the spell object a name in the Hierarchy pane.

	spellEffects(x,y,5);
}

function spawnArcane(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 0.5;
	var spellType = "DEMACIA";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "DEMACIA";				// Give the spell object a name in the Hierarchy pane.

	spellEffects(x,y,5);
}

function spawnWeb(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 3;
	var spellType = "WEB";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "WEB";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,0);
}

function spawnSlash(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "SLASH";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "SLASH";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);
}

function spawnArrow(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 10;
	var spellType = "ARROW";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "ARROW";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);
}

function spawnDart(x : float, y : float, owner : GameObject){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : playerSpell = spellObject.AddComponent(playerSpell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 10;
	var spellType = "DART";
	spellScript.transform.parent = owner.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "DART";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);
}


//----------------------------------------------------------
//		Spell Patterns
//-----------------------------------------------------------


function surround (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	fnct(x+1, y+1, dummy);
	fnct(x+1, y, dummy);
	fnct(x+1, y-1, dummy);
	fnct(x, y+1, dummy);
	fnct(x, y-1, dummy);
	fnct(x-1, y+1, dummy);
	fnct(x-1, y, dummy);
	fnct(x-1, y-1, dummy);
	dummy.transform.eulerAngles = angle;
}

function cone (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	fnct(x, y+1, dummy);
	fnct(x-1, y+2, dummy);
	fnct(x-1, y+3, dummy);
	fnct(x+1, y+2, dummy);
	fnct(x+1, y+3, dummy);
	fnct(x, y+2, dummy);
	fnct(x-2, y+3, dummy);
	fnct(x+2, y+3, dummy);
	fnct(x, y+3, dummy);
	dummy.transform.eulerAngles = angle;
}

function front (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	fnct(x, y+1, dummy);
	fnct(x-1, y+1, dummy);
	fnct(x+1, y+1, dummy);
	dummy.transform.eulerAngles = angle;
}

function beam (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	for(var i = -1;i<2;i++){
		for(var j = 1; j<10; j++){
			fnct(x+i, y+j, dummy);
		}
	}
	dummy.transform.eulerAngles = angle;
}

function bomb (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	for(var i = -2;i<3;i++){
		for(var j = 1; j<6; j++){
			fnct(x+i, y+j, dummy);
		}
	}
	dummy.transform.eulerAngles = angle;
}

function shot (fnct : function(float, float, GameObject), x : float, y : float, angle : Vector3){
	var dummy = new GameObject();
	var temp : temporary = dummy.AddComponent(temporary);
	temp.life = 5;
	dummy.transform.position = Vector3(x,y,-1);
	fnct(x, y, dummy);
	dummy.transform.eulerAngles = angle;
}