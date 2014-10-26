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