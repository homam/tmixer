/// <reference path="toneBox.js" />

column = function (rows, sound) {
    this.boxes = (function () {
        var arr = [];
        for (var j = 0; j < rows; j++) {
            arr.push(new toneBox('audio/' + sound + '-' + (j+1) + '.ogg'));
        }
        return arr;
    })();
};

column.prototype.play = function () {
    for (var j = 0; j < this.boxes.length; j++) {
        this.boxes[j].play();
    }
};

column.prototype.getBox = function (row) {
    return this.boxes[row];
};