/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var request = require('request');
var mongo = require('mongodb');

module.exports = function(db) {

  var router = express.Router();

  //////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:modelId', function (req, res) {

    var modelId = req.params.modelId;

    if (modelId.length !== 24) {
      res.status(404);
      res.send(null);
      return;
    }

    db.collection('gallery.models', function (err, collection) {

      collection.findOne(
        {'_id': new mongo.ObjectId(modelId)},
        {states: 1, sequence: 1},
        function (err, model) {

          var response = {
            states: model.states,
            sequence: model.sequence
          };

          res.status((model ? 200 : 404));
          res.json(response);
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.put('/:modelId', function (req, res) {

    var modelId = req.params.modelId;

    var data = req.body;

    db.collection('gallery.models', function (err, collection) {

      collection.findOne(
        {'_id': new mongo.ObjectId(modelId)},
        {states: 1, sequence: 1},
        function (err1, model) {

          model.states.push(data.state);

          var stateObj = JSON.parse(data.state);

          model.sequence.push(stateObj.guid);

          collection.update(
            {'_id': new mongo.ObjectID(modelId)},
            {$set: {"states": model.states, "sequence": model.sequence}},
            {safe: true},
            function (err2, cmdResult) {

              res.json(model.states);
            });
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.put('/:modelId/sequence', function (req, res) {

    var modelId = req.params.modelId;

    var payload = req.body;

    db.collection('gallery.models', function (err, collection) {

      collection.findOne(
        {'_id': new mongo.ObjectId(modelId)},
        {sequence: 1},
        function (err1, model) {

          model.sequence = JSON.parse(payload.sequence);

          collection.update(
            {'_id': new mongo.ObjectID(modelId)},
            {$set: {"sequence": model.sequence}},
            {safe: true},
            function (err2, cmdResult) {

              res.json(model.sequence);
            });
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.post('/:modelId/delete/:guid', function (req, res) {

    var modelId = req.params.modelId;

    var guid = req.params.guid;

    db.collection('gallery.models', function (err, collection) {

      collection.findOne(
        {'_id': new mongo.ObjectId(modelId)},
        {states: 1, sequence: 1},
        function (err1, model) {

          //removes states from item.states
          for (var i = 0; i < model.states.length; ++i) {

            var stateObj = JSON.parse(model.states[i]);

            if (guid === stateObj.guid) {

              model.states.splice(i, 1);

              //removes sequence item
              for (var j = 0; j < model.sequence.length; ++j) {

                if (model.sequence[j] === guid) {

                  model.sequence.splice(j, 1);
                  break;
                }
              }

              break;
            }
          }
          ;

          collection.update(
            {'_id': new mongo.ObjectID(modelId)},
            {$set: {"states": model.states, "sequence": model.sequence}},
            {safe: true},
            function (err2, cmdResult) {

              res.json(model.states);
            });
        });
    });
  });

  return router;
}