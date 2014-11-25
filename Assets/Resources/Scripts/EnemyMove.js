var hyper : boolean;
var raging : boolean;
var armored : boolean;
var juggernaut : boolean;

public var type : String;

public var iceTimer : float;
public var blindTimer : float;		// }

var target : GameObject;
var spellbook : EnemySpellbook; // functions for spells, called from attack functions

// Moment-to-moment behaviour
var aggro : boolean;		// currently attempting to chase?
var runAway : boolean;
var inRange : boolean;
var waypoint : Vector2;		// waypoint -- used for wandering randomly or if loses LoS of target
var canMove : float;

var aggroRange : float;		// Range at which enemy detects player
var leashRange : float;		// Range at which enemy gives up on player
var attackRange : float;	// Enemy's attack range

var baseSpeed : float;			// enemy's speed
var speed : float;
var damage : int;


var attack : function();

// internal
var wanderTimer : float;	// wandering finds a new point every wanderTimer seconds, and moves there.
var attackTimer : float;	// delay between attacks -- set durin attack function
var psychicTimer : float;

var archerChase : boolean;
var warriorChase : boolean;
var mageRun : boolean;

private var size : float;
private var center : Vector2;
private var theCollider : CircleCollider2D;



function init (circCol : CircleCollider2D, quadMesh : Mesh, inType : String, spellbook : EnemySpellbook, prefix : String, suffix : String) {
	//exampleMesh = quadMesh;
	
	
	
	
	archerChase = false;
	warriorChase = false;
	canMove = 0;
	if(prefix == "hyper"){
		hyper = true;
	}
	if(prefix == "raging"){
		raging = true;
	}
	
	if(suffix == "juggernaut"){
		juggernaut = true;
	}
	
	aggro = false;					// enemies start de-aggroed
	inRange = false;				// and assume they're not in range
	waypoint = transform.position;	// and aren't going anywhere in particular
	
	type = inType;					// set the enemy type
	setValues(type);				// and all the consequences of it
	
	this.spellbook = spellbook;		// learn magic
	//visualEffects();
	
	theCollider = circCol;
	size = theCollider.radius;
	center = theCollider.center;
}

function setValues (type : String) {		// ENEMY STATS BY CLASS
	if (type.Equals("archer")) {			// archer
		attack = archerAttack;

				
		baseSpeed = 4f;
		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}
		curHealth = 40;
		
		if(armored){
			armor = 2;		//Archers get a small amount of armor
		}
		damage = 7;
		if(raging){
			damage += 2;
		}
		
		aggroRange = 6;
		leashRange = 8;
		attackRange = 5;
	}
	else if (type.Equals("warrior")) {		// warrior
		attack = warriorAttack;
		
		baseSpeed = 4f;
		//baseSpeed = 3f;

		if(hyper){
			baseSpeed = baseSpeed * 1.2;	//pump up the move speed if hyper
		}
		curHealth = 65;
		
		if(armored){
			armor = 4;		//Warriors get more armor.  Because melee.
		}
		damage = 5;
		if(raging){
			damage += 2;
		}

		
		aggroRange = 6;
		leashRange = 8;
		attackRange = 1;
	}
	else if (type.Equals("mage")) {
		attack = mageAttack;
		
		baseSpeed = 3.75f;
		
		if (hyper) {
			baseSpeed = baseSpeed*1.2;
		}
		curHealth = 40;
		
		if (armored) {
			armor = 3;	// mages get more than archers but less than warriors
		}
		damage = 9;		// mages motherfucking hurt. better dodge.
		if (raging) {
			damage += 3;
		}
		
		aggroRange = 6;
		leashRange = 8;
		attackRange = 5;
	}
	else Debug.Log("INVALID ENEMY TYPE: '"+ type+"'");	// is all we have at the moment
}

function setTarget(newTarget : GameObject) {	// In case of mind control powers or confusion or we want to code player summons as enemies
	target = newTarget;
}

function Update() {
	incrementTimers();
	processDebuffs();
}

function FixedUpdate() {	
		
	var distance : float = Vector2.Distance(this.transform.position,target.transform.position);		// distance from player
	var LoS : boolean;
	if (distance <= leashRange) {
		LoS = lineOfSight(target.transform.position);										// can we see them?
	}
	else {
		LoS = false;
		runAway = false;
	}
	
	if (type.Equals("archer")){
		archerMove(distance,LoS);
	}
	else if (type.Equals("warrior")){
		warriorMove(distance,LoS);
	}
	else if (type.Equals("mage")){
		mageMove(distance,LoS);
	}
}

function warriorMove(distance : float, LoS : boolean) {
	if (!aggro) {
		if (LoS && distance < aggroRange) {
			aggro = true;
		}
		else if (psychicTimer > 0) {
			chase(target.transform.position);
		}
		else {
			wander();
		}
	}
	if (aggro) {
		if (LoS && distance > attackRange) {
			chase(target.transform.position);
		}
		if (distance <= attackRange && attackTimer <= 0) {
			attack();
		}
		if (!LoS) {
			aggro = false;
			waypoint = target.transform.position;
			psychicTimer = 3;
			chase(target.transform.position);
		}
	}
}

function archerMove(distance : float, LoS : boolean) {
	if (!aggro) {
		if (LoS && distance < aggroRange) {
			aggro = true;
		}
		else {
			wander();
		}
	}
	if (aggro) {
		if (LoS && distance > attackRange) {
			chase(target.transform.position);
		}
		if (LoS && distance <= attackRange && attackTimer <= 0) {
			face(target.transform.position);
			attack(); //Got a null reference exception at this line one time, it was a thing
		}
		if (!LoS) {
			aggro = false;
			waypoint = target.transform.position;
			wanderTimer = 3;
			wander();
		}
	}
}

function mageMove(distance : float, LoS : boolean) {
	if (!aggro) {
		if (LoS && distance < aggroRange) {
			aggro = true;
		}
		else {
			wander();
		}
	}
	if (aggro) {
		if (LoS && distance > attackRange) {
			chase(target.transform.position);
		}
		if (LoS && distance <= attackRange && attackTimer <= 0) {
			attack();
		}
		if (LoS && distance <= attackRange -2) {
			avoid(target.transform.position);
		}
		if (!LoS) {
			aggro = false;
			waypoint = target.transform.position;
			wanderTimer = 3;
			wander();
		}
	}
}

function chase(location : Vector2) {
	face(location); // face the target
	moveForward();
}

function moveForward() {
	if (canMove <= 0) {
		transform.Translate(Vector2(0,speed*Time.deltaTime));	// and move forward
	}
}

function avoid(location : Vector2) {
	face(location); // face the target
	moveBackward();
}

function moveBackward() {
	if (canMove <= 0) {
		transform.Translate(Vector2(0,-speed*0.7*Time.deltaTime));
	}
}


function lineOfSight(location : Vector2) {														// Is there a rock in the way from my location to the target?

	
	/*
	var LoS : boolean = false;
	var position : Vector2 = transform.position;
	
	for (var i : int = 0; i < 3; i++) {
		var x : float = (position.x - size) + size * i;
		var y : float = position.y;
		var rayOrigin : Vector2 = Vector2(x, y);
		var hit : RaycastHit2D = (Physics2D.Raycast(rayOrigin,location - rayOrigin, Vector2.Distance(location, this.transform.position)));
		Debug.DrawRay (rayOrigin, location - this.transform.position, Color.green);
    	if (hit) {			// raycast
    		if (hit.collider.gameObject.transform.root.name == "Player") {													// if we hit theplayer
    	         LoS = true;																		// we don't have LoS
    	    }
    	    else {
    	    	//Debug.Log(hit.collider.gameObject.transform.root.name);
    	    }
   		}
	}
	
	*/
	var LoS : boolean = true;
	var position : Vector2 = transform.position;
	
	for (var i : int = 0; i < 3; i++) {
		var x : float = (position.x - size) + size * i;
		var y : float = position.y;
		var rayOrigin : Vector2 = Vector2(x, y);
		var hits : RaycastHit2D[] = (Physics2D.RaycastAll(rayOrigin,location - rayOrigin, Vector2.Distance(location, this.transform.position)));
		Debug.DrawRay (rayOrigin, location - this.transform.position, Color.green);
	    for (var j: RaycastHit2D in hits) {
	    	if (j) {			// raycast
	    		if (j.collider.gameObject.transform.root.name == "Rocks") {													// if we hit a rock
	    			//print(hit.collider.gameObject.transform.root.name);															// DEBUG
	    	         LoS = false;																		// we don't have LoS
	    	    }
	   		}
	   	}
	}
	
	
	return LoS;
  	
}


function face(location : Vector2) {						// THIS IS A USEFUL FUNCTION
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
}

function wander() {																				// Idle movement for enemies
	if (wanderTimer > 0) {
		moveForward();
	}
	else {		
		var randX = Random.Range(-2,2);
		var randY = Random.Range(-2,2);
		
		waypoint = Vector2(transform.position.x + randX, transform.position.y + randY);		// Find a new random waypoint close by
		wanderTimer = 3 + Random.Range(-1,1);													// and give yourself some time to get there
		face(waypoint);
	}
	
	
}

function processDebuffs() {
	speed = baseSpeed;

	if (iceTimer > 0 && !juggernaut) {

		speed = speed*0.5;
	}
}

function incrementTimers() {			// All of our various timers (there'll be more)
	var tick : float = Time.deltaTime;
	wanderTimer -= tick;
	attackTimer -= tick;
	psychicTimer -= tick;
	iceTimer -= tick;
	blindTimer -= tick;
	canMove -= tick;
}

function warriorAttack() {				// The warrior's attack function
	if (blindTimer <= 0) {
		spellbook.swing();
		
		canMove = 0.5;
		attackTimer = 3;									// 3 second recharge seems long, but w/e
	}
	else {
		attackTimer = 1;
	}
}

function archerAttack() {				// the archer's attack function
	if (blindTimer <= 0) {
		spellbook.shot(gameObject);			// shoot the thing
		canMove = .5;
		attackTimer = 3;
	}
	else {
		attackTimer = 1;
	}

}

function mageAttack() {
	// MAGES can't be blinded, so no blindTimer
	spellbook.comet(gameObject,target,damage);
	canMove =  1;	// LONG attack lag
	attackTimer = 4.5;	// Long attack delat
	
}

function getDamage(){
	return damage;
}