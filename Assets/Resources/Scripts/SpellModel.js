var owner : GameObject;
var textureName : String;

function init(o : GameObject) {
	owner = o;										// Set up a pointer to the spell object containing this model.
	
	transform.parent = owner.transform;				// Set the model's parent to the spell (this object).
	transform.localPosition = Vector3(0,0,0);		// Center the model on the parent.
	transform.localRotation = Quaternion.identity;
	transform.localScale = Vector3(1,1,1);		// Scale the object to the parent
	
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency.
	
	if(owner.name == "Explosion"){
		textureName = "Textures/EXPLOSION";
	}
	else if(owner.name == "Shot"){
		textureName = "Textures/Triangle";					//Set the name of the texture path
	}
	else if(owner.name == "Enemy Shot"){
		textureName = "Textures/ARCHER";					//Set the name of the texture path
	}
	else if(owner.name == "Sword"){
		textureName = "Textures/SWORD";					//Set the name of the texture path
	}
	else if(owner.name == "Fist"){
		textureName = "Textures/FIST";					//Set the name of the texture path
	}
	else if(owner.name == "Enemy Fist"){
		textureName = "Textures/Enemy Fist";					//Set the name of the texture path
	}
	else if(owner.name == "Enemy Comet"){
		textureName = "Textures/Comet";
	}
	else if(owner.name == "Comet") {
		textureName = "Textures/Comet";
	}
	else if(owner.name == "Enemy Lava") {
		textureName = "Textures/Comet";
	}
	else if(owner.name == "Enemy Magma") {
		textureName = "Textures/Comet";
		renderer.material.color = Color(0.8,0.1,0.1);
	}
	renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
}

function Update () {
	var getColor : float;
	if (owner.name == "Enemy Comet") {
		getColor = owner.GetComponent(EnemySpell).delayTimer;
		renderer.material.color = Color(1-getColor,0,0);
	}
	else if (owner.name == "Comet") {
		getColor = owner.GetComponent(PlayerSpell).delayTimer;
		renderer.material.color = Color(0,0,1-getColor);
	}
	else if (owner.name == "Enemy Lava") {
		getColor = owner.GetComponent(Temporary).life;
		renderer.material.color = Color(getColor/20,0,0);
	}	
}

