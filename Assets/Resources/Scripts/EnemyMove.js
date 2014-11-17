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

				
		baseSpeed = 3f;
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
		
		baseSpeed = 3.25f;

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
		attackRange = 1.5;
	}
	else if (type.Equals("mage")) {
		attack = mageAttack;
		
		baseSpeed = 2.5f;
		
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

	/*
	if (!aggro) {						// if not aggro
		if (distance <= aggroRange) {	// and are in aggro range
			if (LoS) {					// and can see them
				aggro = true;			// BATTLE
			}
		}
	}
	if (aggro) {											// if aggro
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
	if ((distance <= 1) && (LoS == true)) {
		warriorChase = false;
	}
	else {
		warriorChase = true;
	}
	if ((distance <= 4) && (LoS == true)) {
		archerChase = false;
	}
	else {
		archerChase = true;
	}
	if ((distance <= 3) && (LoS == true)) {
		mageRun = true;
	}
	else {
		mageRun = false;
	}
	*/
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
	/*									// Enemy behaviour
	if (aggro) {													// if we know the player is there	
		if (inRange && attackTimer <= 0) {								// and we can attack them
			chase(target.transform.position);
			attack();														// do so
		}
		else {
			chase(target.transform.position);
		}	
	}
	else {															//otherwise
		wander();														// Idle behaviour
	}
	*/
}

function warriorMove(distance : float, LoS : boolean) {
	if (!aggro) {
		if (LoS && distance < aggroRange) {
			aggro = true;
		}
<<<<<<< HEAD
		else {
			wander();
		}
=======
		/*else { //Was there something here before it was avoid?
			if (canMove <= 0) {
				avoid(target.transform.position);
				
			}
		}*/
>>>>>>> origin/master
	}
	if (aggro) {
		if (LoS) {
			chase(target.transform.position);
		}
		if (distance <= attackRange && attackTimer <= 0) {
			attack();
		}
		if (!LoS) {
			aggro = false;
			waypoint = target.transform.position;
			wanderTimer = 3;
			wander();
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
			attack();
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
	if (canMove <= 0) {
		transform.Translate(Vector2(0,speed*Time.deltaTime));	// and move forward
	}
}

function avoid(location : Vector2) {
	face(location); // face the target
	transform.Translate(Vector2(0,-speed*0.7*Time.deltaTime));
}


function lineOfSight(location : Vector2) {														// Is there a rock in the way from my location to the target?
	var LoS : boolean = true;
	var position : Vector2 = transform.position;
	for (var i : int = 0; i < 3; i++) {
		var x : float = (position.x - size) + size * i;
		var y : float = position.y;
		var rayOrigin : Vector2 = Vector2(x, y);
		var hits : RaycastHit2D[] = (Physics2D.RaycastAll(rayOrigin,location - this.transform.position, Vector2.Distance(location, this.transform.position)));
		//Debug.DrawRay (rayOrigin, location - this.transform.position, Color.white);
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
	if (Vector2.Distance(this.transform.position,waypoint) > 0.1 && wanderTimer > -2) {			// If we're not at our waypoint or clearly not going to get there
		chase(waypoint);
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
	iceTimer -= tick;
	blindTimer -= tick;
	canMove -= tick;
}

function warriorAttack() {				// The warrior's attack function
	if (blindTimer <= 0) {
		spellbook.swing();

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