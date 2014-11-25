private var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
public var curHealth : float;	// remaining health
public var maxHealth : float;
public var armor : float;

public var type : String;

//public var iceTimer : float;		// }
public var poisonTimer : float;		// } Debuff timers
public var poisonCounter : int; 		// }
//public var blindTimer : float;		// }
private var invulnerable : float;

var hyper : boolean;
var raging : boolean;
var armored : boolean;
var juggernaut : boolean;
var arrowHit: AudioClip;
var uugh : AudioClip;
var explosion : AudioClip;
var fistHit : AudioClip;
var healthPercent : float;
//If the player can move
//var canMove : float = 0;


// Static
//var target : GameObject;	// usually the player
//var spellbook : EnemySpellbook; // functions for spells, called from attack functions
var healthBar : GameObject;

var audioS : AudioSource;

// Moment-to-moment behaviour
//var aggro : boolean;		// currently attempting to chase?
//var inRange : boolean;
//var waypoint : Vector2;		// waypoint -- used for wandering randomly or if loses LoS of target

// Class Specific
//var aggroRange : float;		// Range at which enemy detects player
//var leashRange : float;		// Range at which enemy gives up on player
//var attackRange : float;	// Enemy's attack range

//var baseSpeed : float;			// enemy's speed
//var speed : float;

//var attack : function();

// internal
//var wanderTimer : float;	// wandering finds a new point every wanderTimer seconds, and moves there.
//var attackTimer : float;	// delay between attacks -- set durin attack function


function init (quadMesh : Mesh, inType : String, spellbook : EnemySpellbook, prefix : String, suffix : String) {
	audioS = this.GetComponent(AudioSource);
	uugh = Resources.Load("Sounds/uugh");
	arrowHit = Resources.Load("Sounds/arrowhit");
	explosion = Resources.Load("Sounds/explosion");
	fistHit = Resources.Load("Sounds/fisthit");
	exampleMesh = quadMesh;
	invulnerable = 0;
	if(prefix == "hyper"){
		hyper = true;
	}
	if(prefix == "raging"){
		raging = true;
	}
	if(prefix == "armored"){
		armored = true;
	}
	else{
		armor = 0;
	}
	if(suffix == "juggernaut"){
		juggernaut = true;
	}
	
	healthBar = GameObject.CreatePrimitive(PrimitiveType.Quad);		// Enemies have healthbars
	healthBar.transform.parent = transform;							// We're going to override the position updates, but this makes the hierarchy not look terrifying
	healthBar.renderer.material.color = Color(0.8,0,0);				// enemy health bars are red
	healthBar.transform.localPosition = Vector2(0,0.7);				// and are slightly above their characters' heads
	healthBar.name = "Health Bar";
	
	//aggro = false;					// enemies start de-aggroed
	//inRange = false;				// and assume they're not in range
	//waypoint = transform.position;	// and aren't going anywhere in particular
	
	type = inType;					// set the enemy type
	setValues(type);				// and all the consequences of it
	
	//this.spellbook = spellbook;		// learn magic
	visualEffects();
	adjustHealth();
}

function setValues (type : String) {		// ENEMY STATS BY CLASS
	if (type.Equals("archer")) {			// archer
		/*attack = archerAttack;

				
		baseSpeed = 3f;
		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}*/
		curHealth = 40;
		
		if(armored){
			armor = 2;		//Archers get a small amount of armor
		}
		
		//aggroRange = 6;
		//leashRange = 10;
		//attackRange = 5;
	}
	else if (type.Equals("warrior")) {		// warrior
		/*attack = warriorAttack;
		
		baseSpeed = 3.25f;

		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}*/
		curHealth = 65;
		
		if(armored){
			armor = 4;		//Warriors get more armor.  Because melee.
		}

		
		//aggroRange = 6;
		//leashRange = 15;
		//attackRange = 1.5;
	}
	else if (type.Equals("mage")) {
		curHealth = 30;
		if (armored) {
			armor = 3;
		}
	}
	else Debug.Log("INVALID ENEMY TYPE: '"+ type+"'");	// is all we have at the moment
	maxHealth = curHealth;					// this will always happen (..... right?)
}

//function setTarget(newTarget : GameObject) {	// In case of mind control powers or confusion or we want to code player summons as enemies
//	target = newTarget;
//}

function Update () {
	incrementTimers();		// tick tock goes the clock
	processDebuffs();
	if (curHealth <= 0) {	// how to die
		die();
	}
	healthBar.transform.position = Vector3((1-healthPercent)/2 + transform.position.x,0.7 + transform.position.y,transform.position.z);		// and update the transform
	healthBar.transform.rotation = Quaternion.identity;
}

function adjustHealth (){
	healthPercent = curHealth / maxHealth;																								// update health %
	healthBar.transform.localScale = Vector3(healthPercent,0.15,1);																			// rescale healthbar
}

function OnTriggerEnter2D(other : Collider2D){
	//print("enemy");
	if(other.gameObject.name == "Shot") {
		audioS.PlayOneShot(arrowHit);
		other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
	}
	if(other.gameObject.name == "Explosion") {
		audioS.PlayOneShot(explosion);
		other.gameObject.GetComponent(Splash).hit(gameObject);
	}

}

function OnTriggerStay2D(other : Collider2D){
	if(invulnerable<=0){
		if(other.gameObject.name == "Fist" ) {
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
		}
	}
}


function takeDamage(damage : float, magic : boolean){ 
	if(invulnerable<=0){
		if(magic){
			curHealth -= (damage);
			damageText(damage);
		}
		else{
			curHealth -= (damage-armor);
			damageText(damage-armor);
			invulnerable = 0.5;
		}
		adjustHealth();
	}
}

function damageText(damage : int){
	var damageObject = new GameObject("DamageText");
	//damageObject.transform.parent = this.transform;
	damageObject.transform.position = this.transform.position;
	damageObject.transform.position.z = -2;
	damageObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	
	var damageScript = damageObject.AddComponent(FloatingText);
	damageScript.init();
	var meshFilter = damageObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	damageObject.AddComponent(MeshRenderer); //Add a renderer for textures
	var textureName = "Textures/"+damage; //Get the texture name with texture folder
	damageObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
	damageObject.renderer.material.color = Color(1,0,0); //Set the color (easy way to tint things).
	damageObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	
	Destroy(damageObject, 1);

}

function processDebuffs() {
	if (poisonCounter > 0 && poisonTimer <= 0) {
		takeDamage(2, true);
		poisonCounter--;
		poisonTimer = 1;
	}
}

function incrementTimers() {			// All of our various timers (there'll be more)
	var tick : float = Time.deltaTime;
	poisonTimer -= tick;
	invulnerable -= tick;
}

function die() {						// How to die: a manual
	PlayerStatus.money +=20;
	var moneyObject = new GameObject("ChestText");
	//damageObject.transform.parent = this.transform;
	moneyObject.transform.position = this.transform.position;
	moneyObject.transform.position.z = -2;
	moneyObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	
	
	var meshFilter = moneyObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	moneyObject.AddComponent(MeshRenderer); //Add a renderer for textures
	var textureName = "Textures/money"; //Get the texture name with texture folder
	moneyObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
	moneyObject.renderer.material.color = Color(1,1,1); //Set the color (easy way to tint things).
	moneyObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	GameObject.Destroy(gameObject);		// Stop existing. the end.
	Destroy(moneyObject, .5);
}

function getRaging(){
	return raging;
}


function visualEffects(){

	if(hyper){
		attachEffect("Hyper Effect");
	}
	if(armored){
		attachEffect("Armored Effect");
	}
	if(raging){
		attachEffect("Raging Effect");
	}
	if(juggernaut){
		attachEffect("Juggernaut Effect");
	}
}

function attachEffect(name : String){
	var effectObject = new GameObject();							// Create a quad object for holding the tile texture.
	var meshFilter0 = effectObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter0.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	effectObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	effectObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = effectObject.AddComponent(BuffEffectModel);				// Add a spellModel script to control visuals of the spell.
	model.name = name;									//Name the PlayerModel
	model.init(this.gameObject, name);								// Initialize the spellModel.
	effectObject.SetActive(true);								// Turn on the object (the Update function will start being called).
}


