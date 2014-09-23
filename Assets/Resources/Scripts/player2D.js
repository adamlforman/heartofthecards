#pragma strict

public var owner : GameObject;
var model : charModel2D;
var manager : AdamGameManager;

public var turnSmoothing : float = 8f;     // A smoothing value for turning the player.
public var baseSpeed : float = 2f;    // The damping for the speed parameter
public var speed : float;

public var spell1 : String;
public var spell2 : String;
public var spell3 : String;

public var spell1Timer : float;
public var spell2Timer : float;
public var spell3Timer : float;

public var cooldown : float;

public var health : float;

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
	
	// HERE BE INITIALIZATIONS BEWARE
	spell1 = drawSpell();
	spell2 = drawSpell();
	spell3 = drawSpell();
	
	cooldown = 5;
	
	spell1Timer = cooldown;
	spell2Timer = cooldown;
	spell3Timer = cooldown;
	
	health = 100;
}

function Update() {
	if (health <= 0)
		die();
	if (spell1 == "Cooldown") {
		spell1Timer -= Time.deltaTime;
		if (spell1Timer <= 0) {
			spell1Timer = cooldown;
			spell1 = drawSpell();
		}
	}
	if (spell2 == "Cooldown") {
		spell2Timer -= Time.deltaTime;
		if (spell2Timer <= 0) {
			spell2Timer = cooldown;
			spell2 = drawSpell();
		}
	}
	if (spell3 == "Cooldown") {
		spell3Timer -= Time.deltaTime;
		if (spell3Timer <= 0) {
			spell3Timer = cooldown;
			spell3 = drawSpell();
		}
	}
}

function drawSpell() {
	var spells : String[] = ["FIRE","ICE","WEB"];
	return spells[Random.value * spells.length];
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
    var h : float = Input.GetAxis("Horizontal");
    var v : float = Input.GetAxis("Vertical");
    var s : float = Input.GetAxis("Strafe");
    
    var cast1 : float = Input.GetAxis("Fire1");
    var cast2 : float = Input.GetAxis("Fire2");
    var cast3 : float = Input.GetAxis("Fire3");
    
    MovementManagement(h, v, s);
    if (cast1 > 0 && spell1 != "Cooldown") {
    	castSpell(spell1);
    	spell1 = "Cooldown";
    	}
    if (cast2 > 0 && spell2 != "Cooldown") {
    	castSpell(spell2);
    	spell2 = "Cooldown";
    	}
    if (cast3 > 0 && spell3 != "Cooldown") {
    	castSpell(spell3);
    	spell3 = "Cooldown";
    	}
}

function castSpell(spell : String) {
	if (spell != "Cooldown") {
		if (spell == "FIRE")
			manager.surround(manager.spawnFire);
		if (spell == "ICE")
			manager.cone(manager.spawnIce);
		if (spell == "WEB")
			manager.surround(manager.spawnWeb);
	}
}


function OnGUI() {
	GUI.Button(Rect(10,10,100,100),Resources.Load("Textures/"+spell1));
	GUI.Button(Rect(10,230,100,100),Resources.Load("Textures/"+spell2));
	GUI.Button(Rect(10,450,100,100),Resources.Load("Textures/"+spell3));
	GUI.Button(Rect(130,10,150,50),"Player Health: "+health);
}

function processStatusEffects() {
	speed = baseSpeed;
}

function MovementManagement (horizontal : float, vertical : float, strafe : float) {

    
    // If there is some axis input...
    if(horizontal != 0f || vertical != 0f || strafe != 0f)
    {
        // ... set the players rotation and set the speed parameter to 5.5f.
        Rotating(horizontal);
        Move(vertical, strafe);
    }
}

function Rotating (horizontal : float) {
	//Debug.Log("Rotating "+ horizontal + " h, " + vertical + " v.");
	
	//Calculate a new rotation
    var newTurn : float = transform.eulerAngles.z - (horizontal)*turnSmoothing;
    //Debug.Log(newTurn);

    // Change the players rotation to this new rotation.
    transform.eulerAngles.z = (newTurn);
}

function Move(vertical : float, strafe : float) {
	var moveVector : Vector2 = vectorFromAngle(getFacing());
	transform.Translate(speed * strafe * Time.deltaTime, speed * vertical * Time.deltaTime,0);
}

function getFacing() {
	return transform.eulerAngles.z;
}

function vectorFromAngle(angle : float) {
		var angleRadians : float = (angle/360)*2*3.14159;
		//Debug.Log(angle);
		return Vector2(Mathf.Cos(angleRadians),Mathf.Sin(angleRadians));
}

function die() {
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}