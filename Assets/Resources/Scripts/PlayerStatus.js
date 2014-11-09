public var curHealth : int;		// Player's current health
public var maxHealth : int;		// Player's maximum health
public var haveKey : boolean;
private var invulnerable : float;

public var HUD : PlayerHUD;		// HUD script

public static var money : int;

function init () {				// Initialization function
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
//If something enters the levelEnd model
function OnTriggerEnter2D(other : Collider2D) {
	if (other.name == "Key") {
		haveKey = true;
		other.gameObject.GetComponent(KeyScript).collect();
	}
	if (other.name == "LevelEnd" && haveKey) { //If it is the door
		money +=100;
		Application.LoadLevel("shop"); //move to the shop interface
	}
	if(other.gameObject.name == "Enemy Shot") {	// If it is an enemy arrow
		if(!other.gameObject.GetComponent(EnemySpell).splash){
			other.gameObject.GetComponent(EnemySpell).hit(gameObject);	// Ask it to hit us please
		}
		else{
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
	Application.LoadLevel("deckBuilder"); //move to the deckbuilding interface
}