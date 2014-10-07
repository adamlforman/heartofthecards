var target : Transform;		// Object that this label should follow
var offset = Vector3.up;	// Units in world space to offset; 1 unit above object by default
var clampToScreen = false;	// If true, label will be visible even if object is off screen
var clampBorderSize = .05;	// How much viewport space to leave at the borders when a label is being clamped
var useMainCamera = true;	// Use the camera tagged MainCamera
var cameraToUse : Camera;	// Only use this if useMainCamera is false
private var cam : Camera;
private var camTransform : Transform;
var scale : float;

var character : enemy2D;
static var curHp : float;
static var maxHp : float;
//static var curMana : float;
//static var maxMana : float;
var HpBarTexture : Texture2D;
//var ManaBarTexture : Texture2D;
var hpBarLength : float;
var percentOfHp : float;
//var manaBarLength : float;
//var percentOfMana :float;
 
function init (character : enemy2D,target : Transform, maxHp : float, maxMana : float) {
	this.character = character;
	this.target = target;
	if (useMainCamera)
		cam = Camera.main;
	else
		cam = cameraToUse;
	camTransform = cam.transform;
	
	this.maxHp = maxHp;
	this.curHp = maxHp;
	
	
	//this.maxMana = maxMana;
	//this.curMana = maxMana;
	
	scale = Vector3.Distance(cam.WorldToViewportPoint(target.position),cam.WorldToViewportPoint(target.position + offset));
	
	HpBarTexture = Resources.Load("HpBar",Texture2D);
	////ManaBarTexture = Resources.Load("ManaBar",Texture2D);
}
 
function Update () {
	/*if (clampToScreen) {
		var relativePosition = camTransform.InverseTransformPoint(target.position);
		relativePosition.y = Mathf.Max(relativePosition.y, 1.0);
		transform.position = cam.WorldToViewportPoint(camTransform.TransformPoint(relativePosition + offset));
		transform.position = Vector3(Mathf.Clamp(transform.position.x, clampBorderSize, 1.0-clampBorderSize),
										 Mathf.Clamp(transform.position.y, clampBorderSize, 1.0-clampBorderSize),
										 transform.position.z);
	}
	else {
		transform.position = cam.WorldToViewportPoint(target.position + offset);
	}*/
	
	curHp = character.health;
	percentOfHP = curHp/maxHp;
	hpBarLength = percentOfHP*5000*scale;

	//percentOfMana = curMana/maxMana;
	//manaBarLength = percentOfMana*100;
}
 
@script RequireComponent(GUIText)


function OnGUI () {
	var location : Vector3 = cam.WorldToViewportPoint(target.position + offset);
	//Debug.Log(location);
	if (!HpBarTexture)
		HpBarTexture = Resources.Load("Textures/HpBar",Texture2D);
	if (curHp > 0 && HpBarTexture) {
       		GUI.DrawTexture(Rect((location.x*Screen.width - scale*.5*5000), Screen.height - location.y*Screen.height  , hpBarLength, 200*scale), HpBarTexture); 
    }
    else
    	Debug.Log("curHP = "+curHp);
    	//if (curMana > 0) {
        //	GUI.DrawTexture(Rect((Screen.width/2) - 100, 20, manaBarLength, 10), ManaBarTexture); 
        //}
}