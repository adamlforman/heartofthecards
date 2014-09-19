#pragma strict
var owner : floor; //variable for the owner of the model

//initialize the model script
function init(o : floor) {
owner = o; //owner is the player object
transform.parent = owner.transform; //setting the parent
transform.localPosition = Vector3(0,0,0); //setting positiion

name = "Floor Model"; //naming the model

renderer.material.color = Color(0,1,0); //setting the color of the model
}

//on update
function Update () {

}