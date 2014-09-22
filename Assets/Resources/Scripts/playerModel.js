#pragma strict
var owner : player; //variable for the owner of the model

//initialize the model script
function init(o : player) {
owner = o; //owner is the player object
transform.parent = owner.transform; //setting the parent
transform.localPosition = Vector3(0,0,0); //setting positiion

name = "Player Model"; //naming the model

renderer.material.color = Color(0,0,1); //settinf the color of the model
}

//on update
function Update () {

}