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

public var deck : String[];					//The player's current deck.
public static var library : String[];		//The player's full deck list.

public var slot1 : String;
public var slot2 : String;
public var slot3 : String;

public static var slot1Timer : float;
public static var slot2Timer : float;
public static var slot3Timer : float;

public var spellTimer : float;

public var clockTest : float;



function Start () {
	clockTest = 0;

	if(NewDeckManager.theDeck!=null){
		deck = NewDeckManager.theDeck;
	}
	else{
		deck = ["ICE", "ICE", "ICE", "ICE"];
	}
	
	library = deck;
	
	shuffle(deck);
	
	slot1 = drawSpell();
	slot2 = drawSpell();
	slot3 = drawSpell();
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
	
	if(Input.GetKeyDown ("1") && slot1Timer<=0){	//When they press 1...
		slot1Timer = 5;
	}
	if(Input.GetKeyDown ("2") && slot2Timer<=0){						//When they press 2...
		slot2Timer = 5;
	}
	if(Input.GetKeyDown ("3") && slot3Timer<=0){						//When they press 3...
		slot3Timer = 5;
	}
	
	if(slot1Timer>0){						//COUNT DOWN
		slot1Timer = slot1Timer - Time.deltaTime;
		print(slot1Timer);
	}
	if(slot2Timer>0){						//COUNT DOWN
		slot2Timer -= Time.deltaTime;
		print(slot2Timer);
	}
	if(slot3Timer>0){						//COUNT DOWN
		slot3Timer -= Time.deltaTime;
		print(slot3Timer);
	}
	
	clockTest += Time.deltaTime;
	
	
}

function FixedUpdate(){
	
}

function shot (player : GameObject){
	var projectile = new GameObject();											//create a projectile
	var tempScript : Temporary = projectile.AddComponent(Temporary);			//make the projectile temporary (add script)
	tempScript.life = 5;														//set it's life to 5 seconds
	var playerSpellScript : PlayerSpell = projectile.AddComponent(PlayerSpell);	//add the playerSpell script
	var x : float = player.transform.position.x;								//record the players x position
	var y : float = player.transform.position.y;								//record the players y position
	projectile.transform.position = Vector3(x,y,-1);							//move the projectile to the player's position
	projectile.transform.eulerAngles = player.transform.eulerAngles;			//set the projectile's angle to the player's
	playerSpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, sword, blind, meteor, rapid, homing);	//initialize the playerSpellScript
	playerSpellScript.name = "Shot";
}

function shuffle(list : String[]){ //v1.0
   	for(var i = list.length - 1; i >= 1; i--) {
    	 var j = Random.Range(0,i);
    	 var temp = list[i];
    	 list[i] = list[j];
    	 list[j] = temp;
   	}
    return list;
}

function drawSpell() {
	var newCard;
	if (deck.length > 1) {
		newCard = deck[deck.length-1];
		deck = pop(deck);
	}
	else {
		newCard = deck[deck.length-1];
		deck = pop(deck);
		
		deck = shuffle(library);
	}
	//Debug.Log(deck.length);
	return newCard;
}

function pop(list : String[]) {
	var newList : String[] = new String[list.length - 1];
	for (var i = 0; i < list.length-1; i++) {
		newList[i] = list[i];
	}
	return newList;
}
























