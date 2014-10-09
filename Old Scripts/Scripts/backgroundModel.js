/*var owner : background;
function init(o : background) {
	owner = o;										// Set up a pointer to the terrain object containing this model.
	
	transform.parent = owner.transform;				// Set the model's parent to the terrain (this object).
	transform.localPosition = Vector3(0,0,0);		// Center the model on the parent.
	transform.localScale = Vector3(1,1,1);
	name = "background Model";								// Name the object.
	
	textureName = "Textures/"+"levelEnd";
	renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}
*/