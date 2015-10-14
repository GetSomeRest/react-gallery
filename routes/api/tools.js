/**
 * Created by leefsmp on 6/9/15.
 */

var express = require('express');
var request = require('request');

module.exports = function(db) {

  var router = express.Router();

  ///////////////////////////////////////////////////////////////////////////////
  // Used to get all models data
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/models', function (req, res) {

    db.collection('gallery.models', function (err, collection) {
      collection.find()
        .sort({name: 1}).toArray(
        function (err, items) {

          var response = items;

          if (err) {
            res.status(204); //HTTP 204: NO CONTENT
            res.err = err;
          }

          res.json(response);
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  // Used to get all extensions data
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/extensions', function (req, res) {

    db.collection('gallery.extensions', function (err, collection) {
      collection.find()
        .sort({name: 1}).toArray(
        function (err, items) {

          var response = items;

          if (err) {
            res.status(204); //HTTP 204: NO CONTENT
            res.err = err;
          }

          res.json(response);
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  // Used to get all users
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/users', function (req, res) {

    db.collection('users', function (err, collection) {
      collection.find()
        .sort({name: 1}).toArray(
        function (err, items) {

          var response = items;

          if (err) {
            res.status(204); //HTTP 204: NO CONTENT
            res.err = err;
          }

          res.json(response);
        });
    });
  });

///////////////////////////////////////////////////////////////////////////////
// Used to migrate the data model
//
///////////////////////////////////////////////////////////////////////////////
  function guid() {

    var d = new Date().getTime();

    var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });

    return guid;
  }

  router.get('/migrate', function (req, res) {

    db.collection('gallery.models', function (err, collection) {
      collection.find().toArray(
        function (err, models) {

          models.forEach(function (model) {

            //delete model.views;

            //model.states = [];
            //model.sequence = [];

            //model.shareIds = {};
            //model.shareIds[guid()] = {expire:null};

            collection.update(
              {'_id': model._id},
              model,
              {safe: true},
              function (err2, result) {

              });
          });

          res.send('ok');
        });
    });
  });

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
  var credentials = require('../../config/credentials');
  var AdnViewDataClient = require('../Autodesk.ADN.Toolkit.ViewDataClient');

  var viewDataClient = new AdnViewDataClient(
    credentials.BaseUrl,
    credentials.ConsumerKey,
    credentials.SecretKey);

  var mongo = require('mongodb');

  router.get('/populate', function (req, res) {

    db.collection('gallery.models', function (err, collection) {
      collection.find()
        .sort({name: 1}).toArray(
        function (err, items) {

          db.collection('gallery.thumbnails', function (err, thumbColl) {

            items.forEach(function (model) {

              //looks for missing thumbnails
              thumbColl.findOne(
                {'modelId': new mongo.ObjectId(model._id)},
                {},

                function (err, thumbnail) {

                  viewDataClient.getThumbnailAsync(
                    model.urn,
                    function (data) {

                      var newThumbnail = {
                        modelId: model._id,
                        data: data
                      };

                      if (!thumbnail) {

                        console.log('Creating thumbnail: ' + model.name);

                        thumbColl.insert(
                          newThumbnail,
                          {safe: true},
                          function (err, result) {
                          });
                      }
                      else {

                        /*console.log('Updating thumbnail: ' + model.name);

                        thumbColl.update(
                          {'modelId': new mongo.ObjectId(model._id)},
                          newThumbnail,
                          {safe: true},
                          function (err3, cmdResult) {

                          });*/
                      }
                    });

                });
            });

          });

          if (err) {
            res.status(204); //HTTP 204: NO CONTENT
            res.err = err;
          }

          res.json('ok');
        });
    });
  });

  return router;
}