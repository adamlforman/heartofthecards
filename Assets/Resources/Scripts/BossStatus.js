var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
public var curHealth : float;	// remaining health
public var maxHealth : float;
public var armor : float;

public var type : String;

public var poisonTimer : float;		// } Debuff timers
public var poisonCounter : int; 		// }
private var invulnerable : float;

var hyper : boolean;
var raging : boolean;
var armored : boolean;
var juggernaut : boolean;

var healthBar : GameObject;



function init (quadMesh : Mesh, inType : String, spellbook : EnemySpellbook) {
	exampleMesh = quadMesh;
	invulnerable = 0;
	
	healthBar = GameObject.CreatePrimitive(PrimitiveType.Quad);		// Enemies have healthbars
	healthBar.transform.parent = transform;							// We're going to override the position updates, but this makes the hierarchy not look terrifying
	healthBar.renderer.material.color = Color(0.8,0,0);				// enemy health bars are red
	healthBar.transform.localPosition = Vector2(0,transform.localScale.y*1.2);				// and are slightly above their characters' heads
	healthBar.name = "Health Bar";
	
	
	type = inType;					// set the enemy type
	setValues(type);				// and all the consequences of it
	
	visualEffects();
}

function setValues (type : String) {		// ENEMY STATS BY CLASS
	if (type.Equals("Bob")) {
		curHealth = 150;
		armor = 6;
	}
	maxHealth = curHealth;					// this will always happen (..... right?)
}

function Update () {
	incrementTimers();		// tick tock goes the clock
	processDebuffs();
	if (curHealth <= 0) {	// how to die
		die();
	}
	var healthPercent = curHealth / maxHealth;																								// update health %
	healthBar.transform.localScale = Vector3(healthPercent,0.15,1);																			// rescale healthbar
	healthBar.transform.position = Vector3((1-healthPercent)/2 + transform.position.x,transform.localScale.y*0.7 + transform.position.y,transform.position.z);		// and update the transform
	healthBar.transform.rotation = Quaternion.identity;
	
	
}

function OnTriggerEnter2D(other : Collider2D){
	//print("enemy");
	if(other.gameObject.name == "Shot") {
		if(!other.gameObject.GetComponent(PlayerSpell).splash){
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
		}
		else{
			other.gameObject.GetComponent(PlayerSpell).hit(gameObject);		//If we splash, dont make damage text yet.
		}
	}
	if(other.gameObject.name == "Explosion") {
		other.gameObject.GetComponent(Splash).hit(gameObject);
	}

}

function OnTriggerStay2D(other : Collider2D){
	if(invulnerable<=0){
		if(other.gameObject.name == "Fist" ) {
			if(!other.gameObject.GetComponent(PlayerSpell).splash){
				other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
			}
			else{
				other.gameObject.GetComponent(PlayerSpell).hit(gameObject);		//If we splash, dont make damage text yet.
			}
		}
	}
}


function takeDamage(damage : float, magic : boolean){ 
	if(invulnerable<=0){
		if(magic){
			curHealth -= (damage);
			damageText(damage);
		}
		else{
			curHealth -= (damage-armor);
			damageText(damage-armor);
			invulnerable = 0.5;
		}
	}
}

function damageText(damage : int){
	var damageObject = new GameObject("DamageText");
	//damageObject.transform.parent = this.transform;
	damageObject.transform.position = this.transform.position;
	damageObject.transform.position.z = -2;
	damageObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	var meshFilter = damageObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	damageObject.AddComponent(MeshRenderer); //Add a renderer for textures
	var textureName = "Textures/"+damage; //Get the texture name with texture folder
	damageObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
	damageObject.renderer.material.color = Color(1,0,0); //Set the color (easy way to tint things).
	damageObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	
	Destroy(damageObject, 1);

}

function processDebuffs() {
	if (poisonCounter > 0 && poisonTimer <= 0) {
		takeDamage(2, true);
		poisonCounter--;
		poisonTimer = 1;
	}
}

function incrementTimers() {			// All of our various timers (there'll be more)
	var tick : float = Time.deltaTime;
	poisonTimer -= tick;
	invulnerable -= tick;
}

function die() {						// How to die: a manual
	
	PlayerStatus.money += 250;
	
	GameObject.Destroy(gameObject);		// Stop existing. the end.
}

function getRaging(){
	return raging;
}


function visualEffects(){

	if(hyper){
		attachEffect("Hyper Effect");
	}
	if(armored){
		attachEffect("Armored Effect");
	}
	if(raging){
		attachEffect("Raging Effect");
	}
	if(juggernaut){
		attachEffect("Juggernaut Effect");
	}
}

function attachEffect(name : String){
	var effectObject = new GameObject();							// Create a quad object for holding the tile texture.
	var meshFilter0 = effectObject.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter0.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	effectObject.AddComponent(MeshRenderer); 					//Add a renderer for textures
	effectObject.SetActive(false);								// Turn off the object so its script doesn't do anything until we're ready.
	
	model = effectObject.AddComponent(BuffEffectModel);				// Add a spellModel script to control visuals of the spell.
	model.name = name;									//Name the PlayerModel
	model.init(this.gameObject, name);								// Initialize the spellModel.
	effectObject.SetActive(true);								// Turn on the object (the Update function will start being called).
}


