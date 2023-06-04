// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*
// CARA KU SENDIRI
app.get("/api/:date", (req,res)=> {
  const params_date = req.params.date;
  const regex = params_date.match(/[A-Za-z-]/gi)
  
  if (regex) {
    const date = new Date(params_date);
    const date_utc = date.toUTCString();
      if(date_utc == "Invalid Date"){
        return res.status(400).json({
                error: "Invalid Date"
              })
      }
    res.status(200).json({
      unix: Number(date.getTime()),
      utc: date_utc,
    })
  }

  if(!params_date){
    const date = new Date().getTime();
    const date_utc = date.toUTCString();
    return res.status(200).json({
      unix: Number(date),
      utc: date_utc,
    })
  }

  if(regex == null) {
    const date = new Date(Number(params_date));
    const date_utc = date.toUTCString();
    res.status(200).json({
      unix: Number(params_date),
      utc: date_utc,
    })
  }
})
*/

// LIHAT YOUTUBE
const isInvalidDate = (date) => date.toUTCString() == "Invalid Date";

app.get("/api/:date", (req,res) => {
  let date = new Date(req.params.date);

  console.log("CEK INI => ",isInvalidDate(date)," => ", date," => ", req.params.date)
  
  if(isInvalidDate(date)){
    date = new Date(+req.params.date);
  }

  if(isInvalidDate(date)){
     res.status(400).json({
      error: "Invalid Date"
    })
    return;
  }

  res.status(200).json({
    unix: (+date),
    utc: date.toUTCString()
  })
})

app.get("/api", (req,res)=>{
  res.status(200).json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
