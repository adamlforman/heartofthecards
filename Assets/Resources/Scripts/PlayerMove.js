public var speed : float = 3;
private var currentSpeedx : float;
private var currentSpeedy : float;
private var acceleration : float = 1;
private var amountToMove : Vector2;


function init() {
		// currently does nothing
}

function Update () {
         var mouseScreen : Vector3 = Input.mousePosition;
         var mouse : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreen);
 
         transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(mouse.y - transform.position.y, mouse.x - transform.position.x) * Mathf.Rad2Deg - 90);
 }

function FixedUpdate (){
	
    var moveY : float = Input.GetAxis ("Vertical"); //vertical movespeed
	var moveX : float = Input.GetAxis ("Horizontal"); //horizontal movespeed
	
	var moveDirection : Vector3 = Vector3(moveX, moveY, 0);
	if(moveY!=0 || moveX != 0){
		transform.Translate(speed*Time.deltaTime * moveDirection.normalized, Space.World); //moves player
	}
	//if(moveX!=0){
	//	transform.Translate(Vector3(moveX * Time.deltaTime, 0, 0), Space.World); //moves player horizontally
	//}
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
