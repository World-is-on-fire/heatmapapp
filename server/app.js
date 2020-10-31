const express = require('express');
const app = express();
const path = require('path');

const {tempController} = require('./controller');

// JSON parser:
app.use(express.json());

//serve static file
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../static')));

app.get('/temp/:year', tempController);

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// catch-all endpoint handler
app.use((req, res) => {
  return res.status(404).send('Page not found.');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error!',
    status: 500,
    message: { err: 'An error occurred!' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;