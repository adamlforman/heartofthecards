
/*private var player : player2D;
private var velocity : Vector3;
private var dampenTime : float;

function Start () {
	velocity = Vector3.zero;
	dampenTime = 0.15;
}

function LateUpdate () {
	if (player != null) {
		var point : Vector3 = camera.WorldToViewportPoint(player.transform.position);
		var delta : Vector3 = player.transform.position - camera.WorldToViewportPoint(Vector3(0.5, 0.5, point.z));
		var destination : Vector3 = transform.position + delta;
		print(point);
		print(delta);
		print(destination);
		transform.position = Vector3.SmoothDamp(transform.position, destination, velocity, dampenTime);
	}
}*/
var dampTime : float = 0.3; //offset from the viewport center to fix damping
private var velocity = Vector3.zero;
var target : Transform;

var minX : float = 0;
var minY : float = 0;
var maxX : float = 1000;
var maxY : float = 1000;
 
function Update() {
    if(target) {
        var point : Vector3 = camera.WorldToViewportPoint(target.position);
        var delta : Vector3 = target.position -
                    camera.ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
        var destination : Vector3 = transform.position + delta;
        if (destination.x - camera.orthographicSize*camera.aspect < minX)
        	destination.x = minX + camera.orthographicSize*camera.aspect;
        if (destination.y - camera.orthographicSize < minY)
        	destination.y = minY + camera.orthographicSize;
        if (destination.x + camera.orthographicSize*camera.aspect > maxX)
        	destination.x = maxX - camera.orthographicSize*camera.aspect;
        if (destination.y + camera.orthographicSize > maxY)
        	destination.y = maxY - camera.orthographicSize;
        transform.position = Vector3.SmoothDamp(transform.position, destination, 
                                                velocity, dampTime);
    }
}

function setTarget(p : player2D, minX, minY, maxX, maxY) {
	target = p.transform;
	transform.position = Vector3(target.position.x, target.position.y, -14);
	camera.orthographicSize = 5;
	
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
}

function setTarget(p : player2D) {
	target = p.transform;
	transform.position = Vector3(target.position.x, target.position.y, -14);
	camera.orthographicSize = 5;
}