#pragma strict

public class GameCamera extends MonoBehaviour {

	private var target : Transform;
	private var trackSpeed : float;
	
	public function setTarget(t : Transform) {
		trackSpeed = 8;
		target = t;
	}

	function LateUpdate() {
		if (target != null) {
			
			var x : float = incrementTowards(transform.position.x, target.position.x, trackSpeed);
			var y : float = incrementTowards(transform.position.y, target.position.y, trackSpeed);
			transform.position = new Vector3(x, transform.position.y, transform.position.z);
			//REPUT IN Y INSTEAD OF TRANSFORM.POSITION.Y FOR Y CAMERA MOVEMENT
			/*if (target.position.x > transform.position.x + 5 || target.position.x < transform.position.x - 5 || target.position.y > transform.position.y + 5 || target.position.y < transform.position.y - 5) {
				trackSpeed = 10;
			}
			else {
				trackSpeed = 6;
			}*/
		}
	}
	
	private function incrementTowards(currentSpeedTemp : float, targetSpeedTemp : float, accelerationTemp : float) {
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
	}

}