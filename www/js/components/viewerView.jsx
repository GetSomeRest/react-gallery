/**
 * Created by leefsmp on 4/10/15.
 */

var configClient = require('../config-client');
var appActions = require('../actions/appActions');
var viewerState = require('../stores/viewerState');
var viewerActions = require('../actions/viewerActions');
var viewerActions = require('../actions/viewerActions');

require('../extensions/Autodesk.ADN.Viewing.Extension.ExtensionManager');
require('../extensions/Autodesk.ADN.Viewing.Extension.StateManager');


var viewerView = React.createClass({

    mixins: [Reflux.connect(viewerState, "viewerState")],

    getInitialState: function() {

        appActions.viewActivated('viewer');

        return {

        };
    },

    componentDidUpdate: function() {

       //console.log(this.state.viewerState)
    },

    componentDidMount: function() {

        var self = this;

        var id = Autodesk.Viewing.Private.getParameterByName('id');

        if(id === ''){
            return;
        }

        $.get('api/models/' + id, function (model) {

            self._loadFromUrn(model.urn);
        });
    },

    componentWillUnmount: function() {

        $(window).off(
            "resize",
            this._onResize);

        if(this.viewer) {

            this.viewer.finish();

            this.viewer = null;
        }
    },

    render: function() {

        this.viewerId = this._newGUID();

        return (
            <div>

                <div id={this.viewerId} className="viewer">


                </div>

            </div>
        );
    },

    _newGUID: function() {

        var d = new Date().getTime();

        var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });

        return guid;
    },

    _loadFromUrn: function(urn) {

        var self = this;

        var tokenUrl = 'http://' + window.location.host +
            '/node/react-gallery/api/token';

        var config = {
            environment : 'AutodeskProduction'
        }

        var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.ViewerFactory (
            tokenUrl,
            config);

        viewerFactory.onInitialized(function() {

          viewerFactory.getViewablePath(urn,

            function (pathInfoCollection) {

              viewerActions.viewablePathLoaded(
                pathInfoCollection);

              var viewerConfig = {
                lightPreset: 8,
                viewerType: 'GuiViewer3D',
                qualityLevel: [false, true],
                progressiveRendering: false
              }

              self.viewer = viewerFactory.createViewer(
                document.getElementById(self.viewerId),
                viewerConfig);

              if (pathInfoCollection.path3d.length) {
                self.viewer.load(pathInfoCollection.path3d[0].path);
              }
              else if (pathInfoCollection.path2d.length) {
                self.viewer.load(pathInfoCollection.path2d[0].path);
              }

              self._onResize();

              $(window).resize(self._onResize);

              self._loadGalleryExtensions(self.viewer);
            },
            this._onError);
        });
    },

    _onError: function(error)
    {
        console.log('Viewer Error: ');
        console.log(error);
    },

    _onResize: function()
    {
        var size = this._getClientSize();

        var navBarHeight =
            $('#appNavbar').height();

        $(this.viewer.container).height(
            size.y - navBarHeight);

        this.viewer.resize();
    },

    _getClientSize: function() {

        var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                sx = w.innerWidth || e.clientWidth || g.clientWidth,
                sy = w.innerHeight || e.clientHeight || g.clientHeight;

        return { x: sx, y: sy };
    },


    _loadGalleryExtensions: function(viewer) {

        var modelId = Autodesk.Viewing.Private.getParameterByName('id');

        viewer.loadExtension(
            'Autodesk.ADN.Viewing.Extension.ExtensionManager', {
                index: 0,
                //connect: connectExtension,
                //disconnect: disconnectExtension,
                controlGroup: 'Gallery',
                apiUrl: configClient.ApiURL + '/extensions',
                extensionsUrl: configClient.ApiURL + '/extensions/transpile',
                extensionsSourceUrl: configClient.host + '/uploads/extensions'
            });

        viewer.loadExtension(
            'Autodesk.ADN.Viewing.Extension.StateManager', {
                index: 1,
                controlGroup: 'Gallery',
                apiUrl: configClient.ApiURL +
                '/states/' + modelId
            });
    }
});

module.exports = viewerView;
