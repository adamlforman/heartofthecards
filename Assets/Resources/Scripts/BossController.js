var target : GameObject;

var spellbook : EnemySpellbook;

var dancing : boolean;
var growing : boolean;
var charging : boolean;
var tired : boolean;
var targetInRange : boolean;	// True if player is in boss's trigger Collider (slightly larger than boss)

var tiredTimer : float;
var danceTimer : float;
var growTimer : float;
var cometTimer : float;

var baseSize : Vector2;
var goalSize : Vector2;
var bigSize : Vector2;
var smallSize : Vector2;

var chargeSpeed : float;



function init(target : GameObject, spellbook : EnemySpellbook) {
	Debug.Log("Bob init");
	this.target = target;
	this.spellbook = spellbook;
	transform.localScale = Vector2(2,2);
	this.baseSize = transform.localScale;
	this.goalSize = baseSize;
	this.bigSize = Vector2(3,3);
	this.smallSize = Vector2(1.5,1.5);

	chargeSpeed = 5;
	
	dancing = false;
	charging = false;
	growing = false;
	tired = true;
	
	danceTimer = 0;
	cometTimer = 0;
	tiredTimer = 3;
	growTimer = 0;
}

function Update() {
	incrementTimers();
	triggerStuff();

	if (transform.localScale != goalSize) {		// INCREMENTS size towards goalSize
		if (Mathf.Abs(transform.localPosition.x - goalSize.x) < 0.2) {
			transform.localScale.x = goalSize.x;
		}
		if (transform.localScale.x < goalSize.x) {
			transform.localScale.x += Time.deltaTime;
		}
		if (transform.localScale.x > goalSize.x) {
			transform.localScale.x -= Time.deltaTime;
		}
		
		if (Mathf.Abs(transform.localScale.y - goalSize.y) < 0.2) {
			transform.localScale.y = goalSize.y;
		}
		if (transform.localScale.y < goalSize.y) {
			transform.localScale.y += Time.deltaTime;
		}
		if (transform.localScale.y > goalSize.y) {
			transform.localScale.y -= Time.deltaTime;
		}
	}
}

function FixedUpdate() {

	if (target) {
		if (dancing) {
			if (cometTimer <= 0) {
				spellbook.comet(gameObject,target,20);
				cometTimer = 0.3;
			}
		}
		
		if (growing) {
			face(target.transform.position);
		}
		
		if (charging) {
			transform.Translate(Vector2(0,1)*chargeSpeed*Time.deltaTime);
		}
	}
}

function OnTriggerEnter2D(other : Collider2D) {
	if (charging) {
		if (other.name == "Player") {
			targetInRange = true;
			if (other.gameObject.GetComponent(PlayerStatus)) {
				other.gameObject.GetComponent(PlayerStatus).takeDamage(25,false);
			}
		}
		else if (other.name == "ROCK") {
			charging = false;
			tired = true;
			tiredTimer = 5;
			goalSize = baseSize;
		}
	}
	else {
		if (other.name == "Player") {
			targetInRange = true;
		}
	}
}

function OnTriggerExit2D(other : Collider2D) {
	if (other.name == "Player") {
		targetInRange = false;
	}
}

function Grow(increaseFactor : float) {
	goalSize = transform.localScale*(increaseFactor+1);
}

function returnToNormal() {
	goalSize = baseSize;

}

function face(location : Vector2) {						// THIS IS A USEFUL FUNCTION
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
}

function newAttack() {
	var rand : float;
	rand = Random.value;
	if (rand < 0.5) {
		growing = true;
		goalSize = bigSize;
		growTimer = 3;
	}
	else { 
		dancing = true;
		danceTimer = 5;
		cometTimer = 1;
		goalSize = smallSize;
	}
}



function incrementTimers() {
	var tick : float = Time.deltaTime;
	danceTimer -= tick;
	cometTimer -= tick;
	growTimer -= tick;
	tiredTimer -= tick;
}

function triggerStuff() {
	if (danceTimer <= 0 && dancing) {
		dancing = false;
		tired = true;
		tiredTimer = 3;
		goalSize = baseSize;
	}
	if (growTimer <= 0 && growing) {
		growing = false;
		charging = true;
		if (targetInRange) {
			if (target.gameObject.GetComponent(PlayerStatus)) {
				target.gameObject.GetComponent(PlayerStatus).takeDamage(25,false);
			}
		}
	}
	if (tiredTimer <= 0 && tired) {
		tired = false;
		newAttack();
	}
}