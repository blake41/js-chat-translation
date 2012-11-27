mediator = new Mediator
$( "#chatForm" ).on( "submit", function(e) {
    e.preventDefault();

    // Collect the details of the chat from our UI
    var text = $( "#chatBox" ).val(),
        from = $( "#fromBox" ).val();
        to = $( "#toBox" ).val();

    // Publish data from the chat to the newMessage topic
    mediator.Publish( "newMessage" , { message: text, from: from, to: to } );
});

// Append new messages as they come through
function displayChat( data ) {
    var date = new Date(),
        msg = data.from + " said \"" + data.message + "\" to " + data.to;

    $( "#chatResult" )
        .prepend("<p>" + msg + " (" + date.toLocaleTimeString() + ")</p>");
}

// Log messages
function logChat( data ) {
    if ( window.console ) {
        console.log( data );
    }
}



// Subscribe to new chat messages being submitted
// via the mediator
mediator.Subscribe( "newMessage", displayChat );
mediator.Subscribe( "newMessage", logChat );


// The following will however only work with the more advanced implementation:

function amITalkingToMyself( data ) {
    return data.from === data.to;
}

function iAmClearlyCrazy( data ) {
    $( "#chatResult" ).prepend("<p>" + data.from + " is talking to himself.</p>");
}

 mediator.Subscribe("something", iAmClearlyCrazy, amITalkingToMyself );
