var channel = function (src, autoRelease) {

    this.audio = !!src ? new Audio(src) : new Audio();
    this.busy = false;
    this.autoRelease = !!autoRelease;

    var self = this;
    this.audio.addEventListener('play', function () {
        self.busy = true;
    });

    if (this.autoRelease) {

        this.audio.addEventListener('ended', function () {
            self.busy = false;
        });

    }

    this.id = Math.random();
};

channel.prototype.stop = function () {
    this.audio.pause();
    this.busy = false;
    this.audio.currentTime = 0;
};


channel.prototype.play = function (src, loop) {

    if (this.autoRelease && this.busy) return false;

    if (src)
        this.audio.src = src;
    this.audio.loop = !!loop;
    this.audio.play();
    console.log("play " + this.audio.src);

    return true;

};