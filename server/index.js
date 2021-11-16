const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

// If enviromental variable does not exist, set port to 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'moseeqi',

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
      [phone_number, username, email, password], (err, result) => {
        if (err) {
          console.error(`Error adding user to database: ${err}`);
        } else {
          res.send('User added to databAse successfully');
        }
      });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Clean up process
process.on(
    'SIGTERM', () => {server.close(() => {console.log('Server stopped')})})
