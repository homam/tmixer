/// <reference path="channel.js" />

ToneBox = function (src) {
    this.src = src;
    this.channel = null;
    this.active = false;
};

ToneBox.prototype.activate = function () {
    this.active = true;
};

ToneBox.prototype.deactivate = function () {
    this.active = false;
};

ToneBox.prototype.play = function () {

    if (!this.active) return false;

    
    if (!this.channel) {
        this.channel = new channel(this.src, false);
    }

    this.channel.play();

    return true;
};