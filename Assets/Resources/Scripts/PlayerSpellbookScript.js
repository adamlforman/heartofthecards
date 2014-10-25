public var ice : float = 0;				//Amount of time that attacks have "ice" buff
public var poison : float = 0;			//Amount of time that attacks have "poison" buff
public var fork : float = 0;			//Amount of time that attacks have "fork" buff
public var reflect : float = 0;			//Amount of time that attacks have "reflect" buff
public var pierce : float = 0;			//Amount of time that attacks have "pierce" buff
public var giant : float = 0;			//Amount of time that attacks have "giant" buff
public var splash : float = 0;			//Amount of time that attacks have "splash" buff
public var leech : float = 0;			//Amount of time that attacks have "leech" buff
public var sword : float = 0;			//Amount of time that attacks have "sword" buff
public var blind : float = 0;			//Amount of time that attacks have "blind" buff
public var meteor : float = 0;			//Amount of time that attacks have "meteor" buff
public var rapid : float = 0;			//Amount of time that attacks have "rapid" buff
public var homing : float = 0;			//Amount of time that attacks have "homing" buff

private var cooldown : float = 0;		//Cannot attack if it is above 0



function Start () {

}

function Update () {
	
	
	if(ice > 0){
		ice-=Time.deltaTime;			//Decrement "ice" buff duration if it is above zero
	}
	if(poison > 0){
		poison-=Time.deltaTime;			//Decrement "poison" buff duration if it is above zero
	}
	if(fork > 0){
		fork-=Time.deltaTime;			//Decrement "fork" buff duration if it is above zero
	}
	if(reflect > 0){
		reflect-=Time.deltaTime;		//Decrement "reflect" buff duration if it is above zero
	}
	if(pierce > 0){
		pierce-=Time.deltaTime;			//Decrement "pierce" buff duration if it is above zero
	}
	if(giant > 0){
		giant-=Time.deltaTime;			//Decrement "giant" buff duration if it is above zero
	}
	if(splash > 0){
		splash-=Time.deltaTime;			//Decrement "splash" buff duration if it is above zero
	}
	if(leech > 0){
		leech-=Time.deltaTime;			//Decrement "leech" buff duration if it is above zero
	}
	if(sword > 0){
		sword-=Time.deltaTime;			//Decrement "sword" buff duration if it is above zero
	}
	if(blind > 0){
		blind-=Time.deltaTime;			//Decrement "blind" buff duration if it is above zero
	}
	if(rapid > 0){
		rapid-=Time.deltaTime;			//Decrement "rapid" buff duration if it is above zero
	}
	if(homing > 0){
		homing-=Time.deltaTime;			//Decrement "homing" buff duration if it is above zero
	}
	if(meteor > 0){
		meteor-=Time.deltaTime;			//Decrement "meteor" buff duration if it is above zero
	}
	
	var cast1 : float = Input.GetAxis("Fire1");		//variable that checks if you are trying to attack
	
	if(cast1 > 0 && cooldown<=0){					//if you are trying to shoot and can shoot
		shot(gameObject);							//spawn a projectile
		cooldown+=1;								//increment cooldown
	}
	if(cooldown>0){
		cooldown-=Time.deltaTime;					//decrement cooldown
	}
	
	
}

function shot (player : GameObject){
	var projectile = new GameObject();											//create a projectile
	var tempScript : Temporary = projectile.AddComponent(Temporary);			//make the projectile temporary (add script)
	tempScript.life = 5;														//set it's life to 5 seconds
	var playerSpellScript : PlayerSpell = projectile.AddComponent(PlayerSpell);	//add the playerSpell script
	var x : float = player.transform.position.x;								//record the players x position
	var y : float = player.transform.position.y;								//record the players y position
	projectile.transform.position = Vector2(x,y);								//move the projectile to the player's position
	projectile.transform.eulerAngles = player.transform.eulerAngles;			//set the projectile's angle to the player's
	playerSpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, sword, blind, meteor, rapid, homing);	//initialize the playerSpellScript
	playerSpellScript.name = "Shot";
}


























