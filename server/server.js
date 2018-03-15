let express = require('express');
let app = express();
const PORT = 4001;
let bodyParse = require('body-parser');
const gameCollection = [];

// configures body-parser for jQuery
app.use(bodyParse.urlencoded({extended: true})); //<- will not work without this

// Serve static files
app.use(express.static('server/public'));

app.post('/game', (req, res) => {
    console.log(req.body);
    let gameToAdd = req.body;
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);
});

app.get('')

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});