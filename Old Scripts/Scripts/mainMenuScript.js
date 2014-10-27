#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(Screen.width/2 - 75,200,150,50),"Platforming Demo"))
		Application.LoadLevel("platTest");
	if (GUI.Button(Rect(Screen.width/2 - 75,300,150,50),"Effects Demo"))
		Application.LoadLevel("cardTest");
	if (GUI.Button(Rect(Screen.width/2 - 75,400,150,50),"Fighting Demo"))
		Application.LoadLevel("enemyTest");
}