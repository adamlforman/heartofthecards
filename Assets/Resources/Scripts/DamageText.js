/*var owner : EnemyScript; //Owner of damage text for positioning

function init (o : EnemyScript) {
	owner = o; //set owner
	transform.localPosition = Vector3(0,0,0); //Center the model on the parent.
	transform.localScale = Vector3(1,1,1); //NOT SURE IF THIS IS NECESSARY
	var damageText : GUIText;
	var damageObject = new GameObject("DamageText");
	damageObject.transform.position = dmgTextLocation;
		damageText = damageObject.AddComponent(GUIText);
		damageText.text = "10";
		damageText.fontSize = 20;
		damageText.color = Color(1, 0, 0);
		Destroy(damageObject, 1);
}
*/