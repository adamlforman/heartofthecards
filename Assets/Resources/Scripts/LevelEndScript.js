function init(quadMesh : Mesh) {
	var modelObject = new GameObject(); //Create a quad object to hold the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = quadMesh; //Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); //Add a renderer for textures
	modelObject.SetActive(false); //Turn off the object so its script doesn't do anything until we're ready.
	
	var boxCollider2D = modelObject.AddComponent(BoxCollider2D); //Add a box collider	
	
	model = modelObject.AddComponent("levelEndModel");					// Add a terrainModel script to control visuals of the terrain.
	model.init(this);										// Initialize the terrainModel.

	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
}

