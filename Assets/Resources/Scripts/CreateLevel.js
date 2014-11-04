var initialWallWeight : float = 0.45;
var width : int;
var height : int;

function makeLevel(width : int, height : int) {
	this.width = width;
	this.height = height;
	
	var tiles : Array;
	tiles = new Array();
	
	tiles = initialize(tiles);
	
	return tiles;
}

function initialize(tiles : Array) {
	for (var i : int = 0; i < tiles.length; i++) {
		tiles[i] = new String[width];
		for (var j : int = 0; j < tiles[i].length; j++) {
			var rand : float = Random.value;
			if (rand < initialWallWeight) {
				tiles[i][j] = "R";
			}
			else {
				tiles[i][j] = "G";
			}
		}
	}
	return tiles;
}