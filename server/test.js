var http = require('http');
var accessToken = "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=blakeTranslate&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1354058211&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=XRHJD7MquLivO0c%2fROv9TWs0IBq8%2b%2f3vh5gSXzuRlOI%3d"
	var from = encodeURIComponent("en"), 
		to = encodeURIComponent("es"),
		text = encodeURIComponent("hello world");

var options = {
  host: "api.microsofttranslator.com",
  path : ["/V2/Ajax.svc/Translate?text=", text,
  				"&from=", from,
    			"&to=", to].join(""),
  headers : {
  	Authorization : "Bearer " + accessToken
  },
  method : "GET"
};

var req = http.request(options, function(response) {
  response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
 });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

req.end();