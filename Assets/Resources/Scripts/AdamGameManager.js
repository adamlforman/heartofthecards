var ground : GameObject;	// The ground's model. Background only.
var player : player2D;
var score : float;

var enemyTimer : float;

function Start () {
	Time.timeScale = 0;
	buildWorld();
	player = buildPlayer("Player");
	addEnemy(5,5);
	score = 0;
}

function Update () {
	if (!player) {
		Time.timeScale = 0;
	}
	enemyTimer -= Time.deltaTime;		// Randomly and periodically spawn an enemy
	if (enemyTimer <= 0) {
		enemyTimer = 4;
		addEnemy(Random.value*16-8, Random.value*10-5);
	}
}

function OnGUI() {
	if (Time.timeScale == 0) {
		var text : String;
		if (player)
			text = "START";
		else
			text = "GAME OVER";
		if (GUI.Button(Rect(550,10,150,50),text)) {
			Time.timeScale = 1;
			if (!player)
				Application.LoadLevel("enemyTest");
		}
	}
}
function buildWorld() {
	buildGround();
}

function buildGround() {
	ground = new GameObject.CreatePrimitive(PrimitiveType.Plane);
	ground.transform.eulerAngles.x = 270;
	ground.transform.eulerAngles.y = 0;
	ground.transform.eulerAngles.z = 0;
	ground.transform.localScale.x = 1.5;
	ground.transform.localPosition.z = 1;
	ground.name = "Ground";
	ground.renderer.material.mainTexture = Resources.Load("Textures/Ground",Texture2D);
	ground.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	ground.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency.
}

function buildPlayer(name : String) {
	var playerObject = new GameObject();
	var newPlayer = playerObject.AddComponent(player2D);
	playerObject.AddComponent(CircleCollider2D);
	newPlayer.init(this,playerObject,name, "marble");		// init(manager,owner,name,texture)
	moveCharacter(newPlayer,0,0);
	
	return newPlayer;
}

function addEnemy(x: float, y: float) {
	var enemyObject = new GameObject();
	var newEnemy = enemyObject.AddComponent(enemy2D);
	enemyObject.AddComponent(BoxCollider2D);
	enemyObject.GetComponent(BoxCollider2D).isTrigger = true;
	newEnemy.init(this,enemyObject,"Enemy", "FACE");		// init(manager,owner,name,texture)
	moveCharacter(newEnemy,x,y);
	
	return newEnemy;
}

function moveCharacter(character : player2D, x : float, y: float) {
	if (character.transform) {
		character.transform.position.x = x;
		character.transform.position.y = y;
		character.transform.position.z = -1;
	}
}

function moveCharacter(character : enemy2D, x : float, y : float) {
	if (character.transform) {
		character.transform.position.x = x;
		character.transform.position.y = y;
	}
}

function vectorFromAngle(angle : float) {
	var angleRadians : float = (angle/360)*2*3.14159;
	//Debug.Log(angle);
	return Vector2(Mathf.Cos(angleRadians),Mathf.Sin(angleRadians));
}

function spellEffects(x : float, y : float, damage : float) {
	for (var other : Collider in Physics.OverlapSphere(Vector3(x,y,-1),0.7)) {
		//Debug.Log(other);
		var otherOb : enemy2D;
		if (other.gameObject.GetComponent(enemy2D))
			otherOb = other.gameObject.GetComponent(enemy2D);
		if (other.gameObject.GetComponent(charModel2D)) {
			var dick : charModel2D = other.gameObject.GetComponent(charModel2D);
			if (dick.owner.GetComponent(enemy2D))
				otherOb = dick.owner.GetComponent(enemy2D);
		}
		if (otherOb) {
			if (!otherOb.immune) {
				otherOb.health -= damage;
			}
			otherOb.immune = true;
			otherOb.immuneTimer = 0.1;
		}
	}

}

/* ----------------------------------------------------------
	HERE FOLLOW SPELLS
	----------------------------------------------------------*/
	
	
function spawnFire(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : spell = spellObject.AddComponent(spell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "FIRE";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "FIRE";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);

}

function spawnIce(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : spell = spellObject.AddComponent(spell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "ICE";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "ICE";				// Give the spell object a name in the Hierarchy pane.

	spellEffects(x,y,5);
}

function spawnWeb(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : spell = spellObject.AddComponent(spell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 3;
	var spellType = "WEB";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "WEB";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,0);
}

function spawnSlash(x : float, y : float){
	var spellObject = new GameObject();					// Create a new empty game object that will hold a spell.
	var spellScript : spell = spellObject.AddComponent(spell);		// Add the spell.js script to the object.
														// We can now refer to the object via this script.
	var temp : temporary = spellObject.AddComponent(temporary);
	temp.life = 1;
	var spellType = "SLASH";
	//spellScript.transform.parent = this.transform;	// Set the spell's parent object to be the gameManager?
	spellScript.transform.position = Vector3(x,y,-1);	// Position the spell at x,y.
	
	spellScript.init(spellType);							// Initialize the spell script.
	
	
	spellScript.name = "SLASH";				// Give the spell object a name in the Hierarchy pane.
	
	spellEffects(x,y,10);
}
function surround (fnct : function(float, float)){
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y+1);
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y);
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x, player.transform.localPosition.y+1);
	fnct(player.transform.localPosition.x, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x-1, player.transform.localPosition.y+1);
	fnct(player.transform.localPosition.x-1, player.transform.localPosition.y);
	fnct(player.transform.localPosition.x-1, player.transform.localPosition.y-1);
}

function cone (fnct : function(float, float)){
	var angle = player.transform.eulerAngles.z;
	if (angle < 45 || angle >= 315) {
		fnct(player.transform.localPosition.x, player.transform.localPosition.y+1);
		fnct(player.transform.localPosition.x+1, player.transform.localPosition.y+2);
		fnct(player.transform.localPosition.x, player.transform.localPosition.y+2);
		fnct(player.transform.localPosition.x-1, player.transform.localPosition.y+2);
		fnct(player.transform.localPosition.x+2, player.transform.localPosition.y+3);
		fnct(player.transform.localPosition.x+1, player.transform.localPosition.y+3);
		fnct(player.transform.localPosition.x, player.transform.localPosition.y+3);
		fnct(player.transform.localPosition.x-1, player.transform.localPosition.y+3);
		fnct(player.transform.localPosition.x-2, player.transform.localPosition.y+3);
	}
	if (angle < 135 && angle >= 45) {
		fnct(player.transform.localPosition.x-1, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x-2, player.transform.localPosition.y-1);
		fnct(player.transform.localPosition.x-2, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x-2, player.transform.localPosition.y+1);
		fnct(player.transform.localPosition.x-3, player.transform.localPosition.y+2);
		fnct(player.transform.localPosition.x-3, player.transform.localPosition.y+1);
		fnct(player.transform.localPosition.x-3, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x-3, player.transform.localPosition.y-1);
		fnct(player.transform.localPosition.x-3, player.transform.localPosition.y-2);
	}
	if (angle < 225 && angle >= 135) {
		fnct(player.transform.localPosition.x, player.transform.localPosition.y-1);
		fnct(player.transform.localPosition.x+1, player.transform.localPosition.y-2);
		fnct(player.transform.localPosition.x, player.transform.localPosition.y-2);
		fnct(player.transform.localPosition.x-1, player.transform.localPosition.y-2);
		fnct(player.transform.localPosition.x+2, player.transform.localPosition.y-3);
		fnct(player.transform.localPosition.x+1, player.transform.localPosition.y-3);
		fnct(player.transform.localPosition.x, player.transform.localPosition.y-3);
		fnct(player.transform.localPosition.x-1, player.transform.localPosition.y-3);
		fnct(player.transform.localPosition.x-2, player.transform.localPosition.y-3);
	}
	if (angle < 315 && angle >= 225) {
		fnct(player.transform.localPosition.x+1, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x+2, player.transform.localPosition.y-1);
		fnct(player.transform.localPosition.x+2, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x+2, player.transform.localPosition.y+1);
		fnct(player.transform.localPosition.x+3, player.transform.localPosition.y+2);
		fnct(player.transform.localPosition.x+3, player.transform.localPosition.y+1);
		fnct(player.transform.localPosition.x+3, player.transform.localPosition.y);
		fnct(player.transform.localPosition.x+3, player.transform.localPosition.y-1);
		fnct(player.transform.localPosition.x+3, player.transform.localPosition.y-2);
	}
}

function front (fnct : function(float,float)){
	var angle = player.transform.eulerAngles.z;
	if (angle < 45 || angle >= 315) {
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y+1);
	fnct(player.transform.localPosition.x, player.transform.localPosition.y+1);
	fnct(player.transform.localPosition.x-1, player.transform.position.y+1);
	}
	if (angle < 135 && angle >= 45) {
	fnct(player.transform.localPosition.x-1, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x-1, player.transform.localPosition.y);
	fnct(player.transform.localPosition.x-1, player.transform.position.y+1);
	}
	if (angle < 225 && angle >= 135) {
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x-1, player.transform.position.y-1);
	}
	if (angle < 315 && angle >= 225) {
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y-1);
	fnct(player.transform.localPosition.x+1, player.transform.localPosition.y);
	fnct(player.transform.localPosition.x+1, player.transform.position.y+1);
	}
}


