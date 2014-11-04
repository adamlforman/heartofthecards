var owner : GameObject;
var textureName : String;

function init(o : GameObject, name : String) {
	owner = o;										// Set up a pointer to the spell object containing this model.
	textureName = name;
	transform.parent = owner.transform;				// Set the model's parent to the spell (this object).
	transform.localPosition = Vector3(0,0,-1);		// Center the model on the parent.
	transform.rotation = Quaternion.identity;
	
	transform.localScale = Vector3(1.2,1.2,1);		// Scale the object to the parent
	
	name = "Buff Effect Model";							// Name the object.
	textureName = "Textures/" + textureName;					//Set the name of the texture path
	renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}

function Update () {
	transform.rotation = Quaternion.identity;
}

