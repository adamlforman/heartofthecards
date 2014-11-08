﻿var owner : GameObject;
var textureName : String;

function init(o : GameObject) {
	owner = o;										// Set up a pointer to the spell object containing this model.
	
	transform.parent = owner.transform;				// Set the model's parent to the spell (this object).
	transform.localPosition = Vector3(0,0,0);		// Center the model on the parent.
	transform.localRotation = Quaternion.identity;
	transform.localScale = Vector3(1,1,1);		// Scale the object to the parent
	
	if(owner.name == "Explosion"){
		textureName = "Textures/EXPLOSION";
	}
	else if(owner.name == "Shot"){
		textureName = "Textures/ARROW";					//Set the name of the texture path
	}
	else if(owner.name == "Sword"){
		textureName = "Textures/SWORD";					//Set the name of the texture path
		print(textureName);
	}
	renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}

function Update () {
	
}

