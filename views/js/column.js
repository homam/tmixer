/// <reference path="toneBox.js" />

Column = function (rows, sound) {
    this.boxes = (function () {
        var arr = [];
        for (var j = 0; j < rows; j++) {
            arr.push(new ToneBox('audio/' + sound + '/' + sound + '-' + (j+1) + '.ogg'));
        }
        return arr;
    })();
};

Column.prototype.play = function () {
    for (var j = 0; j < this.boxes.length; j++) {
        this.boxes[j].play();
    }
};

Column.prototype.getBox = function (row) {
    return this.boxes[row];
};