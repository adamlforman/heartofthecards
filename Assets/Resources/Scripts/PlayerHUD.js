var slot1Ob : GameObject;			//The object that will wear the texture of card 1.
var slot2Ob : GameObject;			//The object that will wear the texture of card 2.
var slot3Ob : GameObject;			//The object that will wear the texture of card 3.
var keyOb : GameObject;

var slot1Glow : GameObject;		//The object that will make a border around card 1 if it is being used.
var slot2Glow : GameObject;		//The object that will make a border around card 2 if it is being used.
var slot3Glow : GameObject;		//The object that will make a border around card 3 if it is being used.

var slot1Texture : String;		//The name of the texture for the card in slot 1. 
var slot2Texture : String;		//The name of the texture for the card in slot 2. 
var slot3Texture : String;		//The name of the texture for the card in slot 3.
var keyTexture : String;

var healthbarOb : GameObject;	// The object that is the healthbar
var healthbarBgOb : GameObject;	// The object that is the healthbar's background
var healthTextOb : GameObject;	// the object that is the health text

var cam : Camera;
var player : GameObject;

var maxHealth : float;		// So we don't have to look it up on update
var curHealth : float;


function init(cam : Camera, player : GameObject){
	this.cam = cam;
	this.player = player;
	this.maxHealth = player.GetComponent(PlayerStatus).maxHealth;
	this.curHealth = player.GetComponent(PlayerStatus).curHealth;
	
	// Makes the healthbar
	healthbarOb = GameObject.CreatePrimitive(PrimitiveType.Quad);
	healthbarOb.transform.parent = cam.transform;															// makes child of cam
	healthbarOb.transform.localPosition = Vector3(-cam.orthographicSize, cam.orthographicSize*0.9,10);		// Position in top center
	healthbarOb.name = "Health Bar";																		// we like names
	
	// Makes the healthbar's background
	healthbarBgOb = GameObject.CreatePrimitive(PrimitiveType.Quad);
	healthbarBgOb.transform.parent = cam.transform;															// Makes child of cam
	healthbarBgOb.transform.localPosition = Vector3(-cam.orthographicSize, cam.orthographicSize*0.9,10);	// Position in top center
	healthbarBgOb.transform.localScale = Vector3(4.2,0.7,1);
	healthbarBgOb.renderer.material.color = Color(0,0,0);
	healthbarBgOb.name = "Health Bar background";															// names still good
	
	healthTextOb = new GameObject();									// health text object
	healthTextOb.name = "Player Health Text";							// named
	healthTextOb.transform.position = Vector2(0.5,0.95);				// positioned directly over healthbar (window position)
	healthTextOb.AddComponent(GUIText);									// add GUIText
	healthTextOb.guiText.anchor = TextAnchor.MiddleCenter;				// which is centered
	healthTextOb.guiText.fontSize = 24;									// legibly large
	healthTextOb.guiText.fontStyle = FontStyle.Bold;					// bold
	healthTextOb.guiText.font = Resources.Load("Arial",Font);			// and has a font
	
	
	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	keyTexture = "Textures/BACK";
	
	
	//Makes Slot 1
	slot1Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot1Ob.transform.parent = cam.transform;																//Parent Slot 1 to the camera.
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	//Position the model in the top right.
	slot1Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot1Texture, slot1Ob);																	//Load texture into slot1Ob.
	slot1Ob.name = "Slot 1";																				// Name the object.
	
	//Makes Slot 1 Border
	slot1Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot1Glow.transform.parent = slot1Ob.transform;														//Parent the border to the slot.
	slot1Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot1Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot1Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Glow.renderer.material.color = Color(0,0,0);													// Set the color to black.
	slot1Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2
	slot2Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot2Ob.transform.parent = cam.transform;																//Parent Slot 2 to the camera.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.9, cam.orthographicSize*0.85, 10);		// Position the model in the top right.
	slot2Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot2Texture, slot2Ob);																	//Load texture into slot2Ob.
	slot2Ob.name = "Slot 2";																				// Name the object.
	
	//Makes Slot 2 Border
	slot2Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot2Glow.transform.parent = slot2Ob.transform;														//Parent the border to the slot.
	slot2Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot2Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot2Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Glow.renderer.material.color = Color(0,0,0);													// Set the color to black.
	slot2Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 3
	slot3Ob = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	slot3Ob.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.6, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	slot3Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot3Texture, slot3Ob);																	//Load texture into slot3Ob.
	slot3Ob.name = "Slot 3";																				// Name the object.

	//Makes Slot 3 Border
	slot3Glow = GameObject.CreatePrimitive(PrimitiveType.Quad);											//Create the first game object's border
	slot3Glow.transform.parent = slot3Ob.transform;														//Parent the border to the slot.
	slot3Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot3Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot3Glow.renderer.material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Glow.renderer.material.color = Color(0,0,0);													// Set the color to black.
	slot3Glow.renderer.material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.

	//Makes Key
	keyOb = GameObject.CreatePrimitive(PrimitiveType.Quad);												//Create the first game object
	keyOb.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	keyOb.transform.localPosition = Vector3(cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	keyOb.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(keyTexture, keyOb);																	//Load texture into keyOb.
	keyOb.name = "Key Slot";																				// Name the object.


}

function Update () {
	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	loadTexture(slot1Texture, slot1Ob);		//Loads the texture to slot 1
	loadTexture(slot2Texture, slot2Ob);		//Loads the texture to slot 2
	loadTexture(slot3Texture, slot3Ob);		//Loads the texture to slot 3
	loadTexture(keyTexture, keyOb);
	
	
	
	
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);		//Position the model in the top right.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.9, cam.orthographicSize*0.85, 10);		// Position the model in the top right.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.6, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	keyOb.transform.localPosition = Vector3(cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	
	// calculate current health %
	var healthPercent : float;
	if (maxHealth != 0) {
		healthPercent = curHealth / maxHealth;
	}
	// high health bars are green
	if (healthPercent > 0.5) {
		healthbarOb.renderer.material.color = Color(0,.8,0);
	}
	// medium is yellow
	else if (healthPercent > 0.2) {
		healthbarOb.renderer.material.color = Color(.8,.8,0);
	}
	// low is red
	else {
		healthbarOb.renderer.material.color = Color(.8,0,0);
	}
	healthbarOb.transform.localScale = Vector3(healthPercent*4f, 0.5,1);														// Shrink the healthbar with lost health
	healthbarOb.transform.localPosition = Vector3(-(1-healthPercent)*cam.orthographicSize*0.4, cam.orthographicSize*0.9, 10);	// And reposition it so it appears to be shrinking straight left
	healthbarBgOb.transform.localPosition = Vector3(0, cam.orthographicSize*0.9, 11);											// Make sure the background tracks the camera
	
	healthTextOb.guiText.text = curHealth + " / " + maxHealth;			// update health text
	
	if(PlayerSpellbook.slot1Timer>0){									
		slot1Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot1Timer<= 0){									
		slot1Glow.renderer.material.color = Color(0, 0, 0);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot2Timer>0){									
		slot2Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot2Timer<= 0){									
		slot2Glow.renderer.material.color = Color(0, 0, 0);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot3Timer>0){									
		slot3Glow.renderer.material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot3Timer<= 0){									
		slot3Glow.renderer.material.color = Color(0, 0, 0);						//Set it back to white
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

function key(){
	keyTexture = "Key";
}