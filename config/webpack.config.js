/**
 * Created by leefsmp on 4/6/15.
 */
var path = require('path');

module.exports = {

  entry: {
    gallery: "./www/js/gallery.app.js",
    embed: "./www/js/apps/embed/embed.app.js",
    collaboration: "./www/js/apps/collaboration/collaboration.app.js"
  },

  output: {
    path: path.join(__dirname, '/www/build/'),
    filename: "[name].app.min.js"
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  },

  resolve: {
    // enables require('file') instead of require('file.ext')
    extensions: ['', '.js', '.json', '.css']
  },

  plugins: []
};