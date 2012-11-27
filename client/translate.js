var accessToken = "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=blakeTranslate&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1354049574&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=Eflz3jiygtC94U%2fkMnG%2fdT5DyPjwjZf13lQ6t7dhaes%3d"
var onload = function () {
    var from = "en", to = "es", text = "hello world";

    var s = document.createElement("script");
    s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
        "?appId=bearer " + encodeURIComponent(accessToken) +
        "&from=" + encodeURIComponent(from) +
        "&to=" + encodeURIComponent(to) +
        "&text=" + encodeURIComponent(text) +
        "&oncomplete=mycallback";
    document.body.appendChild(s);
}

function mycallback(response)
{
    alert(response);
}
