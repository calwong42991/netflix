const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('WE HERE');
})

app.post('/signup', (req, res) => {
  const {user_id, profile_name, password, email, region, preferences} = req.body;
  db.user.create(req.body);
})

app.post('/login', (req, res) => {
  
})




app.listen(8080, () => {
  console.log('listening on port 8080');
});
