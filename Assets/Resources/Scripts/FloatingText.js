var hOffset : float;
var vOffset : float;
var timer : float;

var initialX : float;
var initialY : float;

function init() {
	initialX = transform.position.x;
	initialY = transform.position.y;
}

function Update() {
	timer += Time.deltaTime;
	
	hOffset = .1*Mathf.Sin(15*timer);
	//Debug.Log("hoffset :" +hOffset);
	vOffset = timer;
	//Debug.Log("voffset :" +vOffset);
	
	transform.localPosition.y = vOffset + initialY;
	transform.localPosition.x = hOffset + initialX;
}