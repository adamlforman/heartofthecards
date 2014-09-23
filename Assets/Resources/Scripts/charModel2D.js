#pragma strict

var owner : GameObject;

function init(owner : GameObject, texture : String) {
	this.owner = owner;
	Debug.Log("charModel2D init: "+texture);
	renderer.material.mainTexture = Resources.Load("Textures/"+texture,Texture2D);
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");
}