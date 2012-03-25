/// <reference path="column.js" />
matrix = function (columns, rows, sound) {
    this.notes = rows;
    this.steps = columns;
    this.columns = (function () {
        var arr = [];
        for (var i = 0; i < columns; i++) {
            arr.push(new column(rows, sound));
        }
        return arr;
    })();

    this.speed = .5;

};

matrix.prototype.getBox = function (row, col) {
    return this.columns[col].getBox(row);
}


matrix.prototype.play = function () {

    var col = -1;
    var self = this;

    var playCol = function () {
        if (col < self.columns.length - 1)
            col++;
        else
            col = 0;

        console.log("play col = " + col);
        self.columns[col].play();

        self._timer = setTimeout(playCol, self.speed * 1000);
    };

    this._timer = setTimeout(playCol, this.speed * 1000);

};