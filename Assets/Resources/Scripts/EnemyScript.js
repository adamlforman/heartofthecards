var exampleMesh : Mesh;  //Mesh so we can not create primitive objects to hold things, before we switch to sprites
function init (quadMesh : Mesh) {
	exampleMesh = quadMesh;
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	print("enemy");
	if(other.gameObject.name == "Shot") {
		/*var damageTextScript = playerObject.AddComponent(DamageText);			//Add the DamageText Script
		damageTextScript.init(this);*/


		
		var damageObject = new GameObject("DamageText");
		damageObject.transform.parent = this.transform;
		damageObject.transform.localPosition = Vector3(.5, -.25, -2);
		damageObject.transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
		var meshFilter = damageObject.AddComponent(MeshFilter); //Add a mesh filter for textures
		meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
		damageObject.AddComponent(MeshRenderer); //Add a renderer for textures
		var textureName = "Textures/TEN"; //Get the texture name with texture folder
		damageObject.renderer.material.mainTexture = Resources.Load(textureName, Texture2D); //Set the texture.  Must be in Resources folder.
		damageObject.renderer.material.color = Color(1,0,0); //Set the color (easy way to tint things).
		damageObject.renderer.material.shader = Shader.Find ("Transparent/Diffuse"); //Tell the renderer that our textures have transparency. 
		
		Destroy(damageObject, 1);
		other.gameObject.GetComponent(PlayerSpell).hit(gameObject);
	}
}