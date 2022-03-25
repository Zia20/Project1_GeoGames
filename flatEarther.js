
//People who believe the Earth is flat!!! :-(
const flatEarther = (req, res) => {
    message = `<body style=font-size:30px; ><h1 style="text-align:center;">Hello!!!<h1>
    <style>
        .button {
        background-color: #4CAF50; 
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        }
        .button1 {width: 250px;}
        .button2 {width: 50%;}
        .button3 {width: 20%;}
        .button4 {background-color: red; width:20%}
    </style>
    <h2 style="text-align:center; color: green;"> Do you believe the Earth is flat? </h2><br/>

        <form style="text-align:center;" method="GET" action="/bye/flatEarther">
            <a id="link"><button class="button button4">Yes</button></a></form>
        <form style="text-align:center;" method="GET" action="/home">
             <a id="link"><button class="button button3">No</button></a>
        </form>
        </body>`;
    res.send(message)
};

const byeFlatEarther = (req, res) => {
    res.send(`<html>
        <body><h1 style="font-size:150px"> Goodbye Flat Earther! &#128545;</h1>
            <h2>Watch Video 1: <a href="https://www.youtube.com/watch?v=21X5lGlDOfg&ab_channel=NASA">NASA Live: Official Stream of NASA TV</a><br/>
            Watch Video 2: <a href="https://www.youtube.com/watch?v=UtAhaXeAEQw&ab_channel=ENDLESS4K">NASA - Hubble telescope captured galaxies the Universe - 4K Ultra HD</a></h2>
        </body>
        <form method="GET" action="/"><br><br>
            <button type="submit">Try Again</button>
         </form>
         </body>
        </html>`);
};

  module.exports = { 
            flatEarther,
            byeFlatEarther,

  }