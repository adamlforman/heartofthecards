// TEMPORARY
// how long do we live for? in seconds
public var life:float;

function Start () {
	//life=1.0;
}

function Update() {
	// subtract our life value by the amount of time passed
	life -= Time.deltaTime;
	
	// if its less than or equal to 0
	if(life <= 0.0){
		// kill ourselves
		Destroy(gameObject);
	}
}