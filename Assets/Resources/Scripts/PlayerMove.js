public var speed : float;
private var baseSpeedForward : float;
private var baseSpeedBackward : float;
private var speedForward : float;
private var speedBackward : float;
private var currentSpeedx : float;
private var currentSpeedy : float;
private var acceleration : float;
private var amountToMove : Vector2;
public  var vrom : float;
public  var tar : float;

public var cantMove : float;


function init() {
	speed = 4;
	baseSpeedForward = 4;
	baseSpeedBackward = 3;
	acceleration = 1;
	vrom = 0;
	tar = 0;

	if(gameObject.GetComponent(PlayerSpellbook).getType() == "Circle"){
		baseSpeedForward = 4.5;
		baseSpeedBackward = 2.5;
	}
	if(gameObject.GetComponent(PlayerSpellbook).getType() == "Square"){
		baseSpeedForward = 3.75;
		baseSpeedBackward = 2.75;
	}
	if(gameObject.GetComponent(PlayerSpellbook).getType() == "Triangle"){
		baseSpeedForward = 4.5;
		baseSpeedBackward = 2.5;
	}
}

function Update () {
	if (vrom > 0) {
		speedForward = baseSpeedForward + 2;
		speedBackward = baseSpeedBackward + 2;
		vrom -=Time.deltaTime;
	}
	else if (tar > 0) {
		speedForward = baseSpeedForward - 2;
		speedBackWard = baseSpeedBackward - 2;
		tar -=Time.deltaTime;
	}
	else {
		speedFoward = baseSpeedForward;
		speedBackward = baseSpeedBackward;
	}
	cantMove -= Time.deltaTime;
	if (cantMove > 0) {
		speed = 0;
	}
	var mouseScreen : Vector3 = Input.mousePosition;
    var mouse : Vector3 = Camera.main.ScreenToWorldPoint(mouseScreen);
 	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(mouse.y - transform.position.y, mouse.x - transform.position.x) * Mathf.Rad2Deg - 90);
 }

function FixedUpdate (){
	//Version 3.0
	var moveY : float = Input.GetAxis ("Vertical"); //vertical movespeed
	var moveX : float = Input.GetAxis ("Horizontal"); //horizontal movespeed
	//players facing angle is within 90 degrees of their input speed forward, otherwise speed backwards
	if (moveY < 0 && moveX == 0) {
		if(transform.eulerAngles.z < 45 || transform.eulerAngles.z > 315) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		print(speed);
	}
	else if (moveY < 0 && moveX < 0) {
		if(transform.eulerAngles.z < 360 && transform.eulerAngles.z > 270) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY == 0 && moveX < 0) {
		if(transform.eulerAngles.z < 315 && transform.eulerAngles.z > 225) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY > 0 && moveX < 0) {
		if(transform.eulerAngles.z < 270 && transform.eulerAngles.z > 180) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY > 0 && moveX == 0) {
		if(transform.eulerAngles.z < 225 && transform.eulerAngles.z > 135) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY > 0 && moveX > 0) {
		if(transform.eulerAngles.z < 180 && transform.eulerAngles.z > 90) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY == 0 && moveX > 0) {
		if(transform.eulerAngles.z < 135 && transform.eulerAngles.z > 45) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	else if (moveY < 0 && moveX > 0) {
		if(transform.eulerAngles.z < 90 && transform.eulerAngles.z > 0) {
			speed = baseSpeedBackward;
		}
		else {
			speed = baseSpeedForward;
		}
		
	}
	
	
	var moveDirection : Vector3 = Vector3(moveX, moveY, 0);
	if (moveDirection.magnitude > 1) {
		moveDirection = moveDirection.normalized;
	}
	if(moveY!=0 || moveX != 0){
		transform.Translate(speed*Time.deltaTime * moveDirection, Space.World); //moves player
	}
	
	//Version 2.0
	/*
    var moveY : float = Input.GetAxis ("Vertical"); //vertical movespeed
	var moveX : float = Input.GetAxis ("Horizontal"); //horizontal movespeed
	
	var moveDirection : Vector3 = Vector3(moveX, moveY, 0);
	if (moveDirection.magnitude > 1) {
		moveDirection = moveDirection.normalized;
	}
	if(moveY!=0 || moveX != 0){
		transform.Translate(speed*Time.deltaTime * moveDirection, Space.World); //moves player
	}*/
	
	
	
	
	//Version 1.0
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
