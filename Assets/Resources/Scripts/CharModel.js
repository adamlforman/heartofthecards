var owner : GameObject; //SCOPE TOOTH PASTE

function init(owner : GameObject, texture : String) {
	this.owner = owner; //Set up a pointer to the object containing this model.
	
	transform.parent = owner.transform;
	transform.localPosition = Vector3(0,0,0);
	GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/"+texture,Texture2D); //Set the texture.  Must be in Resources folder
	GetComponent.<Renderer>().material.color = Color(1,1,1);	//Set the color (easy way to tint things).
	GetComponent.<Renderer>().material.shader = Shader.Find("Sprites/Default"); //Tell the renderer that our textures have transparency.
}

function changeColor(color : Color) {
	GetComponent.<Renderer>().material.color = color;
}

/*function Update(){
	//transform.localPosition = Vector3(0,0,0);
	//IF SOMETHIGN WHEN HORRIBLY WRONG, I COMMENTED THIS OUT, LOBSTER
}*/