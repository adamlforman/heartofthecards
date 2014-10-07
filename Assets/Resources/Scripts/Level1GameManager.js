var floor : Array;
var spellbook : spellbook;
var enemySpellbook : enemySpellbook;
var player : player2D;



function Start () {
	spellbook = gameObject.AddComponent("spellbook");
	enemySpellbook = gameObject.AddComponent("enemySpellbook");
	
	buildWorld();
	player = buildPlayer("Player");

	var enemies = floor;
	var randX : int;
	var randY : int;
	for(i = 0; i<50; i++){
		randX = Random.Range(0,50);
		randY = Random.Range(0,60);
		while((enemies[randY][randX]!= "G") || (randX<15 && randY>49)){
			randX = Random.Range(0,50);
			randY = Random.Range(0,60);
		}
		//print(enemies[randY][randX]);
		enemies[randY][randX] = "E";
		if(i<25)
			addEnemy(randX, enemies.length-randY, "Enemy Archer", "archer");
		else
			addEnemy(randX, enemies.length-randY, "Enemy Warrior", "warrior");
	}
	
	var cam = Camera.mainCamera.GetComponent(GameCamera);

	cam.setTarget(player,0,1,50,60);

	
}


function buildWorld() {
	var R : String = "R";
	var G : String = "G";
	floor = new Array();
	floor.length=60;	// Floor width 50
	floor[0] =  [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[1] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[2] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[3] =  [R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[4] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[5] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[6] =  [R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[7] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[8] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[9] =  [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[10] = [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[11] = [R, G, G, G, G, G, G, G, G, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[12] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[13] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[14] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[15] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[16] = [R, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[17] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[18] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[19] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[20] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[21] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[22] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[23] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[24] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[25] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[26] = [R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[27] = [R, G, G, G, G, G, G, G, G, G, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[28] = [R, G, G, G, G, G, G, G, G, G, R, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[29] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[30] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[31] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[32] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[33] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[34] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[35] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[36] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[37] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[38] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[39] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	floor[40] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[41] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[42] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[43] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[44] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[45] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[46] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[47] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[48] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[49] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, G, G, G, R, R, R, R, R, R, R, R, R, R];
	floor[50] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[51] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[52] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[53] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[54] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[55] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[56] = [R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[57] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[58] = [R, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R];
	floor[59] = [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R];
	
	
	/*for(var i = 0; i<=10; i++){
		spawnRock(i, 10);
		spawnRock(i, 0);	
	}
	for(i = 1; i<=9; i++){
		spawnRock(10, i);
		spawnRock(0, i);	
	}
	for(i = 0; i<=100; i++){
		for(var j = 0; j<=100; j++){
			spawnGround(i, j);
		}	
	}
	*/
	
	for(var i = 0; i<floor.length;i++){
		for(var j = 0; j<floor[i].length;j++){
			if(floor[i][j]=="R"){
				spawnRock(j, floor.length-i);
			}
			if(floor[i][j]=="G"){
				spawnGround(j, floor.length-i);
			}
		}
	}
}
function Update () {

}

function spawnRock(x : float, y : float){
	var terrainObject = new GameObject();					// Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent("terrain");		// Add the terrain.js script to the object.
														// We can now refer to the object via this script.
	//terrainObject.AddComponent("temporary");
	//terrainObject.GetComponent("temporary").life = 1;
	terrainType = "ROCK";
	//terrainScript.transform.parent = this.transform;	// Set the terrain's parent object to be the gameManager?
	terrainScript.transform.position = Vector3(x,y,0);	// Position the terrain at x,y.
	
	terrainScript.init(terrainType);							// Initialize the terrain script.
	
	
	terrainScript.name = "ROCK";				// Give the terrain object a name in the Hierarchy pane.
}

function spawnGround(x : float, y : float){
	var terrainObject = new GameObject();					// Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent("terrain");		// Add the terrain.js script to the object.
														// We can now refer to the object via this script.
	//terrainObject.AddComponent("temporary");
	//terrainObject.GetComponent("temporary").life = 1;
	var rand = Random.Range(1, 4);
	terrainType = "Ground" + rand;
	//terrainScript.transform.parent = this.transform;	// Set the terrain's parent object to be the gameManager?
	terrainScript.transform.position = Vector3(x,y,0);	// Position the terrain at x,y.
	
	terrainScript.init(terrainType);							// Initialize the terrain script.
	
	
	terrainScript.name = "Ground";				// Give the terrain object a name in the Hierarchy pane.
}

/*
function spawnEnemy(x : float, y : float){
	var terrainObject = new GameObject();					// Create a new empty game object that will hold a terrain.
	var terrainScript = terrainObject.AddComponent("terrain");		// Add the terrain.js script to the object.
														// We can now refer to the object via this script.
	//terrainObject.AddComponent("temporary");
	//terrainObject.GetComponent("temporary").life = 1;
	terrainType = "ENEMY";
	//terrainScript.transform.parent = this.transform;	// Set the terrain's parent object to be the gameManager?
	terrainScript.transform.position = Vector3(x,y,-1);	// Position the terrain at x,y.
	
	terrainScript.init(terrainType);							// Initialize the terrain script.
	
	
	terrainScript.name = "ENEMY";				// Give the terrain object a name in the Hierarchy pane.
}*/

function addEnemy(x: float, y: float, name:String, type:String) {
	var enemyObject = new GameObject();
	var newEnemy = enemyObject.AddComponent(enemy2D);
	enemyObject.AddComponent(BoxCollider);
	enemyObject.GetComponent(BoxCollider).isTrigger = true;
	newEnemy.init(gameObject,enemyObject,player,name, type,x,y);
	moveCharacter(newEnemy,x,y);
	
	return newEnemy;
}

function buildPlayer(name : String) {
	var playerObject = new GameObject();
	var newPlayer = playerObject.AddComponent(player2D);
	var playerCollider = playerObject.AddComponent(BoxCollider);
	var playerAudio = playerObject.AddComponent(AudioSource);


	newPlayer.init(gameObject,playerObject,playerCollider.size,playerCollider.center, name, "FACE",3,3);

	moveCharacter(newPlayer,3,3);
	return newPlayer;
}

function moveCharacter(character : player2D, x : float, y: float) {
	if (character.transform) {
		character.transform.position.x = x;
		character.transform.position.y = y;
		character.transform.position.z = -1;
	}
}

function moveCharacter(character : enemy2D, x : float, y : float) {
	if (character.transform) {
		character.transform.position.x = x;
		character.transform.position.y = y;
	}
}

function vectorFromAngle(angle : float) {
	var angleRadians : float = (angle/360)*2*3.14159;
	//Debug.Log(angle);
	return Vector2(Mathf.Cos(angleRadians),Mathf.Sin(angleRadians));
}