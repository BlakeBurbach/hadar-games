$(document).ready(readyNow);
function readyNow(){
    console.log('document ready');
    $('#submitBtn').on('click', submitGame);
}

function submitGame(){
    let gameName = $('#gameName').val();
    let cost = $('#cost').val();
    let gameToAdd = {name: gameName, cost: cost};
    $.ajax({
        type: 'POST',
        data: gameToAdd, 
        url: '/game'
    }).done(function(response) {
        //our response from POST will be '200' success
        console.log('SUCCESS!!!');
    }).fail(function(response) {
        alert('Uh-oh! Something went wrong...');
    })
}