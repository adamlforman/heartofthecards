var damage : float = 7;	 // How much damage does the spell do (WILL BE OBSOLETE)
var movespeed : int = 4;	// How fast is the spell (WILL BE OBSOLETE)
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
var enemy : GameObject;	//The enemy

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


function init(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, sword : float, blind : float, meteor : float, rapid : float, homing : float, exampleMesh : Mesh, enemy : GameObject) {
	this.exampleMesh = exampleMesh;					// Bitches love meshes
	
	transform.localScale = Vector3(0.3, 1, 1);		// Hey look it's arrow-shaped
	this.enemy = enemy;
	
	var modelObject = new GameObject();									// Create a quad object for holding the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	modelObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent(SpellModel);				// Add a spellModel script to control visuals of the spell.
	model.name = "Enemy Shot Model";									//Name the model
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
		gameObject.transform.localScale = Vector3(0.6,2,0);
	}
	//check
	if(splash > 0){
		this.splash=true;			//Set "splash" boolean to true
	}
	//check
	if(leech > 0){
		this.leech=true;			//Set "leech" boolean to true
	}
	//This is hard
	if(sword > 0){
		this.sword=true;			//Set "sword" boolean to true
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
	
}



function Update() {
	transform.Translate(Vector2.up * movespeed * Time.deltaTime);	// Move forward by speed * time
}

function hit(other : GameObject){		// how to hit something
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
		Destroy(gameObject);  //Destroy the arrow
	}
	//Now if there was no splash
	else{
		if(other.name == "ROCK"){
			Destroy(gameObject);		//destroy the arrow if it hits a rock
		}
		if(other.name == "Player"){
			other.GetComponent(PlayerStatus).takeDamage(7,false);
			applyStatus(other);					//apply status debuffs to the enemy we hit
			if(!pierce){
				Destroy(gameObject); 		// DANGER WILL ROBINSON THIS WILL MAKE PIERCING ARROWS ONE-SHOT EVERYTHING I MEAN EVERYTHING
			}
		}
	}
	
}

//All of the basic attack status buffs
function applyStatus(target : GameObject){
	if(ice){
		target.GetComponent(PlayerStatus).ice = 5;							//Apply ice if arrow is iced
	}
	if(poison){
		target.GetComponent(PlayerStatus).poison = 5;						//Apply poison
	}
	if(blind){
		target.GetComponent(PlayerStatus).blind = 5;						//Apply blind
	}
	if(leech){
		enemy.GetComponent(EnemyStatus).addHealth(5);
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
	var splashScript : Splash = explosion.AddComponent(Splash);	//add the enemySpell script
	explosion.transform.position = Vector3(x,y,-1);							//move the explosion to the enemy's position
	explosion.transform.localPosition = explosion.transform.localPosition + Vector3(0, size/2, 0);
	splashScript.name = "Explosion";
	splashScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, sword, blind, meteor, rapid, homing, exampleMesh, gameObject, enemy);	//initialize the script
	
	explosion.SetActive(true);
}



