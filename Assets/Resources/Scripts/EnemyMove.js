var hyper : boolean;
var raging : boolean;
var armored : boolean;
var juggernaut : boolean;

public var type : String;

public var iceTimer : float;
public var blindTimer : float;		// }
var chargeTimer : float;
var condemnTimer : float;

var target : GameObject;
var spellbook : EnemySpellbook; // functions for spells, called from attack functions

// Moment-to-moment behaviour
var aggro : boolean;		// currently attempting to chase?
var runAway : boolean;
var inRange : boolean;
var condemning : boolean;
var waypoint : Vector2;		// waypoint -- used for wandering randomly or if loses LoS of target
var canMove : float;

var aggroRange : float;		// Range at which enemy detects player
var leashRange : float;		// Range at which enemy gives up on player
var attackRange : float;	// Enemy's attack range

var countdown : float = 0;

var baseSpeed : float;			// enemy's speed
var speed : float;
var damage : int;
var windup : boolean;


var attack : function();

// internal
var wanderTimer : float;	// wandering finds a new point every wanderTimer seconds, and moves there.
var attackTimer : float;	// delay between attacks -- set durin attack function

var charging : boolean;

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
	charging = false;
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
		
		windup = false;
		
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
	if(!gameObject.GetComponent(EnemyStatus).getStun()){
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
}

function warriorMove(distance : float, LoS : boolean) {
	if (!aggro) {
		if (LoS && distance < aggroRange) {
			aggro = true;
		}
		else {
			wander();
		}
	}
	if (aggro) {
		if (distance > (attackRange+1) && chargeTimer < 0 && !charging) {
			startCharging();
		}
		if (windup) {
			face(target.transform.position);
			if (chargeTimer <= 0) {
				windup = false;

				gameObject.transform.GetChild(0).GetComponent(CharModel).changeColor(Color(1,0,0));

				chargeTimer = 0.8;
	
			}
		}
		else if (charging) {
			if (chargeTimer > 0) {	
				charge(target.transform.position);
				if (distance <= attackRange) {
					chargeAttack();
				}
			}
			else {
				charging = false;
				chargeTimer = 4;
			}
		}
		else if (LoS && distance > attackRange) {
			chase(target.transform.position);
		}
		else if (distance <= attackRange && attackTimer <= 0) {
			attack();
		}
		else if (!LoS) {
			aggro = false;
			waypoint = target.transform.position;
			wander();
		}
	}
}

function startCharging() {
	//AudioSource.PlayClipAtPoint(Resources.Load("Sounds/charge",AudioClip),transform.position);
	chargeTimer = 2;
	gameObject.transform.GetChild(0).GetComponent(CharModel).changeColor(Color(0,0,1));
	windup = true;
	charging = true;
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
		else if (LoS && distance <= 1.5 && condemnTimer <= 0 && !condemning) {
			face(target.transform.position);
			startCondemn();
		}
		else if (LoS && distance <= 1.5 && condemning) {
			if (countdown < 0) {
				condemn();
				condemning = false;
			}
		}
		else if (LoS && distance <= attackRange && attackTimer <= 0) {
			face(target.transform.position);
			attack();
		}
		else if (!LoS) {
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
	moveForward(1);
}

function moveForward(multiplier : float) {
	if (canMove <= 0) {
		transform.Translate(Vector2(0,speed*multiplier*Time.deltaTime));	// and move forward
	}
}

function avoid(location : Vector2) {
	face(location); // face the target
	moveBackward(0.7);
}

function moveBackward(multiplier : float) {
	if (canMove <= 0) {
		transform.Translate(Vector2(0,-speed*multiplier*0.7*Time.deltaTime));
	}
}


function lineOfSight(location : Vector2) {														// Is there a rock in the way from my location to the target?

	var LoS : boolean = true;
	var position : Vector2 = transform.position;
	
	for (var i : int = 0; i < 3; i++) {
		var x : float = (position.x - size) + size * i;
		var y : float = position.y;
		var rayOrigin : Vector2 = Vector2(x, y);
		var hits : RaycastHit2D[] = (Physics2D.RaycastAll(rayOrigin,location - rayOrigin, Vector2.Distance(location, this.transform.position)));
		//Debug.DrawRay (rayOrigin, location - this.transform.position, Color.green);
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

function charge(location : Vector2) {
	slowFace(location);
	moveForward(2.5);
}

function face(location : Vector2) {						// THIS IS A USEFUL FUNCTION
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
	//slowFace(location);
}

function slowFace(location : Vector2) {
	var curRotation = transform.rotation;
	var newRotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
	
	transform.rotation = Quaternion.Lerp(curRotation,newRotation,Time.deltaTime*3f);
}

function wander() {																				// Idle movement for enemies
	if (wanderTimer > 0) {
		moveForward(0.5);
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
	iceTimer -= tick;
	blindTimer -= tick;
	canMove -= tick;
	chargeTimer -= tick;
	condemnTimer -= tick;
	countdown -= tick;
}

function warriorAttack() {				// The warrior's attack function
	if (blindTimer <= 0) {
		spellbook.swing();
		
		attackTimer = 2;									// 3 second recharge seems long, but w/e
	}
	else {
		attackTimer = 1;
	}
}

function archerAttack() {				// the archer's attack function
	if (blindTimer <= 0) {
		spellbook.shot(gameObject, damage);			// shoot the thing
		canMove = .5;
		attackTimer = 2;
	}
	else {
		attackTimer = 1;
	}

}

function startCondemn() {
	gameObject.transform.GetChild(0).GetComponent(CharModel).changeColor(Color(0,0,1));
	countdown = 1;
	condemning = true;
}

function condemn() {
		gameObject.transform.GetChild(0).GetComponent(CharModel).changeColor(Color(1,0,0));
		spellbook.condemn = true;
		spellbook.shot(gameObject, damage - 2);			// shoot the thing
		canMove = .5;
		attackTimer = 2;
		condemnTimer = 4;
		spellbook.condemn = false;
}

function mageAttack() {
	// MAGES can't be blinded, so no blindTimer
	spellbook.comet(gameObject,target,damage);
	canMove =  1;	// LONG attack lagf
	attackTimer = 4.5;	// Long attack delat
	
}

function chargeAttack() {
	target.GetComponent(PlayerStatus).takeDamage(damage+2,false);
	charging = false;
	chargeTimer = 4;
	attackTimer = 1;
	if(target.GetComponent(PlayerStatus).getBlock()){
		gameObject.GetComponent(EnemyStatus).setStun(true);
	}
}

function getDamage(){
	return damage;
}