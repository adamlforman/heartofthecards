#pragma strict

public var owner : GameObject;

var spawnPoint : Vector3;

var spellbook : enemySpellbook;

var model : charModel2D;
var manager : GameObject;
var target : player2D;

var healthBar : healthBar;

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
			attackRange = 4;
			break;
	}
	
	spawnPoint = Vector3(x,y,-1);
	
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Quad);
	modelObject.name = owner.name + " Model";
	//Destroy(modelObject.collider);
	model = modelObject.AddComponent(charModel2D);
	//var rigidModel = modelObject.AddComponent(Rigidbody);
	//rigidModel.useGravity = false;
	model.transform.parent = owner.transform;
	model.transform.position.z -=1;
	model.init(owner,texture);
	
	var healthBarObject = new GameObject();
	healthBarObject.name = owner.name + " Health Bar";
	
	healthBar = healthBarObject.AddComponent("healthBar");
	healthBar.transform.parent = owner.transform;
	healthBar.transform.position.z -= 3;
	healthBar.init(this,transform,health,0);
	
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
		var dir : Vector3;
		
		var movement: Vector3;
		
		if (spawnDistance >= leashRange) {
			//evadeToSpawn = true;
		}
		if (evadeToSpawn) {
			if (spawnDistance <= 0.01) {
				evadeToSpawn = false;
			}
			else {
				dir = Vector3.MoveTowards(transform.position, spawnPoint, 3 * speed * Time.deltaTime);
				transform.position = dir;
				//dir = spawnPoint - transform.position;
				//movement = dir.normalized * speed * Time.deltaTime;
				//if (movement.magnitude > dir.magnitude) movement = dir;
				//GetComponent(CharacterController).Move(movement);
				facing((spawnPoint.x - transform.position.x), (spawnPoint.y - transform.position.y));
				//transform.rotation = Quaternion.LookRotation(dir,Vector3.forward);	
			}
		}
		else {
			if ( playerDistance > attackRange && playerDistance < aggroRange) {
				dir = Vector3.MoveTowards(transform.position, target.transform.position, speed * Time.deltaTime);
				//dir = target.transform.position - transform.position;
				//movement = dir.normalized * speed * Time.deltaTime;
				//if (movement.magnitude > dir.magnitude) movement = dir;
				//GetComponent(CharacterController).Move(movement);
				transform.position = dir;
				facing((target.transform.position.x - transform.position.x),(target.transform.position.y - transform.position.y));
				//transform.rotation = Quaternion.LookRotation(dir,Vector3.forward);
			}
			else if (playerDistance <= attackRange) {
				facing((target.transform.position.x - transform.position.x),(target.transform.position.y - transform.position.y));
				if (attackTimer <= 0) {
					attack();
				}
			}
			else if (playerDistance >= aggroRange && Vector3.Distance(transform.position,spawnPoint) > 0.01) {
				dir = Vector3.MoveTowards(transform.position, spawnPoint, speed * Time.deltaTime);
				//dir = spawnPoint - transform.position;
				//movement = dir.normalized * speed * Time.deltaTime;
				//if (movement.magnitude > dir.magnitude) movement = dir;
				//GetComponent(CharacterController).Move(movement);
				transform.position = dir;
				facing((spawnPoint.x - transform.position.x), (spawnPoint.y - transform.position.y));
				//transform.rotation = Quaternion.LookRotation(dir,Vector3.forward);
			}
		}
	}
	else {
		dir = Vector3.MoveTowards(transform.position, spawnPoint, speed * Time.deltaTime);
		//dir = spawnPoint - transform.position;
		//movement = dir.normalized * speed * Time.deltaTime;
		//if (movement.magnitude > dir.magnitude) movement = dir;
		//GetComponent(CharacterController).Move(movement);
		transform.position = dir;
		facing((spawnPoint.x - transform.position.x), (spawnPoint.y - transform.position.y));
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

function facing (horizontal : float, vertical : float) {
	
	vertical = -vertical;
	   // Create a new vector of the horizontal and vertical inputs.
    var targetDirection : Vector2 = new Vector2(horizontal, vertical);
    
    // TURN
    var newAngle : float = angleFromVector(targetDirection);
    //Debug.Log(horizontal+", " +vertical);
	//Debug.Log(newAngle);
    transform.eulerAngles.z = newAngle;
	
	/* OLD ROTATE FUNCTION
	//Debug.Log("Rotating "+ horizontal + " h, " + vertical + " v.");
	
	//Calculate a new rotation
    var newTurn : float = transform.eulerAngles.z - (horizontal)*turnSmoothing;
    //Debug.Log(newTurn);

    // Change the players rotation to this new rotation.
    transform.eulerAngles.z = (newTurn);
    */
}

function takeDamage(damage : float) {
	damage = damage - damage*armor;
	if (!immune) {
		health -= damage;
		immune = true;
		immuneTimer = 1;
	}
}

function warriorAttack() {
	target.takeDamage(7);
	attackTimer = 3;
}

function archerAttack() {
	spellbook.arrow(transform.position.x, transform.position.y, transform.eulerAngles);
	attackTimer = 3;
}

function angleFromVector(vector : Vector2) {
	var angleRadians : float = Vector2.Angle(vector,Vector2(0,1));
	if (vector.x >= 0)
		angleRadians += 180;
	else
		angleRadians = 180 - angleRadians;
	return angleRadians;
	//return 360*angleRadians/(2*3.14159);
}

function die() {
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}

