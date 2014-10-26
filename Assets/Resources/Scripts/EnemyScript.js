
function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	print("enemy");
	if(other.gameObject.name == "Shot"){
		//other.gameObject.hit(gameObject);
	}
}