public var health : int;
function Start () {
	health = 10;
}

function Update () {

}

function addHealth(heal : int){
	health += heal;
	if(health>100){
		health = 100;
	}
}
//If something enters the levelEnd model
function OnTriggerEnter2D(other : Collider2D) {
	if (other.name == "LevelEnd") { //If it is the player
		//GIVE THE PLAYER SOME $$$$
		Application.LoadLevel("deckBuilder"); //move to the deckbuilding interface
	}
}