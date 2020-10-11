var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();

const dbName = 'books';
const url = 'mongodb://localhost:27017/' + dbName;

MongoClient.connect(url, {
  useUnifiedTopology: true
})
  .then((client) => {
    const db = client.db(dbName);
    const collection = db.collection('bookdata');

    router.get('/', async (req, res, next) => {
      await collection.find().toArray()
        .then(result => {
          res.send(result);
        })
        .catch(error => console.error(error));
    });

    router.post('/', async (req, res, next) => {
      await collection.insertOne(req.body)
        .then((result) => {
          res.sendStatus(200);
        })
        .catch(error => console.error(error));
    });
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = router;
