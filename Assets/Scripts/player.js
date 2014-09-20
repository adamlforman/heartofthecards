#pragma strict
var model : playerModel; //variable to address the script for appearance
var speed : float = 8;
var acceleration : float = 30;
var gravity : float = 20;
var jumpHeight = 8;

public var collisionMask : LayerMask;
public var grounded : boolean;

private var currentSpeed : float;
private var targetSpeed : float;
private var amountToMove : Vector2;
private var size : Vector3;
private var center : Vector3;

private var skin : float = .005f;

private var ray : Ray;
private var hit : RaycastHit; 


//Initialize the playerScript
function init(s : Vector3, c : Vector3) {
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Cube); //Create cube model
	Destroy(modelObject.collider);
	modelObject.SetActive(false); //Set model to not be active
	model = modelObject.AddComponent(playerModel); //Add script for appearance to model
	model.init(this); //initialize this script
	modelObject.SetActive(true); //set model to be active
	size = s;
	center = c;
	collisionMask = 1 << 8;
	print(collisionMask.value);
}
//on update
function Update () {
	targetSpeed = Input.GetAxisRaw("Horizontal") * speed;
	currentSpeed = incrementTowards(currentSpeed, targetSpeed, acceleration);
	
	
	if(grounded == true) {
		amountToMove.y = 0;
		if (Input.GetKeyDown(KeyCode.UpArrow)) {
			amountToMove.y = jumpHeight;
		}
	}
	
	
	amountToMove.x = currentSpeed;
	amountToMove.y = amountToMove.y - (gravity * Time.deltaTime);
	print(amountToMove);
	move(amountToMove * Time.deltaTime);
}

private function incrementTowards(currentSpeedTemp : float, targetSpeedTemp : float, accelerationTemp : float) {
	if (currentSpeedTemp == targetSpeedTemp) {
		return currentSpeed;
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
}

private function move(amountToMoveTemp : Vector2) {
	var deltaY : float = amountToMoveTemp.y;
	var deltaX = amountToMoveTemp.x;
	var position : Vector2 = transform.position;
	
	grounded = false;
	for (var i : int = 0; i < 3; i++) {
	var direction : float = Mathf.Sign(deltaY);
		var x : float = (position.x + center.x - size.x/2) + size.x/2 * i;
		var y : float = position.y + center.y + size.y/2 * direction;
		ray = new Ray(new Vector2(x, y),  new Vector2(0, direction));
		Debug.DrawRay(ray.origin, ray.direction);
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaY) + skin, collisionMask)) {
			var distance : float = Vector3.Distance (ray.origin, hit.point);
			
			if (distance > skin) {
				deltaY = distance * direction - skin * direction;
			}
			else {
				deltaY = 0;
			}
			grounded = true;
			break;
		}
	}
	//OMFG JAVASCRIPT'S SCOPING IS STUPID

	for (var j : int = 0; j < 3; j++) {
		var direction2 : float = Mathf.Sign(deltaX);
		var x2 : float = position.x + center.x + size.x/2 * direction2;
		var y2 : float = (position.y + center.y - size.y/2) + size.y/2 * j;
		ray = new Ray(new Vector2(x2, y2),  new Vector2(direction2, 0));
		Debug.DrawRay(ray.origin, ray.direction);
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaX) + skin, collisionMask)) {
			var distance2 : float = Vector3.Distance (ray.origin, hit.point);
			
			if (distance2 > skin) {
				deltaX = distance2 * direction2 - skin * direction2;
			}
			else {
				deltaX = 0;
			}
			break;
		}
	}
	
	var finalTransform : Vector2 = Vector2(deltaX, deltaY);
	
	transform.Translate(finalTransform);
}
