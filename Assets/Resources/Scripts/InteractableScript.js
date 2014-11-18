function init(interactableType : String, quadMesh : Mesh) {
	var modelObject = new GameObject(); //Create an empty game object
	var meshFilter = modelObject.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = quadMesh; //Give the mesh filter a quadmesh
	modelObject.AddComponent(MeshRenderer); //Add a renderer for textures
	modelObject.SetActive(false); //Turn off the object so its script doesn't do anything until we're ready.
		
	model = modelObject.AddComponent(InteractableModel); //Add a model script to control visuals of the portal.
	model.init(this, interactableType); //Initialize the chestmodel.
	modelObject.transform.localPosition = Vector3(0,0,.5); //Set local position
	modelObject.SetActive(true);//Turn on the object (the Update function will start being called).
}