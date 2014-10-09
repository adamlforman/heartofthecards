var terrainType : String;



function init(terrainType : String) {
	this.terrainType = terrainType;
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Cube);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	var rigidModel = modelObject.AddComponent(Rigidbody);
	rigidModel.useGravity = false;
	model = modelObject.AddComponent("terrainModel");					// Add a terrainModel script to control visuals of the terrain.
	model.init(this, terrainType);										// Initialize the terrainModel.
	if (terrainType == "ROCK") {
		modelObject.layer = LayerMask.NameToLayer("Collisions");
	}
	
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
	
}

function Update() {
	
}



