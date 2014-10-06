var spellType : String;
var model : spellModel;

var snare : boolean;
var slow : boolean;
var move : boolean;
var poison : boolean;
var damage : float;
var movespeed : int = 10;
function init(spellType : String) {
	this.spellType = spellType;
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent("spellModel");					// Add a spellModel script to control visuals of the spell.
	model.init(gameObject, spellType);										// Initialize the spellModel.
	
	
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
	if (spellType == "ARROW")
		damage = 10;
	else
		damage = 0;
	
	if (spellType == "WEB")
		snare = true;
	else
		snare = false;
		
	if (spellType == "ICE")
		slow = true;
	else
		slow = false;
		
	if (spellType == "ARROW" || spellType == "DART")
		move = true;
	else
		move = false;
		
	if(spellType == "DART" || spellType == "GAS")
		poison = true;
	else
		poison = false;
}

function Update() {
	if (snare || slow || poison || move) {
		for (var other : Collider in Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,-1),0.7)) {
			var otherOb : enemy2D;
		if (other.gameObject.GetComponent("enemy2D"))
			otherOb = other.gameObject.GetComponent("enemy2D");
		if (other.gameObject.GetComponent("charModel2D")) {
			var dick : charModel2D = other.gameObject.GetComponent("charModel2D");
			if (dick.owner.GetComponent("enemy2D"))
				otherOb = dick.owner.GetComponent("enemy2D");
			}
			if (otherOb) {
				otherOb.takeDamage(damage);
				if (!otherOb.snare && snare) {
					otherOb.snare = true;
					otherOb.snareTimer = gameObject.GetComponent("temporary").life;
				}
				if (!otherOb.slow && slow) {
					otherOb.slow = true;
					otherOb.slowTimer = 5;
				}
				if (poison) {
					otherOb.poisonCount = 5;
				}
				if (move) {
					GameObject.Destroy(gameObject);
				}
			}
		}
		for (var other : Collider in Physics.OverlapSphere(Vector3(transform.position.x,transform.position.y,0),0.4)) {
			//Debug.Log(other);
			var wall : terrain;
			if (other.gameObject.GetComponent("terrain"))
				wall = other.gameObject.GetComponent("terrain");
			if (other.gameObject.GetComponent("terrainModel"))
				wall = other.gameObject.GetComponent("terrainModel").owner;
			if (wall)
				if (wall.terrainType == "ROCK") {
					GameObject.Destroy(model.gameObject);
					GameObject.Destroy(gameObject);
				}
		}
	}
	if (move){
		//print(transform.position.z);
		transform.Translate(Vector3.up * movespeed * Time.deltaTime);
	}
}



