//const listofOceans = require('./listOfSeas');
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

const oceanGame = (req, res) => {
    res.send(`<html>
    <body><h3>
        Please enter as many Oceans names as you can, one per line:<p> Time:
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
            <textarea rows="20" cols="40" placeholder="Type here, one per line..." name="oceanGuesses"></textarea>
            <button type="submit">That's all I can think of!</button>
        </form>
        </body>
    </html>`);
};

const seasGame = (req, res) => {
    res.send(`<html>
    <body><h4>
        Please enter as many names of seas as possible, one per line:<br/>
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
            <textarea rows="20" cols="40" placeholder="Type here, one per line..." name="seaGuesses"></textarea>
            <button type="submit">That's all I can think of!</button>
        </form>
        </body>
    </html>`);
};

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
        By the way there are another <font style="color:blue">${missed}</font> <i>oceans.</i></h3><br/>
        <h3 style="color:Blue">${state.name} from ${state.motherland} Results: </h3>
        <h3>You guessed the following Oceans: <font style="color:orange">${total}</font></h3>
        <ol>${playerList}</ol><br/>
        <h4>Correct:<font style="color:green">${numRight} </font> </h4>
        <ol>${compareLists}</ol><br/>
        <h4>Incorrect:<font style="color:red">${numWrong}</font></h4>
        <ol>${incorrectList}</ol><br/>
        <form method="GET" action="/waterGames/oceanGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/waterGames/endOceanGame">
            <button type="submit">End Game</button>
        </form>
    </body>
    </html>`);
    };

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
        <h3 style="color:Blue">${state.name} from ${state.motherland} Results: </h3>
        <h3>You guessed the following seas: <font style="color:orange">${total}</font> </h3>
        <ol>${playerList}</ol><br/>
        <h4>Correct:<font style="color:lightgreen">${numRight} </font> </h4>
        <ol>${compareLists}</ol><br/>
        <h4>Incorrect:<font style="color:red">${numWrong}</font></h4>
        <ol>${incorrectList}</ol><br/>
        <form method="GET" action="/waterGames/seaGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/waterGames/endSeaGame">
            <button type="submit">End Game</button>
        </form>
    </body>
    </html>`);
    };

const endSeaGame = (req, res) => {
    //create a list
    const seaLists = seaList.map((itemList) =>
    `<li>
        ${capitalize(itemList)}
    </li>`).join("")
    res.send(`<html>
    <body><h3 style="font-size:40px"> Thank you for playing! &#129409;</h3>
        <h4>Here is the list of seas you can review for next time:</h4>
        <ol>${seaLists}</ol><br/>
        <form method="GET" action="/startGame">
            <button type="submit">Play Again</button>
        </form>
        <form method="GET" action="/quit">
            <button type="submit">Exit</button>
        </form></body>
    </html>`);
};

const endOceanGame = (req, res) => {
    //create a list
    const oceanLists = oceanList.map((itemList2) =>
    `<li>
        ${capitalize(itemList2)}
    </li>`).join("")
    res.send(`<html>
    <body><h3 style="font-size:40px"> Thank you for playing! &#129409;</h3>
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
    seasGame,
    oceanGame,
    oceanGuesses,
    seaGuesses,
    endOceanGame,
    endSeaGame,
};