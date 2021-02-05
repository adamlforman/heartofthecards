var target : GameObject;

var spellbook : EnemySpellbook;

var growing : boolean;
var charging : boolean;
var shooting : boolean;
var shrinking : boolean;
var tired : boolean;
var puffing : boolean;
var megaPuff : boolean;
var knockedAlready : boolean;
var targetInRange : boolean;	// True if player is in boss's trigger Collider (slightly larger than boss)

var tiredTimer : float;
var growTimer : float;
var shrinkTimer : float;
var shootTimer : float;
var puffTimer : float;
var megaTimer : float;

var baseSize : Vector2;
var goalSize : Vector2;
var bigSize : Vector2;
var smallSize : Vector2;
var biggerSize : Vector2;

var chargeSpeed : float;



function init(target : GameObject, spellbook : EnemySpellbook) {
	this.target = target;
	this.spellbook = spellbook;
	transform.localScale = Vector2(2,2);
	this.baseSize = transform.localScale;
	this.goalSize = baseSize;
	this.bigSize = Vector2(3,3);
	this.smallSize = Vector2(1.5,1.5);
	this.biggerSize = Vector2(5,5);

	chargeSpeed = 5;
	
	charging = false;
	shooting = false;
	growing = false;
	shrinking = false;
	tired = true;
	
	tiredTimer = 2;
	growTimer = 0;
	shootTimer = 0;
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
		
		if (growing) {
			face(target.transform.position);
		}
		if (shooting) {
			var randX = Random.value * 2 -1;
			var randY = Random.value *2 - 1;
			face(Vector2(target.transform.position.x + randX, target.transform.position.y + randY));
			spellbook.webShot(gameObject);
		}
		if (charging) {
			transform.Translate(Vector2(0,1)*chargeSpeed*Time.deltaTime);
		}
		if (megaPuff) {
			
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
	else if (megaPuff) {
		if (other.name == "Player") {
			targetInRange = true;
			if (other.gameObject.GetComponent(PlayerStatus)) {
				if(!(other.GetComponent(PlayerStatus).getBlock())){
					other.gameObject.GetComponent(PlayerStatus).takeDamage(20,false);
					other.GetComponent(PlayerMove).knockback(4,transform.position);
					knockedAlready = true;
				}
			}
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

	if (Vector2.Distance(transform.position,target.transform.position) > 3) {
		if (target.GetComponent(PlayerStatus).stunned > 0) {
			growing = true;
			goalSize = bigSize;
			growTimer = 2;
		}
		else {
			face(target.transform.position);
			spellbook.webshot(gameObject);
			tired = true;
			tiredTimer = 1;
		}
	}
	else {
		var rand : float;
		rand = Random.value;
		if (rand < 0.5) {
			growing = true;
			goalSize = bigSize;
			growTimer = 3;
		}
		else {
			goalSize = smallSize;
			puffing = true;
			puffTimer = 2;
		}
	}
}



function incrementTimers() {
	var tick : float = Time.deltaTime;
	shrinkTimer -= tick;
	growTimer -= tick;
	tiredTimer -= tick;
	shootTimer -= tick;
	puffTimer -= tick;
	megaTimer -= tick;
}

function triggerStuff() {
	if (growTimer <= 0 && growing) {
		growing = false;
		charging = true;
		if (targetInRange) {
			if (target.gameObject.GetComponent(PlayerStatus)) {
				if(!(target.GetComponent(PlayerStatus).getBlock())){
					target.gameObject.GetComponent(PlayerStatus).takeDamage(20,false);
					if (!knockedAlready) {
						target.GetComponent(PlayerMove).knockback(4,transform.position);
						knockedAlready = true;
					}
				}
			}
		}
	}
	if (shrinkTimer <= 0 && shrinking) {
		shrinking = false;
		shooting = true;
	}
	if (puffTimer <= 0 && puffing) {
		gameObject.GetComponentInChildren(BossModel).GetComponent.<Renderer>().material.color = Color(1,0.5,0.5);
		puffing = false;
		goalSize = biggerSize;
		megaPuff = true;
		megaTimer = 4;
		if (targetInRange) {
			if (target.gameObject.GetComponent(PlayerStatus)) {
				target.gameObject.GetComponent(PlayerStatus).takeDamage(20,false);
			}
			if(!(target.GetComponent(PlayerStatus).getBlock())){
				if (!knockedAlready) {
					target.GetComponent(PlayerMove).knockback(4,transform.position);
					knockedAlready = true;
				}
			}
		}
	}
	if (megaTimer <= 0 && megaPuff) {
		megaPuff = false;
		tired = true;
		tiredTimer = 4;
		goalSize = baseSize;
		knockedAlready = false;
		gameObject.GetComponentInChildren(BossModel).GetComponent.<Renderer>().material.color = Color(1,1,1);
	}
	if (tiredTimer <= 0 && tired) {
		tired = false;
		newAttack();
	}
}