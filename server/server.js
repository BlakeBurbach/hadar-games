let express = require('express');
let app = express();
// if on heroku, use the provided port || use 4001
const PORT = process.env.PORT || 4001;
let bodyParse = require('body-parser');
const gameCollection = []; // Contains objects w/ {name: 'game name' ,cost: 0.99}

// configures body-parser for jQuery
// happens first
//MUST BE DONE BEFORE app.post!!!
app.use(bodyParse.urlencoded({extended: true})); //<- will not work without this

// Serve static files
app.use(express.static('server/public'));

// when we want to add a new game.
app.post('/game', (req, res) => {
    console.log(req.body);
    let gameToAdd = req.body;
    let gameName = gameToAdd.name;
    let gameCost = parseFloat(gameToAdd.cost);
    gameToAdd.name += '!!!';
     gameToAdd.tax = gameCost * 0.07;
    // distinquish between 19.99 and 19.00
    gameToAdd.isClearance = isClearance(gameCost);
    // 19.99 - Math.floor(19.99); // 19.99 - 19 = 0.99
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);

}); 
//distinguish between .99 and .00
function isClearance(cost){
    if (cost - Math.floor(cost)=== 0){
        return true;
    }
    else {
        return false;
    }
}

// Send back all the games.
app.get('/game', (req, res) => {
    res.send(gameCollection);
})

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});