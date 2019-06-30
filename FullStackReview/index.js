// Database
const mysql = require('mysql')

const db = mysql.createConnection({
  user: 'root',
  database: 'hrnyc23',
  password: ''
})

db.connect(err => {
  if(err) console.log(err)
  else console.log('DB connected!')

  db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT(11) AUTO_INCREMENT,
      content VARCHAR(256) NOT NULL,
      completed BOOL DEFAULT false,
      PRIMARY KEY(id)
    )
  `)
})


// Server
const express = require('express')
const parser = require('body-parser')

const app = express()

app.use(parser.json())
app.use(express.static(__dirname))

app.get('/tasks', (req, res) => {
  db.query(`SELECT * FROM tasks`, (err, results) => {
    if(err) {
      res.sendStatus(500)
      console.log(err)
    }
    else res.send(results)
  })
})

app.post('/tasks', (req, res) => {
  db.query(
    `INSERT INTO tasks (content) values (?)`,
    [req.body.description],
    (err, results) => {
      if(err) {
        res.sendStatus(500)
        console.log(err)
      }
      else res.sendStatus(201)
    }
  )
})

app.put('/tasks/:id', (req, res) => {
  // HOMEWORK: Complete this route and add "Mark complete" functionality to the client
})

app.listen(9000, () => console.log('Listening @ :9000'))