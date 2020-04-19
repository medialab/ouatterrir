const express = require('express');
const bodyParser = require('body-parser');
const Fingerprint = require('express-fingerprint');
const MongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'ouatterrir';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
  Fingerprint({
    parameters: [
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip
    ]
  })
);
