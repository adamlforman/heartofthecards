#pragma strict

public var owner : GameObject;

var spawnPoint : Vector3;

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

var attackTimer : float;

public var turnSmoothing : float = 4f;     // A smoothing value for turning the player.
public var baseSpeed : float = 1.4f;    // The damping for the speed parameter
public var speed : float;

function init(manager : GameObject, owner : GameObject, target : player2D, nameIn : String, texture : String,x:float,y:float) {
	//Debug.Log("Begin Character init: "+nameIn);
	this.manager = manager;
	this.owner = owner;
	this.target = target;
	owner.name = nameIn;
	
	spawnPoint = Vector3(x,y,0);
	
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Quad);
	modelObject.name = owner.name + " Model";
	
	model = modelObject.AddComponent(charModel2D);
	model.transform.parent = owner.transform;
	model.transform.position.z -= 2;
	model.init(owner,texture);
	
	health = 20;
	immune = false;
	immuneTimer = 0;
	
	
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
	
	if (target) {
		var distance : float = Vector3.Distance(transform.position,target.transform.position);
		if ( distance > 1 && distance < 7) {
			transform.position = Vector3.MoveTowards(transform.position, target.transform.position, speed * Time.deltaTime);
		}
		else if (distance <= 1) {
			if (attackTimer <= 0) {
				target.takeDamage(10);
				attackTimer = 3;
			}
		}
		else if (distance >= 7 && Vector3.Distance(transform.position,spawnPoint) > 0.01)
			transform.position = Vector3.MoveTowards(transform.position, spawnPoint, speed * Time.deltaTime);
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

function die() {
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}

