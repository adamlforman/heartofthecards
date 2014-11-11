﻿public var ice : float = 0;				//Amount of time that attacks have "ice" buff
public var poison : float = 0;			//Amount of time that attacks have "poison" buff
public var fork : float = 0;			//Amount of time that attacks have "fork" buff
public var reflect : float = 0;			//Amount of time that attacks have "reflect" buff
public var pierce : float = 0;			//Amount of time that attacks have "pierce" buff
public var giant : float = 0;			//Amount of time that attacks have "giant" buff
public var splash : float = 0;			//Amount of time that attacks have "splash" buff
public var leech : float = 0;			//Amount of time that attacks have "leech" buff
public var blind : float = 0;			//Amount of time that attacks have "blind" buff
public var meteor : float = 0;			//Amount of time that attacks have "meteor" buff
public var rapid : float = 0;			//Amount of time that attacks have "rapid" buff
public var homing : float = 0;			//Amount of time that attacks have "homing" buff

private var cooldown : float = 0;		//Cannot attack if it is above 0

public static var deck : String[];		//The player's current deck.
public static var library : String[];	//The player's full deck list.
public static var cardsOwned : String[]; //The cards a player owns

public static var slot1 : String;		//The card in slot 1
public static var slot2 : String;		//The card in slot 2
public static var slot3 : String;		//The card in slot 3

public static var slot1Timer : float;	//The duration of the card in slot 1
public static var slot2Timer : float;	//The duration of the card in slot 2
public static var slot3Timer : float;	//The duration of the card in slot 3

public var drawTimer : float;			//The time until your next draw.

var exampleMesh : Mesh; //Mesh so we can not create primitive objects to hold things, before we switch to sprites

private var classType : String;		//The class of the player (circle, square, triangle)


//Circle global variables
private var fist : GameObject;
private var fistParent : GameObject;	//The child of the player that will move the fist.
private var rotationSpeed = 0.1;
public var swinging = false;

private var isPaused : boolean;

public static var allCards : Array;

var audioS : AudioSource;


function init(classType : String) {
	allCards = ["ice", "poison", "fork", "reflect", "pierce", "giant", "splash", "leech", "blind", "rapid", "homing", "meteor"];
	isPaused = ProceduralGameManager.isPaused;
	audioS = this.GetComponent(AudioSource);
	var exampleQuad = GameObject.CreatePrimitive(PrimitiveType.Quad); //Only way to grab unity's prebuilt meshes is to create a primitive?
	exampleMesh = exampleQuad.GetComponent(MeshFilter).mesh; //grab the quad mesh
	Destroy(exampleQuad); //Destroy the primitive quad
	
	drawTimer = 0;
	
	if(NewDeckManager.theDeck!=null){
		deck = NewDeckManager.theDeck;
	}
	else{
		deck = ["blind", "blind", "blind", "blind", "ice", "ice", "ice", "ice", "poison", "poison", "poison", "poison", "leech", "leech", "leech", "leech", "rapid", "rapid", "rapid", "rapid"];
		cardsOwned = deck;
	}
	
	library = deck;
	
	if (ShopManager.cardsOwned !=null ) {
		cardsOwned = ShopManager.cardsOwned;
	}
	
	shuffle(deck);
	
	slot1 = drawSpell();
	slot2 = drawSpell();
	slot3 = drawSpell();
	
	slot1Timer = -5;
	slot2Timer = -5;
	slot3Timer = -5;
	
	
	//Set up class specific things.
	this.classType = classType;
	if(classType == "Circle"){
		//First we create and empty object that is parented by the player
		var fistParent = new GameObject();
		fistParent.name = "Fist Parent";
		fistParent.transform.parent = gameObject.transform.GetChild(0).transform;
		this.fistParent = fistParent;
		var x : float = this.transform.position.x;								//record the players x position
		var y : float = this.transform.position.y;								//record the players y position
		fistParent.transform.position = Vector3(x,y,-1);							//move the fist to the player's position
		fistParent.transform.localRotation = Quaternion.identity;
		
		
	
		var fist = new GameObject();											//create a fist
		this.fist = fist;
		fist.name = "Fist";
		fist.SetActive(false); 												//Turn off the object so its script doesn't do anything until we're ready.
		var boxCollider2D = fist.AddComponent(BoxCollider2D);					//Add a box collider
		boxCollider2D.isTrigger = true;
		var rigidModel = fist.AddComponent(Rigidbody2D); 						//Add a rigid body for collisions
		rigidModel.gravityScale = 0; 												//Turn off gravity
		
		var playerSpellScript : PlayerSpell = fist.AddComponent(PlayerSpell);	//add the playerSpell script
		fist.transform.parent = fistParent.transform;							//Parent fistParent to fist
		fist.transform.localPosition = Vector3(1, 0, 0);							//move the fist to the player's position
		fist.transform.localScale = Vector3(0.35, 0.35, 1);
		playerSpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, gameObject);	//initialize the playerSpellScript
		playerSpellScript.name = "Fist";
		fist.SetActive(true);
	}
	else if (classType == "Square") {
		
	}
}

function Update () {
	isPaused = ProceduralGameManager.isPaused;
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
	
	//Circle Stuff
	if (classType == "Circle") {
		fistParent.transform.localPosition = Vector3(0,0,-1);
		fist.transform.localPosition = Vector3(0.75,0,0);
		if(cast1> 0 && cooldown<=0 && classType=="Circle"){					//if you are trying to shoot and can shoot
			swing();							//Punch that mother fucker
			fist.GetComponent(PlayerSpell).punchOn();
			fist.GetComponent(PlayerSpell).updateBuffs(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing);
			cooldown+=1;								//increment cooldown
			if(rapid>0){
				cooldown-=0.5;
			}
		}
		
		if(swinging  && (isPaused ==false)){
			if(rapid>0){
				fistParent.transform.rotation *= Quaternion.Euler(0,0,9.0);
			}
			else{
				fistParent.transform.rotation *= Quaternion.Euler(0,0,4.5);
			}
			if(fistParent.transform.rotation == this.transform.rotation * Quaternion.Euler(0,0,180)){
				fistParent.transform.rotation = this.transform.rotation;
				swinging = false;
				fist.GetComponent(PlayerSpell).punchOff();
			}
		}
		if(giant>0){
			fist.transform.localScale = Vector3(0.7,0.7,1);
		}
		else{
			fist.transform.localScale = Vector3(0.35,0.35,1);
		}
	}
	
	
	//Triangle Stuff
	if (classType == "Triangle") {
		if(cast1> 0 && cooldown<=0){					//if you are trying to shoot and can shoot
			shot(gameObject);							//spawn a projectile
			cooldown+=1;								//increment cooldown
			if(rapid>0){
				cooldown-=0.5;
			}
		}
	}
	
	//Square Stuff
	if (classType == "Square") {
		if(cast1 > 0 && cooldown <= 0) {
			var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
			comet(gameObject, target);
			cooldown = 2;
			if (rapid > 0) {
				cooldown = 1;
			}
		}
	}
	
	
	if(cooldown>0){
		cooldown-=Time.deltaTime;					//decrement cooldown
	}
	
	if(Input.GetKeyDown ("1") && slot1Timer==-5 && (isPaused == false)){	//When they press 1...
		slot1Timer = 5;
		
		//Check the card we just used.  BRACE YOURSELF
		if(slot1=="ice"){
			ice=5;
		}
		if(slot1=="ice2"){
			ice=10;
		}
		if(slot1=="ice3"){
			ice=15;
		}
		if(slot1=="poison"){
			poison=5;
		}
		if(slot1=="poison2"){
			poison=10;
		}
		if(slot1=="poison3"){
			poison=15;
		}
		if(slot1=="fork"){
			fork=5;
		}
		if(slot1=="fork2"){
			fork=10;
		}
		if(slot1=="fork3"){
			fork=15;
		}
		if(slot1=="pierce"){
			pierce=5;
		}
		if(slot1=="pierce2"){
			pierce=10;
		}
		if(slot1=="pierce3"){
			pierce=15;
		}
		if(slot1=="giant"){
			giant=5;
		}
		if(slot1=="giant2"){
			giant=10;
		}
		if(slot1=="giant3"){
			giant=15;
		}
		if(slot1=="splash"){
			splash=5;
		}
		if(slot1=="splash2"){
			splash=10;
		}
		if(slot1=="splash3"){
			splash=15;
		}
		if(slot1=="leech"){
			leech=5;
		}
		if(slot1=="leech2"){
			leech=10;
		}
		if(slot1=="leech3"){
			leech=15;
		}
		if(slot1=="blind"){
			blind=5;
		}
		if(slot1=="blind2"){
			blind=10;
		}
		if(slot1=="blind3"){
			blind=15;
		}
		if(slot1=="rapid"){
			rapid=5;
		}
		if(slot1=="rapid2"){
			rapid=10;
		}
		if(slot1=="rapid3"){
			rapid=15;
		}
		
	}
	if(Input.GetKeyDown ("2") && slot2Timer==-5 && (isPaused == false)){	//When they press 2...
		slot2Timer = 5;
		
		//Check the card we just used.  BRACE YOURSELF
		if(slot2=="ice"){
			ice=5;
		}
		if(slot2=="ice2"){
			ice=10;
		}
		if(slot2=="ice3"){
			ice=15;
		}
		if(slot2=="poison"){
			poison=5;
		}
		if(slot2=="poison2"){
			poison=10;
		}
		if(slot2=="poison3"){
			poison=15;
		}
		if(slot2=="fork"){
			fork=5;
		}
		if(slot2=="fork2"){
			fork=10;
		}
		if(slot2=="fork3"){
			fork=15;
		}
		if(slot2=="pierce"){
			pierce=5;
		}
		if(slot2=="pierce2"){
			pierce=10;
		}
		if(slot2=="pierce3"){
			pierce=15;
		}
		if(slot2=="giant"){
			giant=5;
		}
		if(slot2=="giant2"){
			giant=10;
		}
		if(slot2=="giant3"){
			giant=15;
		}
		if(slot2=="splash"){
			splash=5;
		}
		if(slot2=="splash2"){
			splash=10;
		}
		if(slot2=="splash3"){
			splash=15;
		}
		if(slot2=="leech"){
			leech=5;
		}
		if(slot2=="leech2"){
			leech=10;
		}
		if(slot2=="leech3"){
			leech=15;
		}
		if(slot2=="blind"){
			blind=5;
		}
		if(slot2=="blind2"){
			blind=10;
		}
		if(slot2=="blind3"){
			blind=15;
		}
		if(slot2=="rapid"){
			rapid=5;
		}
		if(slot2=="rapid2"){
			rapid=10;
		}
		if(slot2=="rapid3"){
			rapid=15;
		}
	}
	if(Input.GetKeyDown ("3") && slot3Timer==-5 && (isPaused == false)){	//When they press 3...
		slot3Timer = 5;
		
		//Check the card we just used.  BRACE YOURSELF
		if(slot3=="ice"){
			ice=5;
		}
		if(slot3=="ice2"){
			ice=10;
		}
		if(slot3=="ice3"){
			ice=15;
		}
		if(slot3=="poison"){
			poison=5;
		}
		if(slot3=="poison2"){
			poison=10;
		}
		if(slot3=="poison3"){
			poison=15;
		}
		if(slot3=="fork"){
			fork=5;
		}
		if(slot3=="fork2"){
			fork=10;
		}
		if(slot3=="fork3"){
			fork=15;
		}
		if(slot3=="pierce"){
			pierce=5;
		}
		if(slot3=="pierce2"){
			pierce=10;
		}
		if(slot3=="pierce3"){
			pierce=15;
		}
		if(slot3=="giant"){
			giant=5;
		}
		if(slot3=="giant2"){
			giant=10;
		}
		if(slot3=="giant3"){
			giant=15;
		}
		if(slot3=="splash"){
			splash=5;
		}
		if(slot3=="splash2"){
			splash=10;
		}
		if(slot3=="splash3"){
			splash=15;
		}
		if(slot3=="leech"){
			leech=5;
		}
		if(slot3=="leech2"){
			leech=10;
		}
		if(slot3=="leech3"){
			leech=15;
		}
		if(slot3=="blind"){
			blind=5;
		}
		if(slot3=="blind2"){
			blind=10;
		}
		if(slot3=="blind3"){
			blind=15;
		}
		if(slot3=="rapid"){
			rapid=5;
		}
		if(slot3=="rapid2"){
			rapid=10;
		}
		if(slot3=="rapid3"){
			rapid=15;
		}
	}
	
	if(slot1Timer>0){						//COUNT DOWN
		slot1Timer -= Time.deltaTime;
	}
	if(slot1Timer<=0 && slot1Timer>-5){		//We are out of duration on slot1
		slot1 = "BLANK";					//Fill the spell slot with the empty marker.
		if(drawTimer == 0){
			drawTimer = 5;
		}
		slot1Timer = -10;					//Reset the timer
	}
	if(slot2Timer>0){						//COUNT DOWN
		slot2Timer -= Time.deltaTime;
	}
	if(slot2Timer<=0 && slot2Timer>-5){		//We are out of duration on slot2
		slot2 = "BLANK";					//Fill the spell slot with the empty marker.
		if(drawTimer == 0){
			drawTimer = 5;
		}
		slot2Timer = -10;					//Reset the timer
	}
	if(slot3Timer>0){						//COUNT DOWN
		slot3Timer -= Time.deltaTime;
	}
	if(slot3Timer<=0 && slot3Timer>-5){		//We are out of duration on slot3
		slot3 = "BLANK";					//Fill the spell slot with the empty marker.
		if(drawTimer == 0){
			drawTimer = 5;
		}
		slot3Timer = -10;						//Reset the timer
	}
	
	if(drawTimer>0){
		drawTimer-=Time.deltaTime;			//decrement drawTimer if it is above 0	
	}
	
	//A whole lot of complicated that means DRAW A CARD
	if(drawTimer<0){
		if(slot1=="BLANK"){
			slot1=drawSpell();
			slot1Timer = -5;
			if(slot2=="BLANK" || slot3=="BLANK"){
				drawTimer=5;
			}
			else{
				drawTimer=0;
			}
		}
		else if(slot2=="BLANK"){
			slot2=drawSpell();
			slot2Timer = -5;
			if(slot3=="BLANK"){
				drawTimer=5;
			}
			else{
				drawTimer=0;
			}
		}
		else if(slot3=="BLANK"){
			slot3=drawSpell();
			slot3Timer = -5;
			drawTimer=0;
		}
	}
		


}

/*	var playerModel = new GameObject(); 						//Create a quad object to hold the tile texture.
	var meshFilter = playerModel.AddComponent(MeshFilter); 		//Add a mesh filter for textures
	meshFilter.mesh = exampleMesh; 								//Give the mesh filter a quadmesh
	playerModel.AddComponent(MeshRenderer); 					//Add a renderer for textures
	playerModel.SetActive(false); 								//Turn off the object so its script doesn't do anything until we're ready.
	model = playerModel.AddComponent(CharModel); 				//Add a CharModel script to control visuals of the Player.
	model.name = "Player Model";								//Name the PlayerModel
	model.init(playerObject, "FACE"); 							//Initialize the PlayerModel.
*/
function shot (player : GameObject){
	audioS.PlayOneShot(Resources.Load("Sounds/arrowattack"));
	if(fork>0){
		spawnShot(player, Vector3(0,0,30));
		spawnShot(player, Vector3(0,0,-30));
	}
	
	else{
		spawnShot(player, Vector3(0,0,0));
	}
}

function comet (player : GameObject, target : Vector2) {
	audioS.PlayOneShot(Resources.Load("Sounds/mageattack"));
	spawnComet(player,target);
	// FORK does nothing for mages, yet. find a way to not make OP.

}

//not done yet
function swing (){
	audioS.PlayOneShot(Resources.Load("Sounds/fistattack"));
	swinging = true;
	
}


function spawnShot(player : GameObject, rotate : Vector3){
	var projectile = new GameObject();											//create a projectile
	projectile.name = "Shot";
	//var meshFilter = projectile.AddComponent(MeshFilter); 						//Add a mesh filter for textures
	//meshFilter.mesh = exampleMesh; 												//Give the mesh filter a quadmesh
	//projectile.AddComponent(MeshRenderer); 										//Add a renderer for textures
	projectile.SetActive(false); 												//Turn off the object so its script doesn't do anything until we're ready.
	var boxCollider2D = projectile.AddComponent(BoxCollider2D);					//Add a box collider
	boxCollider2D.isTrigger = true;
	var rigidModel = projectile.AddComponent(Rigidbody2D); 						//Add a rigid body for collisions
	rigidModel.gravityScale = 0; 												//Turn off gravity
	rigidModel.fixedAngle = true; 												//Set fixed angle to true
	rigidModel.isKinematic = true;
	
	var tempScript : Temporary = projectile.AddComponent(Temporary);			//make the projectile temporary (add script)
	tempScript.life = 5;														//set it's life to 5 seconds
	var playerSpellScript : PlayerSpell = projectile.AddComponent(PlayerSpell);	//add the playerSpell script
	var x : float = player.transform.position.x;								//record the players x position
	var y : float = player.transform.position.y;								//record the players y position
	projectile.transform.position = Vector3(x,y,-1);							//move the projectile to the player's position
	projectile.transform.Translate(player.transform.up);
	projectile.transform.eulerAngles = player.transform.eulerAngles - rotate;			//set the projectile's angle to the player's
	playerSpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, gameObject);	//initialize the playerSpellScript
	playerSpellScript.name = "Shot";
	projectile.SetActive(true);
}

function spawnComet(player : GameObject,location : Vector2) {
	var comet = new GameObject();
	comet.name = "Comet";
	
	comet.SetActive(false);
	comet.transform.position = location;
	comet.transform.position.z = -1;
	
	
	var playerSpellScript : PlayerSpell = comet.AddComponent(PlayerSpell);
	playerSpellScript.init(ice, poison, fork, reflect, pierce, giant, splash, leech, blind, meteor, rapid, homing, exampleMesh, player);	//initialize the enemySpellScript
	
	comet.SetActive(true);
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
	if (deck == null) {
		return null;
	}
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
























