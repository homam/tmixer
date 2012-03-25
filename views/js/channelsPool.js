ChannelsPool = function () {
    this.channels = {};
};

ChannelsPool.prototype.addChannel = function (ch) {
    this.channels[ch.id] = ch;
};
ChannelsPool.prototype.play = function (src, loop) {
    for (var chName in this.channels) {
        var ch = this.channels[chName];
        if (ch.play(src, loop))
            return;
    }

    // all channels are busy

    var ch = new Channel();
    this.addChannel(ch);
    ch.play(src, loop);
};