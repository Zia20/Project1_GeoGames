//Requirements
const listOfSeas = require('./listOfSeas');
const { playerInfo, state } = require('./playerInfo');

//capitalize first letter function
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

//lower case listOfOceans array
const oceanList = listOfSeas.oceanList.map(c => c.toLowerCase());
const seaList = listOfSeas.seaList.map(c => c.toLowerCase());

//Handle Water Games
const waterGames = (req, res) => {
    const { motherland } = req.query;
    state.motherland = motherland;
    res.send(`<body style=font-size:20px;>
    <h2 style="text-align:center;">
        Thank you <font style="color:blue">${state.name} ${state.age}</font>, 
        from <font style="color:green">${state.motherland}</font>! <br/>
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


//Handle Ocean Game 
const oceanGame = (req, res) => {
    res.send(`<html>
    <body><h3><br/>
        Please name as many <font style ="color:darkblue;" >Ocean </font> as possible, one per line:<p> Time:
        <label id="minutes">00</label>
        <label id="colon">:</label>
        <label id="seconds">00</label>  
        <script type="text/javascript">
        let minutesLabel = document.getElementById("minutes");
        let secondsLabel = document.getElementById("seconds");
        let totalSeconds = 0;
        setInterval(setTime, 1000);
        
        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
        
        function pad(val)
        {
            let valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
        </script></h4></h3>
        <form method="POST" action="/waterGames/OceanGame/oceanGuesses">
            <textarea rows="20" cols="40" placeholder="Type here, one per line..." name="oceanGuesses"></textarea><br/><br/>
            <button type="submit">That's all I can think of!</button>
        </form>
        </body>
    </html>`);
};

//Handle Sea Game
const seasGame = (req, res) => {
    res.send(`<html>
    <body><h3>
        Please name as many <font style ="color:blue;" >seas </font> as possible, one per line:<br/>
        <p> Time:
        <label id="minutes">00</label>
        <label id="colon">:</label>
        <label id="seconds">00</label>  
        <script type="text/javascript">
        let minutesLabel = document.getElementById("minutes");
        let secondsLabel = document.getElementById("seconds");
        let totalSeconds = 0;
        setInterval(setTime, 1000);
        
        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
        
        function pad(val)
        {
            let valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
        </script></h4>
        <form method="POST" action="/waterGames/seaGame/seaGuesses">
            <textarea rows="20" cols="40" placeholder="Type here, one per line..." name="seaGuesses"></textarea><br/><br/>
            <button type="submit">That's all I can think of!</button>
        </form>
        </body></h3>
    </html>`);
};

//Handle User Guesses
const oceanGuesses = (req, res) => {
    const {oceanGuesses} = req.body;
    const guessedOcean = oceanGuesses.split('\n').map(g => g.trim().toLowerCase()).filter(g => !!g);
    const total = guessedOcean.length;
    console.log(guessedOcean);

    const correctOcean = oceanList.filter(oceanName => {
        compareOceanList = !!guessedOcean.find(guessedName => oceanName === guessedName);
        return compareOceanList;
    });

    const numRight = correctOcean.length;
    const numWrong = total - numRight;
    const missed = oceanList.length - numRight;
    const percentage = (numRight/oceanList.length)*100;
    let percent = percentage.toFixed(2)

    //create a list
    const playerList = guessedOcean.map((ocean) =>
   `<li>
        ${capitalize(ocean)}
    </li>`).join("")

    console.log('playerList: ' + playerList)

    //create a correct list
    const compareLists = correctOcean.map((checkList) =>
   `<li>
        ${capitalize(checkList)}
    </li>`).join("")

    console.log('compareLists: ' + compareLists)

    //wrong country, the different between the playlist and compareList
    let incorrectOcean = guessedOcean.filter(x => !correctOcean.includes(x));
    console.log("incorrectOcean " + incorrectOcean)

    const incorrectList = incorrectOcean.map((checkList2) =>
        `<li>
            ${capitalize(checkList2)}
        </li>`).join("")
 
    console.log('incorrectList : ' + incorrectList)

    res.send(`<html>
    <body><h3>
        Sweet, you got <font style="color:green">${numRight} </font> right and <font style="color:red">${numWrong}</font> wrong.<br/> 
        By the way there are another <font style="color:blue">${missed}</font> <i>oceans.</i></h3>
        <h3 style="color:Blue">${state.name} from ${state.motherland} Results: ${percent}%</h3>
        <h3>You guessed the following Oceans: <font style="color:orange">${total}</font></h3>
        <ol>${playerList}</ol><br/>
        <h4>Correct:<font style="color:green">${numRight} </font> </h4>
        <ol>${compareLists}</ol><br/>
        <h4>Incorrect:<font style="color:red">${numWrong}</font></h4>
        <ol>${incorrectList}</ol><br/>
        <form method="GET" action="/waterGames/oceanGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/countryGame">
        <button type="submit">Country Game</button>
        </form>
        <form method="GET" action="/waterGames/seaGame">
            <button type="submit">Sea Game</button>
         </form>
        <form method="GET" action="/waterGames/endOceanGame">
            <button type="submit">End Game</button>
        </form>
    </body>
    </html>`);
    };

//Handle User Guesses
const seaGuesses = (req, res) => {
    const {seaGuesses} = req.body;
    const guessedSea = seaGuesses.split('\n').map(g => g.trim().toLowerCase()).filter(g => !!g);
    const total = guessedSea.length;
    console.log(guessedSea);

    const correctSea = seaList.filter(seaName => {
        compareSeaList = !!guessedSea.find(guessedName => seaName === guessedName);
        return compareSeaList;
    });

    const numRight = correctSea.length;
    const numWrong = total - numRight;
    const missed = oceanList.length - numRight;
    const percentage = (numRight/seaList.length)*100;
    let percent = percentage.toFixed(2)

    //create a list
    const playerList = guessedSea.map((sea) =>
   `<li>
        ${capitalize(sea)}
    </li>`).join("")

    console.log('playerList: ' + playerList)

    //create a correct list
    const compareLists = correctSea.map((checkList) =>
   `<li>
        ${capitalize(checkList)}
    </li>`).join("")

    console.log('compareLists: ' + compareLists)

    //wrong sea, the different between the playlist and compareList
    let incorrectSea = guessedSea.filter(x => !correctSea.includes(x));
    console.log("incorrectSea " + incorrectSea)

    const incorrectList = incorrectSea.map((checkList2) =>
        `<li>
            ${capitalize(checkList2)}
        </li>`).join("")
 
    console.log('incorrectList : ' + incorrectList)

    res.send(`<html>
    <body><h3>
        Sweet, you got <font style="color:green">${numRight} </font> right and <font style="color:red">${numWrong}</font> wrong.<br/> 
        By the way there are another <font style="color:blue">${missed}</font> <i>seas.</i></h3><br/>
        <h3 style="color:Blue">${state.name} from ${state.motherland} Results: ${percent}%</h3>
        <h3>You guessed the following seas: <font style="color:orange">${total}</font> </h3>
        <ol>${playerList}</ol><br/>
        <h4>Correct:<font style="color:lightgreen">${numRight} </font> </h4>
        <ol>${compareLists}</ol><br/>
        <h4>Incorrect:<font style="color:red">${numWrong}</font></h4>
        <ol>${incorrectList}</ol><br/>
        <form method="GET" action="/waterGames/seaGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/waterGames/oceanGame">
            <button type="submit">Ocean Game</button>
        </form>
        <form method="GET" action="/countryGame">
            <button type="submit">Country Game</button>
        </form>
        <form method="GET" action="/waterGames/endSeaGame">
            <button type="submit">End Game</button>
        </form>
    </body>
    </html>`);
    };


//End of Sea Game - Review List - Options
const endSeaGame = (req, res) => {
    //create a list
    const seaLists = seaList.map((itemList) =>
    `<li>
        ${capitalize(itemList)}
    </li>`).join("")
    res.send(`<html>
    <body><h3 style="font-size:40px"> Thank you for playing! &#128031;</h3>
        <h4>Here is the list of seas you can review for next time:</h4>
        <ol>${seaLists}</ol><br/>
        <form method="GET" action="/startGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/countryGame">
            <button type="submit">Country Game</button>
        </form>
        <form method="GET" action="/quit">
            <button type="submit">Exit</button>
        </form></body>
    </html>`);
};

//End of Ocean Game - Review List - Options
const endOceanGame = (req, res) => {
    //create a list
    const oceanLists = oceanList.map((itemList2) =>
    `<li>
        ${capitalize(itemList2)}
    </li>`).join("")
    res.send(`<html>
    <body><h3 style="font-size:40px"> Thank you for playing! &#128011;</h3>
        <h4> Here is the list of Oceans you can review for next time:</h4>
        <ol>${oceanLists}</ol><br/>
        <form method="GET" action="/startGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/quit">
            <button type="submit">Exit</button>
        </form></body>
    </html>`);
};


module.exports = {
    waterGames,
    seasGame,
    oceanGame,
    oceanGuesses,
    seaGuesses,
    endOceanGame,
    endSeaGame,
};