public var nextLevel : String;
public var lastShop : String;
public var lastArg : String;

public var hyper : float;
public var juggernaut : float;
public var raging : float;
public var armored : float;

public var curHealth : float;

var floorCounter : int;
var bossCounter : int;

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
	if (arg != null) {
		lastArg = arg;
	}
//	Debug.Log("Loaded level: "+nextLevel);
	Application.LoadLevel(nextLevel);
	iterateLevel();
}

function iterateLevel() {
	if (nextLevel == "mainMenu") {
		nextLevel = "deckBuilder";
	}
	else if (nextLevel == "shop") {
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
		curHealth = 100;
		nextLevel = "procedural";
		if (bossCounter == 0) {
			hyper = .5;
			juggernaut = .05;
			raging = .05;
			armored = .05;
		}
		if (bossCounter == 1) {
			hyper = .05;
			juggernaut = .05;
			raging = .5;
			armored = .05;
		}
		if (bossCounter == 2) {
			hyper = .05;
			juggernaut = .05;
			raging = .05;
			armored = .5;
		}
		
	}
	else if (nextLevel == "procedural") {
		floorCounter++;
		if (floorCounter == 3) {
			if (bossCounter == 0) {
				nextLevel = "Bob";
			}
			else if (bossCounter == 1) {
				nextLevel = "Fire";
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
}