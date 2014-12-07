var target : GameObject;

var spellbook : EnemySpellbook;

var baseSpeed : float;

var ranged : boolean;

var strafeSwitch : float;
var movingLeft : boolean;
var paused : boolean;
var pauseTimer : float;
var newAttackTimer : float;

var attackTimer : float;

function init(target : GameObject, spellbook : EnemySpellbook) {
	if (PlayerStatus.classType == "Circle") {
		ranged = false;
	}
	else {
		ranged = true;
	}
	transform.localScale = Vector3(1,1,1);
	this.target = target;
	this.spellbook = spellbook;
	
	attackTimer = 1.5;
	newAttackTimer = 4;
	movingLeft = false;
	strafeSwitch = 3;
	
	baseSpeed = 3.5;
	
	spellbook.giant = 1;
	spellbook.leech = 1;
}

function Update() {
	incrementTimers();
	if (target) {
		if (paused) {
			if (pauseTimer <= 0) {
				paused = false;
				pauseTimer = 5;
			}
		}
		else if (!paused) {
			if (pauseTimer <= 0) {
				paused = true;
				pauseTimer = 3;
			}
		}
		face(target.transform.position);
		if (strafeSwitch <= 0) {
			movingLeft = !movingLeft;
			strafeSwitch = Random.value*2.5;
		}
		if (newAttackTimer <= 0) {
			newAttack();
			newAttackTimer = 4;
		}
	}
}

function newAttack() {
	var attack : int = Random.Range(1,3);
	if (attack == 1) {
		spellbook.ice = 1;
		spellbook.poison = 0;
	}
	else if (attack == 2) {
		spellbook.poison = 1;
		spellbook.ice = 0;
	}
	else if (attack == 3) {
		spellbook.rapid = 1;
	}
}

function FixedUpdate() {
	var movespeed : float = baseSpeed;
	if (paused) {
		movespeed = 0;
	}
	if (attackTimer <= 0 && ranged) {
		attack();
	}
	if (attackTimer <= 0 && !ranged && Vector2.Distance(transform.position,target.transform.position)) {
		attack();
	}
	var xMove : float = 0;
	var yMove : float = 0;
	if (movingLeft) {
		xMove = -1;
	}
	else {
		xMove = 1;
	}
	if (target) {
		if (Vector2.Distance(transform.position,target.transform.position) > 5 && ranged) {
			yMove = 1;
		}
		if (!ranged && Vector2.Distance(transform.position,target.transform.position) > 1.5) {
			yMove = 1;
		}
	}
	transform.Translate(Vector2(xMove,yMove)*Time.deltaTime*movespeed,Space.Self);
}

function incrementTimers() {
	var tick : float = Time.deltaTime;
	strafeSwitch -= tick;
	attackTimer -= tick;
	newAttackTimer -= tick;
	pauseTimer -= tick;
}

function attack() {
	if (ranged) {
		face(target.transform.position);
		spellbook.shot(gameObject, 10);
		if (spellbook.rapid > 0) {
			attackTimer = 0.2;
		}
		else {
			attackTimer = 0.5;
		}
		if (paused) {
			attackTimer = attackTimer*2;
		}
	}
	else {
		face(target.transform.position);
		spellbook.swing();
		if (spellbook.rapid > 0) {
			attackTimer = 0.2;
		}
		else {
			attackTimer = 0.5;
		}
		if (paused) {
			attackTimer = attackTimer*2;
		}
	}
}

function face(location : Vector2) {
	var curRotation = transform.rotation;
	var newRotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
	
	transform.rotation = Quaternion.Lerp(curRotation,newRotation,Time.deltaTime*2f);
}