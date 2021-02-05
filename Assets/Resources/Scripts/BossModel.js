var owner : GameObject;
var type : String;

function init(o : GameObject, texture : String) {
	this.owner = o;
	
	transform.parent = owner.transform;
	transform.localPosition = Vector3(0,0,0);
	GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/"+texture,Texture2D);
	GetComponent.<Renderer>().material.color = Color(1,1,1);
	if (texture == "Fire") {
		GetComponent.<Renderer>().material.color = Color(0,0,1);
	}
	GetComponent.<Renderer>().material.shader = Shader.Find ("Sprites/Default");
	
}

function Update(){
	transform.localPosition = Vector3(0,0,0);
	
}