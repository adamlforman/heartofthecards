var spellType : int;

function init(spellType : int) {
	this.spellType = spellType;
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent("spellModel");					// Add a spellModel script to control visuals of the spell.
	model.init(this, spellType);										// Initialize the spellModel.
	
	
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
}



