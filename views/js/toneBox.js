/// <reference path="channel.js" />

toneBox = function (src) {
    this.src = src;
    this.channel = null;
    this.active = false;
};

toneBox.prototype.activate = function () {
    this.active = true;
};

toneBox.prototype.deactivate = function () {
    this.active = false;
};

toneBox.prototype.play = function () {

    if (!this.active) return false;

    
    if (!this.channel) {
        this.channel = new channel(this.src, false);
    }

    this.channel.play();

    return true;
};