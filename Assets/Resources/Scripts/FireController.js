var target : GameObject;

var spellbook : EnemySpellbook;

var movespeed : float;

var dancing : boolean;
var growing : boolean;
var tired : boolean;
var lava : boolean;
var flood : boolean;
var targetInRange : boolean;	// True if player is in boss's trigger Collider (slightly larger than boss)

var tiredTimer : float;
var danceTimer : float;
var growTimer : float;
var cometTimer : float;
var lavaTimer : float;
var lavaSpawnTimer : float;
var floodTimer : float;

var baseSize : Vector2;
var goalSize : Vector2;
var bigSize : Vector2;
var smallSize : Vector2;

var danceThreshold : float;
var lavaThreshold : float;



function init(target : GameObject, spellbook : EnemySpellbook) {
	this.target = target;
	this.spellbook = spellbook;
	transform.localScale = Vector2(3,3);
	this.baseSize = transform.localScale;
	this.goalSize = baseSize;
	this.bigSize = Vector2(4,4);
	this.smallSize = Vector2(2,2);
	
	movespeed = 0.8;
	
	dancing = false;
	growing = false;
	tired = true;
	
	danceTimer = 0;
	cometTimer = 0;
	tiredTimer = 3;
	growTimer = 0;
	
	danceThreshold = 0.3;
	lavaThreshold = 0.8;
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
				spellbook.comet(gameObject,target,10);
				cometTimer = 0.3;
			}
		}
		
		if (lava) {
			if (lavaSpawnTimer <= 0) {
				spellbook.lava(gameObject,target,6);
				lavaSpawnTimer = 0.1;
			}
			
		}
		if (flood) {
			if (lavaSpawnTimer <= 0) {
				spellbook.magma(gameObject,target,6);
				lavaSpawnTimer = 0.1;
			}
		}
		
		if (growing) {
			face(target.transform.position);
		}
		
		face(target.transform.position);
		transform.Translate(Vector2(0,1)*movespeed*Time.deltaTime);
	}
}

function OnTriggerEnter2D(other : Collider2D) {
	if (other.name == "Player") {
		targetInRange = true;
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

	if (Vector2.Distance(transform.position,target.transform.position) < 2) {
		lava = true;
		lavaTimer = 0.6;
	}
	else {
		var rand : float;
		rand = Random.value;
	
		if (rand < danceThreshold) { 
			dancing = true;
			danceTimer = 5;
			cometTimer = 1;
			goalSize = smallSize;
		}
		else if (rand < lavaThreshold) {
			lava = true;
			lavaTimer = 1;
		}
		else {
			flood = true;
			floodTimer = 3;
		}
		lava = true;
		lavaTimer = 1;
	}
}



function incrementTimers() {
	var tick : float = Time.deltaTime;
	danceTimer -= tick;
	cometTimer -= tick;
	growTimer -= tick;
	tiredTimer -= tick;
	lavaTimer -= tick;
	lavaSpawnTimer -= tick;
}

function triggerStuff() {
	if (danceTimer <= 0 && dancing) {
		dancing = false;
		tired = true;
		tiredTimer = 3;
		goalSize = baseSize;
	}
	if (lavaTimer <= 0 && lava) {
		lava = false;
		tired = true;
		tiredTimer = 2;
	}
	if (floodTimer <= 0 && flood) {
		flood = false;
		tired = true;
		tiredTimer = 3;
	}
	if (tiredTimer <= 0 && tired) {
		tired = false;
		newAttack();
	}
}