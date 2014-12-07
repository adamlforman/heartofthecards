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
public var knockbackTimer : float;
public var knockbackPos : Vector2;
public var stunned : boolean;

private var mouseScreen : Vector3;
private var mouse : Vector3;
private var moveY : float;
private var moveX : float;
private var moveDirection : Vector3;

function init() {
	speed = 4;
	baseSpeedForward = 4;
	baseSpeedBackward = 3; 
	speedForward = 4;
	speedBackward = 3;
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
	if (gameObject.GetComponent(PlayerStatus).stunned > 0) {
		stunned = true;
	}
	else {
		stunned = false;
	}
	if (vrom > 0) {
		speedForward = baseSpeedForward + 1;
		speedBackward = baseSpeedBackward + 1;
		vrom -=Time.deltaTime;
	}
	else if (tar > 0) {
		speedForward = baseSpeedForward - 2;
		speedBackward = baseSpeedBackward - 2;
		tar -=Time.deltaTime;
	}
	else {
		speedForward = baseSpeedForward;
		speedBackward = baseSpeedBackward;
	}
	cantMove -= Time.deltaTime;
	if (cantMove > 0) {
		speed = 0;
	}
	if (!stunned) {
		mouseScreen = Input.mousePosition;
    	mouse = Camera.main.ScreenToWorldPoint(mouseScreen);
 		transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(mouse.y - transform.position.y, mouse.x - transform.position.x) * Mathf.Rad2Deg - 90);
 	}
 }

function FixedUpdate (){
	knockbackTimer -= Time.deltaTime;
	
	if (transform.position.z != -1) {
		transform.position.z = -1;
	}
	//Version 3.0
	moveY = Input.GetAxis ("Vertical"); //vertical movespeed
	moveX = Input.GetAxis ("Horizontal"); //horizontal movespeed
	//players facing angle is within 90 degrees of their input speed forward, otherwise speed backwards
	if (moveY < 0 && moveX == 0) {
		if(transform.eulerAngles.z < 45 || transform.eulerAngles.z > 315) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
	}
	else if (moveY < 0 && moveX < 0) {
		if(transform.eulerAngles.z < 360 && transform.eulerAngles.z > 270) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY == 0 && moveX < 0) {
		if(transform.eulerAngles.z < 315 && transform.eulerAngles.z > 225) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY > 0 && moveX < 0) {
		if(transform.eulerAngles.z < 270 && transform.eulerAngles.z > 180) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY > 0 && moveX == 0) {
		if(transform.eulerAngles.z < 225 && transform.eulerAngles.z > 135) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY > 0 && moveX > 0) {
		if(transform.eulerAngles.z < 180 && transform.eulerAngles.z > 90) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY == 0 && moveX > 0) {
		if(transform.eulerAngles.z < 135 && transform.eulerAngles.z > 45) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	else if (moveY < 0 && moveX > 0) {
		if(transform.eulerAngles.z < 90 && transform.eulerAngles.z > 0) {
			speed = speedBackward;
		}
		else {
			speed = speedForward;
		}
		
	}
	if (knockbackTimer > 0) {
		transform.Translate(10*Time.deltaTime*(transform.position - knockbackPos), Space.World);
	}
	else if (!stunned && !gameObject.GetComponent(PlayerStatus).getBlock()) {
		moveDirection = Vector3(moveX, moveY, 0);
		if (moveDirection.magnitude > 1) {
			moveDirection = moveDirection.normalized;
		}
		if(moveY!=0 || moveX != 0){
			transform.Translate(speed*Time.deltaTime * moveDirection, Space.World); //moves player
		}
	}
}

function knockback(distance : float, location : Vector2) {
	knockbackTimer = distance * 0.1;
	knockbackPos = location;
}
