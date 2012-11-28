var express = require('express');
var http = require('http');
var app = express();

app.get('/translate', function(req,originalRes) {
	if(req.query.jsonp) {
		var toTranslate = req.query.text
		var request = require('request');
		var qs = require('querystring');
		var redis = require("redis");
		var client = redis.createClient();

		var postBody = qs.stringify({
			client_secret : "n0ZNqCAkaGNiiDu11EUH90MXmEs5A4+QQM++RM3U1Wk=",
			client_id : "blakeTranslate",
			grant_type : "client_credentials",
			scope : "http://api.microsofttranslator.com"
		})

		client.hgetall("token", function(err, reply) {
			var nowInSeconds = Math.round(Date.now() / 1000),
				expiresOn = reply.expiresOn,
				accessToken = reply.accessToken
			if((expiresOn - nowInSeconds) > 0) {
				var from = "en",
							to = "es",
							path = ["/V2/Ajax.svc/Translate?text=", toTranslate,
						  				"&from=", from,
						    			"&to=", to].join(""),
							uri = "http://api.microsofttranslator.com" + path
							options = {
						  	uri: uri,
						  	headers : {
						  		Authorization : "Bearer " + accessToken
						  	}
							},
						request.get(options, function(err, res, body) {
							var jsonpResponse = req.query.jsonp + "(" + JSON.stringify({text : body}) + ")"
							originalRes.send(jsonpResponse);
						})
			}
			else {
				request.post({
					url : "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13",
					body : postBody,
					}, function(e, r, body) {
						var tokenHash = JSON.parse(body);
						var expiresOn = qs.parse(tokenHash.access_token).ExpiresOn;
						var accessToken = tokenHash.access_token
						client.hmset("token", "accessToken", accessToken, "expiresOn", expiresOn )
						var from = "en",
									to = "es",
									path = ["/V2/Ajax.svc/Translate?text=", toTranslate,
								  				"&from=", from,
								    			"&to=", to].join(""),
									uri = "http://api.microsofttranslator.com" + path
									options = {
								  	uri: uri,
								  	headers : {
								  		Authorization : "Bearer " + accessToken
								  	}
									},
								request.get(options, function(err, res, body) {
									var jsonpResponse = req.query.jsonp + "(" + JSON.stringify({text : body}) + ")"
									originalRes.send(jsonpResponse);
								})
				})
			}
		})
	}
})
app.listen(3000);
console.log("listening on port 3000");
