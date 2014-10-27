/*
var dmgTextLocation : Vector3 = Camera.main.WorldToScreenPoint(transform.position);
		dmgTextLocation.x /= Screen.width;
		dmgTextLocation.y /= Screen.height;

		var damageText : GUIText;
		var damageObject = new GameObject("DamageText");
		damageObject.transform.position = dmgTextLocation;
		damageText = damageObject.AddComponent(GUIText);
		damageText.text = "10";
		damageText.fontSize = 20;
		damageText.color = Color(1, 0, 0);
		Destroy(damageObject, 1);

//How Gabe will make everything collide
	//Add rigidbody2ds + box collider2ds to eveything
	//Everythign should get fixed angle set equal to true
	//Things that will not move should be kinematic


//How Gabe will do knockback
	//On trigger enter just apply force over time in the opposite direction?
	
*/


//WE SHOULD STOP DESTROYING THE PLAYER OBJECT WHEN IT DIES, this kills the game...
//Game over screen?  reload level?  we should figure out starting deck?  also discuss boss fight.