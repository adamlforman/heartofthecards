var target : GameObject;

var spellbook : EnemySpellbook;

var movespeed : float;

var strafeSwitch : float;
var movingLeft : boolean;
var newAttackTimer : float;

var attackTimer : float;

function init(target : GameObject, spellbook : EnemySpellbook) {
	transform.localScale = Vector2(1,1);
	this.target = target;
	this.spellbook = spellbook;
	
	attackTimer = 1.5;
	newAttackTimer = 4;
	movingLeft = false;
	strafeSwitch = 3;
	
	movespeed = 3.5;
	
	spellbook.giant = 1;
	spellbook.leech = 1;
}

function Update() {
	incrementTimers();
	if (target) {
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
	if (attackTimer <= 0) {
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
	if (Vector2.Distance(transform.position,target.transform.position) > 5) {
		yMove = 1;
	}
	transform.Translate(Vector2(xMove,yMove)*Time.deltaTime*movespeed,Space.Self);
}

function incrementTimers() {
	var tick : float = Time.deltaTime;
	strafeSwitch -= tick;
	attackTimer -= tick;
	newAttackTimer -= tick;
}

function attack() {
	face(target.transform.position);
	spellbook.shot(gameObject, 10);
	if (spellbook.rapid > 0) {
		attackTimer = 0.2;
	}
	else {
		attackTimer = 0.5;
	}
}

function face(location : Vector2) {
	var curRotation = transform.rotation;
	var newRotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
	
	transform.rotation = Quaternion.Lerp(curRotation,newRotation,Time.deltaTime*2f);
}