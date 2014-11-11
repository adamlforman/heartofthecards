var owner : GameObject;
var type : String;

function init(o : GameObject, texture : String) {
	this.owner = o;
	
	transform.parent = owner.transform;
	transform.localPosition = Vector3(0,0,0);
	renderer.material.mainTexture = Resources.Load("Textures/"+texture,Texture2D);
	renderer.material.color = Color(1,1,1);
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");
	
	if (texture == "Bob") {
		transform.localScale = Vector2(2,2);
	}
}

function Update(){
	transform.localPosition = Vector3(0,0,0);
	
}