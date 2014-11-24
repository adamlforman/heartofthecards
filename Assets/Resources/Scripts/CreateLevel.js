// Thanks to Kim Pedersen's online tutorial for this algorithm

var initialWallWeight : float = 0.4;	// chance of a tile initially being a wall
var width : int;
var height : int;
var tiles : Array;
var numIterations: int = 2;				// number of game-of-life steps
var R = "R";
var G = "G";


function createLevel(width : int, height : int, tiles : Array) {
	this.width = width;
	this.height = height;
	
	this.tiles = tiles;
	tiles = initialize(tiles);								// Randomly assigns tiles to be walls or floors
	
	for (var i : int = 0; i < numIterations; i++) {
		tiles = iterate(tiles);								// Changes the map according to the modified Conway's Game of Life rules
	}
	
	tiles = finalize(tiles);								// Adds walls around the edge of the map, and fills in extra smaller caves
	return tiles;
}

function initialize(tiles : Array) {
	for (var i : int = 0; i < height; i++) {			// for each row of tiles
		tiles[i] = new String[width];					// make a new row
		for (var j : int = 0; j < width; j++) {			// for each tiles
			var rand : float = Random.value;
			if (rand < initialWallWeight) {				// roll a die for wall
				tiles[i][j] = R;
			}
			else {										// or ground
				tiles[i][j] = G;
			}
		}
	}
	return tiles;
}

function iterate(tiles : Array) {
	var newTiles : Array = new Array(height);			// this will hold our next step map
	for (var i : int = 0; i < height; i++) {
		newTiles[i] = new Array(width);
		for (var j : int = 0; j < width; j++) {
			var count = neighborWallCount (i,j);		// counts the neighbors (out of 8) that are walls
			if (count < 3 && tiles[i][j] == R) {		// IF a wall has fewer than 3 wall neighbors
				newTiles[i][j] = G;							// it becomes a floor
			}
			else if (count > 4 && tiles[i][j] == G) {	// IF a floor has more than 4 wall neighbors
				newTiles[i][j] = R;							// it becomes a wall
			}
			else {
				newTiles[i][j] = tiles[i][j];			// otherwise don't change anything
			}
		}
	}
	return newTiles;
}

function finalize(tiles : Array) {
	for (var i : int = 0; i < height; i++) {
		for (var j : int = 0; j < width; j++) {
			if (i == 0 || j == 0 || i == height - 1 || j == width - 1) {				// makes a border around the edge
				tiles[i][j] = R;
			}
		}
	}
	
	tiles = fillHoles(tiles);		// Fills in extra caverns
	return tiles;
}

function fillHoles(tiles : Array) {
	var fillNumber : int = 0;
	for (var i : int = 0; i < height; i++) {				// for each tile
		for (var j : int = 0; j < width; j++) {

			if (floodFill(i,j,tiles,fillNumber)) {			// Call the recursive function FloodFill, which will set all tiles continuous with this one
				fillNumber++;								// to be equal to the fillnumber, which increments when we are done
			}
		}
	}
	var fillCounts : int[] = new int[fillNumber+1];			// calculate the size of all the different caverns
	for (var k : int = 0; k < height; k++) {
		for (var l : int = 0; l < width; l++) {

			if (tiles[k][l] != "R") {
				fillCounts[tiles[k][l]] += 1;
			}
		}
	}
	var maxFillNum = 0;
	var maxFillCount = 0;
//	Debug.Log("Level has " + fillCounts.length + " different caverns.");
	for (var m : int = 0; m < fillCounts.length; m++) {		// find the biggest cavern
		if (fillCounts[m] > maxFillCount) {
			maxFillNum = m;
			maxFillCount = fillCounts[m];
		}
	}
	//Debug.Log("Largest size is cavern " + maxFillNum + " with "+ maxFillCount + " tiles.");
	
	for (var x : int = 0; x < height; x++) {
		for (var y : int = 0; y < width; y++) {				// replace caverns that aren't the largest with walls
			if (tiles[x][y] != "R") {
				if (tiles[x][y] != maxFillNum) {
					tiles[x][y] = R;
				}
				else {
					tiles[x][y] = G;						// and put floors back instead of numbers for the primary cavern
				}
			}
		}
	}
	return tiles;
}

function floodFill(x : int, y : int, tiles : Array, fillNumber : int) : boolean {		// recursive function with a marker, an array and coordinates
	if (tiles[x][y].Equals("G")) {								// On a floor tile
		tiles[x][y] = fillNumber;								// mark it
		floodFill(Mathf.Max(0,x-1),y,tiles,fillNumber);			// and recurse to four Cardinal neighbors
		floodFill(Mathf.Min(height-1,x+1),y,tiles,fillNumber);
		floodFill(x,Mathf.Max(0,y-1),tiles,fillNumber);
		floodFill(x,Mathf.Min(width-1, y+1),tiles,fillNumber);
		return true;
	}
	else {
		return false;
	}
}

function neighborWallCount( x : int, y : int) {				// counts neighbors of a tile. 
	var count : int = 0;				// the count
	var minP : int;						// if statements for the (literal) edge cases
	var maxP : int;
	var minQ : int;
	var maxQ : int;
	
	if (x > 0) {
		minP = -1;
	}
	else {
		minP = 0;
	}
	if (x < height-1) {
		maxP = 1;
	}
	else {
		maxP = 0;
	}
	
	if (y > 0) {
		minQ = -1;
	}
	else {
		minQ = 0;
	}
	if (y < width-1) {
		maxQ = 1;
	}
	else {
		maxQ = 0;
	}
	
	for (var p : int = minP; p <= maxP; p++) {
		for (var q : int = minQ; q <= maxQ; q++) {
			if (p == 0 && q == 0) {} // don't count ourselves
			else if (tiles[x+p][y+q] == R) {
				count++;
			}
		}
	}
	return count;
}