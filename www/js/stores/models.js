/**
 * Created by leefsmp on 4/13/15.
 */

var appActions = require('../actions/appActions');

var modelStore = Reflux.createStore({

    // this will set up listeners to all
    // publishers in TodoActions,
    // using onKeyname (or keyname) as callbacks
    listenables: [appActions],

    onAddItem: function(label) {

        this.list.push(label);

        this.trigger(this.list);
    },

    // this will be called by all listening components
    // as they register their listeners
    getInitialState: function() {

        var _this = this;

        this.list = [];

        var tokenUrl = 'http://' + window.location.host +
            '/node/react-gallery/api/token';

        var viewDataClient = new Autodesk.ADN.Toolkit.ViewAndData.Client(
            'https://developer.api.autodesk.com',
            tokenUrl);

        viewDataClient.onInitialized(function() {

            $.get('api/models', function (models) {

                console.log(models)

                _this.list = models;

                models.forEach(function (model) {

                    model.thumbnail = "img/adsk/adsk-128x128-32.png";

                    $.get('api/thumbnails/' + model._id, function(response) {

                        model.thumbnail =
                            "data:image/png;base64," + response.thumbnail.data;

                        _this.trigger(_this.list);
                });

                var fileId = viewDataClient.fromBase64(model.urn);

                // role
                viewDataClient.getSubItemsWithProperties(
                    fileId,
                    { type: 'geometry'},
                    function (items){
                        if(items.length > 0) {
                            model.type = items[0].role;

                            _this.trigger(_this.list);
                        }
                    },
                    function (error) {

                    }
                );

                //progress
                viewDataClient.getViewable(
                    fileId,
                    function (viewable) {

                        model.progress = viewable.progress;

                        _this.trigger(_this.list);
                    },
                    function (error) {

                    }, 'status');
            });

            _this.trigger(_this.list);
        });
    });

return this.list;
}
});

module.exports = modelStore;
