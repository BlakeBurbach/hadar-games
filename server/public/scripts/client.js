$(document).ready(readyNow);
function readyNow(){
    console.log('document ready');
    $('#submitBtn').on('click', submitGame);
    getAllGames(); // call this on page load so that a user doesn't need to 
                   // need to submit one game to get the list of all of the games
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
        // Refresh our game list
        getAllGames();
    }).fail(function(response) {
        alert('Uh-oh! Something went wrong...');
    })
}

function getAllGames(){
    $.ajax({
        type: 'GET',
        url: '/game'
    }).done(function(response){
        appendToDom(response); // response is our gameCollection
    })
}

function appendToDom(gameCollection){
    $('#gameContent').empty();
    for (let game of gameCollection){
        console.log('GAME: ', game);
        let tr = $('<tr></tr>');
        if ( game.isClearance){
            tr.append('<td class="clearance">' + game.name + '</td>');
            tr.append('<td class="clearance">' + game.cost + '</td>');
            tr.append('<td class="clearance">' + game.tax + '</td>');
        } else {
            tr.append('<td>' + game.name + '</td>');
            tr.append('<td>' + game.cost + '</td>');
            tr.append('<td>' + game.tax + '</td>');
        }
        $('#gameContent').append(tr);
    }
}