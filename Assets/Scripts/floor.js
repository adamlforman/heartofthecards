#pragma strict
var model : floorModel; //variable to address the script for appearance

//Initialize the playerScript
function init() {
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Cube); //Create cube model
	modelObject.SetActive(false); //Set model to not be active
	model = modelObject.AddComponent(floorModel); //Add script for appearance to model
	model.init(this); //initialize this script
	modelObject.SetActive(true); //set model to be active
}
//on update
function Update () {

}