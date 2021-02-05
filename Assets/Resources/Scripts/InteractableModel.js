var owner : InteractableScript;  //IS THIS SCOPE NECESSARY?

function init(o : InteractableScript, interactableType : String) {
	owner = o; //Set up a pointer to the terrain object containing this model.
	
	transform.parent = owner.transform; //Set the model's parent
	transform.localPosition = Vector3(0,0,0); //Center the model on the parent.
	name = interactableType + " Model"; //Name the object.
	
	textureName = "Textures/" + interactableType; //Get the texture name with texture folder
	GetComponent.<Renderer>().material.mainTexture = Resources.Load(textureName, Texture2D);	//Set the texture.  Must be in Resources folder.
	GetComponent.<Renderer>().material.color = Color(1,1,1);	//Set the color (easy way to tint things).
	GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
}
