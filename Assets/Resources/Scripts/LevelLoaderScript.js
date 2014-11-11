public var nextLevel : String;
public var lastShop : String;
public var lastArg : String;

var proceduralCounter : int;
var bossCounter : int;

function init() {
	proceduralCounter = 0;
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


function loadNextLevel() {
	loadNextLevel(null);
}

function loadNextLevel(arg : String) {
	if (arg != null) {
		lastArg = arg;
	}
	Debug.Log("Loaded level: "+nextLevel);
	Application.LoadLevel(nextLevel);
	iterateLevel();
}

function iterateLevel() {
	if (nextLevel == "mainMenu") {
		nextLevel = "deckBuilder";
	}
	else if (nextLevel == "shop") {
		nextLevel = "deckBuilder";
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
	}
	else if (nextLevel == "procedural") {
		proceduralCounter++;
		if (proceduralCounter == 3) {
			nextLevel = "boss1";
		}
		else {
			nextLevel = "procedural";
		}
	}
}