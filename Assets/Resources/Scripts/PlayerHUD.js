﻿var slot1Ob : GameObject;			//The object that will wear the texture of card 1.
var slot2Ob : GameObject;			//The object that will wear the texture of card 2.
var slot3Ob : GameObject;			//The object that will wear the texture of card 3.
var keyOb : GameObject;				//The object that will wear the texture of the key.
var arrowOb : GameObject;			//The object that will wear the texture of the arrow.

var slot1Glow : GameObject;		//The object that will make a border around card 1 if it is being used.
var slot2Glow : GameObject;		//The object that will make a border around card 2 if it is being used.
var slot3Glow : GameObject;		//The object that will make a border around card 3 if it is being used.

var slot1Texture : String;		//The name of the texture for the card in slot 1. 
var slot2Texture : String;		//The name of the texture for the card in slot 2. 
var slot3Texture : String;		//The name of the texture for the card in slot 3.
var keyTexture : String;        //The name of the texture for the key.
var arrowTexture : String;        //The name of the texture for the arrow.

var healthbarOb : GameObject;	// The object that is the healthbar
var healthbarBgOb : GameObject;	// The object that is the healthbar's background
var healthTextOb : GameObject;	// the object that is the health text

var cam : Camera;
var player : GameObject;

var maxHealth : float;		// So we don't have to look it up on update
var curHealth : float;

public static var arrowIndicator: boolean = false;

private var keyLocation : Vector2;
private var location : Vector2;
private var levelEndLocation : Vector2;
private var healthPercent : float;
private var exampleMesh : Mesh;


function init(cam : Camera, player : GameObject) {
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	this.cam = cam;
	this.player = player;
	this.maxHealth = player.GetComponent(PlayerStatus).maxHealth;
	this.curHealth = player.GetComponent(PlayerStatus).curHealth;
	
	// Makes the healthbar
	healthbarOb = new GameObject();
	var meshFilter = healthbarOb.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	healthbarOb.AddComponent(MeshRenderer); //Add a renderer for textures
	healthbarOb.transform.parent = cam.transform;															// makes child of cam
	healthbarOb.transform.localPosition = Vector3(-cam.orthographicSize, cam.orthographicSize*0.9,10);		// Position in top center
	healthbarOb.name = "Health Bar";																		// we like names
	
	// Makes the healthbar's background
	healthbarBgOb = new GameObject();
	meshFilter = healthbarBgOb.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	healthbarBgOb.AddComponent(MeshRenderer); //Add a renderer for textures
	healthbarBgOb.transform.parent = cam.transform;															// Makes child of cam
	healthbarBgOb.transform.localPosition = Vector3(-cam.orthographicSize, cam.orthographicSize*0.9,10);	// Position in top center
	healthbarBgOb.transform.localScale = Vector3(4.2,0.7,1);
	healthbarBgOb.GetComponent.<Renderer>().material.color = Color(0,0,0);
	healthbarBgOb.name = "Health Bar background";															// names still good
	
	healthTextOb = new GameObject();									// health text object
	healthTextOb.name = "Player Health Text";							// named
	healthTextOb.transform.parent = cam.transform;
	healthTextOb.transform.localPosition = Vector3(0, cam.orthographicSize*0.95,10);				// positioned directly over healthbar (window position)
	healthTextOb.AddComponent(GUIText);									// add GUIText
	healthTextOb.GetComponent.<GUIText>().anchor = TextAnchor.MiddleCenter;				// which is centered
	healthTextOb.GetComponent.<GUIText>().fontSize = 24;									// legibly large
	healthTextOb.GetComponent.<GUIText>().fontStyle = FontStyle.Bold;					// bold
	healthTextOb.GetComponent.<GUIText>().font = Resources.Load("Arial",Font);			// and has a font
	
	
	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	keyTexture = "Textures/BACK";
	arrowTexture = "Textures/arrowI";
	
	
	//Makes Slot 1
	slot1Ob = new GameObject();											//Create the first game object
	meshFilter = slot1Ob.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot1Ob.AddComponent(MeshRenderer); //Add a renderer for textures
	slot1Ob.transform.parent = cam.transform;																//Parent Slot 1 to the camera.
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	//Position the model in the top right.
	slot1Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot1Texture, slot1Ob);																	//Load texture into slot1Ob.
	slot1Ob.name = "Slot 1";																				// Name the object.
	
	//Makes Slot 1 Border
	slot1Glow = new GameObject();									//Create the first game object's border
	meshFilter = slot1Glow.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot1Glow.AddComponent(MeshRenderer); //Add a renderer for textures
	slot1Glow.transform.parent = slot1Ob.transform;														//Parent the border to the slot.
	slot1Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot1Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot1Glow.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Glow.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot1Glow.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 1 Timer Background
	slot1Timer = new GameObject();										//Create the first game object's border
	meshFilter = slot1Timer.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot1Timer.AddComponent(MeshRenderer); //Add a renderer for textures
	slot1Timer.transform.parent = slot1Ob.transform;														//Parent the border to the slot.
	slot1Timer.transform.localPosition = Vector3(0.5, -0.5, -1);												//Center it on its parent
	slot1Timer.transform.localScale = Vector3(0.5, 0.5, 1);												//Scale it up to be bigger than parent
	slot1Timer.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BLACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot1Timer.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot1Timer.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2
	slot2Ob = new GameObject();												//Create the first game object
	meshFilter = slot2Ob.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot2Ob.AddComponent(MeshRenderer); //Add a renderer for textures
	slot2Ob.transform.parent = cam.transform;																//Parent Slot 2 to the camera.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.9, cam.orthographicSize*0.85, 10);		// Position the model in the top right.
	slot2Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot2Texture, slot2Ob);																	//Load texture into slot2Ob.
	slot2Ob.name = "Slot 2";																				// Name the object.
	
	//Makes Slot 2 Border
	slot2Glow = new GameObject();
	meshFilter = slot2Glow.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot2Glow.AddComponent(MeshRenderer); //Add a renderer for textures												//Create the first game object's border
	slot2Glow.transform.parent = slot2Ob.transform;														//Parent the border to the slot.
	slot2Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot2Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot2Glow.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Glow.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot2Glow.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2 Timer Background
	slot2Timer = new GameObject();	
	meshFilter = slot2Timer.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot2Timer.AddComponent(MeshRenderer); //Add a renderer for textures											//Create the first game object's border
	slot2Timer.transform.parent = slot2Ob.transform;														//Parent the border to the slot.
	slot2Timer.transform.localPosition = Vector3(0.5, -0.5, -1);												//Center it on its parent
	slot2Timer.transform.localScale = Vector3(0.5, 0.5, 1);												//Scale it up to be bigger than parent
	slot2Timer.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BLACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot2Timer.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot2Timer.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 3
	slot3Ob = new GameObject();													//Create the first game object
	meshFilter = slot3Ob.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot3Ob.AddComponent(MeshRenderer); //Add a renderer for textures
	slot3Ob.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.6, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	slot3Ob.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(slot3Texture, slot3Ob);																	//Load texture into slot3Ob.
	slot3Ob.name = "Slot 3";																				// Name the object.

	//Makes Slot 3 Border
	slot3Glow = new GameObject();												//Create the first game object's border
	meshFilter = slot3Glow.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot3Glow.AddComponent(MeshRenderer); //Add a renderer for textures
	slot3Glow.transform.parent = slot3Ob.transform;														//Parent the border to the slot.
	slot3Glow.transform.localPosition = Vector3(0, 0, 1);												//Center it on its parent
	slot3Glow.transform.localScale = Vector3(1.5, 1.5, 1);												//Scale it up to be bigger than parent
	slot3Glow.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Glow.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot3Glow.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.
	
	//Makes Slot 2 Timer Background
	slot3Timer = new GameObject();												//Create the first game object's border
	meshFilter = slot3Timer.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	slot3Timer.AddComponent(MeshRenderer); //Add a renderer for textures
	slot3Timer.transform.parent = slot3Ob.transform;														//Parent the border to the slot.
	slot3Timer.transform.localPosition = Vector3(0.5, -0.5, -1);												//Center it on its parent
	slot3Timer.transform.localScale = Vector3(0.5, 0.5, 1);												//Scale it up to be bigger than parent
	slot3Timer.GetComponent.<Renderer>().material.mainTexture = Resources.Load("Textures/BLACK", Texture2D);				// Set the texture.  Must be in Resources folder.
	slot3Timer.GetComponent.<Renderer>().material.color = Color(0,0,0);													// Set the color to black.
	slot3Timer.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");							// Tell the renderer that our textures have transparency.

	//Makes Key
	keyOb = new GameObject();													//Create the first game object
	meshFilter = keyOb.AddComponent(MeshFilter); //Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
	keyOb.AddComponent(MeshRenderer); //Add a renderer for textures
	keyOb.transform.parent = cam.transform;																//Parent Slot 3 to the camera.
	keyOb.transform.localPosition = Vector3(cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	keyOb.transform.localScale = Vector3(0.75, 0.75, 1);													//Scale down the size
	loadTexture(keyTexture, keyOb);																	//Load texture into keyOb.
	keyOb.name = "Key Slot";	
	

}

function Update () {
	if (arrowIndicator == true) {
		//Makes Arrow
		arrowOb = new GameObject();												//Create the first game object
		var meshFilter = arrowOb.AddComponent(MeshFilter); //Add a mesh filter for textures
		meshFilter.mesh = exampleMesh; //Give the mesh filter a quadmesh
		arrowOb.AddComponent(MeshRenderer); //Add a renderer for textures
		arrowOb.transform.localPosition = Vector3(0, 0, -5);	// Position the model in the top right.
		arrowOb.transform.localScale = Vector3(3, 3, 1);													//Scale down the size
		loadTexture(arrowTexture, arrowOb);																	//Load texture into keyOb.
		arrowOb.name = "Arrow Indicator";
		arrowIndicator = false;		
		
		keyLocation = BuildWorldScript.keyLocation;
		location = keyLocation;
		levelEndLocation = BuildWorldScript.levelEndLocation;
	}

	slot1Texture = "Textures/" + PlayerSpellbook.slot1;		//Copies slot 1 from spellbook.
	slot2Texture = "Textures/" + PlayerSpellbook.slot2;		//Copies slot 2 from spellbook.
	slot3Texture = "Textures/" + PlayerSpellbook.slot3;		//Copies slot 3 from spellbook.
	loadTexture(slot1Texture, slot1Ob);		//Loads the texture to slot 1
	loadTexture(slot2Texture, slot2Ob);		//Loads the texture to slot 2
	loadTexture(slot3Texture, slot3Ob);		//Loads the texture to slot 3
	loadTexture(keyTexture, keyOb);
	
	
	if (arrowOb) {
		arrowOb.transform.position = Vector3(player.transform.position.x, player.transform.position.y, -5);
		arrowOb.transform.rotation = Quaternion.Euler(0, 0, Mathf.Atan2(location.y - transform.position.y, location.x - transform.position.x) * Mathf.Rad2Deg - 90);
	}
	slot1Ob.transform.localPosition = Vector3(-cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);		//Position the model in the top right.
	slot2Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.9, cam.orthographicSize*0.85, 10);		// Position the model in the top right.
	slot3Ob.transform.localPosition = Vector3(-cam.orthographicSize*0.6, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	keyOb.transform.localPosition = Vector3(cam.orthographicSize*1.2, cam.orthographicSize*0.85, 10);	// Position the model in the top right.
	
	// calculate current health %
	if (maxHealth != 0) {
		healthPercent = curHealth / maxHealth;
	}
	// high health bars are green
	if (healthPercent > 0.5) {
		healthbarOb.GetComponent.<Renderer>().material.color = Color(0,.8,0);
	}
	// medium is yellow
	else if (healthPercent > 0.2) {
		healthbarOb.GetComponent.<Renderer>().material.color = Color(.8,.8,0);
	}
	// low is red
	else {
		healthbarOb.GetComponent.<Renderer>().material.color = Color(.8,0,0);
	}
	healthbarOb.transform.localScale = Vector3(healthPercent*4f, 0.5,1);														// Shrink the healthbar with lost health
	healthbarOb.transform.localPosition = Vector3(-(1-healthPercent)*2, cam.orthographicSize*0.9, 10);	// And reposition it so it appears to be shrinking straight left
	healthbarBgOb.transform.localPosition = Vector3(0, cam.orthographicSize*0.9, 11);											// Make sure the background tracks the camera
	healthTextOb.transform.localPosition = Vector3(0, cam.orthographicSize*0.95,9);
	healthTextOb.GetComponent.<GUIText>().text = curHealth + " / " + maxHealth;			// update health text
	
	if(PlayerSpellbook.slot1Timer>0){									
		slot1Glow.GetComponent.<Renderer>().material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot1Timer<= 0){									
		slot1Glow.GetComponent.<Renderer>().material.color = Color(0, 0, 0);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot2Timer>0){									
		slot2Glow.GetComponent.<Renderer>().material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot2Timer<= 0){									
		slot2Glow.GetComponent.<Renderer>().material.color = Color(0, 0, 0);					//Set it back to white
	}
	
	if(PlayerSpellbook.slot3Timer>0){									
		slot3Glow.GetComponent.<Renderer>().material.color = Color(0.42, 0.79, 0.89);		//Set the border to glow light blue
	}
	if(PlayerSpellbook.slot3Timer<= 0){									
		slot3Glow.GetComponent.<Renderer>().material.color = Color(0, 0, 0);						//Set it back to white
	}
}

//Loads the inputed texture name onto the model.
function loadTexture(textureName : String, model : GameObject){
	model.GetComponent.<Renderer>().material.mainTexture = Resources.Load(textureName, Texture2D);				// Set the texture.  Must be in Resources folder.
	model.GetComponent.<Renderer>().material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.GetComponent.<Renderer>().material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency.
}

//Creates a blue box the appear behind the given object.
function makeBlue(border : GameObject, model : GameObject){
	
}

function key(){
	keyTexture = "Textures/Key";
	location = levelEndLocation;
}