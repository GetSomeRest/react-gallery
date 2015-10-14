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
var multipart = require('connect-multiparty');
var flowFactory = require('../flow');
var express = require('express');
var request = require('request');
var babel = require('babel');
var path = require('path');
var fs = require('fs');

module.exports = function(db) {

  var router = express.Router();

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/', function (req, res) {

    getExtensionsAsync(function (arg, items) {

      res.json(items);
    });
  });

  function getExtensionsAsync(callback) {

    db.collection('gallery.extensions', function (err, collection) {

      collection.find({}, {
        name: 1,
        id: 1,
        file: 1
      }).sort({name: 1}).toArray(
        function (err, items) {

          callback(null, items);
        });
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.get('/:extensionId', function (req, res) {

    var extensionId = req.params.extensionId;

    db.collection('gallery.extensions',
      function (err, collection) {
        collection.findOne(
          {'id': extensionId},
          {},
          function (err, extension) {

            res.status((extension ? 200 : 404));
            res.jsonp(extension);
          });
      });
  });

  ///////////////////////////////////////////////////////////////////////////////
  //
  //
  ///////////////////////////////////////////////////////////////////////////////
  router.post('/', function (req, res) {

    if (!req.isAuthenticated()) {

      res.status(401); //Unauthorized
      res.send({'error': 'Unauthorized'});
      return;
    }

    var extension = req.body;

    extension.author = req.user;

    db.collection('gallery.extensions', function (err, collection) {

      collection.insert(
        extension,
        {safe: true},

        function (err, result) {

          if (err) {

            res.status(404);
            res.send(err);
          }
          else {

            res.json(extension);
          }
        });
    });

  });
  /////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////
  router.post('/upload/:extensionId',
    multipart(),
    function (req, res) {

      if (!req.isAuthenticated()) {

        res.status(401); //Unauthorized
        res.send({'error': 'Unauthorized'});
        return;
      }

      var flow = flowFactory.createFlow(
        'www/uploads/extensions',
        req.params.extensionId);

      flow.post(req, {useChunks: false},
        function (status,
                  filename,
                  original_filename,
                  identifier) {

          res.status(status).send();
        });
    });

  /////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////
  router.get('/download/:extensionId/:fileId',
    function (req, res) {

      var flow = flowFactory.createFlow(
        'www/uploads/extensions',
        req.params.extensionId);

      flow.write(
        req.params.fileId,
        res,
        {useChunks: false});
    });

  /////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////
  router.get('/transpile/:extensionId/:fileId',
    function (req, res) {

      var filepath = path.join(__dirname,
        '../../www/uploads/extensions/' +
        req.params.extensionId + '/' +
        req.params.fileId);

      var options = {};

      //result; // => { code, map, ast }
      babel.transformFile(filepath, options, function (err, result) {

          if (err) {
            console.log(err);
            res.status(404);
          }
          else {

            res.send(result.code);
          }
      });

      //fs.readFile(filepath, 'utf8', function (err, data) {
      //
      //  if (err) {
      //    console.log(err);
      //    res.status(404);
      //  }
      //  else {
      //    res.send(data);
      //  }
      //});
    });

  /////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////
  router.post('/transpile',
    function (req, res) {

      var payload = req.body;

      var options = payload.options || {};

      // => { code, map, ast }
      var result = babel.transform(
        payload.code,
        options);

      var response = {
        code: result.code
      }

      res.send(response);
    });

  return router;
}
