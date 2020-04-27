const async = require('async');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Fingerprint = require('express-fingerprint');
const MongoClient = require('mongodb').MongoClient;
const Ajv = require('ajv');
const morgan = require('morgan');
const config = require('config-secrets');
const basicAuth = require('express-basic-auth');
const csvWriter = require('csv-write-stream');

const ajv = new Ajv();
const validateAnswer = ajv.compile(require('../schemas/answer.json'));

const PORT = config.get('port');
const MONGO_CONFIG = config.get('mongo');

let ANSWERS;

function connect(callback) {
  const auth = `${encodeURIComponent(MONGO_CONFIG.user)}:${encodeURIComponent(
    MONGO_CONFIG.password
  )}`;

  const url = `mongodb://${auth}@${MONGO_CONFIG.host}:${MONGO_CONFIG.port}/admin`;

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

app.use(cors());

app.post('/answer', (req, res) => {
  if (!req.body || !req.body.data || typeof req.body.data !== 'object') {
    return res.status(400).send('Bad request');
  }

  const item = {
    timestamp: req.timestamp,
    fingerprint: req.fingerprint,
    data: req.body.data
  };

  return ANSWERS.insertOne(item, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    return res.send('Ok');
  });
});

const authMiddleware = basicAuth({
  users: {
    [MONGO_CONFIG.user]: MONGO_CONFIG.password
  },
  challenge: true
});

function formatCsv(item) {
  return {
    id: item._id,
    timestamp: item.timestamp,
    fingerprint: item.fingerprint.hash
  };
}

app.get('/data', authMiddleware, (req, res) => {
  return ANSWERS.find({}).toArray((err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if ('json' in req.query) return res.json(data);

    res.header('Content-Type', 'text/csv; charset=utf-8');

    const writer = csvWriter();
    writer.pipe(res);

    data.forEach(item => writer.write(formatCsv(item)));
    writer.end();
  });
});

function start(callback) {
  async.series(
    [
      next => {
        connect((err, client) => {
          if (err) return next(err);

          const db = client.db(MONGO_CONFIG.db);

          ANSWERS = db.collection('answers');
          return next();
        });
      },
      next => app.listen(PORT, next)
    ],
    callback
  );
}

start(err => {
  if (err) return console.error(err);

  console.log(`Server listening to port ${PORT}`);
});
