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
var mongo = require('mongodb');
var util = require('util');

module.exports = function(config) {

  this.initializeDb = function (onSuccess, onError) {

    var url = '';

    if (config.user.length && config.pass.length) {

      url = util.format('mongodb://%s:%s@%s:%d/%s',
        config.user,
        config.pass,
        config.dbhost,
        config.port,
        config.db);
    }
    else {

      url = util.format('mongodb://%s:%d/%s',
        config.dbhost,
        config.port,
        config.db);
    }

    var client = mongo.MongoClient;

    client.connect(url, function (err, db) {

      if (err) {

        onError(err);
      }
      else {

        console.log("Connected to " + config.db);

        onSuccess(db);
      }
    });
  }
};
