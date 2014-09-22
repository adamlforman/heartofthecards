// TEMPORARY
// how long do we live for? in seconds
var life:float;

function Start () {
	life=5.0;
	gameObject.renderer.material.color.a = 0.5;
}

function Update() {
	// subtract our life value by the amount of time passed
	life -= Time.deltaTime;
	
	// if its less than or equal to 0
	if(life <= 0.0){
		gameObject.renderer.material.color.a = 1;
		Destroy(gameObject.GetComponent("translucent"));
	}
}