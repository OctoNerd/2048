var twentyfortyeight = {
    gameboard: {
    },
    makeBoard: function(numRows) {
        if(numRows <=6 && numRows > 1) {
            for(i=0; i<numRows; i++) {
                this.gameboard["row" + i] = [];
            }

            for(i=0; i<Object.keys(this.gameboard).length; i++) {
                for(j=0; j<numRows; j++) {
                    this.gameboard["row" + i].push(0);
                }
            }
        } else {
            console.log("that is not a valid board size");
        }
    },
    insertRandNums: function() {
        var numRows = Object.keys(this.gameboard).length;
        var i = 0;

        //errors out if there is no place to replace a 0 TODO

        while(i < 1) {
            var x = Math.floor(Math.random() * (numRows));
            var y = Math.floor(Math.random() * (numRows));
            var boardRow = twentyfortyeight.gameboard["row" + y];
            if(boardRow[x] == 0) {
                boardRow[x] = 2;
                i++;
            }
        }
        handlers.render(this.gameboard);
    },
    shift: function(direction) {
        var boardLength = Object.keys(this.gameboard).length;
        var maxRow = boardLength -1;
        var gameboard = this.gameboard;
        switch(direction) {
            case "right":
                // if(timesMoved < maxRow){
                    for(var y=0; y<boardLength; y++) {
                        var currentRow = gameboard["row"+y];
                        var tempMax = maxRow;

                        for(var x=maxRow; x>0; x--) {
                            if(currentRow[tempMax] == 0) {
                                currentRow[x] = currentRow[x-1];
                                currentRow[x-1] = 0;
                            } else {
                                if(currentRow[tempMax] == currentRow[tempMax -1]) {
                                    currentRow[tempMax] = currentRow[tempMax] * 2;
                                    currentRow[tempMax -1] = 0;
                                }
                            }
                            tempMax--;
                        }
                    }
                // }
                break;
            case "left":
                // if(timesMoved < maxRow) {
                    for(var y=0; y<boardLength; y++) {
                        var currentRow = gameboard["row"+y];
                        var tempMin = 0;

                        for(var x=0; x<maxRow; x++) {
                            if(currentRow[tempMin] == 0) {
                                currentRow[x] = currentRow[x+1];
                                currentRow[x+1] = 0;
                            } else {
                                if(currentRow[tempMin] == currentRow[tempMin + 1]) {
                                    currentRow[tempMin] = currentRow[tempMin] * 2;
                                    currentRow[tempMin + 1] = 0;
                                }
                            }
                            tempMin++;
                        }
                    }
                // }
                break;
            case "up":
                // if(timesMoved < maxRow) {
                    for(var x=0; x<boardLength; x++) {
                        var tempMin = 0;

                        for(var y=0; y<maxRow; y++) {
                            var currentRow = gameboard["row" + tempMin];
                            var nextRowNum = tempMin + 1;
                            var nextRow = gameboard["row" + nextRowNum];
                            if(currentRow[x] == 0) {
                                currentRow[x] = nextRow[x];
                                nextRow[x] = 0;
                            } else {
                                if(currentRow[x] == nextRow[x]) {
                                    currentRow[x] = currentRow[x] * 2;
                                    nextRow[x] = 0;
                                }
                            }
                            tempMin++;
                        }
                    }
                // }
                break;
            case "down":
                // if(timesMoved < maxRow) {
                    for(var x=0; x<boardLength; x++) {
                        var tempMax = maxRow;

                        for(var y=0; y<maxRow; y++) {
                            var currentRow = gameboard["row" + tempMax];
                            var prevRowNum = tempMax - 1;
                            var prevRow = gameboard["row" + prevRowNum];
                            if(currentRow[x] == 0) {
                                currentRow[x] = prevRow[x];
                                prevRow[x] = 0;
                            } else {
                                if(currentRow[x] == prevRow[x]) {
                                    currentRow[x] = currentRow[x] * 2;
                                    prevRow[x] = 0;
                                }
                            }
                            tempMax--;
                        }
                    }
                // }
                break;
            default:
                break;
        }
    }
}

var handlers = {
    init: function() {
        handlers.getBoardSize();
        handlers.setUpEventListeners();
        twentyfortyeight.insertRandNums();
        twentyfortyeight.insertRandNums();
    },
    getBoardSize: function() {
        var numRows = prompt("how many rows would you like? 2-6");
        handlers.makeBoard(numRows);
    },
    setUpEventListeners: function() {
        document.addEventListener("keydown", function(event) {
           handlers.checkKey(event.which); 
        });
    },
    makeBoard: function(numRows) {
        twentyfortyeight.makeBoard(numRows);
        view.buildBoard(numRows);
    },
    render: function(gameboardObj) {
        var numRows = Object.keys(gameboardObj).length;
        for(i=0; i<numRows; i++) {
            for(j=0; j<numRows; j++) {
                var tileValue = gameboardObj["row"+i][j];
                var xCord = j;
                var yCord = i;
                //console.log("Tile value: " + tileValue + " xCord: " + xCord + " yCord: " + yCord);
                view.displayTiles(tileValue, xCord, yCord);
            }
        }
    },
    checkKey: function(keyvalue) {
        switch(keyvalue) {
            case 37://left arrow
                twentyfortyeight.shift("left");
                break;
            case 38:// up arrow
                twentyfortyeight.shift("up");
                break;
            case 39:// right arrow
                twentyfortyeight.shift("right");
                //console.log("right");
                break;
            case 40:// down arrow
                twentyfortyeight.shift("down");
                break;
            default:// not an arrow key
                console.log("other key with value " + keyvalue);
                break;
        }
        twentyfortyeight.insertRandNums();
        handlers.render(twentyfortyeight.gameboard);
    }
}

var view = {
    gameboard: document.querySelector(".gameboard"),
    buildBoard: function(numRows) {
        var height = (numRows * 90) + (parseInt(numRows) + 1) * 6;//90x90px tiles and 6px gutters
        view.gameboard.style.height = height + "px";
        view.gameboard.style.width = height + "px";

        for(i=0; i<numRows; i++) {
            var newRow = document.createElement("div");
            newRow.className = "gridRow";
            newRow.id = "row" + i;
            
            for(j=0; j<numRows; j++) {
                var newTile = document.createElement("div");
                //var newInnerTile = document.createElement("div");
                newTile.className = "tile";
                newTile.id = "pos" + i + "-" + j;
                //newInnerTile.className = "innerTile";
                newRow.appendChild(newTile);
                //newTile.appendChild(newInnerTile);
            }
            view.gameboard.appendChild(newRow);
        }
    },
    displayTiles: function(tileValue, xCord, yCord) {
        var tile = document.getElementById("pos" + yCord + "-" + xCord);
        //var innerTile = tile.querySelector(".innerTile");
        tile.className = "tile tile-" + tileValue;
        if(tileValue != 0) {
            tile.innerHTML = tileValue;
        } else {
            tile.innerHTML = "";
        }

    }
}

handlers.init();