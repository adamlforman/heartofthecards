public var nextLevel : String;
public var lastShop : String;
public var lastArg : String;

public var hyper : float;
public var juggernaut : float;
public var raging : float;
public var armored : float;

public var curHealth : float;

private var playingShop : boolean;
private var playingBoss : boolean;

var floorCounter : int;
var bossCounter : int;

private var audioS: AudioSource; 

function init() {
	hyper = 0;
	juggernaut = 0;
	raging = 0;
	armored = 0;
	
	floorCounter = 0;
	bossCounter = 0;
	
	curHealth = 100;
	
	nextLevel = Application.loadedLevelName;
	iterateLevel();
	
	audioS = gameObject.AddComponent(AudioSource);

}

function loadLevel(level : String) {
	nextLevel = level;
	loadNextLevel();
}

function loadLevel(level : String, arg : String) {
	nextLevel = level;
	loadNextLevel(arg);
}

function reloadLevel() {
	Time.timeScale = 1;
	curHealth = 100;
	nextLevel = Application.loadedLevelName;
	loadNextLevel();
}

function loadNextLevel() {
	loadNextLevel(null);
}

function loadNextLevel(arg : String) {	
	if (nextLevel != "procedural" && !audioS.isPlaying) {
		if (nextLevel != "Bob" && nextLevel != "Fire" && nextLevel != "Joe") {	
    		audioS.clip = Resources.Load("Sounds/adamshopmusic");
    		playingShop = true;

		}
		else {
    		audioS.clip = Resources.Load("Sounds/adambossmusic");
    		playingBoss = true;
		}
		audioS.Play();
    	audioS.loop = true;
	}
	if (nextLevel == "procedural" || (playingBoss && (nextLevel == "levelSelect" || nextLevel == "shop"))) {
		audioS.loop = false;
		audioS.Stop();
		playingShop = false;
		playingBoss = false;
	}
	if (arg != null) {
		lastArg = arg;
	}
//	Debug.Log("Loaded level: "+nextLevel);
	Application.LoadLevel(nextLevel);
	Time.timeScale = 1;
	iterateLevel();
}

function iterateLevel() {
	if (nextLevel == "mainMenu") {
		curHealth = 100;
		nextLevel = "levelSelect";
	}
	else if (nextLevel == "levelSelect") {
		nextLevel = "shop";
	}
	else if (nextLevel == "shop") {
		floorCounter = 0;
		curHealth = 100;
		nextLevel = "deckBuilder";
	}
	else if (nextLevel == "tutorial1") {
		nextLevel = "mainMenu";
	}
	else if (nextLevel == "shop2") {
		nextLevel = "deckBuilder";
	}
	else if (nextLevel == "shop3") {
		nextLevel = "deckBuilder";
	}
	else if (nextLevel == "deckBuilder") {
		nextLevel = "charSelect";
	}
	else if (nextLevel == "deckBuilder2") {
		nextLevel = "charSelect";
	}
	else if (nextLevel == "deckBuilder3") {
		nextLevel = "charSelect";
	}
	else if (nextLevel == "charSelect") {
		nextLevel = "procedural";
		if (bossCounter == 0) {
			hyper = .05;
			juggernaut = .05;
			raging = .05;
			armored = .5;
		}
		if (bossCounter == 1) {
			hyper = .05;
			juggernaut = .05;
			raging = .5;
			armored = .05;
		}
		if (bossCounter == 2) {
			hyper = .5;
			juggernaut = .05;
			raging = .05;
			armored = .05;
		}
		
	}
	else if (nextLevel == "procedural") {
		floorCounter++;
		Debug.Log("Floor Counter incremented to " + floorCounter);
		if (floorCounter == 3) {
			if (bossCounter == 0) {
				nextLevel = "Bob";
			}
			else if (bossCounter == 1) {
				nextLevel = "Fire";
			}
			else if (bossCounter == 2) {
				nextLevel = "Joe";
			}
			else {
				nextLevel = "mainMenu";
			}
		}
		else {
			nextLevel = "procedural";
		}
	}

	else if (nextLevel == "Bob") {
		floorCounter = 0;
		bossCounter++;
		nextLevel = "shop";
	}
	else if (nextLevel == "Fire") {
		floorCounter = 0;
		bossCounter++;
		nextLevel = "shop";
	}
	else if (nextLevel == "Joe") {
		floorCounter = 0;
		bossCounter++;
		nextLevel = "shop";
	}
}

function loadNextBoss() {
	loadNextBoss(lastArg);
}

function loadNextBoss(arg : String) {
	lastArg = arg;
	if (bossCounter == 0) {
		loadLevel("charSelect");
		nextLevel = "Bob";
	}
	else if (bossCounter == 1) {
		loadLevel("charSelect");
		nextLevel = "Fire";
	}
	else if (bossCounter == 2) {
		loadLevel("charSelect");
		nextLevel = "Joe";
	}
}