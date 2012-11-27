mediator = new Mediator
$("#translationWindow").on("keydown", function(e) {
    if (e.keyCode == 13) {
        var text = $("#chatText").val();
        mediator.Publish("message", text);
    }
})
mediator.Subscribe( "message", translate );
function translate (text) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "http://localhost:3000/translate?jsonp=updateDOM&text=" + text;
	document.body.appendChild(script);
};
function updateDOM(response) {
	console.log(response);
}