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
			// Checking whether date is valid or not
			if (new Date(req.params.date).toString() === 'Invalid Date') {
				console.log('entered')
				res.json({ error: 'Invalid Date' })
			}
			date = new Date(req.params.date)
			utcTimestamp = date.getTime()
		}
		res.json({
			unix: utcTimestamp !== '' ? utcTimestamp : parseInt(req.params.date),
			utc: date.toUTCString(),
		})
	} else if (!req.params.date) {
		res.json({ unix: Date.now(), utc: Date.now() })
	}
})

// listen for requests :)
var listener = app.listen('3000', function () {
	console.log('Your app is listening on port ' + listener.address().port)
})
