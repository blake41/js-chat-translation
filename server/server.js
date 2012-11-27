var express = require('express');
var app = express();

app.get('/translate', function(req,res) {
	// var body = "Hello World";
	// res.setHeader('Content-Type', 'text/plain');
	// res.setHeader('Content-Length', body.length);
	// res.end(body);
	if(req.query.hello == 1 && req.query.jsonp) {
		var response = req.query.jsonp + "(" + JSON.stringify({text : "hello world"}) + ")"
		console.log(response)
		res.send(response);		
	}
});

app.listen(3000);
console.log("listening on port 3000");
