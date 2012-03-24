Channel = function Channel(autoPlay, loop, src) {
    this.audio = new Audio();
    this.playing = false;
    var self = this;
    this.audio.autoplay = !!autoPlay;
    this.audio.loop = !!loop;
    if (!!src)
        this.audio.src = src;
    this.audio.addEventListener('ended', function () {
        self.playing = false;
    }, false);
};

Channel.prototype.play = function Channel$start(src) {
    if (this.playing) {
        return false;
    } else {
        this.playing = true;
        if (!!src)
            this.audio.src = src;
    }
};

Channel.prototype.stop = function Channel$stop() {
    this.audio.pause();
    this.playing = false;
};

Channel.prototype.toggle = function Channel$toggle() {
    if (this.playing) {
        this.stop();
    }
    else {
        this.audio.currentTime = 0;
        this.play();
    }
};