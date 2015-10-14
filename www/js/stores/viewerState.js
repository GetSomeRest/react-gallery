/**
 * Created by leefsmp on 4/13/15.
 */
var viewerActions = require('../actions/viewerActions');

var viewerState = Reflux.createStore({

    listenables: [viewerActions],

    onViewablePathLoaded: function(pathInfoCollection) {

        var self = this;

        pathInfoCollection.path2d.forEach(function(path, idx) {

            path.activated = false;
            self.viewerState.pathInfoCollection["2d:" + idx] = path;
        });

        pathInfoCollection.path3d.forEach(function(path, idx) {

            path.activated = false;
            self.viewerState.pathInfoCollection["3d:" + idx] = path;
        });

        //Activate first 3d or first 2d path
        if(pathInfoCollection.path3d.length) {
            self.viewerState.pathInfoCollection["3d:0"].activated = true;
        }
        else if (pathInfoCollection.path2d.length) {
            self.viewerState.pathInfoCollection["2d:0"].activated = true;
        }

        self.trigger(self.viewerState);
    },

    onViewablePathActivated: function(pathId, activated) {

        this.viewerState.pathInfoCollection[pathId].activated =
            activated;

        this.trigger(this.viewerState);
    },

    // this will be called by all listening components
    // as they register their listeners
    getInitialState: function() {

        this.viewerState = {

            pathInfoCollection: {}

        }

        return this.viewerState;
    }
});

module.exports = viewerState;
