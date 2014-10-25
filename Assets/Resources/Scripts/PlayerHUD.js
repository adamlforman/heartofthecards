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




function init(cam : Camera, player : GameObject){
	this.cam = cam;
	this.player = player;
	slot1Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot3;		//Copies slot 3 from spellbook.
	
	
	//Makes Slot 1
	slot1 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot1.transform.parent = cam.transform;																//Parent Slot 1 to the camera.
	slot1.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.9, 10);	//Position the model in the top right.
	slot1.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot1Texture, slot1);																	//Load texture into slot1.
	slot1.name = "Slot 1";																				// Name the object.
	
	//Makes Slot 1 Border
	slot1Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot1Glow.transform.parent = slot1.transform;														//Parent the border to the slot.
	slot1Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot1Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot1Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot1Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2
	slot2 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot2.transform.parent = cam.transform;																//Parent Slot 2 to the camera.
	slot2.transform.localPosition = Vector3(-cam.orthographicSize*1, cam.orthographicSize*0.9, 10);		// Position the model in the top right.
	slot2.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot2Texture, slot2);																	//Load texture into slot2.
	slot2.name = "Slot 2";																				// Name the object.
	
	//Makes Slot 2 Border
	slot2Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot2Glow.transform.parent = slot2.transform;														//Parent the border to the slot.
	slot2Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot2Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot2Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot2Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 3
	slot3 = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot3.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	slot3.transform.localPosition = Vector3(-cam.orthographicSize*0.8, cam.orthographicSize*0.9, 10);	// Position the model in the top right.
	slot3.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot3Texture, slot3);																	//Load texture into slot3.
	slot3.name = "Slot 3";																				// Name the object.

	//Makes Slot 3 Border
	slot3Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot3Glow.transform.parent = slot3.transform;														//Parent the border to the slot.
	slot3Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot3Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot3Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot3Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
}

function Update () {
	slot1Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + player.GetComponent(PlayerSpellbook).slot3;		//Copies slot 3 from spellbook.
	loadTexture(slot1Texture, slot1);		//Loads the texture to slot 1
	loadTexture(slot1Texture, slot2);		//Loads the texture to slot 2
	loadTexture(slot1Texture, slot3);		//Loads the texture to slot 3
	//THIS IS NOT COMPLETE
	//It will actually be checking the players boolean values for whether their spell slots are active.
	
	
	
	slot1.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.87, 10);		//Position the model in the top right.
	slot2.transform.localPosition = Vector3(-cam.orthographicSize*1, cam.orthographicSize*0.87, 10);		// Position the model in the top right.
	slot3.transform.localPosition = Vector3(-cam.orthographicSize*0.8, cam.orthographicSize*0.87, 10);	// Position the model in the top right.

	
	if(PlayerSpellbook.slot1Timer>0){									
		slot1Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot1Timer<= 0){									
		slot1Glow.renderer.material.color = Color(1, 1, 1);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot2Timer>0){									
		slot2Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot2Timer<= 0){									
		slot2Glow.renderer.material.color = Color(1, 1, 1);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot3Timer>0){									
		slot3Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot3Timer<= 0){									
		slot3Glow.renderer.material.color = Color(1, 1, 1);					//Set it back to white
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