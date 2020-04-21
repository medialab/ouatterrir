const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const Fingerprint = require('express-fingerprint');
const MongoClient = require('mongodb').MongoClient;
const Ajv = require('ajv');
const morgan = require('morgan');
const config = require('config-secrets');

const ajv = new Ajv();
const validateAnswer = ajv.compile(require('../schemas/answer.json'));

const PORT = config.get('port');

let MONGO_CLIENT;
let ANSWERS;

function connect(callback) {
  const mongoConfig = config.get('mongo');

  const url = `mongodb://${mongoConfig.host}:${mongoConfig.port}/admin`;

  const client = new MongoClient(url, {useUnifiedTopology: true});

  return client.connect(err => {
    if (err) return callback(err);

    return callback(null, client);
  });
}

const app = express();

app.use(morgan('combined'));

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

function timestampMiddleware(req, res, next) {
  req.timestamp = +new Date();
  return next();
}

app.use(timestampMiddleware);

function start(callback) {
  async.series(
    [
      next => {
        connect((err, client) => {
          if (err) return next(err);

          MONGO_CLIENT = client;
          const db = client.db(config.get('mongo').db);

          ANSWERS = db.collection('answers');
          return next();
        });
      },
      async.apply(app.listen, PORT)
    ],
    callback
  );
}

start(err => {
  if (err) return console.error(err);

  console.log(`Server listening to port ${PORT}`);
});