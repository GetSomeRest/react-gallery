var appActions = require('../actions/appActions');

var appState = Reflux.createStore({

    listenables: [appActions],

    onViewActivated: function(name) {

        this.appState.activeView = name;

        this.trigger(this.appState);
    },

    // this will be called by all listening components
    // as they register their listeners
    getInitialState: function() {

        this.appState = {

            activeView: 'home'
        }

        return this.appState;
    }
});

module.exports = appState;
