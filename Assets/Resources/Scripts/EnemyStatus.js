var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
public var health : int;	// remaining health

public var type : String;

public var ice : float;		// }
public var poison : float;	// } Debuff booleans
public var blind : float;	// }

// Static
var target : GameObject;	// usually the player
var spellbook : EnemySpellbook; // functions for spells, called from attack functions

// Moment-to-moment behaviour
var aggro : boolean;		// currently attempting to chase?
var inRange : boolean;
var waypoint : Vector2;		// waypoint -- used for wandering randomly or if loses LoS of target

// Class Specific
var aggroRange : float;		// Range at which enemy detects player
var leashRange : float;		// Range at which enemy gives up on player
var attackRange : float;	// Enemy's attack range

var speed : float;			// enemy's speed

var attack : function();

// internal
var wanderTimer : float;	// wandering finds a new point every wanderTimer seconds, and moves there.
var attackTimer : float;	// delay between attacks -- set durin attack function


function init (quadMesh : Mesh, inType : String, spellbook : EnemySpellbook) {
	exampleMesh = quadMesh;
	
	aggro = false;
	inRange = false;
	waypoint = transform.position;
	
	type = inType;
	setValues(type);
	
	this.spellbook = spellbook;
}

function setValues (type : String) {
	if (type.Equals("archer")) {
		attack = archerAttack;
		speed = 0.8f;
		health = 15;
		
		aggroRange = 6;
		leashRange = 10;
		attackRange = 4;
	}
	else if (type.Equals("warrior")) {
		attack = warriorAttack;
		speed = 1f;
		health = 25;
		
		aggroRange = 6;
		leashRange = 15;
		attackRange = 1;
	}
	else Debug.Log("INVALID ENEMY TYPE: '"+ type+"'");
}

function setTarget(newTarget : GameObject) {
	target = newTarget;
}

function Update () {
	incrementTimers();
	if (health <= 0) {
		die();
	}
	var distance : float = Vector2.Distance(this.transform.position,target.transform.position);
	var LoS : boolean = lineOfSight();
	if (!aggro) {
		if (distance <= aggroRange) {
			if (LoS) {
				aggro = true;
			}
		}
	}
	else {
		if ((distance <= attackRange) && LoS) {
			inRange = true;
		}
		else {
			inRange = false;
		}
		
		if (distance > leashRange) {
			aggro = false;
		}
		else if (!LoS) {
			waypoint = target.transform.position;
			aggro = false;
		}
		
	}
	
}

function lineOfSight() {
	var hit : RaycastHit;
    if (Physics.Raycast(transform.position, target.transform.position - this.transform.position,hit)) {
    	if (hit.gameObject.name == "ROCK") {
             return false;
        }
    }
    return true;
}

function face(location : Vector2) {
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
}

function FixedUpdate() {
	if (aggro) {
		if (inRange && attackTimer <= 0) {
			attack();
		}
		else {
			face(target.transform.position);
			transform.Translate(Vector2(0,speed*Time.deltaTime));
		}
	}
	else {
		wander();
	}
}

function wander() {
	if (Vector2.Distance(this.transform.position,waypoint) > 0.1) {
		face(waypoint);
		transform.Translate(Vector2(0,speed*Time.deltaTime));
	}
	else if (wanderTimer <= 0) {
		var randX = Random.Range(-2,2);
		var randY = Random.Range(-2,2);
		
		waypoint = Vector2(transform.position.x + randX, transform.position.y + randY);
		wanderTimer = 3 + Random.Range(-1,1);
	}
	
	
}

function OnTriggerEnter2D(other : Collider2D){
	//print("enemy");
	if(other.gameObject.name == "Shot") {
		if(!other.gameObject.GetComponent(PlayerSpell).splash){
			damageText(other);
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
		}
		else{
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);		//If we splash, dont make damage text yet.
		}
	}
	if(other.gameObject.name == "Explosion") {
		/*var damageTextScript = playerObject.AddComponent(DamageText);			//Add the DamageText Script
		damageTextScript.init(this);*/


		damageText(other);
		
		other.gameObject.GetComponent(Splash).hit(gameObject);
	}
}


function takeDamage(damage : float){
	health -= damage;
	//IF THE ENENIES DIE, GIVE THE PLAYER SOME $$$$

}

function damageText(other : Collider2D){
	var damageObject = new GameObject("DamageText");
	damageObject.transform.parent = this.transform;
	damageObject.transform.localPosition = Vector3(.5, -.25, -2);
	damageObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	var meshFilter = damageObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	damageObject.AddComponent(MeshRenderer); //Add a renderer for textures
	var textureName = "Textures/TEN"; //Get the texture name with texture folder
	damageObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
	damageObject.renderer.material.color = Color(1,0,0); //Set the color (easy way to tint things).
	damageObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	
	Destroy(damageObject, 1);

}

function incrementTimers() {
	var tick : float = Time.deltaTime;
	wanderTimer -= tick;
	attackTimer -= tick;
}

function die() {
	GameObject.Destroy(gameObject);
}
// -------------------------------
// Below are attack functions
// -------------------------------

function warriorAttack() {
	//Debug.Log("warrior attack");
	target.GetComponent(PlayerStatus).takeDamage(10);	// Just happens
	attackTimer = 3;
}

function archerAttack() {
	//Debug.Log("archer attack");
	spellbook.shot(gameObject);
	attackTimer = 3;
}