var target : GameObject;

var spellbook : EnemySpellbook;

var dancing : boolean;
var danceTimer : float;
var cometTimer : float;

var growing : boolean;
var growTimer : float;

var tired : boolean; 
var tiredTimer : float;

var baseSize : Vector2;
var goalSize : Vector2;

function init(target : GameObject, spellbook : EnemySpellbook) {
	this.target = target;
	this.spellbook = spellbook;
	this.baseSize = transform.localScale;
	this.goalSize = baseSize;
	
	dancing = false;
	danceTimer = 0;
	cometTimer = 0;
}

function Update() {
	incrementTimers();
	triggerStuff();
	
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
	
	}
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

function Grow(increaseFactor : float) {
	goalSize = transform.localScale*(increaseFactor+1);
}

function returnToNormal() {
	goalSize = baseSize;

}

function face(location : Vector2) {						// THIS IS A USEFUL FUNCTION
	transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
}



function incrementTimers() {
	var tick : float = Time.deltaTime;
	danceTimer -= tick;
	cometTimer -= tick;
	growTimer -= tick;
	tiredTimer -= tick;
}

function triggerStuff() {
	if (danceTimer <= 0) {
		dancing = false;
	}
	if (growTimer <= 0) {
		growing = false;
	}
	if (tiredTimer <= 0) {
		tired = false;
	}
}