public var ice : float = 0;				//Amount of time that attacks have "ice" buff
public var poison : float = 0;			//Amount of time that attacks have "poison" buff
public var fork : float = 0;			//Amount of time that attacks have "fork" buff
public var reflect : float = 0;			//Amount of time that attacks have "reflect" buff
public var pierce : float = 0;			//Amount of time that attacks have "pierce" buff
public var giant : float = 0;			//Amount of time that attacks have "giant" buff
public var splash : float = 0;			//Amount of time that attacks have "splash" buff
public var leech : float = 0;			//Amount of time that attacks have "leech" buff
public var sword : float = 0;			//Amount of time that attacks have "sword" buff
public var blind : float = 0;			//Amount of time that attacks have "blind" buff
public var meteor : float = 0;			//Amount of time that attacks have "meteor" buff
public var rapid : float = 0;			//Amount of time that attacks have "rapid" buff
public var homing : float = 0;			//Amount of time that attacks have "homing" buff

private var cooldown : float = 0;		//Cannot attack if it is above 0

public var enemy : GameObject;


var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

function init() {
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
}
function shot (enemy : GameObject){
	if(fork>0){
		spawnShot(enemy, Vector3(0,0,30));
		spawnShot(enemy, Vector3(0,0,-30));
	}
	
	else{
		spawnShot(enemy, Vector3(0,0,0));
	}
}

function spawnShot(enemy : GameObject, rotate : Vector3){
	var projectile = new GameObject();											//create a projectile
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
	projectile.transform.Translate(enemy.transform.up);
	projectile.transform.eulerAngles = enemy.transform.eulerAngles - rotate;			//set the projectile's angle to the enemy's
	enemySpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, sword, blind, meteor, rapid, homing, exampleMesh, enemy);	//initialize the enemySpellScript
	enemySpellScript.name = "Enemy Shot";
	projectile.SetActive(true);
}


























