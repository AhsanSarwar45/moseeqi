const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

// If enviromental variable does not exist, set port to 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('data'));

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

app.post('/upload_music', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.ph;
	const user_name = req.body.user_name;
	const sname = req.body.sname;
	if (req.files === null) {
		console.log('no file');
		return res.status(400).json({ msg: 'No File Uplaoded' });
	}
	const file = req.files.file;

	var dir = `/data/${phone_number}/music`;
	var abs_dir = `./data/${phone_number}/music`;

	if (!fs.existsSync(abs_dir)) {
		fs.mkdirSync(abs_dir, { recursive: true });
	}

	const absolute_path = `${abs_dir}/${sname}`;
	const relative_path = `${dir}/${sname}`;

	file.mv(absolute_path, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		console.log('ph#', phone_number);
		db.query(
			'INSERT INTO music (sname, phone_number, username, like_count, genre, music_path, promoted) VALUES (?,?,?,?,?,?,?)',
			[ sname, phone_number, user_name, 0, '', relative_path, 0 ],
			(err) => {
				if (err) {
					if (err.errno === 1062) {
						res.send('duplicate-entry');
					}
				} else {
					console.log('music added sucessfully');
					res.send('success');
				}
			}
		);
	});
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
	// console.log(phone_number, password, 'blah blah');
	// res.end();
});

app.post('/user', (req, res) => {
	console.log('in /user:', req.body);
	res.end();
});

app.post('/search_user', (req, res) => {
	console.log(req.body);
	const username = req.body.username;
	db.query(
		'SELECT username, phone_number, follower_count FROM user WHERE username LIKE ?',
		[ '%' + username + '%' ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('query successful');
				res.send(result);
			} else {
				res.send('no_match');
			}
		}
	);
});

app.post('/delete_music', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	const sname = req.body.sname;
	db.query('SELECT sname FROM music WHERE sname=? AND phone_number=?', [ sname, phone_number ], (err, result) => {
		if (err) throw err;
		if (result[0]) {
			//sql query result is not null
			db.query('DELETE FROM music WHERE sname=? AND phone_number=?', [ sname, phone_number ], (err) => {
				if (err) {
					res.send('deletion_failed');
					throw err;
				} else {
					var dir = `/data/${phone_number}/music`;
					var abs_dir = `./data/${phone_number}/music`;

					if (!fs.existsSync(abs_dir)) {
						res.send('deletion_failed');
					}
					const absolute_path = `.${dir}/${sname}`;
					fs.unlink(absolute_path, (err) => {
						if (err) {
							console.error(err);
							res.send('deletion_failed');
						}
					});
					res.send('deletion_complete');
				}
			});
		} else {
			res.send('no_match');
		}
	});
});

app.post('/search_music', (req, res) => {
	console.log(req.body);
	const sname = req.body.sname;
	db.query(
		'SELECT sname, phone_number, username, like_count, genre, music_path FROM music WHERE sname LIKE ?',
		[ '%' + sname + '%' ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('query successful');
				res.send(result);
			} else {
				res.send('no_match');
			}
		}
	);
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

app.post('/get-music', (req, res) => {
	console.log('get music request recei', req.body);
	db.query(
		'SELECT * FROM music WHERE phone_number=? AND sname=?',
		[ req.body.phone_number, req.body.sname ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('query successful');
				console.log(result);
				res.send(result);
			}
		}
	);
});

app.post('/delete_account', (req, res) => {
	const username = req.body.username;
	db.query('SELECT FROM user WHERE username = ?', [ username ], (err, result) => {
		if (err) throw err;
		if (result[0]) {
			db.query('DELETE FROM user WHERE username = ?', [ username ], (err, result) => {
				if (err) {
					res.send('deletion_failed');
					throw err;
				} else {
					res.send('deletion_complete');
				}
			});
		} else {
			res.send('no_match');
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
