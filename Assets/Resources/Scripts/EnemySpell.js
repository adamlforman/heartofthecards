var damage : int;	 // How much damage does the spell do (WILL BE OBSOLETE)
var movespeed : float;	// How fast is the spell (WILL BE OBSOLETE)
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
public var condemn : boolean = false;			//Does the shot have the "homing" buff

//Circle Specific Things.
public var readyToPunch : boolean;

// Square specific things
public var delayTimer : float;

var audioS : AudioSource;

function init(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, blind : float, meteor : float, rapid : float, homing : float, condemn : boolean, exampleMesh : Mesh, enemy : GameObject, damage : int) {
	audioS = gameObject.AddComponent(AudioSource);
	this.exampleMesh = exampleMesh;					// Bitches love meshes
	this.damage = damage;
	var modelObject = new GameObject();									// Create a quad object for holding the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	modelObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	model = modelObject.AddComponent(SpellModel);				// Add a spellModel script to control visuals of the spell.
	
	if(this.name == "Enemy Shot"){									//Let's do arrow specific things
		model.name = "Enemy Shot Model";								//Name the Model
		transform.localScale = Vector3(0.3, 0.3, 1);
		readyToPunch = true;
		movespeed = 10;
	}
	else if(this.name == "Enemy Fist"){
		model.name = "Enemy Fist Model";
	}
	else if (this.name == "Enemy Comet") {
		delayTimer = 1;
		readyToPunch = true;
		model.name = "Enemy Comet Model";
		transform.localPosition.z = -2;
	}
	else if (this.name == "Enemy Lava") {
		readyToPunch = true;
		model.name = "Enemy Lava Model";
	}
	else if (this.name == "Enemy Magma") {
		readyToPunch = true;
		model.name = "Enemy Magma Model";
	}
	else if (this.name == "Enemy Web Shot") {
		model.name = "Enemy Web Shot Model";
		readyToPunch = true;
		movespeed = 5;
	}
	this.enemy = enemy;
	
	
	
	
	model.init(this.gameObject);								// Initialize the spellModel.
	
	
	modelObject.SetActive(true);								// Turn on the object (the Update function will start being called).
	
	
	
	
	
	if (condemn) {
		this.condemn = true;
	}
	
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
		if(gameObject.name == "Enemy Shot"){
			gameObject.transform.localScale = Vector3(0.6,0.6,1);
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
	
}



function FixedUpdate() {
	if(name == "Enemy Shot"  || name == "Enemy Web Shot" || name == "My shot now bitch"){
		transform.Translate(Vector2.up * movespeed * Time.deltaTime);
	}
	if(name == "Enemy Comet") {
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
	if (name == "Enemy Lava") {
		movespeed = (gameObject.GetComponent(Temporary).life - 17)*0.5;
		if (movespeed < 0) {
			movespeed = 0;
		}
		var target : Vector2 = GameObject.Find("Player").transform.position;
		transform.Translate((target - transform.position)*movespeed*Time.deltaTime);
	}
	
}

function hit(other : GameObject){		// how to hit something
	//print("WE HAVE ENTERED");
	if(readyToPunch){
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
			if(name == "Enemy Shot"){
				Destroy(gameObject);  //Destroy the arrow
			}
		}
		//Now if there was no splash
		else{
			if(other.name == "ROCK"){
				if(name == "Enemy Shot"){
					Destroy(gameObject);		//destroy the arrow if it hits a rock
				}
			}
			if(other.name == "Player"){
				
				if (name == "Enemy Fist") {
					applyStatus(other);				//apply status debuffs to the enemy we hit
					if(other.GetComponent(PlayerStatus).getBlock()){
						audioS.PlayOneShot(Resources.Load("Sounds/blocked"));
					}
					else{
						audioS.PlayOneShot(Resources.Load("Sounds/fisthit"));
						audioS.PlayOneShot(Resources.Load("Sounds/ow"));
					}
				}
				if(!pierce){
					if(name == "Enemy Shot"){
						if(other.GetComponent(PlayerStatus).getBlock()){
							audioS.PlayOneShot(Resources.Load("Sounds/blocked"));
							transform.Rotate(0,0,180);
							name = "My shot now bitch";
						}
						else{
							applyStatus(other);				//apply status debuffs to the enemy we hit
							Destroy(gameObject); 		
						}
					}
				}
			}
			if(other.name == "Enemy Warrior" || other.name == "Enemy Archer" || other.name == "Enemy Mage"){
				if(name == "My shot now bitch"){
					other.GetComponent(EnemyStatus).takeDamage(damage, false);
					Destroy(gameObject);
				}
			}
		}
	}
}

//All of the basic attack status buffs
function applyStatus(target : GameObject){
	target.GetComponent(PlayerStatus).takeDamage(damage, false);
	if(ice){
		target.GetComponent(PlayerMove).tar = 3;							//Apply ice if arrow is iced
	}
	if(poison){
		target.GetComponent(PlayerStatus).poisonCounter = 5;						//Apply poison
	}
	if(blind){
		target.GetComponent(PlayerStatus).blind = 5;						//Apply blind
	}
	if(leech){
		if (enemy.GetComponent(EnemyStatus)) {
			enemy.GetComponent(EnemyStatus).addHealth(5);
		}
		else {
			enemy.GetComponent(BossStatus).addHealth(5);
		}
	}
	if(condemn){
		//target.transform.Translate(enemy.transform.rotation * Vector2(0,1), Space.World);
		//target.rigidbody2D.AddForce(enemy.transform.rotation*Vector2(0,1)*10);
		if(!(target.GetComponent(PlayerStatus).getBlock())){
			target.GetComponent(PlayerMove).knockback(2,transform.position);
		}
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
}



