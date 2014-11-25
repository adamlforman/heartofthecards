public var curHealth : int;		// Player's current health
public var maxHealth : int;		// Player's maximum health

public var haveKey : boolean;
private var invulnerable : float;

var healthTickDelay : float;
var healthTickTimer : float;

var stunned : float;

public var HUD : PlayerHUD;		// HUD script

private var armor : int;
var audioS : AudioSource;
public static var money : int;

public static var tutorialHelperTar : boolean;
public static var tutorialHelperChest : boolean;

private var exampleMesh : Mesh;

function init (type : String, curHealth : float) {				// Initialization function
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	audioS = this.GetComponent(AudioSource);
	if(type == "Circle"){
		healthTickDelay = 1;
		armor = 2;
	}
	else if (type == "Triangle") {
		healthTickDelay = 2;
		armor = 0;
	}
	else if (type == "Square") {
		healthTickDelay = 1.5;
		armor = 0;
	}
	haveKey = false;
	maxHealth = 100;
	this.curHealth = curHealth;
	if (money != null) {
		money = 0;
	}
	invulnerable =0;
}

function Update () {			// If you have 0 or less health you die
	if (curHealth <= 0) {
		die();
	}
	healthTickTimer -= Time.deltaTime;
	invulnerable -= Time.deltaTime;
	stunned -= Time.deltaTime;
	
	if (healthTickTimer <= 0) {
		addHealth(1);
		healthTickTimer = healthTickDelay;
	}
}

function addHealth(heal : int){		// Function to gain health
	curHealth += heal;				// Gain the health
	if(curHealth>maxHealth){
		curHealth = maxHealth;		// can't have more than max health
	}
	if (HUD) {
		HUD.curHealth = curHealth;	// Update the health in the HUD -- prevents it having to call back to us every Update()
	}
}

function takeDamage(damage : float, magic : boolean){	// Take damage function
	
	curHealth -= damage;				// take the damage
	invulnerable = 0.5;
	if (HUD) {
		HUD.curHealth = curHealth;		// tell the HUD
	}
	
}

function chestLoot() {
	money+=100;
}


function OnTriggerEnter2D(other : Collider2D) {
	var audioS : AudioSource = this.GetComponent(AudioSource);
	if (other.name == "Key") {
		audioS.PlayOneShot(Resources.Load("Sounds/key"));
		haveKey = true;
		Destroy(other.gameObject);
		gameObject.GetComponent(PlayerHUD).key();
	}
	else if (other.name == "Chest") {
		audioS.PlayOneShot(Resources.Load("Sounds/chest"));
		tutorialHelperChest = true;
		chestLoot();
		var moneyObject = new GameObject("ChestText");
		//damageObject.transform.parent = this.transform;
		moneyObject.transform.position = other.transform.position;
		moneyObject.transform.position.z = -2;
		moneyObject.transform.localScale = Vector3(.75,.75,1); //NOT SURE IF THIS IS NECESSARY
		
		var moneyScript = moneyObject.AddComponent(FloatingText);
		moneyScript.init();
		var meshFilter = moneyObject.AddComponent(MeshFilter); //Add a mesh filter for textures
		meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
		moneyObject.AddComponent(MeshRenderer); //Add a renderer for textures
		var textureName = "Textures/money"; //Get the texture name with texture folder
		moneyObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
		moneyObject.renderer.material.color = Color(1,1,1); //Set the color (easy way to tint things).
		moneyObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
	
		
		Destroy(other.gameObject);
		Destroy(moneyObject, 1);
	}
	else if (other.name == "Vrom") {
		audioS.PlayOneShot(Resources.Load("Sounds/fast"));
		
		gameObject.GetComponent(PlayerMove).vrom = 4;
		gameObject.GetComponent(PlayerMove).tar = 0;
	}
	else if (other.name == "Tar") {
		audioS.PlayOneShot(Resources.Load("Sounds/slow"));
		tutorialHelperTar = true;
		gameObject.GetComponent(PlayerMove).tar = 4;
		gameObject.GetComponent(PlayerMove).vrom = 0;
	}
	else if (other.name == "Spikes") {
		audioS.PlayOneShot(Resources.Load("Sounds/ow"));
		takeDamage(6, false);
	}
	else if (other.name == "LevelEnd" && haveKey) { //If it is the door
		money +=9000;
		audioS.PlayOneShot(Resources.Load("Sounds/levelend2"));
		var levelLoader : LevelLoaderScript = GameObject.Find("Level Loader").GetComponent(LevelLoaderScript); //move to the shop interface
		levelLoader.curHealth = this.curHealth;
		levelLoader.loadNextLevel();
	}
	else if(other.gameObject.name == "Enemy Shot") {	// If it is an enemy arrow
		if(!other.gameObject.GetComponent(EnemySpell).splash){
			audioS.PlayOneShot(Resources.Load("Sounds/arrowhit"));
			audioS.PlayOneShot(Resources.Load("Sounds/ow"));
			other.gameObject.GetComponent(EnemySpell).hit(gameObject);	// Ask it to hit us please
		}
		else{
			audioS.PlayOneShot(Resources.Load("Sounds/arrowhit"));
			audioS.PlayOneShot(Resources.Load("Sounds/ow"));
			other.gameObject.GetComponent(EnemySpell).hit(gameObject);		// WHY DO WE HAVE DUPLICATE CODE?  Question seconded by Connor.  Suspects answer is because Adam blindly copied my code for the player.
		}
	}
	else if (other.gameObject.name == "Enemy Web Shot") {
		stunned = 3;
		other.gameObject.GetComponent(EnemySpell).hit(gameObject);
	}
	else if (other.gameObject.name == "Enemy Lava") {
		other.gameObject.GetComponent(EnemySpell).hit(gameObject);
	}
	else if (other.gameObject.name == "Enemy Magma") {
		other.gameObject.GetComponent(EnemySpell).hit(gameObject);
	}
}

function OnTriggerStay2D(other : Collider2D){
	if(invulnerable<=0){
		if(other.gameObject.name == "Enemy Fist") {
			if(!other.gameObject.GetComponent(EnemySpell).splash){

				other.gameObject.GetComponent(EnemySpell).hit(gameObject);
			}
			else{

				other.gameObject.GetComponent(EnemySpell).hit(gameObject);		//If we splash, dont make damage text yet.
			}
		}
	}
}

function die() {						// Death function
	audioS.PlayClipAtPoint(Resources.Load("Sounds/death"),transform.position);
	Destroy(gameObject,0.5);
	//Application.LoadLevel("shop"); //move to the deckbuilding interface
}