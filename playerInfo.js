const state = {
    name: undefined,
    age: undefined,
    motherland: undefined,
};

const handleContact = (req, res) => {
    const { name, age } = req.query;
    state.name = name;
    state.age = age;
    if(age >=12){
        res.send(`<html>
        <body><h3>What country are you from?</h3></br>
        <form method="GET" action="/country">
            Country: <input type="text" name="motherland" required/><br/><br/>
            <button type="submit">Submit</button>
        </form>
        </body>
        </html>`);

    }else{
        res.send(`<html>
        <body><h3>What country are you from?</h3></br>
         <form method="GET" action="/waterGames">
            Country:  <input type="text" name="motherland" required/><br/>
            <button type="submit">Submit</button>
        </form>
        </body>
        </html>`);
    }
};

const waterGames = (req, res) => {
    res.send(`<html>
    <body>
        <h3>Thanks ${state.name} ${state.age}, from ${state.motherland}! <br/>
        Which water game would you want to play?</h3><br/>
        <form method="GET" action="/waterGames/oceanGame">
            <button type="submit">Ocean Game</button>
        </form>
        <form method="GET" action="/waterGames/seaGame">
            <button type="submit">Sea Game</button>
        </form>
        <form method="GET" action="/quit">
            <button type="submit">Exit</button>
        </form>
    </body>
    </html>`);
}

//
const handleCountry = (req, res) => {
    const { motherland } = req.query;
    state.motherland = motherland;
    console.log('!!!', motherland);
    if(state.age>=12){
        res.send(`<html>
        <body>
            <h3>Thanks ${state.name} ${state.age}, from ${state.motherland}! <br/>
            Are you ready to list as many countries as you can?</h3><br/>
            <form method="GET" action="/countryGame">
                <button type="submit">Yes</button>
            </form>
            <form method="GET" action="/quit">
                <button type="submit">No</button>
            </form>
        </body>
        </html>`);
    }else{
        waterGames()
    }
};

module.exports = {
    handleContact,
    handleCountry,
    waterGames,
    state,
};
