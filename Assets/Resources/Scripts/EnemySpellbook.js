public var ice : float = 0;				//Amount of time that attacks have "ice" buff
public var poison : float = 0;			//Amount of time that attacks have "poison" buff
public var fork : float = 0;			//Amount of time that attacks have "fork" buff
public var reflect : float = 0;			//Amount of time that attacks have "reflect" buff
public var pierce : float = 0;			//Amount of time that attacks have "pierce" buff
public var giant : float = 0;			//Amount of time that attacks have "giant" buff
public var splash : float = 0;			//Amount of time that attacks have "splash" buff
public var leech : float = 0;			//Amount of time that attacks have "leech" buff
public var blind : float = 0;			//Amount of time that attacks have "blind" buff
public var meteor : float = 0;			//Amount of time that attacks have "meteor" buff
public var rapid : float = 0;			//Amount of time that attacks have "rapid" buff
public var homing : float = 0;			//Amount of time that attacks have "homing" buff

private var cooldown : float = 0;		//Cannot attack if it is above 0

public var enemy : GameObject;


var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

private var classType : String;		//The class of the enemy (circle, square, triangle)

var audioS : AudioSource;


//Circle global variables
private var fist : GameObject;
private var fistParent : GameObject;	//The child of the enemy that will move the fist.
private var rotationSpeed = 0.1;
public var swinging = false;




function init(classType : String) {
	audioS = this.GetComponent(AudioSource);
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	this.classType = classType;
	if(classType == "warrior"){
		//First we create and empty object that is parented by the enemy
		var fistParent = new GameObject();
		fistParent.name = "Fist Parent";
		fistParent.transform.parent = gameObject.transform.GetChild(0).transform;
		this.fistParent = fistParent;
		var x : float = this.transform.position.x;								//record the enemys x position
		var y : float = this.transform.position.y;								//record the enemys y position
		fistParent.transform.position = Vector3(x,y,-1);							//move the fist to the enemy's position
		fistParent.transform.localRotation = Quaternion.identity;
		
		
	
		var fist = new GameObject();											//create a fist
		this.fist = fist;
		fist.name = "Enemy Fist";
		fist.SetActive(false); 												//Turn off the object so its script doesn't do anything until we're ready.
		var boxCollider2D = fist.AddComponent(BoxCollider2D);					//Add a box collider
		boxCollider2D.isTrigger = true;
		var rigidModel = fist.AddComponent(Rigidbody2D); 						//Add a rigid body for collisions
		rigidModel.gravityScale = 0; 												//Turn off gravity
		
		var enemySpellScript : EnemySpell = fist.AddComponent(EnemySpell);	//add the enemySpell script
		fist.transform.parent = fistParent.transform;							//Parent fistParent to fist
		fist.transform.localPosition = Vector3(1, 0, 0);							//move the fist to the enemy's position
		fist.transform.localScale = Vector3(0.35, 0.35, 1);
		enemySpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, gameObject, gameObject.GetComponent(EnemyMove).getDamage());	//initialize the enemySpellScript
		enemySpellScript.name = "Enemy Fist";
		fist.SetActive(true);
	}
}
	
	
function Update(){
	if(classType=="warrior"){
		fistParent.transform.localPosition = Vector3(0,0,-1);
		fist.transform.localPosition = Vector3(0.75,0,0);
	}
}
//Circle specific stuff


function FixedUpdate(){
	if(swinging){
		if(rapid>0){
			fistParent.transform.rotation *= Quaternion.Euler(0,0,6.0);
		}
		else{
			fistParent.transform.rotation *= Quaternion.Euler(0,0,4.5);
		}
		if(fistParent.transform.rotation == this.transform.rotation * Quaternion.Euler(0,0,180)){
			fistParent.transform.rotation = this.transform.rotation;
			swinging = false;
			fist.GetComponent(EnemySpell).punchOff();
		}
	}
}

function swing(){
	//audioS.PlayOneShot(Resources.Load("Sounds/fistattack"));					
	swinging = true;							//Punch that mother fucker
	fist.GetComponent(EnemySpell).punchOn();
	fist.GetComponent(EnemySpell).updateBuffs(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing);
	cooldown+=1;								//increment cooldown
	if(rapid>0){
		cooldown-=0.5;
	}
}
	
	
	
	
//Triangle specific stuff

function shot (enemy : GameObject){
	//audioS.PlayOneShot(Resources.Load("Sounds/arrowattack"));
	if(fork>0){
		spawnShot(enemy, Vector3(0,0,30));
		spawnShot(enemy, Vector3(0,0,-30));
	}
	
	else{
		spawnShot(enemy, Vector3(0,0,0));
	}
}

// Square specific stuff

function comet (enemy : GameObject, target : GameObject, damage : float) {
    //audioS.PlayOneShot(Resources.Load("Sounds/mageattack"));
    var location : Vector2 = target.transform.position;
	spawnComet(enemy,location,damage);
	// FORK does nothing for mages, yet. find a way to not make OP.

}



function spawnShot(enemy : GameObject, rotate : Vector3){
	var projectile = new GameObject();											//create a projectile
	projectile.name = "Enemy Shot";
	//var meshFilter = projectile.AddComponent(MeshFilter); 						//Add a mesh filter for textures
	//meshFilter.mesh = exampleMesh; 												//Give the mesh filter a quadmesh
	//projectile.AddComponent(MeshRenderer); 										//Add a renderer for textures
	projectile.SetActive(false); 												//Turn off the object so its script doesn't do anything until we're ready.
	var boxCollider2D = projectile.AddComponent(BoxCollider2D);					//Add a box collider
	boxCollider2D.isTrigger = true;
	var rigidModel = projectile.AddComponent(Rigidbody2D); 						//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 												//Turn off gravity
	rigidModel.fixedAngle = true; 												//Set fixed angle to true
	rigidModel.isKinematic = true;
	
	var tempScript : Temporary = projectile.AddComponent(Temporary);			//make the projectile temporary (add script)
	tempScript.life = 5;														//set it's life to 5 seconds
	var enemySpellScript : EnemySpell = projectile.AddComponent(EnemySpell);	//add the enemySpell script
	var x : float = enemy.transform.position.x;								//record the enemy's x position
	var y : float = enemy.transform.position.y;								//record the enemy's y position
	projectile.transform.position = Vector3(x,y,-1);							//move the projectile to the enemy's position
	projectile.transform.Translate(enemy.transform.up* 0.5);
	projectile.transform.eulerAngles = enemy.transform.eulerAngles - rotate;			//set the projectile's angle to the enemy's
	enemySpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, enemy, gameObject.GetComponent(EnemyMove).getDamage());	//initialize the enemySpellScript
	enemySpellScript.name = "Enemy Shot";
	projectile.SetActive(true);
}

function spawnComet(enemy : GameObject,location : Vector2, damage : float) {
	var comet = new GameObject();
	comet.name = "Enemy Comet";
	
	comet.SetActive(false);
	comet.transform.position = location;
	comet.transform.position.z = -1;
	
	
	var enemySpellScript : EnemySpell = comet.AddComponent(EnemySpell);
	enemySpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, enemy, damage);	//initialize the enemySpellScript
	
	comet.SetActive(true);
}




























