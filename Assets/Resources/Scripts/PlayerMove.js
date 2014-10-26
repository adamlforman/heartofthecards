public var speed : float = 10;
private var currentSpeedx : float;
private var currentSpeedy : float;
private var acceleration : float = 1;
private var amountToMove : Vector2;


function Update() {
	
}

function FixedUpdate (){
	
    var moveY : float = Input.GetAxis ("Vertical") * speed; //vertical movespeed
	var moveX : float = Input.GetAxis ("Horizontal") * speed; //horizontal movespeed
	
	if(moveY!=0){
		transform.Translate(Vector3(0, moveY * Time.deltaTime, 0), Space.World); //moves player vertically
	}
	if(moveX!=0){
		transform.Translate(Vector3(moveX * Time.deltaTime, 0, 0), Space.World); //moves player horizontally
	}
    /*targetSpeedx = Input.GetAxisRaw("Horizontal") * speed;
	currentSpeedx = incrementTowards(currentSpeedx, targetSpeedx, acceleration);
	targetSpeedy = Input.GetAxisRaw("Vertical") * speed;
	currentSpeedy = incrementTowards(currentSpeedy, targetSpeedy, acceleration);
	amountToMove.x = currentSpeedx;
	amountToMove.y = currentSpeedy;
	transform.Translate(amountToMove,Space.World);
	*/

}
/*private function incrementTowards(currentSpeedTemp : float, targetSpeedTemp : float, accelerationTemp : float) {
	if (currentSpeedTemp == targetSpeedTemp) {
		return currentSpeedTemp;
	}
	else {
		var direction : float = Mathf.Sign(targetSpeedTemp - currentSpeedTemp);
		currentSpeedTemp = currentSpeedTemp + accelerationTemp * Time.deltaTime * direction;
		if (direction == Mathf.Sign(targetSpeedTemp - currentSpeedTemp)) {
			return currentSpeedTemp;
		}
		else {
			return targetSpeedTemp;
		}
	}
}*/
