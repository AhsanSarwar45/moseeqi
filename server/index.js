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
					res.send('/duplicate_entry');
				}
			} else {
				res.send('/user_added');
			}
		}
	);
});

app.post('/sign_in', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	const password = req.body.password;
	db.query(
		'SELECT password FROM user WHERE phone_number = ?', 
    [phone_number],
		(err, result) => {
			if (!result[0] || result[0].password != req.body.password) {
        //query returned nothing or password incorrect
        console.log("hit");
        res.send("/incorrect_credentials");
      } else {
        res.send("/sign_in_successful");
      }
		}
	);
});

app.post('/user', (req, res) => {
	console.log(req.body);
	// res.end();
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
