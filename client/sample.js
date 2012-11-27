mediator = new Mediator
$("#translationWindow").on("keydown", function(e) {
    if (e.keyCode == 13) {
        var text = $("#chatText").val();
        mediator.Publish("message", text);
    }
})
mediator.Subscribe( "message", translate );
function translate (text) {
	$.post("localhost:3000/translate", function(data){
		alert(data)
	});
};
function someFunc(response) {
	console.log(response);
}