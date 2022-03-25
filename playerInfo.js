//Game state
const state = {
    name: undefined,
    age: undefined,
    motherland: undefined,
};

//Handle User Info
const handleContact = (req, res) => {
    const { name, age } = req.query;
    state.name = name;
    state.age = age;
    if(age >=12){
        res.send(`<html>
        <body><h3 style=font-size:20px;>What country are you from?</h3>
        <form method="GET" action="/country">
            <h4> Country: <input type="text" name="motherland" required/><br/><br/>
            <button type="submit">Submit</button>
        </form>
        </body>
        </html>`);

    }else{
        res.send(`<html>
        <body><h3 style=font-size:30px;>What country are you from?</h3>
        <form method="GET" action="/waterGames">
            <h4>Country:<input type="text" name="motherland" required/><br/><br/>
            <button type="submit">Submit</button></form><h4/>
        </body>
        </html>`);
    }
};

//Handle Country Game
const handleCountry = (req, res) => {
    const { motherland } = req.query;
    state.motherland = motherland;
    console.log('!!!', motherland);
    if(state.age>=12){
        res.send(`<html>
        <body style=font-size:20px;><br/>
        <h2 style="text-align:center;">
            Thank you <font style="color:blue">${state.name} ${state.age}</font>, 
            from <font style="color:green">${state.motherland}</font>! <br/>
            <br/>Are you ready to name as many countries as possible?<br/><br/>
            <form method="GET" action="/countryGame">
                <button type="submit">Yes</button>
            </form>
            <form method="GET" action="/quit">
                <button type="submit">No</button>
            </form><h2/>
        </body>
        </html>`);
    }else{
        res.send(`<html>
        <body style=font-size:20px;><br/>
        <h2 style="text-align:center;">
            Thank you <font style="color:blue">${state.name} ${state.age}</font>, from <font style="color:green">${state.motherland}</font>! <br/>
             Which water game would you like to play?<br/><br/>
            <form method="GET" action="/waterGames/oceanGame">
                <button type="submit">Ocean Game</button>
            </form>
            <form method="GET" action="/waterGames/seaGame">
                <button type="submit">Sea Game</button>
            </form>
            <form method="GET" action="/quit">
                <button type="submit">Exit</button>
            </form><h2/>
        </body>
        </html>`);
    }
};

module.exports = {
    handleContact,
    handleCountry,
    //waterGames,
    state,
};
