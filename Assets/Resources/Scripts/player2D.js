
public var owner : GameObject;
var model : charModel2D;
var manager : GameObject;
var spellbook : spellbook;

public var turnSmoothing : float = 8f;     // A smoothing value for turning the player.
public var baseSpeed : float = 5f;    // The damping for the speed parameter
public var speed : float;

public var spell1 : String;
public var spell2 : String;
public var spell3 : String;

public var spell1Timer : float;
public var spell2Timer : float;
public var spell3Timer : float;

public var cooldown : float;
public var GCTimer : float;
public var globalCooldown : float;

public var health : float;

public var immune : boolean;
public var immuneTimer : float;

public var armor : float;
public var armorTimer : float;

static var deck : String[];
static var library : String[];

//Gabriel
private var size : Vector3;
private var center : Vector3;
private var skin : float = .005f;
private var ray : Ray;
private var hit : RaycastHit; 
public var collisionMask : LayerMask;
public var grounded : boolean;
public var movementStopped : boolean;
private var acceleration : float = 30;
private var targetSpeedx : float;
private var targetSpeedy : float;
private var amountToMove : Vector2;
private var currentSpeedx : float;
private var currentSpeedy : float;
//Gabriel

//Made init pass in size and center of the box collider -G
function init(manager : GameObject, owner : GameObject, s : Vector3, c : Vector3, nameIn : String, texture : String, x : float, y : float) {
	//Debug.Log("Begin Character init: "+nameIn);
	this.manager = manager;
	if (manager.GetComponent("spellbook"))
		this.spellbook = manager.GetComponent("spellbook");
	this.owner = owner;
	owner.name = nameIn;
	//Gabriel
	collisionMask = 1 << 8;
	size = s;
	center = c;
	//Gabriel
	var modelObject = new GameObject.CreatePrimitive(PrimitiveType.Cube); //Switched to cube -G
	modelObject.name = owner.name + " Model";
	Destroy(modelObject.collider); //Destroyed collider because not needed -G

	model = modelObject.AddComponent(charModel2D);
	model.transform.parent = owner.transform;
	//model.transform.position.z -= 2;
	model.init(owner,texture);
	
	// HERE BE INITIALIZATIONS BEWARE
	//deck = ["LEAP", "LEAP", "LEAP"];
	deck = ["FIRE","FIRE","FIRE", "ARMOR","ARMOR", "ICE","ICE","DEMACIA","WEB","WEB","DART","DART", "LONGSWORD", "LONGSWORD", "BOW", "Bow", "GAS", "GAS", "LEAP", "LEAP"];
	if (deckBuilderManager.theDeck != null) {
		deck = deckBuilderManager.theDeck;
	}
	library = deck;
	
	
	shuffle(deck);
	
	spell1 = drawSpell();
	spell2 = drawSpell();
	spell3 = drawSpell();
	
	cooldown = 5;
	globalCooldown = 1.1;
	
	spell1Timer = cooldown;
	spell2Timer = cooldown;
	spell3Timer = cooldown;
	
	health = 100;
}

function Update() {
	
	GCTimer -= Time.deltaTime;
		
	if (spell1 == "Cooldown" || spell1 ==  "SLASH" || spell1 ==  "ARROW") {
		spell1Timer -= Time.deltaTime;
		if (spell1Timer <= 0) {
			spell1Timer = cooldown;
			spell1 = drawSpell();
		}
	}
	if (spell2 == "Cooldown" || spell2 ==  "SLASH" || spell2 ==  "ARROW") {
		spell2Timer -= Time.deltaTime;
		if (spell2Timer <= 0) {
			spell2Timer = cooldown;
			spell2 = drawSpell();
		}
	}
	if (spell3 == "Cooldown" || spell3 ==  "SLASH" || spell3 ==  "ARROW") {
		spell3Timer -= Time.deltaTime;
		if (spell3Timer <= 0) {
			spell3Timer = cooldown;
			spell3 = drawSpell();
		}
	}
}

function shuffle(list : String[]){ //v1.0
   	for(var i = list.length - 1; i >= 1; i--) {
    	 var j = Random.Range(0,i);
    	 var temp = list[i];
    	 list[i] = list[j];
    	 list[j] = temp;
   	}
    return list;
}

function drawSpell() {
	var newCard;
	if (deck.length > 1) {
		newCard = deck[deck.length-1];
		deck = pop(deck);
	}
	else {
		newCard = deck[deck.length-1];
		deck = pop(deck);
		
		deck = shuffle(library);
	}
	//Debug.Log(deck.length);
	return newCard;
}

function pop(list : String[]) {
	var newList : String[] = new String[list.length - 1];
	for (var i = 0; i < list.length-1; i++) {
		newList[i] = list[i];
	}
	return newList;
}

function FixedUpdate ()
{
	processStatusEffects();
    // Cache the inputs.
    //var h : float = Input.GetAxis("Horizontal");
    //var v : float = Input.GetAxis("Vertical");
    var lh : float = Input.GetAxis("LookHorizontal");
    var lv : float = Input.GetAxis("LookVertical");
    
    var cast1 : float = Input.GetAxis("Fire1");
    var cast2 : float = Input.GetAxis("Fire2");
    var cast3 : float = Input.GetAxis("Fire3");
    
   // MovementManagement(h, v, lh, lv); No more of this
    
    if (GCTimer <= 0) {
    	if (cast1 > 0 && spell1 != "Cooldown") {
    		GCTimer = globalCooldown;
    		spell1 = castSpell(spell1);
    		}
    	if (cast2 > 0 && spell2 != "Cooldown") {
    		GCTimer = globalCooldown;
    		spell2 = castSpell(spell2);
    		}
    	if (cast3 > 0 && spell3 != "Cooldown") {
    		GCTimer = globalCooldown;
			spell3 = castSpell(spell3);
    		}
    }
    
    targetSpeedx = Input.GetAxisRaw("Horizontal") * speed;
	currentSpeedx = incrementTowards(currentSpeedx, targetSpeedx, acceleration);
	targetSpeedy = Input.GetAxisRaw("Vertical") * speed;
	currentSpeedy = incrementTowards(currentSpeedy, targetSpeedy, acceleration);
	
    if (lh != 0f || lv != 0f) {
    	Facing (lh, lv);
    }
	
	
	
	amountToMove.x = currentSpeedx;
	amountToMove.y = currentSpeedy;
	Move(amountToMove * Time.deltaTime);
}

private function incrementTowards(currentSpeedTemp : float, targetSpeedTemp : float, accelerationTemp : float) {
	if (currentSpeedTemp == targetSpeedTemp) {
		return currentSpeedTemp;
	}
	else {
		var direction : float = Mathf.Sign(targetSpeedTemp - currentSpeedTemp);
		currentSpeedTemp = currentSpeedTemp + accelerationTemp * Time.deltaTime * direction;
		if (direction == Mathf.Sign(targetSpeedTemp - currentSpeedTemp)) {
			return currentSpeedTemp;
		}
		else {
			return targetSpeedTemp;
		}
	}
}
/*function MovementManagement (horizontal : float, vertical : float, lh : float, lv : float) {

    
    // If there is some axis input...
    if (lh != 0f || lv != 0f) {
    	Facing (lh, lv);
    }
    if(horizontal != 0f || vertical != 0f)
    {
        Move(vertical, horizontal);
    }
}*/

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


function Move(amountToMove : Vector2) {
	var deltaY : float = amountToMove.y;
	var deltaX : float = amountToMove.x;
	var position : Vector2 = transform.position;
	for (var i : int = 0; i < 3; i++) {
		var direction : float = Mathf.Sign(deltaY);
		var x : float = (position.x + center.x - size.x/2) + size.x/2 * i;
		var y : float = position.y + center.y + size.y/2 * direction;
		ray = new Ray(new Vector2(x, y),  new Vector2(0, direction));
		//Debug.DrawRay(ray.origin, ray.direction);
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaY) + skin, collisionMask)) {
			var distance : float = Vector3.Distance (ray.origin, hit.point);
			
			if (distance > skin) {
				deltaY = distance * direction - skin * direction;
			}
			else {
				deltaY = 0;
			}
			//movementStopped = true;
			break;
		}
	}
	//OMFG JAVASCRIPT'S SCOPING IS FUCKING STUPID
	for (var j : int = 0; j < 3; j++) {
		var direction2 : float = Mathf.Sign(deltaX);
		var x2 : float = position.x + center.x + size.x/2 * direction2;
		var y2 : float = (position.y + center.y - size.y/2) + size.y/2 * j;
		ray = new Ray(new Vector2(x2, y2),  new Vector2(direction2, 0));
		Debug.DrawRay(ray.origin, ray.direction);
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaX) + skin, collisionMask)) {
			var distance2 : float = Vector3.Distance (ray.origin, hit.point);
			
			if (distance2 > skin) {
				deltaX = distance2 * direction2 - skin * direction2;
			}
			else {
				deltaX = 0;
			}
			//movementStopped = true;
			break;
		}
	}
	//if (movementStopped == false) {
		var finalTransform : Vector2 = Vector2(deltaX, deltaY);
		transform.Translate(finalTransform,Space.World);
	//}
	//movementStopped = false;
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
	var returnValue = "Cooldown";
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
			AudioSource.PlayClipAtPoint(Resources.Load("Sounds/DEMACIA",AudioClip),transform.position);
			spellbook.arcaneCataclysm(transform.position.x, transform.position.y, transform.eulerAngles);
		}
		if (spell == "LONGSWORD"){		// FOR EXAMPLE
			returnValue = "SLASH";

		}
		if (spell == "SLASH"){		// FOR EXAMPLE
			spellbook.slash(transform.position.x, transform.position.y, transform.eulerAngles);
			returnValue = "SLASH";
		}
		if (spell == "BOW")		// FOR EXAMPLE
			returnValue = "ARROW";
		if (spell == "ARROW"){		// FOR EXAMPLE
			spellbook.arrow(transform.position.x, transform.position.y, transform.eulerAngles);
			returnValue = "ARROW";
		}	
		if(spell == "GAS"){
			spellbook.gas(transform.position.x, transform.position.y, transform.eulerAngles);
		}
		if(spell == "LEAP"){
			var deltaY : float = 3;
			var travel : float = deltaY;
			var position : Vector2 = transform.position;
			for (var i : int = 0; i < 3; i++) {
				var direction : float = transform.rotation.eulerAngles.z;
				ray = new Ray(new Vector2(position.x, position.y),  new Vector3(-1*Mathf.Sin(direction*2*3.14159/360), Mathf.Cos(direction*2*3.14159/360),0));
				//Debug.DrawRay(ray.origin, ray.direction,Color.white,3);
				//Debug.Log(direction);
				//Debug.Log(ray.direction);
				if (Physics.Raycast(ray, hit, Mathf.Abs(deltaY) + size.y/2, collisionMask)) {
					var distance : float = Vector3.Distance (ray.origin, hit.point);
					print(distance);
					print(hit.point);
					travel = Mathf.Min(travel,distance - size.y/2);
				}	
			}
		if (travel > 0.2)
			transform.Translate(Vector3(0,travel,0));
		else
			returnValue = "LEAP";
		}
			
			/*
			var increment : float = 0.0;
<<<<<<< HEAD
			while(inRock(increment)){					//Becomes false when not in rock.
=======
			while(inRock(increment)){					//Becomes true when in rock.
>>>>>>> origin/master
				increment = increment + 0.1;
			}
			print(increment);
			transform.Translate(Vector3(0, 3-increment, 0));*/
		}

	return returnValue;
}

//HELP ME
function inRock(increment : float){
	sphereX = (3-increment)*Mathf.Sin(transform.rotation.eulerAngles.z);
	sphereY = (3-increment)*Mathf.Cos(transform.rotation.eulerAngles.z);
	for (var other : Collider in Physics.OverlapSphere(Vector3(transform.position.x + sphereX,transform.position.y + sphereY,0), 0.5)) {
		var wall : terrain;
		if (other.gameObject.GetComponent("terrain"))
			wall = other.gameObject.GetComponent("terrain");
		if (other.gameObject.GetComponent("terrainModel"))
			wall = other.gameObject.GetComponent("terrainModel").owner;
		if (wall)
			if (wall.terrainType == "ROCK") {
				return true;
			}
	}
	return false;
}

function OnGUI() {
	var customButton: GUIStyle = new GUIStyle("button");
	customButton.fontSize = 36;
	
	GUI.Button(Rect(65,130,100,100),Resources.Load("Textures/"+spell1,Texture2D));
	GUI.Button(Rect(120,10,100,100),Resources.Load("Textures/"+spell2,Texture2D));
	GUI.Button(Rect(10,10,100,100),Resources.Load("Textures/"+spell3,Texture2D));
	GUI.Button(Rect(230,10,150,50),health+"hp",customButton);
}

function processStatusEffects() {
	speed = baseSpeed;
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

	AudioSource.PlayClipAtPoint(Resources.Load("Sounds/death",AudioClip),transform.position,50);
	Application.LoadLevel("Level 1");

}