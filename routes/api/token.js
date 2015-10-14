var express = require('express');

module.exports = function(lmv) {

    var router = express.Router();

    ///////////////////////////////////////////////////////////////////////////////
    // Generates access token
    ///////////////////////////////////////////////////////////////////////////////
    router.get('/', function (req, res) {

        lmv.getToken().then(
            function(response){

                res.json(response);
            },
            function(error){

                res.status(error.statusCode || 404);
                res.json(error);
            });
    });

    return router;
}
