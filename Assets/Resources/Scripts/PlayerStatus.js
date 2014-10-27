public var curHealth : int;
public var maxHealth : int;

public var HUD : PlayerHUD;

function init () {
	curHealth = 100;
	maxHealth = curHealth;
}

function Update () {
	if (curHealth <= 0) {
		die();
	}
}

function addHealth(heal : int){
	curHealth += heal;
	if(curHealth>maxHealth){
		curHealth = maxHealth;
	}
	if (HUD) {
		HUD.curHealth = curHealth;
	}
}

function takeDamage(damage : float){
	curHealth -= damage;
	if (HUD) {
		HUD.curHealth = curHealth;
	}
}
//If something enters the levelEnd model
function OnTriggerEnter2D(other : Collider2D) {
	if (other.name == "LevelEnd") { //If it is the player
		//GIVE THE PLAYER SOME $$$$
		Application.LoadLevel("deckBuilder"); //move to the deckbuilding interface
	}
	if(other.gameObject.name == "Enemy Shot") {
		if(!other.gameObject.GetComponent(EnemySpell).splash){
			other.gameObject.GetComponent(EnemySpell).hit(gameObject);
		}
		else{
			other.gameObject.GetComponent(EnemySpell).hit(gameObject);		//If we splash, dont make damage text yet.
		}
	}

}

function die() {
	GameObject.Destroy(gameObject);
}