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

onload()