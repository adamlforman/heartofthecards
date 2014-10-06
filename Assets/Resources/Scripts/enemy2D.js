#pragma strict

public var owner : GameObject;
var model : charModel2D;
var manager : AdamGameManager;
var health : int;

var immune : boolean;
var immuneTimer : float;

var slow : boolean;
var slowTimer : float;

var snare : boolean;
var snareTimer : float;

var attackTimer : float;

public var turnSmoothing : float = 4f;     // A smoothing value for turning the player.
public var baseSpeed : float = 1.4f;    // The damping for the speed parameter
public var speed : float;

function init(manager : AdamGameManager, owner : GameObject, nameIn : String, texture : String) {
	Debug.Log("Begin Character init: "+nameIn);
	this.manager = manager;
	this.owner = owner;
	owner.name = nameIn;
	
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Quad);
	modelObject.name = owner.name + " Model";
	
	model = modelObject.AddComponent(charModel2D);
	model.transform.parent = owner.transform;
	model.init(owner,texture);
	
	health = 20;
	immune = false;
	immuneTimer = 0;
	
	
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
	
	if (manager.player) {
		if (Vector3.Distance(transform.position,manager.player.transform.position) > 1) {
			transform.position = Vector3.MoveTowards(transform.position, manager.player.transform.position, speed * Time.deltaTime);
		}
		else {
			if (attackTimer <= 0) {
				manager.player.takeDamage(10);
				attackTimer = 3;
			}
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
	manager.score += 1;
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}

