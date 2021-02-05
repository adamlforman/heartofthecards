var dampTime : float = 0.3; //offset from the viewport center to fix damping
private var velocity = Vector3.zero;
var target : Transform;


var minX : float = 0;
var minY : float = 0;
var maxX : float = 1000;
var maxY : float = 1000;

function init(p : GameObject, minX : float, minY : float, maxX : float, maxY : float) {
	target = p.transform;
	transform.position = Vector3(target.position.x, target.position.y, -14);
	GetComponent.<Camera>().orthographicSize = 5;
	
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;

}

function Update() {
    if(target) {
        var point : Vector3 = GetComponent.<Camera>().WorldToViewportPoint(target.position);
        var delta : Vector3 = target.position - GetComponent.<Camera>().ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
        var destination : Vector3 = transform.position + delta;

        if (destination.x - GetComponent.<Camera>().orthographicSize*GetComponent.<Camera>().aspect < minX)
        	destination.x = minX + GetComponent.<Camera>().orthographicSize*GetComponent.<Camera>().aspect;
        if (destination.y - GetComponent.<Camera>().orthographicSize < minY)
        	destination.y = minY + GetComponent.<Camera>().orthographicSize;
        if (destination.x + GetComponent.<Camera>().orthographicSize*GetComponent.<Camera>().aspect > maxX)
        	destination.x = maxX - GetComponent.<Camera>().orthographicSize*GetComponent.<Camera>().aspect;
        if (destination.y + GetComponent.<Camera>().orthographicSize > maxY)
        	destination.y = maxY - GetComponent.<Camera>().orthographicSize;

        transform.position = Vector3.SmoothDamp(transform.position, destination, 
                                                velocity, dampTime);
    }
}

function setTarget(p : GameObject) {
	target = p.transform;
	transform.position = Vector3(target.position.x, target.position.y, -14);
	GetComponent.<Camera>().orthographicSize = 5;
}

function setBounds(minX : float, maxX: float, minY : float, maxY : float) {
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
}

function setZoom(newZoom : float) {
	GetComponent.<Camera>().orthographicSize = newZoom;
}