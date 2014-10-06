#pragma strict

public var owner : GameObject;

var spawnPoint : Vector3;

var spellbook : enemySpellbook;

var model : charModel2D;
var manager : GameObject;
var target : player2D;

var health : int;

var immune : boolean;
var immuneTimer : float;

var slow : boolean;
var slowTimer : float;

var snare : boolean;
var snareTimer : float;

var poisonCount : int;
var poisonTimer : float;

var armor : float;
var armorTimer : float;

var attack : function();
var attackTimer : float;

var aggroRange : float;
var leashRange : float;
var attackRange : float;

var evadeToSpawn : boolean = false;

public var baseSpeed : float = 1.4f;    // The damping for the speed parameter
public var speed : float;

function init(manager : GameObject, owner : GameObject, target : player2D, nameIn : String, type : String, x:float, y:float) {
	//Debug.Log("Begin Character init: "+nameIn);
	this.manager = manager;
	this.owner = owner;
	this.target = target;
	if (manager.GetComponent("enemySpellbook"))
		this.spellbook = manager.GetComponent("enemySpellbook");
	owner.name = nameIn;
	
	var texture : String;
	
	switch(type) {
		case "warrior":
			texture = "ENEMY";
			
			attack = warriorAttack;
			baseSpeed = 1f;
			health = 25;
			
			aggroRange = 6;
			leashRange = 15;
			attackRange = 1;	
			break;
		
		case "archer":
			texture = "ARCHER";
			
			attack = archerAttack;
			baseSpeed = 0.8f;
			health = 15;
			
			aggroRange = 8;
			leashRange = 10;
			attackRange = 6;
			break;
	}
	
	spawnPoint = Vector3(x,y,0);
	
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Quad);
	modelObject.name = owner.name + " Model";
	
	model = modelObject.AddComponent(charModel2D);
	model.transform.parent = owner.transform;
	model.transform.position.z -= 2;
	model.init(owner,texture);
	
	immune = false;
	immuneTimer = 0;
	
	
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
	
	if (target) {
		var playerDistance : float = Vector3.Distance(transform.position,target.transform.position);
		var spawnDistance : float = Vector3.Distance(transform.position,spawnPoint);
		if (spawnDistance >= leashRange) {
			evadeToSpawn = true;
		}
		if (evadeToSpawn) {
			if (spawnDistance <= 0.01) {
				evadeToSpawn = false;
			}
			else {
				transform.position = Vector3.MoveTowards(transform.position, spawnPoint, 3 * speed * Time.deltaTime);	
			}
		}
		else {
			if ( playerDistance > attackRange && playerDistance < aggroRange) {
				transform.position = Vector3.MoveTowards(transform.position, target.transform.position, speed * Time.deltaTime);
			}
			else if (playerDistance <= attackRange) {
				if (attackTimer <= 0) {
					attack();
				}
			}
			else if (playerDistance >= aggroRange && Vector3.Distance(transform.position,spawnPoint) > 0.01)
				transform.position = Vector3.MoveTowards(transform.position, spawnPoint, speed * Time.deltaTime);
		}
	}
}

function processStatusEffects() {
	if (health <= 0)
		die();
	immuneTimer -= Time.deltaTime;
	if (immuneTimer <= 0)
		immune = false;
	if (attackTimer > 0)
		attackTimer -= Time.deltaTime;
	
	if(poisonTimer>0)
		poisonTimer-= Time.deltaTime;	
	if(poisonCount>0 && poisonTimer<=0){					//Takes damage if poisoned
		health-=4;
		poisonCount--;
		poisonTimer = 1;
	}
	speed = baseSpeed;
	if (slow) {
		speed = baseSpeed *0.5;
		slowTimer -= Time.deltaTime;
		if (slowTimer <= 0)
			slow = false;
	}
	if (snare) {
		speed = 0;
		snareTimer -= Time.deltaTime;
		if (snareTimer <= 0)
			snare = false;
	}
}

function warriorAttack() {
	target.takeDamage(10);
}

function archerAttack() {
	spellbook.arrow(transform.position.x, transform.position.y, transform.eulerAngles);
}

function die() {
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}

