var spellType : String;
var owner : GameObject;
var textureName : String;

function init(o : GameObject, t : String) {
	owner = o;										// Set up a pointer to the spell object containing this model.
	spellType = t;									// Record the spell type.
	
	transform.parent = owner.transform;				// Set the model's parent to the spell (this object).
	transform.localPosition = Vector3(0,0,0);		// Center the model on the parent.
	transform.localScale = Vector3(1,1,1);
	if (spellType == "ARROW") {
		transform.localScale = Vector3(0.3,1,1);
	}
	name = "spell Model";								// Name the object.
	
	textureName = "Textures/"+spellType;
	renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}

function Update () {
	
}