public var health : int;
public var ice : float;
public var poison : float;
public var blind : float;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	print("enemy");
	if(other.gameObject.name == "Shot"){
		other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
	}
}

function takeDamage(damage : int){
	health -= damage;
}