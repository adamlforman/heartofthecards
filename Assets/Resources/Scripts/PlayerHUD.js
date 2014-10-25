var slot1 : GameObject;			//The object that will wear the texture of card 1.
var slot2 : GameObject;			//The object that will wear the texture of card 2.
var slot3 : GameObject;			//The object that will wear the texture of card 3.

var slot1Glow : GameObject;		//The object that will make a border around card 1 if it is being used.
var slot2Glow : GameObject;		//The object that will make a border around card 2 if it is being used.
var slot3Glow : GameObject;		//The object that will make a border around card 3 if it is being used.

var slot1Texture : String;		//The name of the texture for the card in slot 1. 
var slot2Texture : String;		//The name of the texture for the card in slot 2. 
var slot3Texture : String;		//The name of the texture for the card in slot 3.

var cam : Camera;
var player : GameObject;


//THIS SHOULD ALL GO IN THE INIT FUNCTION
function Start () {
	slot1Texture = "Textures/ARROW";		//all textures are ARROW for testing purposes
	slot2Texture = "Textures/ARROW";		//all textures are ARROW for testing purposes
	slot3Texture = "Textures/ARROW";		//all textures are ARROW for testing purposes
	
	
	//Makes Slot 1
	slot1 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot1.transform.parent = cam.transform;																//Parent Slot 1 to the camera.
	slot1.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.9, 10);	//Position the model in the top right.
	loadTexture(slot1Texture, slot1);																	//Load texture into slot1.
	slot1.name = "Slot 1";																				// Name the object.
	
	//Makes Slot 1 Border
	slot1Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot1Glow.transform.parent = slot1.transform;														//Parent the border to the slot.
	slot1Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot1Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot1Glow.renderer.material.mainTexture = Resources.Load("Textures/WHITE", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot1Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2
	slot2 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot2.transform.parent = cam.transform;																//Parent Slot 2 to the camera.
	slot2.transform.localPosition = Vector3(-cam.orthographicSize, cam.orthographicSize*0.9, 10);		// Position the model in the top right.
	loadTexture(slot2Texture, slot2);																	//Load texture into slot2.
	slot2.name = "Slot 2";																				// Name the object.
	
	//Makes Slot 2 Border
	slot2Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot2Glow.transform.parent = slot2.transform;														//Parent the border to the slot.
	slot2Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot2Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot2Glow.renderer.material.mainTexture = Resources.Load("Textures/WHITE", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot2Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 3
	slot3 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot3.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	slot3.transform.localPosition = Vector3(-cam.orthographicSize*0.8, cam.orthographicSize*0.9, 10);	// Position the model in the top right.
	loadTexture(slot3Texture, slot3);																	//Load texture into slot3.
	slot3.name = "Slot 3";																				// Name the object.

	//Makes Slot 3 Border
	slot3Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot3Glow.transform.parent = slot3.transform;														//Parent the border to the slot.
	slot3Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot3Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot3Glow.renderer.material.mainTexture = Resources.Load("Textures/WHITE", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot3Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.	

}

/*function init(cam : Camera, player : GameObject){
	
}*/

function Update () {
	
	//THIS IS NOT COMPLETE
	//It will actually be checking the players boolean values for whether their spell slots are active.
	
	
	var cast1 : float = Input.GetAxis("Fire1");		//variable that checks if you are trying to attack
	
	if(cast1 > 0){									
		slot1Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
		//slot1Glow.renderer.material.color = Color(1, 0, 0);
	}
	if(cast1 == 0){									
		slot1Glow.renderer.material.color = Color(1, 1, 1);
	}
}

//Loads the inputed texture name onto the model.
function loadTexture(textureName : String, model : GameObject){
	model.renderer.material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency.
}

//Creates a blue box the appear behind the given object.
function makeBlue(border : GameObject, model : GameObject){
	
}