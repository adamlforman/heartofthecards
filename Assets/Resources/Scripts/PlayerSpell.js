var damage : float = 10;
var movespeed : int = 10;
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
var player : GameObject;	//The player

public var ice : boolean = false;				//Does the shot have the "ice" buff
public var poison : boolean = false;			//Does the shot have the "poison" buff
public var fork : boolean = false;				//Does the shot have the "fork" buff
public var reflect : boolean = false;			//Does the shot have the "reflect" buff
public var pierce : boolean = false;			//Does the shot have the "pierce" buff
public var giant : boolean = false;				//Does the shot have the "giant" buff
public var splash : boolean = false;			//Does the shot have the "splash" buff
public var leech : boolean = false;				//Does the shot have the "leech" buff
public var sword : boolean = false;				//Does the shot have the "sword" buff
public var blind : boolean = false;				//Does the shot have the "blind" buff
public var meteor : boolean = false;			//Does the shot have the "meteor" buff
public var rapid : boolean = false;				//Does the shot have the "rapid" buff
public var homing : boolean = false;			//Does the shot have the "homing" buff

//Circle Specific Things.
public var readyToPunch : boolean;

// Square specific things
public var delayTimer : float;



function init(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, blind : float, meteor : float, rapid : float, homing : float, exampleMesh : Mesh, player : GameObject) {
	this.exampleMesh = exampleMesh;
	readyToPunch = false;
	
	this.player = player;
	
	var modelObject = new GameObject();							// Create a quad object for holding the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	modelObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent(SpellModel);				// Add a spellModel script to control visuals of the spell.
	if(this.name == "Shot"){									//Let's do arrow specific things
		model.name = "Shot Model";								//Name the Model
		transform.localScale = Vector3(0.3, 1, 1);
		readyToPunch = true;
	}
	else if (this.name == "Comet") {
		delayTimer = 1;
		readyToPunch = true;
		model.name = "Enemy Comet Model";
	}
	model.init(this.gameObject);								// Initialize the spellModel.
	
	
	modelObject.SetActive(true);								// Turn on the object (the Update function will start being called).
		
	//check
	if(ice > 0){
		this.ice=true;				//Set "ice" boolean to true
	}
	//check
	if(poison > 0){
		this.poison=true;			//Set "poison" boolean to true
	}
	//check
	if(fork > 0){
		this.fork=true;				//Set "fork" boolean to true
	}
	//This is hard
	if(reflect > 0){
		this.reflect=true;			//Set "reflect" boolean to true
	}
	//check
	if(pierce > 0){
		this.pierce=true;			//Set "pierce" boolean to true
	}
	//Check
	if(giant > 0){
		this.giant=true;			//Set "giant" boolean to true
		if(gameObject.name == "Shot"){
			gameObject.transform.localScale = Vector3(0.6,2,1);
		}
	}
	//check
	if(splash > 0){
		this.splash=true;			//Set "splash" boolean to true
	}
	//check
	if(leech > 0){
		this.leech=true;			//Set "leech" boolean to true
	}
	//check
	if(blind > 0){
		this.blind=true;			//Set "blind" boolean to true
	}
	//check
	if(rapid > 0){
		this.rapid=true;			//Set "rapid" boolean to true
	}
	
	if(homing > 0){
		this.homing=true;			//Set "homing" boolean to true
	}
	//This is hard
	if(meteor > 0){
		this.meteor=true;			//Set "meteor" boolean to true
	}
	
	
	visualEffects();
}



function Update() {
	if(name == "Shot"){
		transform.Translate(Vector2.up * movespeed * Time.deltaTime);
	}
	if(name == "Comet") {
		delayTimer -= Time.deltaTime;
		if (delayTimer <= 0) {
			var size : float = 0.5;
			if (giant) {
				size = size*1.5;
			}
			for (other in Physics2D.OverlapCircleAll(transform.position, size)) {
				hit (other.gameObject);
			}
			Destroy(gameObject);
		}
	}
	
}

function hit(other : GameObject){
	if(readyToPunch){
		//print("WE HAVE ENTERED");
		var sphereSize : float;	//The size of the sphere if we splash
		if(giant){				//If giant, then make the splash size twice as big
			sphereSize = 2;
		}
		else{
			sphereSize = 1;		//Normal splash size
		}
		if(splash){				//If splash is on
			//print("WE SPLASHED");
			splashSpawn(transform.position.x,transform.position.y, sphereSize); //Spawn the explosion
			if(name == "Shot"){
				Destroy(gameObject);  //Destroy the arrow
			}
		}
		//Now if there was no splash
		else{
			if(other.name == "ROCK"){
				if(name == "Shot"){
					Destroy(gameObject);		//destroy the arrow if it hits a rock
				}
			}
			if(other.name == "Enemy Warrior" || other.name == "Enemy Archer" || other.name == "Enemy Mage"){
				applyStatus(other);					//apply status debuffs to the enemy we hit
				if(!pierce){
					if(name == "Shot"){
						Destroy(gameObject);
					}
				}
			}
		}
	}
}

//All of the basic attack status buffs
function applyStatus(target : GameObject){
	target.GetComponent(EnemyStatus).takeDamage(10, false);
	if(ice){
		target.GetComponent(EnemyMove).iceTimer = 5;							//Apply ice if arrow is iced
	}
	if(poison){
		target.GetComponent(EnemyStatus).poisonCounter = 5;						//Apply poison
	}
	if(blind){
		target.GetComponent(EnemyMove).blindTimer = 5;						//Apply blind
	}
	if(leech){
		player.GetComponent(PlayerStatus).addHealth(5);
	}
}

function splashSpawn(x :float, y:float, size:int){
	var explosion = new GameObject();											//create the explosion
	//var meshFilter = explosion.AddComponent(MeshFilter); 						//Add a mesh filter for textures
	//meshFilter.mesh = exampleMesh; 												//Give the mesh filter a quadmesh
	//explosion.AddComponent(MeshRenderer); 										//Add a renderer for textures
	explosion.SetActive(false); 												//Turn off the object so its script doesn't do anything until we're ready.
	var boxCollider2D = explosion.AddComponent(BoxCollider2D);					//Add a box collider
	boxCollider2D.isTrigger = true;
	var rigidModel = explosion.AddComponent(Rigidbody2D); 						//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 												//Turn off gravity
	rigidModel.fixedAngle = true; 												//Set fixed angle to true
	rigidModel.isKinematic = true;
	explosion.transform.localScale = Vector3(size*1.5,size*1.5,1);					//set the size
	var tempScript : Temporary = explosion.AddComponent(Temporary);			//make the explosion temporary (add script)
	tempScript.life = 1;														//set it's life to 5 seconds
	var splashScript : Splash = explosion.AddComponent(Splash);	//add the playerSpell script
	explosion.transform.position = Vector3(x,y,-1);							//move the explosion to the player's position
	explosion.transform.localPosition = explosion.transform.localPosition + Vector3(0, size/2, 0);
	splashScript.name = "Explosion";
	splashScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, sword, blind, meteor, rapid, homing, exampleMesh, gameObject, player);	//initialize the playerSpellScript
	
	explosion.SetActive(true);
}

//Brace yourselves motherfuckers.  This is going to be ugly.
//We're going to make some particles that represent what buffs are active.
function visualEffects(){
	if(name == "Shot"){
		if(ice){
			attachEffect("Ice Effect");
		}
		if(poison){
			attachEffect("Poison Effect");
		}
		if(pierce){
			attachEffect("Pierce Effect");
		}
		if(splash){
			attachEffect("Splash Effect");
		}
		if(leech){
			attachEffect("Leech Effect");
		}
		if(blind){
			attachEffect("Blind Effect");
		}
	}
}

function attachEffect(name : String){
	var effectObject = new GameObject();							// Create a quad object for holding the tile texture.
	var meshFilter0 = effectObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter0.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	effectObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	effectObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = effectObject.AddComponent(EffectModel);				// Add a spellModel script to control visuals of the spell.
	model.name = name + " Effect";									//Name the PlayerModel
	model.init(this.gameObject, name);								// Initialize the spellModel.
	effectObject.SetActive(true);								// Turn on the object (the Update function will start being called).
}

function punchOn(){
	readyToPunch = true;
}

function punchOff(){
	readyToPunch = false;
}

function updateBuffs(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, blind : float, meteor : float, rapid : float, homing : float){
	//check
	if(ice > 0){
		this.ice=true;				//Set "ice" boolean to true
	}
	else{
		this.ice = false;
	}
	//check
	if(poison > 0){
		this.poison=true;			//Set "poison" boolean to true
	}
	else{
		this.ice = false;
	}
	//check
	if(fork > 0){
		this.fork=true;				//Set "fork" boolean to true
	}
	else{
		this.fork = false;
	}
	//This is hard
	if(reflect > 0){
		this.reflect=true;			//Set "reflect" boolean to true
	}
	else{
		this.reflect = false;
	}
	//check
	if(pierce > 0){
		this.pierce=true;			//Set "pierce" boolean to true
	}
	else{
		this.pierce = false;
	}
	//Check
	if(giant > 0){
		this.giant=true;			//Set "giant" boolean to true
	}
	else{
		this.giant = false;
	}
	//check
	if(splash > 0){
		this.splash=true;			//Set "splash" boolean to true
	}
	else{
		this.splash = false;
	}
	//check
	if(leech > 0){
		this.leech=true;			//Set "leech" boolean to true
	}
	else{
		this.leech = false;
	}
	//check
	if(blind > 0){
		this.blind=true;			//Set "blind" boolean to true
	}
	else{
		this.blind = false;
	}
	//check
	if(rapid > 0){
		this.rapid=true;			//Set "rapid" boolean to true
	}
	else{
		this.rapid = false;
	}
	if(homing > 0){
		this.homing=true;			//Set "homing" boolean to true
	}
	else{
		this.homing = false;
	}
	//This is hard
	if(meteor > 0){
		this.meteor=true;			//Set "meteor" boolean to true
	}
	else{
		this.meteor = false;
	}
	
	visualEffects();
}














