public var curHealth : int;		// Player's current health
public var maxHealth : int;		// Player's maximum health
public var haveKey : boolean;
private var invulnerable : float;

public var HUD : PlayerHUD;		// HUD script

private var armor : int;
var audioS : AudioSource;
public static var money : int;

function init (type : String) {				// Initialization function
	audioS = this.GetComponent(AudioSource);
	if(type == "Circle"){
		armor = 2;
	}
	else{
		armor = 0;
	}
	haveKey = false;
	curHealth = 100;
	maxHealth = curHealth;
	if (money != null) {
		money = 0;
	}
	invulnerable =0;
}

function Update () {			// If you have 0 or less health you die
	if (curHealth <= 0) {
		die();
	}
	invulnerable -= Time.deltaTime;
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
	money+=50;
}


function OnTriggerEnter2D(other : Collider2D) {
	var audioS : AudioSource = this.GetComponent(AudioSource);
	if (other.name == "Key") {
		audioS.PlayOneShot(Resources.Load("Sounds/key"));
		haveKey = true;
		other.gameObject.GetComponent(KeyScript).collect();
		gameObject.GetComponent(PlayerHUD).key();
	}
	else if (other.name == "Chest") {
		audioS.PlayOneShot(Resources.Load("Sounds/chest"));
		chestLoot();
		Destroy(other.gameObject);
	}
	else if (other.name == "Vrom") {
		audioS.PlayOneShot(Resources.Load("Sounds/fast"));
		
		gameObject.GetComponent(PlayerMove).vrom = 4;
	}
	else if (other.name == "Tar") {
		audioS.PlayOneShot(Resources.Load("Sounds/slow"));
		gameObject.GetComponent(PlayerMove).tar = 4;
	}
	else if (other.name == "Spikes") {
		audioS.PlayOneShot(Resources.Load("Sounds/ow"));
		takeDamage(6, false);
	}
	else if (other.name == "LevelEnd" && haveKey) { //If it is the door
		money +=100;
		audioS.PlayOneShot(Resources.Load("Sounds/levelend2"));
		GameObject.Find("Level Loader").GetComponent(LevelLoaderScript).loadNextLevel(); //move to the shop interface
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
	audioS.PlayOneShot(Resources.Load("Sounds/death"));
	Application.LoadLevel("shop"); //move to the deckbuilding interface
}