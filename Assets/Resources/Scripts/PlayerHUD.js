var slot1Ob : GameObject;			//The object that will wear the texture of card 1.
var slot2Ob : GameObject;			//The object that will wear the texture of card 2.
var slot3Ob : GameObject;			//The object that will wear the texture of card 3.

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
	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	
	
	//Makes Slot 1
	slot1Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot1Ob.transform.parent = cam.transform;																//Parent Slot 1 to the camera.
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.9, 10);	//Position the model in the top right.
	slot1Ob.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot1Texture, slot1Ob);																	//Load texture into slot1Ob.
	slot1Ob.name = "Slot 1";																				// Name the object.
	
	//Makes Slot 1 Border
	slot1Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot1Glow.transform.parent = slot1Ob.transform;														//Parent the border to the slot.
	slot1Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot1Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot1Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot1Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2
	slot2Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot2Ob.transform.parent = cam.transform;																//Parent Slot 2 to the camera.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*1, cam.orthographicSize*0.9, 10);		// Position the model in the top right.
	slot2Ob.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot2Texture, slot2Ob);																	//Load texture into slot2Ob.
	slot2Ob.name = "Slot 2";																				// Name the object.
	
	//Makes Slot 2 Border
	slot2Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot2Glow.transform.parent = slot2Ob.transform;														//Parent the border to the slot.
	slot2Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot2Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot2Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot2Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 3
	slot3Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot3Ob.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.8, cam.orthographicSize*0.9, 10);	// Position the model in the top right.
	slot3Ob.transform.localScale = Vector3(0.5, 0.5, 1);													//Scale down the size
	loadTexture(slot3Texture, slot3Ob);																	//Load texture into slot3Ob.
	slot3Ob.name = "Slot 3";																				// Name the object.

	//Makes Slot 3 Border
	slot3Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot3Glow.transform.parent = slot3Ob.transform;														//Parent the border to the slot.
	slot3Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot3Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot3Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Glow.renderer.material.color = Color(1,1,1);													// Set the color to black.
	slot3Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
}

function Update () {
	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	loadTexture(slot1Texture, slot1Ob);		//Loads the texture to slot 1
	loadTexture(slot2Texture, slot2Ob);		//Loads the texture to slot 2
	loadTexture(slot3Texture, slot3Ob);		//Loads the texture to slot 3
	//THIS IS NOT COMPLETE
	//It will actually be checking the players boolean values for whether their spell slots are active.
	
	
	
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.87, 10);		//Position the model in the top right.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*1, cam.orthographicSize*0.87, 10);		// Position the model in the top right.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.8, cam.orthographicSize*0.87, 10);	// Position the model in the top right.

	
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