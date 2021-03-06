const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'adamsimon',
    password : '',
    database : 'smart-brain'
  }
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => { res.send('success') })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.listen(3000, () => console.log('listening at http://localhost:3000'))
