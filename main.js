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
            handlers.render(numRows);
        } else {
            console.log("that is not a valid board size");
        }
    }
}

var handlers = {
    init: function() {
        handlers.getBoardSize();
        handlers.setUpEventListeners();
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
    },
    render: function(numRows) {
        view.render(numRows);
    },
    checkKey: function(keyvalue) {
        switch(keyvalue) {
            case 37:
                console.log("left");
                break;
            case 38:
                console.log("up");
                break;
            case 39:
                console.log("right");
                break;
            case 40:
                console.log("down");
                break;
            default:
                console.log("other key with value " + keyvalue);
                break;
        }
    }
}

var view = {
    gameboard: document.querySelector(".gameboard"),
    render: function(numRows) {
        view.buildBoard(numRows);
        view.displayTiles(numRows);
    },
    buildBoard: function(numRows) {
        var height = (numRows * 90) + (parseInt(numRows) + 1) * 6;
        view.gameboard.style.height = height + "px";
        view.gameboard.style.width = height + "px";
    },
    displayTiles: function(numRows) {
        var numTiles = numRows * numRows;

        for(i=0; i<numTiles; i++) {
            var newTile = document.createElement("div");
            var newInnerTile = document.createElement("div");
            newTile.className = "tile";
            newInnerTile.className = "innerTile";
            newTile.appendChild(newInnerTile);
            view.gameboard.appendChild(newTile);
        }
    }
}

handlers.init();