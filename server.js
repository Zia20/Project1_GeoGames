const express = require('express');
const app = express();
const playerInfo = require('./playerInfo');
const countryGame = require('./countryGame');
const waterGames = require('./waterGames');

const PORT = 4004

app.use(express.urlencoded({
    extended: false
}));

app.get("/", countryGame.welcomeGame);

app.get("/startGame", (req, res) => {
    res.send(`<html>
    <body><h2>Please type your name and age.<h2>
    <form method="GET" action="/contact">
        Name: <input type="text" name="name" required/><br/>
        Age: <input type="text" name="age" required/><br/>
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
});

//User Info
app.get('/contact', playerInfo.handleContact);
app.get('/country', playerInfo.handleCountry);

//Country Game
app.get('/waterGames', playerInfo.waterGames);
app.get('/countryGame', countryGame.handleGame);
app.post('/countryGame/guesses', countryGame.handleGuesses);

//Water Games Selection
app.get('/waterGames/oceanGame', waterGames.oceanGame);
app.get('/waterGames/seaGame', waterGames.seasGame);

//Water Games Guess
app.post('/waterGames/oceanGame/oceanGuesses', waterGames.oceanGuesses);
app.post('/waterGames/seaGame/seaGuesses', waterGames.seaGuesses);

//Exit Game
app.get('/endGame', countryGame.endGame);
app.get('/waterGames/endSeaGame', waterGames.endSeaGame);
app.get('/waterGames/endOceanGame', waterGames.endOceanGame);

app.get('/quit', (req, res) =>{
    res.send(`<html>
    <body><h1> Goodbye!!! <span style='font-size:30px;'>&#128075;</span>
    <p style="font-size:100px">&#128553;</p> Come back again!</h1>
    <form method="GET" action="/startGame">
        <button type="submit">Play Again</button>
    </form>
    </body>
    </html>`);
});

//app.listen(4004, () => console.log(`listening on on port ${PORT}`));

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

