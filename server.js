const express = require('express');
const app = express();
const playerInfo = require('./playerInfo');
const countryGame = require('./countryGame');
const waterGames = require('./waterGames');
const flatEarthers = require('./flatEarther')

const PORT = 4004

app.use(express.urlencoded({
    extended: false
}));

//Start
app.get("/", flatEarthers.flatEarther)
app.get("/home", countryGame.welcomeGame);

//User enters
app.get("/startGame", (req, res) => {
    res.send(`<html>
    <body><h2>Please type your name and age.<h2>
    <form method="GET" action="/contact">
        Name: <input type="text" name="name" required/><br/>
        Age: <input type="number" name="age" required/><br/><br/>
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
});

//Handle User Info
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

//Quit
app.get('/quit', (req, res) =>{
    res.send(`<html>
    <body style=font-size:35px; style="text-align:center;">
    <h1 style="text-align:center;"> Goodbye!!! <span style='font-size:30px;'>&#128075;</span>
    <p style="font-size:100px">&#128553;</p> Come back again!
    <form method="GET" action="/startGame"><br>
        <button>Play Again</button>
    </form></h1>
    </body>
    </html>`);
});

app.get('/bye/flatEarther', flatEarthers.byeFlatEarther);




app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

