var express = require('express');
var router = express.Router();
var googleImages = require('google-images');
require('dotenv').config();
var client = googleImages(process.env.CSE_ID, process.env.API_KEY);
var assert = require('assert');

/**
 * Home page.
 */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Image Search Abstraction Layer',
    host: req.headers.host
  });
});

/**
 * Image search route.
 */
router.get('/api/imagesearch/:search', function(req, res, next) {
  var db = req.app.locals.db;

  client.search(req.params.search, {
    page: (req.query.offset && !isNaN(parseInt(req.query.offset))) ? parseInt(req.query.offset) : 1
  })
  .then(function(images) {
    var collection = db.collection('imgSearch');

    collection.insertOne({
      term: req.params.search,
      when: Date.now()
    },
    function(err, result) {
      assert.equal(err, null);
      res.json(images);
    });
  });
});

/**
 * Fetches searches made so far.
 */
router.get('/api/latest/imagesearch', function(req, res, next) {
  var db = req.app.locals.db;
  var collection = db.collection('imgSearch');

  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);

    if (docs.length) {
      res.json(docs.map(function(currentValue) {
        return {
          term: currentValue.term,
          when: new Date(currentValue.when).toISOString()
        };
      }));
    }
    else {
      res.json({
        status: 'No search made'
      });
    }
  });
});

module.exports = router;
