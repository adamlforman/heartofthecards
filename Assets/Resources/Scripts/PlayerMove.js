public var speed : float;

private var acceleration : float;
private var baseSpeedForward : float;
private var baseSpeedBackward : float;

private var speedForward : float;
private var speedBackward : float;
private var currentSpeedx : float;
private var currentSpeedy : float;

private var amountToMove : Vector2;

public  var vrom : float;
public  var tar : float;


public var knockbackTimer : float;
public var knockbackPos : Vector2;

public var dodgeTimer : float;
public var dodgePos : Vector2;
public var dodgeCooldown : float;

public var cantMove : float;
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
	dodgeTimer -= Time.deltaTime;
	dodgeCooldown -= Time.deltaTime;
	
	if (transform.position.z != -1) {
		transform.position.z = -1;
	}
	//Version 3.0
	moveY = Input.GetAxis ("Vertical"); //vertical movespeed
	moveX = Input.GetAxis ("Horizontal"); //horizontal movespeed
	var dodge : float;
	if (gameObject.GetComponent(PlayerSpellbook).getType() == "Triangle") {
		dodge = Input.GetAxis ("Fire2");//Is right mouse down?
	}
	else {
		dodge = 0;
	}
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
	if (dodge > 0 && dodgeCooldown <= 0 && dodgeTimer <= 0) {
		dodgeCooldown = 1;
		dodgeTimer = 0.2;
		if (Mathf.Abs(moveY) > 0.1 || Mathf.Abs(moveX) > 0.1) {
			dodgePos = Vector3(moveX, moveY, 0);
			dodgePos = dodgePos.normalized;
			Debug.Log("Input-converted dodge Vector :" +dodgePos);	// Dodge towards movement
		}
		else {
			Debug.Log("MoveX: " + moveX + ", MoveY: " + moveY);
			dodgePos = -1*aToV(transform.eulerAngles.z);	// If no input, dodge backwards
			Debug.Log("Angle-converted dodge Vector :" + dodgePos);
		}
	}
	if (knockbackTimer > 0) {
		transform.Translate(10*Time.deltaTime*(transform.position - knockbackPos), Space.World);
	}
	else if (dodgeTimer > 0) {
		//Debug.Log("Translating towards "+ (dodgePos));
		transform.Translate(12*Time.deltaTime*(dodgePos), Space.World);
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

function aToV(angle : float) {
	var angleRad = 3.14159*(angle / 180);
	var vector : Vector3 = Vector3(-Mathf.Sin(angleRad),Mathf.Cos(angleRad),0);
	return vector;
}
