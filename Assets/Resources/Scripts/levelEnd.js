function init() {
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Cube);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent("levelEndModel");					// Add a terrainModel script to control visuals of the terrain.
	model.init(this);										// Initialize the terrainModel.

	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
	
}

function Update() {
	
}

