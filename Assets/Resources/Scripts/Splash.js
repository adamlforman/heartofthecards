#pragma strict
public var owner : GameObject;

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
public var player : GameObject;

function init(ice : boolean, poison : boolean, fork : boolean, reflect : boolean, pierce : boolean, giant : boolean, splash : boolean, leech : boolean, sword : boolean, blind : boolean, meteor : boolean, rapid : boolean, homing : boolean, exampleMesh : Mesh, owner : GameObject, player : GameObject){
	//transform.parent = owner.transform;
	this.owner = owner;
	this.player = player;
	
	var modelObject = new GameObject();									// Create a quad object for holding the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	modelObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	var model = modelObject.AddComponent(SpellModel);				// Add a spellModel script to control visuals of the spell.
	model.name = "Explosion Model";									//Name the PlayerModel
	model.init(this.gameObject);								// Initialize the spellModel.
	
	
	modelObject.SetActive(true);								// Turn on the object (the Update function will start being called).

	
	//check
	this.ice=ice;				//Set "ice" boolean to true
	
	//check
	this.poison=poison;			//Set "poison" boolean to true
	
	//check
	this.fork=fork;				//Set "fork" boolean to true

	//This is hard
	this.reflect=reflect;			//Set "reflect" boolean to true
	
	//check
	this.pierce=pierce;			//Set "pierce" boolean to true
	
	//Check
	this.giant=giant;			//Set "giant" boolean to true
	
	//check
	this.splash=splash;			//Set "splash" boolean to true
	
	//check
	this.leech=leech;			//Set "leech" boolean to true
	
	//This is hard
	this.sword=sword;			//Set "sword" boolean to true
	
	//check
	this.blind=blind;			//Set "blind" boolean to true
	
	//check
	this.rapid=rapid;			//Set "rapid" boolean to true
	
	
	this.homing=homing;			//Set "homing" boolean to true
	
	//This is hard
	this.meteor=meteor;			//Set "meteor" boolean to true
	
	
}

function Start () {

}

function Update () {

}

function hit(target : GameObject){
	target.GetComponent(EnemyStatus).takeDamage(10, false);
	if(ice){
		target.GetComponent(EnemyStatus).iceTimer = 5;							//Apply ice if arrow is iced
	}
	if(poison){
		target.GetComponent(EnemyStatus).poisonTimer = 5;						//Apply poison
	}
	if(blind){
		target.GetComponent(EnemyStatus).blindTimer = 5;						//Apply blind
	}
	if(leech){
		player.GetComponent(PlayerStatus).addHealth(5);
	}
}