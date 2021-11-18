const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// If enviromental variable does not exist, set port to 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'moseeqi'
});

db.connect(function(err) {
	if (err) {
		console.error(`Error connecting to database: ${err}`);
		return;
	}

	console.log(`Connected to database as id ${db.threadId}`);
});

app.post('/create_user', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		'INSERT INTO user (phone_number, username, email, password) VALUES (?,?,?,?)',
		[ phone_number, username, email, password ],
		(err, result) => {
			if (err) {
				if (err.errno === 1062) {
					res.send('duplicate-entry');
				}
			} else {
				res.send('user-added');
			}
		}
	);
});

app.post('/login', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	const password = req.body.password;
	db.query(
		'SELECT username FROM user WHERE phone_number = ? AND password = ?',
		[ phone_number, password ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('user name:', result[0].username);
				res.send(result[0].username);
			} else {
				res.send('invalid');
			}
		}
	);
	//checks if an instance exists in db or not
	console.log(phone_number, password, 'blah blah');
	// res.end();
});

app.post('/user', (req, res) => {
	console.log('in /user:', req.body);
	res.end();
});

app.post('/search', (req, res) => {
	console.log(req.body);
	const username = req.body.username;
	db.query('SELECT username, phone_number FROM user WHERE username=?', [ username ], (err, result) => {
		if (err) throw err;
		if (result[0]) {
			//sql query result is not null
			console.log('query successful');
			res.send(result);
		} else {
			res.send('no_match');
		}
	});
});

app.post('/get-user', (req, res) => {
	console.log('get user request recei', req.body);
	db.query('SELECT * FROM user WHERE phone_number=?', [ req.body.phone_number ], (err, result) => {
		if (err) throw err;
		if (result[0]) {
			//sql query result is not null
			console.log('query successful');
			console.log(result);
			res.send(result);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

// Clean up process
process.on('SIGTERM', () => {
	server.close(() => {
		console.log('Server stopped');
	});
});
