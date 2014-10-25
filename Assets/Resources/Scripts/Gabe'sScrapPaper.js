/*
Vector3 dmgTextLocation = Camera.main.WorldToScreenPoint(transform.position);
dmgTextLocation.x /= Screen.width;
dmgTextLocation.y /= Screen.height;

var damageText : GUITEXT;
var damageObject = new GameObject("DamageText");
damageObject.transform.position = dmgTextLocation;
damageText = damageObject.addComponent(GUIText);
damageText.text = VARIABLE WITH HOW MUCH DAMAGE THE SPELL/THING DOES
damageText.fontSize = 20;
Destroy(damageObject, 1);

//How Gabe will make everything collide
	//Add rigidbody2ds + box collider2ds to eveything
	//Everythign should get fixed angle set equal to true
	//Things that will not move should be kinematic


//How Gabe will do knockback
	//On trigger enter just apply force over time in the opposite direction?
	
*/
