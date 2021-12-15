const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { devNull } = require('os');

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

// If enviromental variable does not exist, set port to 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('data'));

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// // Set to true if you need the website to include cookies in the requests sent
	// // to the API (e.g. in case you use sessions)
	// res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

let phone_numbers = [];

// const initiliazeTables = `

// CREATE TABLE added (p_name VARCHAR(45) NOT NULL, s_name VARCHAR(45) NOT NULL, p_ph VARCHAR(45)NOT NULL, s_ph VARCHAR(45) NOT NULL, PRIMARY KEY(p_name, s_name, p_ph, s_ph))
// `

const InitializeTables = `
DROP TABLE IF EXISTS added;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS listens;
DROP TABLE IF EXISTS music;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS views;

CREATE TABLE added (p_name varchar(45) NOT NULL, s_name varchar(45) NOT NULL, p_ph varchar(45) NOT NULL, s_ph varchar(45) NOT NULL, PRIMARY KEY (p_name,s_name,p_ph,s_ph));
CREATE TABLE follows (follower_phone_number varchar(45) NOT NULL, followed_phone_number varchar(45) NOT NULL, PRIMARY KEY (follower_phone_number,followed_phone_number));
CREATE TABLE likes (s_name varchar(45) NOT NULL, s_ph varchar(45) NOT NULL, liker_ph varchar(45) NOT NULL, PRIMARY KEY (s_name,s_ph,liker_ph));
CREATE TABLE listens (s_ph varchar(45) NOT NULL, s_name varchar(45) NOT NULL, listener_ph varchar(45) NOT NULL, listen_counts int unsigned DEFAULT 0, PRIMARY KEY (s_ph,s_name,listener_ph));
CREATE TABLE music (sname varchar(45) NOT NULL, phone_number varchar(45) NOT NULL, username varchar(45) DEFAULT NULL, like_count int(10) unsigned zerofill DEFAULT NULL, genre varchar(45) DEFAULT NULL, music_path varchar(300) DEFAULT NULL, promoted tinyint DEFAULT NULL, PRIMARY KEY (sname,phone_number));
CREATE TABLE playlist (pname varchar(45) NOT NULL, creator_phone_number varchar(45) NOT NULL, creator_username varchar(45) DEFAULT NULL, PRIMARY KEY (pname,creator_phone_number));
CREATE TABLE user (phone_number varchar(45) NOT NULL, email varchar(45) NOT NULL, username varchar(45) NOT NULL, password varchar(45) NOT NULL, follower_count int unsigned NOT NULL DEFAULT 0, profile_picture blob, type varchar(45) DEFAULT 1, earnings int DEFAULT 0, PRIMARY KEY (phone_number), UNIQUE KEY email_UNIQUE (email), UNIQUE KEY phone_number_UNIQUE (phone_number));
CREATE TABLE views (pname varchar(45) NOT NULL, username varchar(45) DEFAULT NULL, user_number varchar(45) NOT NULL, PRIMARY KEY (pname,user_number));`;

const db = mysql.createConnection({
	host: 'localhost',
	//socketPath: '/cloudsql/sharkbit-111:asia-southeast1:moseeqi',
	user: 'root',
	//password: '123',
	database: 'moseeqi',
	multipleStatements: true
});

db.connect(function(err) {
	if (err) {
		console.error(`Error connecting to database: ${err}`);
		return;
	}
	console.log(`Connected to database as id ${db.threadId}`);

	db.query(InitializeTables, (err) => {
		if (err) {
			throw err;
		} else {
			console.log('success');
		}
	});

	SeedUsers(100);
	//SeedPlaylists();
});

app.get('/', (req, res) => {
	res.send('server is running');
});

// for (let i = 0; i < 10000; i++)
// {
// 	db.query('(phone_number, username, email, password) VALUES (?,?,?,?)',
// 	[rn(options), random.first(), randomEmail(), random.first()],
// 	(err, result) => {
// 		if (err) {
// 			if (err.errno === 1062) {
// 				res.send('duplicate-entry');
// 			}
// 		} else {
// 			res.send('user-added');
// 		}
// 	})
// };

app.get('/check-db', (req, res) => {
	db.query(`SELECT * FROM user`, (req, res) => {
		if (err) {
			throw err;
		}
		res.send('user-added');
	});
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

app.post('/search_playlist', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	db.query(
		'SELECT pname, creator_phone_number FROM playlist WHERE creator_phone_number = ?',
		[ phone_number ],
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
		console.log('phone_NUMBER: ', phone_number);
		if (err) throw err;
		if (result[0]) {
			//sql query result is not null
			// DELETE ChildTable
			// FROM ChildTable inner join ChildTable on PParentTable.ID=ChildTable.ParentTableID
			// WHERE <WHERE CONDITION>
			db.query('DELETE FROM likes WHERE s_name=? AND s_ph=?', [ sname, phone_number ], (err) => {
				if (err) {
					console.log('likes deletion_failed');
					throw err;
				} else {
					console.log('likes deletion_complete');
				}
			});
			db.query('SET FOREIGN_KEY_CHECKS=0;', (err) => {
				if (err) {
					console.log('foreign key drop check failed');
					throw err;
				} else {
					console.log('foreign key dropped check');
				}
			});
			db.query('DELETE FROM music WHERE sname=? AND phone_number=?', [ sname, phone_number ], (err) => {
				if (err) {
					db.query('SET FOREIGN_KEY_CHECKS=1;', (err) => {
						if (err) {
							console.log('foreign key back-on failed');
							throw err;
						} else {
							console.log('foreign key back on full party mode');
						}
					});
					res.send('deletion_failed');
					throw err;
				} else {
					db.query('SET FOREIGN_KEY_CHECKS=1;', (err) => {
						if (err) {
							console.log('foreign key back-on failed');
							throw err;
						} else {
							console.log('foreign key back on full party mode');
						}
					});
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
	console.log('sup', req.body);
	const sname = req.body.sname;
	db.query(
		'SELECT sname, phone_number, username, like_count, genre, music_path FROM music WHERE (sname LIKE ?) or (username LIKE ?)',
		[ '%' + sname + '%', '%' + sname + '%' ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('query successful', result);
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
		'SELECT count(liker_ph) as tot_likes FROM likes WHERE s_ph=? AND s_name=?',
		[ req.body.phone_number, req.body.sname ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('count successful');
				console.log('likes:', result[0].tot_likes);
				db.query(
					'UPDATE music SET like_count=? WHERE sname=? AND phone_number=?',
					[ result[0].tot_likes, req.body.sname, req.body.phone_number ],
					(err) => {
						if (err) {
							throw err;
						} else {
							console.log('like count added in music successful');
						}
					}
				);
			}
		}
	);

	db.query(
		'SELECT SUM(listen_counts) as tot_listens FROM listens WHERE s_ph=? AND s_name=?',
		[ req.body.phone_number, req.body.sname ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				console.log('view count successful');
				console.log('views:', result[0].tot_likes);
				db.query(
					'UPDATE music SET listen_count=? WHERE sname=? AND phone_number=?',
					[ result[0].tot_listens, req.body.sname, req.body.phone_number ],
					(err) => {
						if (err) {
							throw err;
						} else {
							console.log('listen count added in music successful');
						}
					}
				);
			}
		}
	);

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

app.post('/add_like', (req, res) => {
	console.log(req.body);
	const phone_number = req.body.phone_number;
	const sname = req.body.sname;
	const liker_ph = req.body.liker_ph;
	const check = req.body.check;
	if (check) {
		db.query(
			'SELECT s_ph FROM likes WHERE s_name=? AND s_ph=? AND liker_ph=?',
			[ sname, phone_number, liker_ph ],
			(err, result) => {
				if (err) throw err;
				if (result[0]) {
					//sql query result is not null
					console.log('like found');
					res.send('liked');
				} else {
					res.send('not_liked');
				}
			}
		);
	} else {
		db.query(
			'INSERT INTO likes (s_name, s_ph, liker_ph) VALUES (?,?,?)',
			[ sname, phone_number, liker_ph ],
			(err) => {
				if (err) {
					if (err.errno === 1062) {
						res.send('duplicate_entry');
					} else {
						console.log(err);
						res.send('error');
					}
				} else {
					console.log('like added sucessfully');
					res.send('success');
				}
			}
		);
	}
});

app.post('/add_listen', (req, res) => {
	const s_ph = req.body.s_ph;
	const s_name = req.body.s_name;
	const listener_ph = req.body.listener_ph;
	db.query(
		'SELECT listen_counts FROM listens WHERE s_name=? AND s_ph=? AND listener_ph=?',
		[ s_name, s_ph, listener_ph ],
		(err, result) => {
			if (err) throw err;
			if (result[0]) {
				//sql query result is not null
				db.query(
					'UPDATE listens SET listen_counts=listen_counts+1 WHERE s_name=? AND s_ph=? AND listener_ph=?',
					[ s_name, s_ph, listener_ph ],
					(err) => {
						if (err) {
							throw err;
						} else {
							console.log('like count added in music successful');
						}
					}
				);
			} else {
				db.query(
					'INSERT INTO listens ( s_ph, s_name, listener_ph, listen_counts) VALUES (?,?,?,?)',
					[ s_ph, s_name, listener_ph, 1 ],
					(err) => {
						if (err) {
							console.log(err);
						} else {
							console.log('like added sucessfully');
							res.send('success');
						}
					}
				);
			}
		}
	);
});

app.post('/delete_account', (req, res) => {
	//console.log(res);
	const phone_number = req.body.phone_number;
	db.query('SELECT username FROM user WHERE phone_number = ?', [ phone_number ], (err, result) => {
		if (err) throw err;
		if (result[0]) {
			db.query('DELETE FROM user WHERE phone_number = ?', [ phone_number ], (err, result) => {
				if (err) {
					res.send('deletion_failed');
					throw err;
				} else {
					var dir = `/data/${phone_number}`;
					if (!fs.existsSync(dir)) {
						res.send('deletion_failed');
					}
					const absolute_path = `.${dir}`;
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

app.post('/follow_user', (req, res) => {
	const followed_ph = req.body.followed_ph;
	const follower_ph = req.body.follower_ph;
	const check = req.body.check;

	if (check) {
		console.log('sent result', { followed_ph, follower_ph });
		db.query(
			'SELECT follower_phone_number, followed_phone_number FROM follows WHERE follower_phone_number = ? AND followed_phone_number = ?',
			[ follower_ph, followed_ph ],
			(err, result) => {
				console.log('RES: ', result);
				if (err) throw err;
				if (result[0]) {
					//sql query result is not null
					console.log('like found');
					res.send('following');
				} else {
					res.send('not_following');
				}
			}
		);
	} else {
		db.query(
			'INSERT INTO follows (followed_phone_number, follower_phone_number) VALUES (?,?)',
			[ followed_ph, follower_ph ],
			(err) => {
				if (err) {
					console.log(err);
					if (err.errno === 1062) {
						res.send('duplicate_entry');
					} else {
						console.log(err);
						res.send('error');
					}
				} else {
					console.log('follow added');
					res.send('success');
				}
			}
		);
	}
});

app.post('/create_playlist', (req, res) => {
	console.log(req.body);
	const pname = req.body.playlistName;
	const phone_number = req.body.phone_number;
	db.query(
		'INSERT INTO playlist (pname, creator_phone_number) VALUES (?,?)',
		[ pname, phone_number ],
		(err, result) => {
			if (err) {
				if (err.errno === 1062) {
					res.send('duplicate-entry');
				}
			} else {
				res.send('playlist-added');
			}
		}
	);
});

app.post('/add_song_to_playlist', (req, res) => {
	const pname = req.body.pname;
	const sname = req.body.sname;
	const p_ph = req.body.p_ph;
	const s_ph = req.body.s_ph;

	db.query('INSERT INTO added (p_name, s_name, p_ph, s_ph) VALUES (?,?,?,?)', [ pname, sname, p_ph, s_ph ], (err) => {
		if (err) {
			if (err.errno === 1062) {
				res.send('duplicate-entry');
			} else {
				throw err;
			}
		} else {
			res.send('song-added-to-playlist');
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

function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function SeedUsers(amount) {
	let values = [];
	for (let index = 0; index < amount; index++) {
		const username = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] });
		const phone_number = getRandomArbitrary(10000, 100000000);
		const password = getRandomArbitrary(10000, 100000000);
		const email = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] }) + '@site.com';

		values.push([ phone_number, username, email, password ]);
		phone_numbers.push(phone_number);
	}

	db.query('INSERT INTO user (phone_number, username, email, password) VALUES ?', [ values ], (err, result) => {
		if (err) {
			console.log(('error adding users to user table:', err));
		} else {
			SeedPlaylists();
		}
	});
}

function SeedPlaylists() {
	let values = [];
	for (let index = 0; index < phone_numbers.length; index++) {
		const pname = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] });
		values.push([ pname, phone_numbers[index] ]);
	}
	db.query('INSERT INTO playlist (pname, creator_phone_number) VALUES ?', [ values ], (err, result) => {
		if (err) {
			console.log(('error adding playlists to playlist table:', err));
		} else {
		}
	});
}

// function SeedPlaylists(amount) {
// 	for (let index = 0; index < amount; index++) {
// 		const pname = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] });
// 		const phone_number = getRandomArbitrary(10000, 100000000);
// 		const password = getRandomArbitrary(10000, 100000000);
// 		const email = uniqueNamesGenerator({ dictionaries: [ adjectives, colors, animals ] }) + '@site.com';

// 		db.query(
// 			'INSERT INTO playlist (pname, creator_phone_number) VALUES (?,?)',
// 			[ pname, phone_number ],
// 			(err, result) => {
// 				if (err) {
// 					if (err.errno === 1062) {
// 						res.send('duplicate-entry');
// 					}
// 				} else {
// 					res.send('playlist-added');
// 				}
// 			}
// 		);
// 	}
// }
