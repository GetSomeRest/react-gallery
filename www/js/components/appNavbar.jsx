
var AdnSpinningImg = require('./adnSpinningImg');
var appState = require('../stores/appState');
var viewerState = require('../stores/viewerState');
var viewerActions = require('../actions/viewerActions');

var ViewerNavbar = React.createClass({

    mixins: [Reflux.connect(viewerState, "viewerState")],

    componentDidMount: function() {

    },

    componentDidUpdate: function() {

        $('#multiselectPath').multiselect({
            onChange: function (option, checked, select) {
                viewerActions.viewablePathActivated(
                    option.context.value,
                    checked);
            }
        });
    },

    componentWillUnmount: function() {

    },

    render: function() {

        var self = this;

        if(!_.size(self.state.viewerState.pathInfoCollection)) {

            //nothing to render
            return (<div> </div>);
        }

        return (

            <li>
                <form className="navbar-form pull-left">

                    <select id="multiselectPath" className="form-control" multiple="multiple">

                    {Object.keys(self.state.viewerState.pathInfoCollection).map(function (key) {
                        var pathInfo = self.state.viewerState.pathInfoCollection[key];
                        return (
                            <option key={key} value={key}> {pathInfo.name} </option>
                        )})
                    }

                    </select>
                </form>
            </li>
        );
    }
});


var AboutMenu = React.createClass({

    render: function() {

        return (

            <li className="dropdown">

                <a href="" className="dropdown-toggle"
                        data-toggle="dropdown"
                        role="button"
                        aria-expanded="false">About <span className="caret"></span>
                </a>

                <ul className="dropdown-menu" role="menu">
                    <li>
                        <a href="http://developer.autodesk.com" target="_blank">
                            Get an API key
                        </a>
                    </li>

                    <li>
                        <a href="http://forums.autodesk.com/t5/Web-Services-API/ct-p/94" target="_blank">
                        API Support
                        </a>
                    </li>

                    <li>
                        <a href="http://www.autodesk.com" target="_blank">
                        Autodesk
                        </a>
                    </li>

                    <li className="divider">

                    </li>

                    <li>
                        <a href="https://github.com/Developer-Autodesk/react-gallery" target="_blank">
                        Source on Github
                        </a>
                    </li>

                </ul>

            </li>
        );
    }
});

var appNavbar = React.createClass({

    mixins: [Reflux.connect(appState, "appState")],

    componentDidMount: function() {

    },

    componentWillUnmount: function() {

    },

    _renderViewSpecific(view) {

        switch(view){

            case 'viewer-bkup':
                return  (

                    <ViewerNavbar/>
            );

            default :
                break;
        }
    },

    render: function() {

        return (
            <div>
                <nav id="appNavbar" className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button"
                                    className="navbar-toggle collapsed"
                                    data-toggle="collapse"
                                    data-target="#app-navbar-content">

                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a className="navbar-brand" href="#/home">
                                <AdnSpinningImg
                                    step="5.0"
                                    period="100"
                                    height="32"
                                    width="32"
                                    src="img/adsk/adsk-32x32-32.png"
                                    class="navbar-spinning-img"/>
                            </a>

                            <a className="navbar-brand" href="#/home">
                                Autodesk
                            </a>
                        </div>

                        <div className="collapse navbar-collapse" id="app-navbar-content">

                            <ul className="nav navbar-nav">
                                <li className={this.state.appState.activeView === 'home' ? 'active' : ''} >
                                    <a href="#/home">Home</a>
                                </li>
                                <li className={this.state.appState.activeView === 'viewer' ? 'active' : ''} >
                                    <a href="#/viewer">Viewer</a>
                                </li>

                                 {this._renderViewSpecific(this.state.appState.activeView)}

                            </ul>


                            <ul className="nav navbar-nav navbar-right">

                                <AboutMenu/>

                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
});

module.exports = appNavbar;

