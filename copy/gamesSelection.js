const gamesSelection = (req, res) => {
    res.send(`<html>
    <body><h1>Games:</h1>
        <h4>Which game do you want to play?</h4><br/>
        <form method="GET" action="/country">
            <button type="submit">Country Game</button>
        </form>
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
};

module.exports = {
    gamesSelection,
};