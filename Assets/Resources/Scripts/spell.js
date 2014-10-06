﻿var spellType : String;

var snare : boolean;
var slow : boolean;

function init(spellType : String) {
	this.spellType = spellType;
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent("spellModel");					// Add a spellModel script to control visuals of the spell.
	model.init(this, spellType);										// Initialize the spellModel.
	
	
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
	if (spellType == "WEB")
		snare = true;
	else
		snare = false;
		
	if (spellType == "ICE")
		slow = true;
	else
		slow = false;
}

function Update() {
	if (snare || slow) {
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
				if (!otherOb.snare && snare) {
					otherOb.snare = true;
					otherOb.snareTimer = gameObject.GetComponent("temporary").life;
				}
				if (!otherOb.slow && slow) {
					otherOb.slow = true;
					otherOb.slowTimer = 5;
				}
			}
		}
	}
}



