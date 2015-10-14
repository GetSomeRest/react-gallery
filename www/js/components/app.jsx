/** @jsx React.DOM */

var HomeView = require('./homeView');
var AppNavbar = require('./appNavbar');
var ViewerView = require('./viewerView');

// Renders the full application

var ReactGalleryApp = React.createClass({

    //App init
    componentDidMount: function() {

        requirejs.config({
            waitSeconds: 0
        });
    },

    render: function() {
        return (
                <div>
                    <AppNavbar/>
                    <ReactRouter.RouteHandler/>
                </div>
        );
    }
});

var routes = (
    <ReactRouter.Route handler={ReactGalleryApp}>
        <ReactRouter.Route name="home" path="/home" handler={HomeView} />
        <ReactRouter.Route name="viewer" path="/viewer" handler={ViewerView} />
    </ReactRouter.Route>
);

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>,
    document.getElementById('reactGalleryApp'));
});
