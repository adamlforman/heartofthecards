var damage : float = 10;
var movespeed : int = 10;

public var ice : boolean = false;				//Does the shot have the "ice" buff
public var poison : boolean = false;			//Does the shot have the "poison" buff
public var fork : boolean = false;				//Does the shot have the "fork" buff
public var reflect : boolean = false;			//Does the shot have the "reflect" buff
public var pierce : boolean = false;			//Does the shot have the "pierce" buff
public var giant : boolean = false;				//Does the shot have the "giant" buff
public var splash : boolean = false;			//Does the shot have the "splash" buff
public var leech : boolean = false;				//Does the shot have the "leech" buff
public var sword : boolean = false;				//Does the shot have the "sword" buff
public var blind : boolean = false;				//Does the shot have the "blind" buff
public var meteor : boolean = false;			//Does the shot have the "meteor" buff
public var rapid : boolean = false;				//Does the shot have the "rapid" buff
public var homing : boolean = false;			//Does the shot have the "homing" buff


function init(ice : float, poison : float, fork : float, reflect : float, pierce : float, giant : float, splash : float, leech : float, sword : float, blind : float, meteor : float, rapid : float, homing : float) {
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the tile texture.
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	
	model = modelObject.AddComponent(SpellModel);						// Add a spellModel script to control visuals of the spell.
	model.init(this.gameObject);										// Initialize the spellModel.
	
	
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
	
	
	if(ice > 0){
		this.ice=true;				//Set "ice" boolean to true
	}
	if(poison > 0){
		this.poison=true;			//Set "poison" boolean to true
	}
	if(fork > 0){
		this.fork=true;				//Set "fork" boolean to true
	}
	if(reflect > 0){
		this.reflect=true;			//Set "reflect" boolean to true
	}
	if(pierce > 0){
		this.pierce=true;			//Set "pierce" boolean to true
	}
	if(giant > 0){
		this.giant=true;			//Set "giant" boolean to true
	}
	if(splash > 0){
		this.splash=true;			//Set "splash" boolean to true
	}
	if(leech > 0){
		this.leech=true;			//Set "leech" boolean to true
	}
	if(sword > 0){
		this.sword=true;			//Set "sword" boolean to true
	}
	if(blind > 0){
		this.blind=true;			//Set "blind" boolean to true
	}
	if(rapid > 0){
		this.rapid=true;			//Set "rapid" boolean to true
	}
	if(homing > 0){
		this.homing=true;			//Set "homing" boolean to true
	}
	if(meteor > 0){
		this.meteor=true;			//Set "meteor" boolean to true
	}
	
}



function Update() {
	transform.Translate(Vector2.up * movespeed * Time.deltaTime);
}



