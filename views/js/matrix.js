/// <reference path="column.js" />
/// <reference path="libs/EventTarget.js" />

Matrix = function (columns, rows, sound) {
    this.notes = rows;
    this.steps = columns;
    this.columns = (function () {
        var arr = [];
        for (var i = 0; i < columns; i++) {
            arr.push(new Column(rows, sound));
        }
        return arr;
    })();

    this.sound = sound;
    this.speed = .5;
    this.isPlaying = false;
    this.events = new EventTarget();
};

Matrix.prototype.getBox = function (row, col) {
    return this.columns[col].getBox(row);
};

Matrix.prototype.toggleBoxActiveState = function (row, col) {
    var box = this.columns[col].getBox(row);
    if (box.active) {
        box.deactivate();
    } else {
        box.activate();
    }
    this.events.dispatchEvent({ type: 'box-active-state-changed', box: box, row: row, col: col, active: box.active });
};

Matrix.prototype.resize = function (columns) {
    var oldColumns = this.steps;
    this.steps = columns;
    var old = this.columns;
    var sound = this.sound;
    var rows = this.notes;
    this.columns = (function () {
        var arr = [];
        for (var i = 0; i < columns; i++) {
            var col = !!old[i] ? old[i] : new Column(rows, sound);
            arr.push(col);
        }
        return arr;
    })();
    this.events.dispatchEvent({ type: 'matrix-resized', old: { col: oldColumns, rows: rows }, current: { col: this.steps, rows: this.notes } });
};


Matrix.prototype.play = function () {

    var col = -1;
    var self = this;

    var ev = { type: 'column-play-started', column: 0 };

    var playCol = function () {
        if (col < self.columns.length - 1)
            col++;
        else
            col = 0;

        ev.column = col;
        self.events.dispatchEvent(ev);

        console.log("play col = " + col);
        self.columns[col].play();

        self._timer = setTimeout(playCol, self.speed * 1000);
    };

    this._timer = setTimeout(playCol, this.speed * 1000);
    this.isPlaying = true;

};

Matrix.prototype.stop = function () {
    clearTimeout(this._timer);
    this.isPlaying = false;
};

Matrix.prototype.toggle = function () {
    if (this.isPlaying) {
        this.stop();
    } else {
        this.play();
    }
};