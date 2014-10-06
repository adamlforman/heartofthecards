#pragma strict

public var owner : GameObject;
var model : charModel2D;
var manager : GameObject;
var spellbook : spellbook;

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

public var immune : boolean;
public var immuneTimer : float;

public var armor : float;
public var armorTimer : float;

function init(manager : GameObject, owner : GameObject, nameIn : String, texture : String, x : float, y : float) {
	//Debug.Log("Begin Character init: "+nameIn);
	this.manager = manager;
	if (manager.GetComponent("spellbook"))
		this.spellbook = manager.GetComponent("spellbook");
	this.owner = owner;
	owner.name = nameIn;
	
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Quad);
	modelObject.name = owner.name + " Model";
	
	model = modelObject.AddComponent(charModel2D);
	model.transform.parent = owner.transform;
	model.transform.position.z -= 2;
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
		
	immuneTimer -= Time.deltaTime;
	if (immuneTimer <= 0 && immune)
		immune = false;
	
	armorTimer -= Time.deltaTime;
	if (armorTimer <= 0 && armor != 0)
		armor = 0;
		
	if (armor)
			model.renderer.material.color = Color(0.6, 0.5, 0.4);
	else
		model.renderer.material.color = Color(1,1,1);
		
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
	var spells : String[] = ["FIRE","ICE","DART","ARMOR", "WEB", "DEMACIA"];
	var newSpell : String = spells[5];					//TEST SPELL LINE
//	var newSpell : String = spells[Random.Range(0,spells.length)];
	
	return newSpell;
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
    var h : float = Input.GetAxis("Horizontal");
    var v : float = Input.GetAxis("Vertical");
    var lh : float = Input.GetAxis("LookHorizontal");
    var lv : float = Input.GetAxis("LookVertical");
    
    var cast1 : float = Input.GetAxis("Fire1");
    var cast2 : float = Input.GetAxis("Fire2");
    var cast3 : float = Input.GetAxis("Fire3");
    
    MovementManagement(h, v, lh, lv);
    
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


function MovementManagement (horizontal : float, vertical : float, lh : float, lv : float) {

    
    // If there is some axis input...
    if (lh != 0f || lv != 0f) {
    	Facing (lh, lv);
    }
    if(horizontal != 0f || vertical != 0f)
    {
        Move(vertical, horizontal);
    }
}

function Facing (horizontal : float, vertical : float) {
	
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

function Move(vertical : float, strafe : float) {
	var moveVector : Vector2 = vectorFromAngle(getFacing());
	transform.Translate(speed * strafe * Time.deltaTime, speed * vertical * Time.deltaTime,0,Space.World);
}

function getFacing() {
	return transform.eulerAngles.z;
}

function vectorFromAngle(angle : float) {
		var angleRadians : float = (angle/360)*2*3.14159;
		//Debug.Log(angle);
		return Vector2(Mathf.Cos(angleRadians),Mathf.Sin(angleRadians));
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

function castSpell(spell : String) {
	if (spell != "Cooldown") {
		if (spell == "FIRE")
			spellbook.fireblast(transform.position.x, transform.position.y, transform.eulerAngles);
		if (spell == "ICE")
			spellbook.iceBreath(transform.position.x, transform.position.y, transform.eulerAngles);
		if (spell == "WEB")
			spellbook.webTrap(transform.position.x, transform.position.y, transform.eulerAngles);
		if (spell == "ARMOR") {
			spellbook.armor(this);
			armor = 0.9;
			armorTimer = 5;
		}
		if(spell == "DART"){
			spellbook.dart(transform.position.x, transform.position.y, transform.eulerAngles);
		}
		if(spell == "DEMACIA"){
			spellbook.arcaneCataclysm(transform.position.x, transform.position.y, transform.eulerAngles);
		}
	}
}


function OnGUI() {
	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	
	GUI.Button(Rect(65,130,100,100),Resources.Load("Textures/"+spell1));
	GUI.Button(Rect(120,10,100,100),Resources.Load("Textures/"+spell2));
	GUI.Button(Rect(10,10,100,100),Resources.Load("Textures/"+spell3));
	GUI.Button(Rect(230,10,150,50),health+"hp",customButton);
}

function processStatusEffects() {
	speed = baseSpeed;
}

function takeDamage(damage : float) {
	damage = damage - damage*armor;
	if (!immune) {
		health -= damage;
		immune = true;
		immuneTimer = 0.5;
	}
}

function die() {
	GameObject.Destroy(model.gameObject);
	GameObject.Destroy(gameObject);
}