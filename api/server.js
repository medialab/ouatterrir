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
const getCalendar = require('./getCalendar');
const  chron = new require("chron")();

const ajv = new Ajv();
const validateAnswer = ajv.compile(require('../schemas/answer.json'));

const PORT = config.get('port');
const MONGO_CONFIG = config.get('mongo');

const DAY = 24 * 3600;
const UPDATE_CALENDAR_DELAY = 7 * DAY;

let ANSWERS;

let events = [];

function updateCalendar() {
  getCalendar()
  .then(res => {
    events = res;
  })
  .catch(console.log)
}

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

function validateMiddleware(req, res, next) {
  if (!req.body || !req.body.data || typeof req.body.data !== 'object') {
    return res.status(400).send('Bad request');
  }

  const valid = validateAnswer(req.body.data);

  if (!valid) {
    return res.status(400).send({
      errors: validateAnswer.errors
    });
  }

  return next();
}

app.post('/answer', validateMiddleware, (req, res) => {
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

function formatCsv(item, answer) {
  return {
    user_id: answer.data.id,
    user_fingerprint: answer.fingerprint.hash,
    user_email: answer.data.email,
    user_given_name: answer.data.givenName,
    user_family_name: answer.data.familyName,
    user_area_of_expertise: answer.data.areaOfExpertise,
    answer_id: answer._id,
    timestamp: answer.timestamp,
    datetime: (new Date(answer.timestamp)).toISOString(),
    lang: answer.data.lang,
    proposition_id: item.id,
    proposition_type: item.type,
    question1: item.question1,
    question2: item.question2,
    question3: item.question3,
    question4: item.question4,
    question5: item.question5
  };
}

app.get('/events', (req, res) => {
  res.json(events);
})

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

    // Filter results coming from same users by default
    if (!('returnAll' in req.query)) {
      let done = new Set();
      data.reverse();
      data = data.filter(item => {
        if (done.has(item.data.id)) return false;
        done.add(item.data.id);
        return true;
      });
      data.reverse();
    }

    data.forEach(answer => (answer.data.propositions || [])
      .forEach(item => writer.write(formatCsv(item, answer)))
    );
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

updateCalendar();
chron.add(UPDATE_CALENDAR_DELAY, updateCalendar)