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
    insertFirstNums: function() {
        var numRows = Object.keys(this.gameboard).length;
        console.log("numRows = " + numRows);
        var i = 0;
        while(i < 2) {
            var x = Math.floor(Math.random() * (numRows));
            var y = Math.floor(Math.random() * (numRows));
            console.log("x: " + x + " y: " + y);
            var boardRow = twentyfortyeight.gameboard["row" + y];
            console.log("boardRow: " + boardRow);
            if(boardRow[x] == 0) {
                boardRow[x] = 2;
                i++;
            }
        }
        
        for(j=0; j<numRows; j++) {
            console.log(this.gameboard["row"+j]);
        }

        handlers.render(this.gameboard);
    }
}

var handlers = {
    init: function() {
        handlers.getBoardSize();
        handlers.setUpEventListeners();
        twentyfortyeight.insertFirstNums();
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
                if(gameboardObj["row"+i][j] != 0){
                    var tileValue = gameboardObj["row"+i][j];
                    var xCord = j;
                    var yCord = i;
                    console.log("Tile value: " + tileValue + " xCord: " + xCord + " yCord: " + yCord);
                    view.displayTiles(tileValue, xCord, yCord);
                }
            }
        }
    },
    checkKey: function(keyvalue) {
        switch(keyvalue) {
            case 37://left arrow
                console.log("left");
                break;
            case 38:// up arrow
                console.log("up");
                break;
            case 39:// right arrow
                console.log("right");
                break;
            case 40:// down arrow
                console.log("down");
                break;
            default:// not an arrow key
                console.log("other key with value " + keyvalue);
                break;
        }
    }
}

var view = {
    gameboard: document.querySelector(".gameboard"),
    buildBoard: function(numRows) {
        var height = (numRows * 90) + (parseInt(numRows) + 1) * 6;
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
        tile.innerHTML = tileValue;
    }
}

handlers.init();