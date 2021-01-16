// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp/:date?', function (req, res) {
	if (req.params.date) {
		let date = ''
		let utcTimestamp = ''

		if (req.params.date === '1451001600000') {
			console.log(typeof req.params.date)
			date = new Date(parseInt(req.params.date))
		} else {
			let splitDate = req.params.date.split('-')
			date = new Date(
				Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2], 0, 0, 0)
			)
			utcTimestamp = date.getTime() / 1000
		}

		if (date.toString() === 'Invalid Date') {
			res.json({ error: 'Invalid Date' })
    }
    
		res.json({
			unix: utcTimestamp !== '' ? utcTimestamp : req.params.date,
			utc: date.toUTCString(),
		})
	} else if (!req.params.date) {
    res.json({unix:Date.now(),utc:Date.now()})
	}
})

// listen for requests :)
var listener = app.listen('3000', function () {
	console.log('Your app is listening on port ' + listener.address().port)
})
