var target : GameObject;

var spellbook : EnemySpellbook;

var dancing : boolean;
var danceTimer : float;
var cometTimer : float;

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
	if (target) {
		if (dancing) {
			if (cometTimer <= 0) {
				spellbook.comet(gameObject,target,20);
				cometTimer = 0.3;
			}
		}
	
	}
	if (transform.localScale != goalSize) {
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



function incrementTimers() {
	var tick : float = Time.deltaTime;
	danceTimer -= tick;
	cometTimer -= tick;
}