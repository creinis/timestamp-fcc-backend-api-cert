// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// your first API endpoint... 
app.get("/api/:date", function(req, res) {
  let date = new Date(req.params.date);

  if (isInvalidDate(date)) {
    date = new Date(+req.params.date);
  }

  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
  } else {
    const unix = date.getTime();
    const iso = date.toISOString();
    const rfc2822 = date.toUTCString();
    const utc = date.toUTCString();

    res.json({
      unix,
      iso,
      rfc2822,
      utc
    });
  }
});

app.get("/api", (req, res) => {
  const date = new Date();
  const unix = date.getTime();
  const iso = date.toISOString();
  const rfc2822 = date.toUTCString();
  const utc = date.toUTCString();

  res.json({
    unix,
    iso,
    rfc2822,
    utc
  });
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
