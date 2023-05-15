const express = require("express");

const server = express();

module.exports = server;

const staticHandler = express.static("public");
server.use(staticHandler);

const bodyParser = express.urlencoded();

const cheeseRatings = [];

server.get("/", (req, res) => {
  res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Hello Express Homepage</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <h1>Hello Express</h1>
        </body>
      </html>
    `);
});

server.get("/colour", (req, res) => {
  const hex = req.query.hex || "ffffff";

  res.send(
    `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Get Colour</title>
          <link rel="stylesheet" href="/styles.css">
          <style>body {background-color: #${hex};}</style>
        </head>
        <body>
          <h1>Get Colour</h1>
          <form action="/colour" method="GET">
          <label for="colour">Colour: #</label>
          <input type="text" id="colour" name="hex" autofocus>
          <br><br>
          <label for="colourChooser">Or select your favourite colour:</label>
          <input type="color" id="colourChooser" name="colourChooser" value="#${hex}" oninput="colour.value = colourChooser.value.replace('#','')")>
          <br><br>
          <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `
  );
});

server.get("/cheese", (req, res) => {
  let cheeseList = "";
  if (cheeseRatings.length > 0) {
    cheeseList += `<ul>${cheeseRatings.join("")}</ul>`;
  }

  res.send(
    `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Rate my cheese</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <h1>Rate my cheese</h1>
          <form action="/cheese" method="POST">
          <label for="name">Cheese</label>
          <input type="text" id="name" name="name" autofocus required>
          <br><br>
          <label for="rating">Rating</label>
          <input type="range" id="rating" name="rating" min="0" max="5" value="3" oninput="cheeseRating.innerHTML = rating.value"></input>
          <output id="cheeseRating">3</output>
          <br><br>
          <button type="submit">Submit</button>
          </form>
          <br><br>
          ${cheeseList}
        </body>
      </html>
    `
  );
});

server.post("/cheese", bodyParser, (req, res) => {
  const cheese = req.body.name;
  const rating = req.body.rating;
  cheeseRatings.push(`<li>${cheese} | ${rating} stars</li>`);

  res.redirect("/cheese");
});
