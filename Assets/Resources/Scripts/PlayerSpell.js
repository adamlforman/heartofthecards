var damage : float = 10;
var movespeed : int = 10;
var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites

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


function init(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, sword : float, blind : float, meteor : float, rapid : float, homing : float, exampleMesh : Mesh) {
	this.exampleMesh = exampleMesh;
	
	var modelObject = new GameObject();									// Create a quad object for holding the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	modelObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent(SpellModel);				// Add a spellModel script to control visuals of the spell.
	model.name = "Shot Model";									//Name the PlayerModel
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
	
	if(reflect > 0){
		this.reflect=true;			//Set "reflect" boolean to true
	}
	
	if(pierce > 0){
		this.pierce=true;			//Set "pierce" boolean to true
	}
	//Check
	if(giant > 0){
		this.giant=true;			//Set "giant" boolean to true
		gameObject.transform.localScale = Vector3(2,2,0);
	}
	
	if(splash > 0){
		this.splash=true;			//Set "splash" boolean to true
	}
	//check
	if(leech > 0){
		this.leech=true;			//Set "leech" boolean to true
	}
	
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
	
	if(meteor > 0){
		this.meteor=true;			//Set "meteor" boolean to true
	}
	
}



function Update() {
	transform.Translate(Vector2.up * movespeed * Time.deltaTime);
}

/*function OnTriggerEnter(other : Collider){
	print("WE HAVE ENTERED");
	if(other.gameObject.name == "ROCK"){
		Destroy(gameObject);
	}
	if(other.gameObject.CompareTag("Enemy")) {
		if(ice){
			other.ice = 5;
		}
		if(poison){
			other.poison = 5;
		}
		if(blind){
			other.blind = 5;
		}
		if(leech){
			//heal the player (who currently has no HP stat
		}
	}
}*/



