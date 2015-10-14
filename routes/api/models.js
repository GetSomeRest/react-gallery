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

  ///////////////////////////////////////////////////////////////////////////////
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
        {name: 1, urn: 1},

        function (err, model) {

          res.status((model ? 200 : 404));
          res.jsonp(model);
        });
    });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/', function (req, res) {

    var pageQuery = {
      name: 1,
      urn: 1
    };

    var fieldQuery = {};

    if (typeof req.query.skip !== 'undefined')
      pageQuery.skip = req.query.skip;

    if (typeof req.query.limit !== 'undefined')
      pageQuery.limit = req.query.limit;

    if (typeof req.query.field !== 'undefined' &&
      typeof req.query.value !== 'undefined') {

      var field = req.query.field;

      var value = req.query.value;

      //case insensitive search
      var exp = ["^", value, "$"].join("");

      fieldQuery[field] = new RegExp(exp, "i");
    }

    db.collection('gallery.models', function (err, collection) {
      collection.find(fieldQuery, pageQuery)
        .sort({name: 1}).toArray(
        function (err, items) {

          var response = items;

          if (err) {
            res.status(204); //HTTP 204: NO CONTENT
            res.err = err;
          }

          res.jsonp(response);
        });
    });
  });

  return router;
}
