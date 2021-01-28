var express = require('express');
var app = express();

// etc setting
app.set('view engine', 'ejs');
app.set('views', './views/contacts');
app.use(express.static('public'));

// route setting
app.get('/', function(req, res) {
	res.render('index');
})
app.get('/:url', function(req, res) {
	res.render(req.params.url);
})
// favicon
app.get('/favicon.ico' , function(req , res){
	res.sendStatus(204);
});

// host setting
var host = '0.0.0.0';
var port = 3000;

app.listen(port, host, function() {
	console.log('start server!')
})