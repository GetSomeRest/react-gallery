/**
 * Created by leefsmp on 4/6/15.
 */
var path = require('path');

module.exports = {

    entry: "./www/js/components/app.jsx",

    output: {
        path: path.join(__dirname, '/www/build'),
        filename: "bundle.js"
      },

      module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/ , loader: "jsx-loader?harmony" },
        ]
      },

      resolve: {
        // enables require('file') instead of require('file.ext')
        extensions: ['', '.js', '.jsx', '.json', '.css']
      },

    plugins: []
};
