var twentyfortyeight = {
    gameboard: {
    },
    makeBoard: function(numRows) {
        if(numRows <=10 && numRows > 1) {
            for(i=0; i<numRows; i++) {
                this.gameboard["row" + i] = [];
            }

            for(i=0; i<Object.keys(this.gameboard).length; i++) {
                for(j=0; j<numRows; j++) {
                    this.gameboard["row" + i].push(0);
                }
            }
            console.log(this.gameboard);
        } else {
            console.log("that is not a valid board size");
        }
    }
}

var handlers = {
    init: function() {
        view.getBoardSize();
        handlers.setUpEventListeners();
    },
    setUpEventListeners: function() {
        document.addEventListener("keydown", function(event) {
           handlers.checkKey(event.which); 
        });
    },
    makeBoard: function(numRows) {
        twentyfortyeight.makeBoard(numRows);
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
    getBoardSize : function() {
        var numRows = prompt("how many rows would you like");
        handlers.makeBoard(numRows);
    }
}

handlers.init();