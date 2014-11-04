var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
public var curHealth : float;	// remaining health
public var maxHealth : float;
public var armor : float;

public var type : String;

public var iceTimer : float;		// }
public var poisonTimer : float;		// } Debuff timers
public var poisonCounter : int; 		// }
public var blindTimer : float;		// }


var hyper : boolean;
var raging : boolean;
var armored : boolean;
var juggernaut : boolean;


// Static
var target : GameObject;	// usually the player
var spellbook : EnemySpellbook; // functions for spells, called from attack functions
var healthBar : GameObject;

// Moment-to-moment behaviour
var aggro : boolean;		// currently attempting to chase?
var inRange : boolean;
var waypoint : Vector2;		// waypoint -- used for wandering randomly or if loses LoS of target

// Class Specific
var aggroRange : float;		// Range at which enemy detects player
var leashRange : float;		// Range at which enemy gives up on player
var attackRange : float;	// Enemy's attack range

var baseSpeed : float;			// enemy's speed
var speed : float;

var attack : function();

// internal
var wanderTimer : float;	// wandering finds a new point every wanderTimer seconds, and moves there.
var attackTimer : float;	// delay between attacks -- set durin attack function


function init (quadMesh : Mesh, inType : String, spellbook : EnemySpellbook, prefix : String, suffix : String) {
	exampleMesh = quadMesh;
	
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
	
	aggro = false;					// enemies start de-aggroed
	inRange = false;				// and assume they're not in range
	waypoint = transform.position;	// and aren't going anywhere in particular
	
	type = inType;					// set the enemy type
	setValues(type);				// and all the consequences of it
	
	this.spellbook = spellbook;		// learn magic
	visualEffects();
}

function setValues (type : String) {		// ENEMY STATS BY CLASS
	if (type.Equals("archer")) {			// archer
		attack = archerAttack;

				
		baseSpeed = 3f;
		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}
		curHealth = 40;
		
		if(armored){
			armor = 2;		//Archers get a small amount of armor
		}
		
		aggroRange = 6;
		leashRange = 10;
		attackRange = 5;
	}
	else if (type.Equals("warrior")) {		// warrior
		attack = warriorAttack;
		
		baseSpeed = 3.25f;

		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}
		curHealth = 65;
		
		if(armored){
			armor = 4;		//Warriors get more armor.  Because melee.
		}

		
		aggroRange = 6;
		leashRange = 15;
		attackRange = 1.5;
	}
	else Debug.Log("INVALID ENEMY TYPE: '"+ type+"'");	// is all we have at the moment
	maxHealth = curHealth;					// this will always happen (..... right?)
}

function setTarget(newTarget : GameObject) {	// In case of mind control powers or confusion or we want to code player summons as enemies
	target = newTarget;
}

function Update () {
	incrementTimers();		// tick tock goes the clock
	processDebuffs();
	if (curHealth <= 0) {	// how to die
		die();
	}
	var healthPercent = curHealth / maxHealth;																								// update health %
	healthBar.transform.localScale = Vector3(healthPercent,0.15,1);																			// rescale healthbar
	healthBar.transform.position = Vector3((1-healthPercent)/2 + transform.position.x,0.7 + transform.position.y,transform.position.z);		// and update the transform
	healthBar.transform.rotation = Quaternion.identity;
	
	
	var distance : float = Vector2.Distance(this.transform.position,target.transform.position);		// distance from player
	var LoS : boolean;
	if (distance <= leashRange) {
		LoS = lineOfSight(target.transform.position);										// can we see them?
	}
	else {
		LoS = false;
	}
	
	if (!aggro) {						// if we don't know of player
		if (distance <= aggroRange) {	// and are in aggro range
			if (LoS) {					// and can see them
				aggro = true;			// BATTLE
			}
		}
	}
	else {											// if we know of player
		if ((distance <= attackRange) && LoS) {		// if we're close and can see them
			inRange = true;							// we may attack
		}
		else {										//else not
			inRange = false;
		}
		
		if (distance > leashRange) {				// if we're too far away
			aggro = false;							// forget about player
		}
		else if (!LoS) {							// if we have aggro, can't see them but aren't too far away
			waypoint = target.transform.position;	// go to where they were
			aggro = false;							// but forget about them
			wanderTimer = 3;						// and be ready to restart idling
		}
		
	}
	
}

function lineOfSight(location : Vector2) {														// Is there a rock in the way from my location to the target?
	var hits : RaycastHit2D[] = (Physics2D.RaycastAll(transform.position,location - this.transform.position, Vector2.Distance(location, this.transform.position)));
	Debug.DrawRay (transform.position, location - this.transform.position, Color.white);
    for (var x: RaycastHit2D in hits) {
    	if (x) {			// raycast
    		if (x.collider.gameObject.transform.root.name == "Rocks") {													// if we hit a rock
    			//print(hit.collider.gameObject.transform.root.name);															// DEBUG
    	         return false;																		// we don't have LoS
    	    }
   		}
   	}
  	return true;
}

function face(location : Vector2) {						// THIS IS A USEFUL FUNCTION
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
}

function FixedUpdate() {										// Enemy behaviour
	if (aggro) {													// if we know the player is there	
		if (inRange && attackTimer <= 0) {								// and we can attack them
			attack();														// do so
		}
		else {
			face(target.transform.position);						// face the player
			transform.Translate(Vector2(0,speed*Time.deltaTime));	// and move forward
		}
	}
	else {															//otherwise
		wander();														// Idle behaviour
	}
}

function wander() {																				// Idle movement for enemies
	if (Vector2.Distance(this.transform.position,waypoint) > 0.1 && wanderTimer > -2) {			// If we're not at our waypoint or clearly not going to get there
		face(waypoint);																				// Face the waypoint
		transform.Translate(Vector2(0,speed*Time.deltaTime));										// and move forward
	}
	else if (wanderTimer <= 0) {																// If we're there
		do {
			var randX = Random.Range(-2,2);
			var randY = Random.Range(-2,2);
		
			waypoint = Vector2(transform.position.x + randX, transform.position.y + randY);		// Find a new random waypoint close by
		}
		while (!lineOfSight(waypoint));															// that isn't inside a wall
		wanderTimer = 3 + Random.Range(-1,1);													// and give yourself some time to get there
	}
	
	
}

function OnTriggerEnter2D(other : Collider2D){
	//print("enemy");
	if(other.gameObject.name == "Shot") {
		if(!other.gameObject.GetComponent(PlayerSpell).splash){
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
		}
		else{
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);		//If we splash, dont make damage text yet.
		}
	}
	if(other.gameObject.name == "Explosion") {
		other.gameObject.GetComponent(Splash).hit(gameObject);
	}
}


function takeDamage(damage : float){
	curHealth -= (damage-armor);
	damageText(damage-armor);
	//IF THE ENENIES DIE, GIVE THE PLAYER SOME $$$$

}

function damageText(damage : int){
	var damageObject = new GameObject("DamageText");
	//damageObject.transform.parent = this.transform;
	damageObject.transform.position = this.transform.position;
	damageObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	var meshFilter = damageObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	damageObject.AddComponent(MeshRenderer); //Add a renderer for textures
	var textureName = "Textures/"+damage; //Get the texture name with texture folder
	print(textureName);
	damageObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
	damageObject.renderer.material.color = Color(1,0,0); //Set the color (easy way to tint things).
	damageObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	
	Destroy(damageObject, 1);

}

function processDebuffs() {
	speed = baseSpeed;

	if (iceTimer > 0 && !juggernaut) {

		speed = speed*0.5;
	}
	if (poisonCounter > 0 && poisonTimer <= 0) {
		takeDamage(2);
		poisonCounter--;
		poisonTimer = 1;
	}
}

function incrementTimers() {			// All of our various timers (there'll be more)
	var tick : float = Time.deltaTime;
	wanderTimer -= tick;
	attackTimer -= tick;
	iceTimer -= tick;
	poisonTimer -= tick;
	blindTimer -= tick;
}

function die() {						// How to die: a manual
	PlayerStatus.money +=10;
	GameObject.Destroy(gameObject);		// Stop existing. the end.
}

function getRaging(){
	return raging;
}
// -------------------------------
// Below are attack functions
// -------------------------------

function warriorAttack() {				// The warrior's attack function
	if (blindTimer <= 0) {

		if(raging){
			target.GetComponent(PlayerStatus).takeDamage(7);	// damage just happens
		}
		else{
			target.GetComponent(PlayerStatus).takeDamage(5);	// damage just happens
		}

		attackTimer = 3;									// 3 second recharge seems long, but w/e
	}
}

function archerAttack() {				// the archer's attack function
	if (blindTimer <= 0) {
		spellbook.shot(gameObject);			// shoot the thing
		attackTimer = 3;
	}

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


