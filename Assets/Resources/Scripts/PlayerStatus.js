public var curHealth : int;		// Player's current health
public var maxHealth : int;		// Player's maximum health

public var HUD : PlayerHUD;		// HUD script

function init () {				// Initialization function
	curHealth = 100;
	maxHealth = curHealth;
}

function Update () {			// If you have 0 or less health you die
	if (curHealth <= 0) {
		die();
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

function takeDamage(damage : float){	// Take damage function
	curHealth -= damage;				// take the damage
	if (HUD) {
		HUD.curHealth = curHealth;		// tell the HUD
	}
}
//If something enters the levelEnd model
function OnTriggerEnter2D(other : Collider2D) {
	if (other.name == "LevelEnd") { //If it is the door
		Application.LoadLevel("deckBuilder"); //move to the deckbuilding interface
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

function die() {						// Death function
	Application.LoadLevel("deckBuilder"); //move to the deckbuilding interface
}