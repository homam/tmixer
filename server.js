/// <reference path="views/public/scripts/libs/_.js" />

var express = require('express');

var port = process.env.PORT || parseInt(process.argv.pop());

var app = express.createServer();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(app.router);
    app.use('/js', express.static(__dirname + '/views/js'));
    app.use('/img', express.static(__dirname + '/views/img'));
    app.use('/audio', express.static(__dirname + '/views/audio'));
    app.use('/css', express.static(__dirname + '/views/css'));
    app.use('/impulse-responses', express.static(__dirname + '/views/impulse-responses'));

});

app.set('view engine', 'html');
app.register('.html', require('jqtpl').express);

app.get('/', function (req, res) {
    res.render('index', {
        layout: false
    });
});
app.get('/homam', function (req, res) {
    res.end('hhahah!');
});


// how to read a file: fs.readFile('socket.client.js', 'utf-8', function (a, d) { res.end(d); })

app.listen(port);;

