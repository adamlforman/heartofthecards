var terrainType : String; //The type of terrain (ground1-4 / rock) IS THIS NECESSARY FOR SCOPE?


//Initializes the terrain
function init(terrainType : String, quadMesh : Mesh) {
	this.terrainType = terrainType; //Sets the terrainType to be the one given by buildWorld
	var modelObject = new GameObject(); //Create a quad object to hold the tile texture.
	var meshFilter = modelObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = quadMesh; //Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); //Add a renderer for textures
	modelObject.SetActive(false); //Turn off the object so its script doesn't do anything until we're ready.
	model = modelObject.AddComponent(TerrainModel); //Add a terrainModel script to control visuals of the terrain.
	model.init(this, terrainType); //Initialize the terrainModel.
	
	

	//If it is a rock, add a rigidbody and boxcollider for collisions
	if (terrainType == "ROCK") {
		var boxCollider2D = modelObject.AddComponent(BoxCollider2D); //Add a box collider
		var rigidModel = modelObject.AddComponent(Rigidbody2D); //Add a rigid body for collisions
		rigidModel.isKinematic = true; //Set kinematic to true
		rigidModel.fixedAngle = true; //Set fixed angle to true
		rigidModel.gravityScale = 0; 								//Turn off gravity
	}
	modelObject.SetActive(true); //Turn on the object (the Update function will start being called).
	
	
}

function Update() {
	
}

function OnTriggerEnter(other : Collider){
	print("rock");
	if(other.gameObject.name == "Shot"){
		Destroy(other.gameObject);
	}
}

