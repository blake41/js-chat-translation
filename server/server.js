var express = require('express');
var http = require('http');
var app = express();

app.get('/translate', function(req,res) {
	if(req.query.jsonp) {
		var accessToken = "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=blakeTranslate&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1354056003&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=BzeHNB4oyUzaKuK2N2kTEHe5GpU%2f0%2feOZJ4MGDcnNpo%3d"
		var from = encodeURIComponent("en"), 
			to = encodeURIComponent("es"),
			text = encodeURIComponent(req.query.text);
		
		var options = {
		  host: "api.microsofttranslator.com",
		  path : ["/V2/Ajax.svc/Translate?text=", text,
		  				"&from=", from,
		    			"&to=", to].join(""),
		  headers : {
		  	Authorization : "Bearer " + accessToken
		  }
		};

		http.get(options, function(response) {
		  response.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		    res.send(chunk)
		 });
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});
	}
});

app.listen(3000);
console.log("listening on port 3000");
