/**
 * Created by leefsmp on 4/10/15.
 */
var Banner2d = require('./banner2d');
var modelStore = require('../stores/models');
var appActions = require('../actions/appActions');

var ModelList = React.createClass({

    getInitialState: function() {

        return {  };
    },

    componentDidMount: function() {

    },

    componentWillUnmount: function() {

    },

    render: function() {

        return (

            <ul className="col-lg-12 ul-models">
            {
                    this.props.models.map(function(model, idx) {

                        return (
                                <li key={model._id} className="li-models">
                                    <div className={(idx%2) ? "row row-models-even" : "row row-models-odd"}>
                                        <div className="col-md-3">
                                            <img className="img-responsive"
                                                    src={model.thumbnail}
                                                    alt=""
                                                    width="128"
                                                    height="128"
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <h4>{model.name}</h4>
                                            <b>Type: </b> {model.type}
                                            <br/>
                                            <b>Progress: </b> {model.progress}
                                            <br/>
                                            <br/>
                                            <a className="btn btn-primary" href={"#viewer?id=" + model._id}>
                                                Show in viewer
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                        );
                    })
            }
            </ul>);
    }
});

var homeView = React.createClass({

    mixins: [Reflux.connect(modelStore, "list")],

    getInitialState: function() {

        appActions.viewActivated('home');

        return {  };
    },

    componentDidMount: function() {


    },

    componentWillUnmount: function() {

    },

    render: function() {

        return (

        <div>

            <Banner2d/>

            <div className="content-form app-content-form clearfix">
                <div className="container app-container">
                    <div className="row">

                        <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                            <div id="nav-parent" className="page-header hidden-xs">
                                <div data-spy="affix" data-offset-top="200" className="panel panel-default app-panel-default app-sidenav-panel">
                                    <div className="navbar-collapse collapse navbar-responsive-collapse panel-body app-panel-body app-sidenav-body" role="complementary">
                                        <div className="col-lg-12">
                                            <ul className="nav nav-pills nav-stacked app-sidenav">
                                                <li role="presentation" className="active"><a href="#home" className="first-child">Home</a></li>
                                                <li role="presentation"><a href="#viewer" className="first-child">Viewer</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="nav-parent-mobile" className="page-header hidden-sm hidden-md hidden-lg">
                                <div data-spy="affix" data-offset-top="150" className="panel panel-default app-panel-default app-sidenav-panel">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <div className="navbar-collapse collapse navbar-responsive-collapse panel-body app-panel-body app-sidenav-body" role="complementary">
                                        <div className="col-lg-12">
                                            <ul className="nav nav-pills nav-stacked app-sidenav">
                                                <li role="presentation" className="active"><a href="#home" className="first-child" data-toggle="collapse" data-target=".navbar-responsive-collapse">Home</a></li>
                                                <li role="presentation"><a href="#viewer" data-toggle="collapse" data-target=".navbar-responsive-collapse">Viewer</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                            <div className="page-header">
                                <div className="panel panel-default app-panel-default home-panel">
                                    <div className="app-api-doc app-panel-body panel-body home-panel">

                                        <ModelList models={this.state.list}/>

                                        <div className="bs-docs-section clearfix">
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <div className="col-xs-6 col-sm-6 app-button-container mob-app-button-container back-to-top-container">
                                                        <p className="bs-component">
                                                            <a href="#view-and-data-title" className="btn app-btn app-btn-lg app-btn-default back-to-top-btn">Back to top</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="clearfix">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-footer">
                            <div className="container app-container">
                                <p><a href="http://www.autodesk.com/company/legal-notices-trademarks/privacy-statement">Privacy</a>  |  <a href="http://www.autodesk.com/company/legal-notices-trademarks">Legal Notices and Trademarks</a>  |  <a href="http://www.autodesk.com/company/license-compliance/report-noncompliance">Report Noncompliance</a>
                                    <br/>&#169; Copyright 2015 Autodesk. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
        );
    }
});

module.exports = homeView;
