var express = require('express');
var http = require('http');
var app = express();

app.get('/translate', function(req,res) {
	if(req.query.jsonp) {
		var accessToken = "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=blakeTranslate&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1354058211&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=XRHJD7MquLivO0c%2fROv9TWs0IBq8%2b%2f3vh5gSXzuRlOI%3d"
		var from = encodeURIComponent("en"), 
			to = encodeURIComponent("es"),
			toTranslate = encodeURIComponent(req.query.text);
		
		var options = {
		  host: "api.microsofttranslator.com",
		  path : ["/V2/Ajax.svc/Translate?text=", toTranslate,
		  				"&from=", from,
		    			"&to=", to].join(""),
		  headers : {
		  	Authorization : "Bearer " + accessToken
		  }
		};

		http.get(options, function(response) {
		  response.on('data', function (chunk) {
		  	var responseString = (chunk + "")
		  	var jsonp = req.query.jsonp + "(" + JSON.stringify({text : responseString}) + ")"
		    res.send(jsonp);
		 });
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});
	}
});

app.listen(3000);
console.log("listening on port 3000");
