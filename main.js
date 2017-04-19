var gameBoard = {
    a:[0,0,0,0],
    b:[0,0,0,0],
    c:[0,0,0,0],
    d:[0,0,0,0]
}


var view = {
    setUpEventListeners: function() {
        document.addEventListener("keydown", function(event) {
           view.checkKey(event.which); 
        });
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
view.setUpEventListeners();