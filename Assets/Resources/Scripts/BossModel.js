var owner : GameObject;
var type : String;

function init(o : GameObject, texture : String) {
	this.owner = o;
	
	transform.parent = owner.transform;
	transform.localPosition = Vector3(0,0,0);
	if (texture == "Joe" && !transform.parent.gameObject.GetComponent(JoeController).ranged) {
		texture = "Enemy Warrior";
	}
	renderer.material.mainTexture = Resources.Load("Textures/"+texture,Texture2D);
	renderer.material.color = Color(1,1,1);
	if (texture == "Fire") {
		renderer.material.color = Color(0,0,1);
	}
	renderer.material.shader = Shader.Find ("Sprites/Default");
	
}

function Update(){
	transform.localPosition = Vector3(0,0,0);
	
}