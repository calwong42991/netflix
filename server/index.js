const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fakeData = require('./fakerDataGenerator.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fakeData.fakeData();
  res.send('WE HERE');
})

app.listen(8080, () => {
  console.log('listening on port 8080');
});
