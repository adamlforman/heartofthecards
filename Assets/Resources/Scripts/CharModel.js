var owner : GameObject; //SCOPE TOOTH PASTE

function init(owner : GameObject, texture : String) {
	this.owner = owner; //Set up a pointer to the object containing this model.
	
	transform.parent = owner.transform;
	transform.localPosition = Vector3(0,0,0);
	renderer.material.mainTexture = Resources.Load("Textures/"+texture,Texture2D); //Set the texture.  Must be in Resources folder
	renderer.material.color = Color(1,1,1);	//Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency.
}