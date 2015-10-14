/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var HomeView = __webpack_require__(7);
	var AppNavbar = __webpack_require__(2);
	var ViewerView = __webpack_require__(3);

	// Renders the full application

	var ReactGalleryApp = React.createClass({displayName: "ReactGalleryApp",

	    //App init
	    componentDidMount: function() {

	        ;;
	    },

	    render: function() {
	        return (
	                React.createElement("div", null,
	                    React.createElement(AppNavbar, null),
	                    React.createElement(ReactRouter.RouteHandler, null)
	                )
	        );
	    }
	});

	var routes = (
	    React.createElement(ReactRouter.Route, {handler: ReactGalleryApp},
	        React.createElement(ReactRouter.Route, {name: "home", path: "/home", handler: HomeView}),
	        React.createElement(ReactRouter.Route, {name: "viewer", path: "/viewer", handler: ViewerView})
	    )
	);

	ReactRouter.run(routes, function(Handler) {
	    React.render(React.createElement(Handler, null),
	    document.getElementById('reactGalleryApp'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/10/15.
	 */

	var AdnSpinningImg = React.createClass({displayName: "AdnSpinningImg",

	    getInitialState: function() {

	        return {  };
	    },

	    componentDidMount: function() {

	        var _this = this;

	        var angle = 0.0;

	        function update() {

	            angle += parseFloat(_this.props.step);

	            angle = angle % 360;

	            var value = "rotateY(" + angle + "deg)";

	            $('#imgId').css({
	                "transform": value,
	                "-moz-transform": value,
	                "-webkit-transform": value,
	                "-ms-transform": value,
	                "-o-transform": value
	            });
	        }

	        _this.props.timerId = setInterval(function() {
	            update();
	        }, parseInt(_this.props.period));
	    },

	    componentWillUnmount: function() {

	        window.clearInterval(this.props.timerId);
	    },

	    render: function() {

	        return (

	            React.createElement("img", {id: "imgId",
	                 height: this.props.height,
	                 width: this.props.width,
	                 src: this.props.src,
	                 className: this.props.class}

	            )

	        );
	    }
	});

	module.exports = AdnSpinningImg;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {


	var AdnSpinningImg = __webpack_require__(1);
	var appStateStore = __webpack_require__(8);
	var viewerStateStore = __webpack_require__(9);
	var viewerActions = __webpack_require__(10);

	var ViewerNavbar = React.createClass({displayName: "ViewerNavbar",

	    mixins: [Reflux.connect(viewerStateStore, "viewerState")],

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
	            return (React.createElement("div", null, " "));
	        }

	        return (

	            React.createElement("li", null,
	                React.createElement("form", {className: "navbar-form pull-left"},

	                    React.createElement("select", {id: "multiselectPath", className: "form-control", multiple: "multiple"},

	                    Object.keys(self.state.viewerState.pathInfoCollection).map(function (key) {
	                        var pathInfo = self.state.viewerState.pathInfoCollection[key];
	                        return (
	                            React.createElement("option", {key: key, value: key}, " ", pathInfo.name, " ")
	                        )})


	                    )
	                )
	            )
	        );
	    }
	});


	var AboutMenu = React.createClass({displayName: "AboutMenu",

	    render: function() {

	        return (

	            React.createElement("li", {className: "dropdown"},

	                React.createElement("a", {href: "", className: "dropdown-toggle",
	                        "data-toggle": "dropdown",
	                        role: "button",
	                        "aria-expanded": "false"}, "About ", React.createElement("span", {className: "caret"})
	                ),

	                React.createElement("ul", {className: "dropdown-menu", role: "menu"},
	                    React.createElement("li", null,
	                        React.createElement("a", {href: "http://developer.autodesk.com"},
	                            "Get an API key"
	                        )
	                    ),

	                    React.createElement("li", null,
	                        React.createElement("a", {href: "http://forums.autodesk.com/t5/Web-Services-API/ct-p/94"},
	                        "API Support"
	                        )
	                    ),

	                    React.createElement("li", null,
	                        React.createElement("a", {href: "http://www.autodesk.com"},
	                        "Autodesk"
	                        )
	                    ),

	                    React.createElement("li", {className: "divider"}

	                    ),

	                    React.createElement("li", null,
	                        React.createElement("a", {href: "https://github.com/Developer-Autodesk/ng-gallery"},
	                        "Source on Github"
	                        )
	                    )

	                )

	            )
	        );
	    }
	});

	var appNavbar = React.createClass({displayName: "appNavbar",

	    mixins: [Reflux.connect(appStateStore, "appState")],

	    componentDidMount: function() {

	    },

	    componentWillUnmount: function() {

	    },

	    _renderViewSpecific:function(view) {

	        switch(view){

	            case 'viewer-bkup':
	                return  (

	                    React.createElement(ViewerNavbar, null)
	            );

	            default :
	                break;
	        }
	    },

	    render: function() {

	        return (
	            React.createElement("div", null,
	                React.createElement("nav", {id: "appNavbar", className: "navbar navbar-default"},
	                    React.createElement("div", {className: "container-fluid"},

	                        React.createElement("div", {className: "navbar-header"},
	                            React.createElement("button", {type: "button",
	                                    className: "navbar-toggle collapsed",
	                                    "data-toggle": "collapse",
	                                    "data-target": "#app-navbar-content"},

	                                React.createElement("span", {className: "sr-only"}, "Toggle navigation"),
	                                React.createElement("span", {className: "icon-bar"}),
	                                React.createElement("span", {className: "icon-bar"}),
	                                React.createElement("span", {className: "icon-bar"})
	                            ),

	                            React.createElement("a", {className: "navbar-brand", href: "#/home"},
	                                React.createElement(AdnSpinningImg, {
	                                    step: "5.0",
	                                    period: "100",
	                                    height: "32",
	                                    width: "32",
	                                    src: "img/adsk/adsk-32x32-32.png",
	                                    class: "navbar-spinning-img"})
	                            ),

	                            React.createElement("a", {className: "navbar-brand", href: "#/home"},
	                                "Autodesk"
	                            )
	                        ),

	                        React.createElement("div", {className: "collapse navbar-collapse", id: "app-navbar-content"},

	                            React.createElement("ul", {className: "nav navbar-nav"},
	                                React.createElement("li", {className: this.state.appState.activeView === 'home' ? 'active' : ''},
	                                    React.createElement("a", {href: "#/home"}, "Home")
	                                ),
	                                React.createElement("li", {className: this.state.appState.activeView === 'viewer' ? 'active' : ''},
	                                    React.createElement("a", {href: "#/viewer"}, "Viewer")
	                                ),

	                                 this._renderViewSpecific(this.state.appState.activeView)

	                            ),


	                            React.createElement("ul", {className: "nav navbar-nav navbar-right"},

	                                React.createElement(AboutMenu, null)

	                            )
	                        )
	                    )
	                )

	            )
	        );
	    }
	});

	module.exports = appNavbar;



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/10/15.
	 */

	var config = __webpack_require__(11);
	var appActions = __webpack_require__(6);
	var viewerActions = __webpack_require__(10);
	var viewerStateStore = __webpack_require__(9);
	var viewerActions = __webpack_require__(10);
	var ExtensionsManageDlg = __webpack_require__(12);

	__webpack_require__(13);
	__webpack_require__(14);


	var viewerView = React.createClass({displayName: "viewerView",

	    mixins: [Reflux.connect(viewerStateStore, "viewerState")],

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
	            React.createElement("div", null,

	                React.createElement("div", {id: this.viewerId, className: "viewer"}


	                ),

	                React.createElement(ExtensionsManageDlg, {ref: "extensionsManageDlgId"})
	            )
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

	        var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.ViewerFactory(
	            tokenUrl,
	            config);

	        viewerFactory.getViewablePath (urn,

	            function(pathInfoCollection) {

	                viewerActions.viewablePathLoaded(
	                    pathInfoCollection);

	                var viewerConfig = {
	                    viewerType: 'GuiViewer3D'
	                }

	                self.viewer = viewerFactory.createViewer(
	                    document.getElementById(self.viewerId),
	                    viewerConfig);

	                if(pathInfoCollection.path3d.length) {
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
	    },

	    _onError: function(error)
	    {
	        console.log('Viewer Error: ' + error);
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

	    _onUploadExtensions: function() {

	        alert('_onUploadExtensions');
	    },

	    _onManageExtensions: function() {

	        $(this.refs.extensionsManageDlgId.getDOMNode()).modal(
	            {
	                backdrop: "static"
	            }
	        );
	    },

	    _onViewExtensionSource: function() {

	        alert('_onViewExtensionSource');
	    },

	    _loadGalleryExtensions: function(viewer) {

	        viewer.loadExtension(
	            'Autodesk.ADN.Viewing.Extension.ExtensionManager',
	            {
	                apiUrl: "http://" +
	                    window.location.host +
	                    config.host + '/api/extensions',

	                extensionsUrl: "http://" +
	                    window.location.host +
	                    config.host + '/uploads/extensions'
	            });

	        viewer.loadExtension(
	            'Autodesk.ADN.Viewing.Extension.StateManager',
	            {
	                apiUrl: "http://" +
	                    window.location.host +
	                    config.host +'/api/states/' +
	                    Autodesk.Viewing.Private.getParameterByName('id')
	            });
	    }
	});

	module.exports = viewerView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/10/15.
	 */


	var banner2d = React.createClass({displayName: "banner2d",

	    getInitialState: function() {

	        return {  };
	    },

	    componentDidMount: function() {

	    },

	    componentWillUnmount: function() {

	    },

	    render: function() {

	        return (
	            React.createElement("div", {className: "clearfix"},
	                React.createElement("div", {className: "row"},
	                    React.createElement("div", {className: "col-lg-12"},
	                        React.createElement("div", {className: "page-header content-header app-content-header api-detail-header view-and-data-api"},
	                            React.createElement("div", {className: "container app-container"},
	                                React.createElement("div", {className: "col-xs-12 col-sm-6 col-md-9 col-lg-9 app-title-container"},
	                                    React.createElement("h1", {id: "view-and-data-title"}, "View & Data Gallery")
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = banner2d;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/13/15.
	 */

	var appActions = __webpack_require__(6);

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

	        var viewDataClient = new Autodesk.ADN.Toolkit.ViewData.AdnViewDataClient(
	            'https://developer.api.autodesk.com',
	            tokenUrl);

	        viewDataClient.onInitialized(function() {

	            $.get('api/models', function (models) {

	                _this.list = models;

	                models.forEach(function (model) {

	                    model.thumbnail = "img/adsk/adsk-128x128-32.png";

	                    var fileId = viewDataClient.fromBase64(
	                        model.urn);

	                    viewDataClient.getThumbnailAsync (
	                        fileId,
	                        function(data) {

	                            model.thumbnail = "data:image/png;base64," + data;

	                            _this.trigger(_this.list);
	                        });
	                });

	                _this.trigger(_this.list);
	            });
	        });

	        return this.list;
	    }
	});

	module.exports = modelStore;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {


	// Each action is like an event channel for one specific event. Actions are called by components.
	// The store is listening to all actions, and the components in turn are listening to the store.
	// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

	var appActions = Reflux.createActions([
	    "viewActivated",
	]);

	module.exports = appActions;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/10/15.
	 */
	var Banner2d = __webpack_require__(4);
	var modelStore = __webpack_require__(5);
	var appActions = __webpack_require__(6);

	var ModelList = React.createClass({displayName: "ModelList",

	    getInitialState: function() {

	        return {  };
	    },

	    componentDidMount: function() {

	    },

	    componentWillUnmount: function() {

	    },

	    render: function() {

	        return (

	            React.createElement("ul", {className: "col-lg-12 ul-models"},

	                    this.props.models.map(function(model, idx) {

	                        return (
	                                React.createElement("li", {key: model._id, className: "li-models"},
	                                    React.createElement("div", {className: (idx%2) ? "row row-models-even" : "row row-models-odd"},
	                                        React.createElement("div", {className: "col-md-3"},
	                                            React.createElement("img", {className: "img-responsive",
	                                                    src: model.thumbnail,
	                                                    alt: "",
	                                                    width: "128",
	                                                    height: "128"}
	                                            )
	                                        ),

	                                        React.createElement("div", {className: "col-md-3"},
	                                            React.createElement("h3", null, model.name),
	                                            React.createElement("a", {className: "btn btn-primary", href: "#viewer?id=" + model._id},
	                                                "Show in viewer",
	                                                React.createElement("span", {className: "glyphicon glyphicon-chevron-right"})
	                                            )
	                                        )
	                                    )
	                                )
	                        );
	                    })

	            ));
	    }
	});

	var homeView = React.createClass({displayName: "homeView",

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

	        React.createElement("div", null,

	            React.createElement(Banner2d, null),

	            React.createElement("div", {className: "content-form app-content-form clearfix"},
	                React.createElement("div", {className: "container app-container"},
	                    React.createElement("div", {className: "row"},

	                        React.createElement("div", {className: "col-xs-12 col-sm-4 col-md-3 col-lg-3"},
	                            React.createElement("div", {id: "nav-parent", className: "page-header hidden-xs"},
	                                React.createElement("div", {"data-spy": "affix", "data-offset-top": "200", className: "panel panel-default app-panel-default app-sidenav-panel"},
	                                    React.createElement("div", {className: "navbar-collapse collapse navbar-responsive-collapse panel-body app-panel-body app-sidenav-body", role: "complementary"},
	                                        React.createElement("div", {className: "col-lg-12"},
	                                            React.createElement("ul", {className: "nav nav-pills nav-stacked app-sidenav"},
	                                                React.createElement("li", {role: "presentation", className: "active"}, React.createElement("a", {href: "#home", className: "first-child"}, "Home")),
	                                                React.createElement("li", {role: "presentation"}, React.createElement("a", {href: "#viewer", className: "first-child"}, "Viewer"))
	                                            )
	                                        )
	                                    )
	                                )
	                            ),

	                            React.createElement("div", {id: "nav-parent-mobile", className: "page-header hidden-sm hidden-md hidden-lg"},
	                                React.createElement("div", {"data-spy": "affix", "data-offset-top": "150", className: "panel panel-default app-panel-default app-sidenav-panel"},
	                                    React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": ".navbar-responsive-collapse"},
	                                        React.createElement("span", {className: "icon-bar"}),
	                                        React.createElement("span", {className: "icon-bar"}),
	                                        React.createElement("span", {className: "icon-bar"})
	                                    ),
	                                    React.createElement("div", {className: "navbar-collapse collapse navbar-responsive-collapse panel-body app-panel-body app-sidenav-body", role: "complementary"},
	                                        React.createElement("div", {className: "col-lg-12"},
	                                            React.createElement("ul", {className: "nav nav-pills nav-stacked app-sidenav"},
	                                                React.createElement("li", {role: "presentation", className: "active"}, React.createElement("a", {href: "#home", className: "first-child", "data-toggle": "collapse", "data-target": ".navbar-responsive-collapse"}, "Home")),
	                                                React.createElement("li", {role: "presentation"}, React.createElement("a", {href: "#viewer", "data-toggle": "collapse", "data-target": ".navbar-responsive-collapse"}, "Viewer"))
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        ),




	                        React.createElement("div", {className: "col-xs-12 col-sm-8 col-md-9 col-lg-9"},
	                            React.createElement("div", {className: "page-header"},
	                                React.createElement("div", {className: "panel panel-default app-panel-default home-panel"},
	                                    React.createElement("div", {className: "app-api-doc app-panel-body panel-body home-panel"},

	                                        React.createElement(ModelList, {models: this.state.list}),

	                                        React.createElement("div", {className: "bs-docs-section clearfix"},
	                                            React.createElement("div", {className: "row"},
	                                                React.createElement("div", {className: "col-xs-12"},
	                                                    React.createElement("div", {className: "col-xs-6 col-sm-6 app-button-container mob-app-button-container back-to-top-container"},
	                                                        React.createElement("p", {className: "bs-component"},
	                                                            React.createElement("a", {href: "#view-and-data-title", className: "btn app-btn app-btn-lg app-btn-default back-to-top-btn"}, "Back to top")
	                                                        )
	                                                    )
	                                                )
	                                            )
	                                        )
	                                    )
	                                )
	                            )
	                        )


	                    )
	                )
	            ),

	            React.createElement("div", {className: "clearfix"},
	                React.createElement("div", {className: "row"},
	                    React.createElement("div", {className: "col-lg-12"},
	                        React.createElement("div", {className: "page-footer"},
	                            React.createElement("div", {className: "container app-container"},
	                                React.createElement("p", null, React.createElement("a", {href: "http://www.autodesk.com/company/legal-notices-trademarks/privacy-statement"}, "Privacy"), "  |  ", React.createElement("a", {href: "http://www.autodesk.com/company/legal-notices-trademarks"}, "Legal Notices and Trademarks"), "  |  ", React.createElement("a", {href: "http://www.autodesk.com/company/license-compliance/report-noncompliance"}, "Report Noncompliance"),
	                                    React.createElement("br", null), "© Copyright 2015 Autodesk. All rights reserved."
	                                )
	                            )
	                        )
	                    )
	                )
	            )

	    )
	        );
	    }
	});

	module.exports = homeView;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var appActions = __webpack_require__(6);

	var appStateStore = Reflux.createStore({

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

	module.exports = appStateStore;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/13/15.
	 */
	var viewerActions = __webpack_require__(10);

	var viewerStateStore = Reflux.createStore({

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

	module.exports = viewerStateStore;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 4/13/15.
	 */

	var viewerActions = Reflux.createActions([
	    "viewablePathLoaded",
	    "viewablePathActivated"
	]);

	module.exports = viewerActions;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by leefsmp on 5/7/15.
	 */

	var configClient = {

	  host: '/node/react-gallery',
	  viewAndDataUrl: 'https://developer.api.autodesk.com'
	}

	module.exports = configClient;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {



	var extensionsManageDlg = React.createClass({displayName: "extensionsManageDlg",

	    componentDidMount: function() {

	        $(this.getDOMNode()).modal({
	            background: true,
	            keyboard: true,
	            show: false
	        })
	    },

	    componentWillUnmount: function(){
	        $(this.getDOMNode()).off('hidden');
	    },

	    handleClick: function(e) {
	        e.stopPropagation();
	    },

	    render: function() {

	        return (
	            React.createElement("div", {onClick: this.handleClick,
	                className: "modal fade",
	                role: "dialog",
	                "aria-hidden": "true"},

	                React.createElement("div", {className: "modal-dialog"},

	                    React.createElement("div", {className: "modal-content gallery-modal-dlg-content"},

	                        React.createElement("div", {className: "modal-header"},
	                            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal"},
	                                React.createElement("span", {"aria-hidden": "true"}, "×"),
	                                React.createElement("span", {className: "sr-only"},
	                                "Close"
	                                )
	                            ),
	                            React.createElement("h4", {className: "modal-title"}, "Manage Extensions")
	                        ),

	                        React.createElement("div", {className: "modal-body"}

	                        ),

	                        React.createElement("div", {className: "modal-footer"},
	                            React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"),
	                            React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Ok")
	                        )
	                    )
	                )
	            )
	        )
	    }
	});


	module.exports = extensionsManageDlg;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	///////////////////////////////////////////////////////////////////////////////
	// Autodesk.ADN.Viewing.Extension.ExtensionManager
	// by Philippe Leefsma, May 2015
	//
	///////////////////////////////////////////////////////////////////////////////
	AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

	Autodesk.ADN.Viewing.Extension.ExtensionManager = function (viewer, options) {

	    Autodesk.Viewing.Extension.call(this, viewer, options);

	    var _panelBaseId = newGUID();

	    var _extensionsMap = {};

	    var _viewer = viewer;

	    var _panel = null;

	    var _this = this;

	    /////////////////////////////////////////////////////////
	    //
	    //
	    //////////////////////////////////////////////////////////
	    _this.load = function () {

	        var ctrlGroup = _this.getGalleryControlGroup();

	        _this.createControls(ctrlGroup);

	        _panel = new Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel(
	          _viewer.container,
	          _panelBaseId);

	        $.get(options.apiUrl , function(extensions){

	            initStorage(extensions);

	            _extensionsMap = _this.initializeExtensions(
	              extensions);
	        });

	        console.log('Autodesk.ADN.Viewing.Extension.ExtensionManager loaded');

	        return true;
	    };

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    _this.unload = function () {

	        console.log('Autodesk.ADN.Viewing.Extension.ExtensionManager unloaded');

	        return true;
	    };

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    _this.initializeExtensions = function(extensions) {

	        var extensionsMap = {};

	        extensions.forEach(function(extension){

	            //hidden extensions start with '_'
	            if(!extension.id.startsWith('_')) {

	                extension.handler = function() {

	                    extension.enabled = !extension.enabled;

	                    storeExtensionState(extension);

	                    if(extension.enabled) {

	                        $('#' + extension.itemId).addClass('enabled');

	                        loadExtension(extension);
	                    }
	                    else {

	                        $('#' + extension.itemId).removeClass('enabled');

	                        viewer.unloadExtension(extension.id);
	                    }
	                }

	                extension.itemId = newGUID();

	                extension.enabled = getExtensionState(extension);

	                if(extension.enabled) {

	                    loadExtension(extension);
	                }

	                extensionsMap[extension.id] = extension;
	            }
	        });

	        return extensionsMap;
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    _this.getGalleryControlGroup = function() {

	        var viewerToolbar = _viewer.getToolbar(true);

	        var galleryControls = viewerToolbar.getControl(
	            'Autodesk.ADN.Gallery.ControlGroup');

	        if(!galleryControls) {

	            galleryControls = new Autodesk.Viewing.UI.ControlGroup(
	                'Autodesk.ADN.Gallery.ControlGroup');

	            viewerToolbar.addControl(galleryControls);
	        }

	       return galleryControls;
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    _this.createControls = function(parentGroup) {

	        var btn = createButton(
	            'Autodesk.ADN.Gallery.ExtensionManager.Button.Manage',
	            'glyphicon glyphicon-plus',
	            'Manage Extensions',
	            _this.onExtensionManagerClicked);

	        parentGroup.addControl(btn);
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    _this.onExtensionManagerClicked = function() {

	        _panel.setVisible(true);

	        _extensionsMap = {};

	        $.get(options.apiUrl , function(extensions){

	            _panel.clearExtensions();

	            initStorage(extensions);

	            _extensionsMap = _this.initializeExtensions(
	              extensions);

	            for(var extensionId in _extensionsMap) {

	                _panel.addExtension(_extensionsMap[extensionId]);
	            }
	        });
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function createButton(id, className, tooltip, handler) {

	        var button = new Autodesk.Viewing.UI.Button(id);

	        //button.icon.style.backgroundImage = imgUrl;
	        button.icon.className = className;

	        button.icon.style.fontSize = "24px";

	        button.setToolTip(tooltip);

	        button.onClick = handler;

	        return button;
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function newGUID() {

	        var d = new Date().getTime();

	        var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
	          /[xy]/g,
	          function (c) {
	              var r = (d + Math.random() * 16) % 16 | 0;
	              d = Math.floor(d / 16);
	              return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	          });

	        return guid;
	    };

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function initStorage(extensions) {

	        //window.localStorage.clear();

	        if(!localStorage['gallery.extensions']) {

	            localStorage['gallery.extensions'] = JSON.stringify({});
	        }

	        var storageObj = JSON.parse(localStorage['gallery.extensions']);

	        extensions.forEach(function(extension) {

	            if(!storageObj[extension.id]) {

	                storageObj[extension.id] = false;
	            }
	        });

	        localStorage['gallery.extensions'] = JSON.stringify(storageObj);
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function getExtensionState(extension) {

	        var storageObj = JSON.parse(
	          localStorage['gallery.extensions']);

	        return storageObj[extension.id];
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function storeExtensionState(extension) {

	        var storageObj = JSON.parse(localStorage['gallery.extensions']);

	        storageObj[extension.id] = extension.enabled;

	        localStorage['gallery.extensions'] = JSON.stringify(storageObj);
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    function loadExtension(extension) {

	        $.getScript(options.extensionsUrl +'/' +
	          extension.id + '/' + extension.file)

	          .done(function () {

	              viewer.loadExtension(extension.id);
	          })
	          .fail(function (jqxhr, settings, exception) {
	              console.log("Load failed: " + extension.file);
	          });
	    }

	    /////////////////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////////////////
	    Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel = function(
	      parentContainer,
	      baseId)
	    {
	        this.content = document.createElement('div');

	        this.content.id = baseId + 'PanelContentId';
	        this.content.className = 'extension-manager-panel-content';

	        Autodesk.Viewing.UI.DockingPanel.call(
	          this,
	          parentContainer,
	          baseId,
	          "Extensions Manager",
	          {shadow:true});

	        this.container.style.top = "0px";
	        this.container.style.left = "0px";

	        this.container.style.width = "300px";
	        this.container.style.height = "400px";

	        this.container.style.resize = "auto";

	        var html = [
	            '<div class="extension-manager-panel-container" style="z-index: 1000">',
	                '<div id="' + baseId + 'PanelContainerId" class="list-group extension-manager-panel-list-container">',
	                '</div>',
	            '</div>'
	        ].join('\n');

	        $('#' + baseId + 'PanelContentId').html(html);

	        this.addExtension = function(extension) {

	            var srcUrl = options.extensionsUrl + '/' + extension.id + '/' + extension.file;

	            var html = [

	                '<div class="row extension-manager-panel-row">',
	                    '<a class="list-group-item extension-manager-panel-list-group-item col-md-6" id=' + extension.itemId + '>',
	                        '<p class="list-group-item-text">',
	                            extension.name,
	                        '</p>',
	                    '</a>',

	                    '<a href="' + srcUrl + '" class="list-group-item extension-manager-panel-list-group-item-src col-md-2" target=_blank>',
	                        '<p class="list-group-item-text">',
	                            'Source',
	                        '</p>',
	                    '</a>',
	                '</div>',

	            ].join('\n');

	            $('#' + baseId + 'PanelContainerId').append(html);

	            $('#' + extension.itemId).click(extension.handler);

	            $('#' + extension.itemId + 'src').click(extension.handlerSrc);

	            if(extension.enabled) {
	                $('#' + extension.itemId).addClass('enabled');
	            }
	        }

	        this.clearExtensions = function () {

	            $('#' + baseId + 'PanelContainerId > div').each(
	              function (idx, child) {
	                  $(child).remove();
	              }
	            )
	        }
	    };

	    Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel.prototype = Object.create(
	      Autodesk.Viewing.UI.DockingPanel.prototype);

	    Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel.prototype.constructor =
	      Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel;

	    Autodesk.ADN.Viewing.Extension.ExtensionManager.Panel.prototype.initialize = function()
	    {
	        // Override DockingPanel initialize() to:
	        // - create a standard title bar
	        // - click anywhere on the panel to move

	        this.title = this.createTitleBar(
	          this.titleLabel ||
	          this.container.id);

	        this.closer = this.createCloseButton();

	        this.container.appendChild(this.title);
	        this.title.appendChild(this.closer);
	        this.container.appendChild(this.content);

	        this.initializeMoveHandlers(this.title);
	        this.initializeCloseHandler(this.closer);
	    };

	    var css = [

	        'div.extension-manager-panel-content {',
	            'height: calc(100% - 25px);',
	        '}',

	            'div.extension-manager-panel-container {',
	            'height: calc(100% - 25px);',
	            'margin: 10px;',
	        '}',

	        'div.extension-manager-panel-controls-container {',
	            'margin-bottom: 10px;',
	        '}',

	        'div.extension-manager-panel-list-container {',
	            'height: calc(100% - 25px);',
	            'overflow-y: auto;',
	        '}',

	        'a.extension-manager-panel-list-group-item {',
	            'color: #FFFFFF;',
	            'background-color: #3F4244;',
	            'margin-bottom: 5px;',
	            'border-radius: 4px;',
	        '}',

	        'a.extension-manager-panel-list-group-item-src {',
	            'color: #FFFFFF;',
	            'background-color: #3F4244;',
	            'margin-bottom: 5px;',
	            'width: 45px;',
	            'border-radius: 4px;',
	        '}',

	        'a.extension-manager-panel-list-group-item:hover {',
	            'color: #FFFFFF;',
	            'background-color: #5BC0DE;',
	        '}',

	        'a.extension-manager-panel-list-group-item.enabled {',
	            'color: #000000;',
	            'background-color: #00CC00;',
	        '}',

	        'div.extension-manager-panel-row {',
	            'margin-left: 0;',
	            'margin-right: 0;',
	        '}'

	    ].join('\n');

	    $('<style type="text/css">' + css + '</style>').appendTo('head');
	};

	Autodesk.ADN.Viewing.Extension.ExtensionManager.prototype =
	  Object.create(Autodesk.Viewing.Extension.prototype);

	Autodesk.ADN.Viewing.Extension.ExtensionManager.prototype.constructor =
	  Autodesk.ADN.Viewing.Extension.ExtensionManager;

	Autodesk.Viewing.theExtensionManager.registerExtension(
	  'Autodesk.ADN.Viewing.Extension.ExtensionManager',
	  Autodesk.ADN.Viewing.Extension.ExtensionManager);



/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	///////////////////////////////////////////////////////////////////////////////
	// Autodesk.ADN.Viewing.Extension.ExtensionManager
	// by Philippe Leefsma, May 2015
	//
	///////////////////////////////////////////////////////////////////////////////
	AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

	Autodesk.ADN.Viewing.Extension.StateManager = function (viewer, options) {

	    Autodesk.Viewing.Extension.call(this, viewer, options);

	    var _panelBaseId = newGUID();

	    var _viewer = viewer;

	    var _panel = null;

	    var _this = this;

	    //the dragula object
	    var _drake = null;

	    var _stateMap = {};

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    _this.load = function () {

	        var ctrlGroup = _this.getGalleryControlGroup();

	        _this.createControls(ctrlGroup);

	        _panel = new Autodesk.ADN.Viewing.Extension.StateManager.Panel(
	          _viewer.container,
	          _panelBaseId);

	        console.log('Autodesk.ADN.Viewing.Extension.StateManager loaded');

	        return true;
	    };

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    _this.unload = function () {

	        console.log('Autodesk.ADN.Viewing.Extension.StateManager unloaded');

	        return true;
	    };

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    _this.getGalleryControlGroup = function() {

	        var viewerToolbar = _viewer.getToolbar(true);

	        var galleryControls = viewerToolbar.getControl(
	            'Autodesk.ADN.Gallery.ControlGroup');

	        if(!galleryControls) {

	            galleryControls = new Autodesk.Viewing.UI.ControlGroup(
	                'Autodesk.ADN.Gallery.ControlGroup');

	            viewerToolbar.addControl(galleryControls);
	        }

	       return galleryControls;
	    }

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    _this.createControls = function(parentGroup) {

	        var btn = createButton(
	            'Autodesk.ADN.Gallery.StateManager.Button.Manage',
	            'glyphicon glyphicon-list',
	            'Manage States',
	            _this.onStateManagerClicked);

	        parentGroup.addControl(btn);
	    }

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    _this.onStateManagerClicked = function() {

	        _panel.setVisible(true);

	        _stateMap = {};

	        $.get(options.apiUrl, function(states) {

	            _panel.clearStates();

	            states.forEach(function(stateStr) {

	                var state = JSON.parse(stateStr);

	                _panel.addState(state);
	            });
	        });
	    }

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    function createButton(id, className, tooltip, handler) {

	        var button = new Autodesk.Viewing.UI.Button(id);

	        //button.icon.style.backgroundImage = imgUrl;
	        button.icon.className = className;

	        button.icon.style.fontSize = "24px";

	        button.setToolTip(tooltip);

	        button.onClick = handler;

	        return button;
	    }

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    function newGUID() {

	        var d = new Date().getTime();

	        var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
	          /[xy]/g,
	          function (c) {
	              var r = (d + Math.random() * 16) % 16 | 0;
	              d = Math.floor(d / 16);
	              return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	          });

	        return guid;
	    };

	    /////////////////////////////////////////////
	    //
	    //
	    /////////////////////////////////////////////
	    Autodesk.ADN.Viewing.Extension.StateManager.Panel = function(
	      parentContainer,
	      baseId) {

	        var _this = this;

	        var _sequenceIndex = 0;

	        var _sequenceRunning = false;

	        this.content = document.createElement('div');

	        this.content.id = baseId + 'PanelContentId';
	        this.content.className = 'state-manager-panel-content';

	        Autodesk.Viewing.UI.DockingPanel.call(
	          this,
	          parentContainer,
	          baseId,
	          "States Manager",
	          {shadow: true});

	        this.container.style.top = "0px";
	        this.container.style.left = "0px";

	        this.container.style.width = "380px";
	        this.container.style.height = "400px";

	        this.container.style.resize = "auto";

	        var html = [
	            '<div class="state-manager-panel-container">',
	                '<div class="state-manager-panel-controls-container">',
	                    '<div>',
	                    '<button class="btn btn-info" id="' + baseId + 'saveStateBtn">',
	                        '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Save State',
	                    '</button>',
	                    '<input class="state-manager-panel-input" type="text" placeholder=" Name (default: Date/Time)" id="' + baseId + 'stateName">',
	                    '</div>',
	                    '<br>',
	                    '<div>',
	                    '<button class="btn btn-info" id="' + baseId + 'playSequenceBtn" style="width:86px;">',
	                        '<span class="glyphicon glyphicon-play" aria-hidden="true"></span> <label> Play </label>',
	                    '</button>',
	                    '<input class="state-manager-panel-input" type="text" placeholder=" Period (sec / default:1sec) " id="' + baseId + 'period">',
	                    '</div>',
	                    '<br>',
	                    '<label class="state-manager-panel-label"><input id="' + baseId + 'EditCbId" type="checkbox" name="checkbox" value="value"> Edit States</label>',
	                '</div>',
	                '<div id="' + baseId + 'PanelContainerId" class="list-group state-manager-panel-list-container">',
	                '</div>',
	            '</div>'

	        ].join('\n');

	        $('#' + baseId + 'PanelContentId').html(html);

	        /////////////////////////////////////////////
	        //
	        //
	        /////////////////////////////////////////////
	        $('#' + baseId + 'EditCbId').change(function () {

	            if (this.checked) {

	                _drake = dragula(
	                  [$('#' + baseId + 'PanelContainerId')[0]],
	                  {removeOnSpill: true});

	                _drake.on('remove', function (element, container) {

	                    delete _stateMap[element.id];

	                    $.ajax({
	                        url: options.apiUrl + '/' + element.id,
	                        type: 'DELETE',
	                        success: function () {
	                            console.log('delete ok')
	                        },
	                        error: function () {
	                            console.log('delete ko')
	                        }
	                    });
	                })
	            }
	            else {

	                _drake.destroy();
	            }
	        });

	        /////////////////////////////////////////////
	        //
	        //
	        /////////////////////////////////////////////
	        $('#' + baseId + 'saveStateBtn').click(function(){

	            var name =  $('#' + baseId + 'stateName').val();

	            var stateFilter = {
	              guid: true,
	              seedURN: false,
	              objectSet: true,
	              viewport: true,
	              renderOptions: false
	            };

	            var state = viewer.getState(stateFilter);

	            state.name = (name.length ?
	              name : new Date().toString('d/M/yyyy H:mm:ss'));

	            var data = {
	                state: JSON.stringify(state)
	            }

	            $.ajax({
	                url: options.apiUrl,
	                type: 'PUT',
	                data: data,
	                success: function () {
	                    _this.addState(state);
	                },
	                error: function () {
	                   console.log('Error PUT: ' + url);
	                }
	            });
	        });

	        /////////////////////////////////////////////
	        //
	        //
	        /////////////////////////////////////////////
	        $('#' + baseId + 'playSequenceBtn').click(function(){

	            _sequenceRunning = !_sequenceRunning;

	            if(_sequenceRunning){

	                $('#' + baseId + 'playSequenceBtn > label').text(" Pause");
	                $('#' + baseId + 'playSequenceBtn > span').removeClass("glyphicon-play");
	                $('#' + baseId + 'playSequenceBtn > span').addClass("glyphicon-pause");

	                var period = parseInt($('#' + baseId + 'period').val());

	                period = (isNaN(period) ? 1.0 : period);

	                var stateItems = $('#' + baseId + 'PanelContainerId > div');

	                function restoreState() {

	                    if(_sequenceIndex < stateItems.length) {

	                        if(_sequenceRunning) {

	                            if(_sequenceIndex > 0) {
	                              $(stateItems[_sequenceIndex-1]).removeClass('enabled');
	                            }

	                            $(stateItems[_sequenceIndex]).addClass('enabled');

	                            var state = _stateMap[stateItems[_sequenceIndex].id];

	                            _viewer.restoreState(state);

	                            ++_sequenceIndex;

	                            setTimeout(restoreState, period * 1000.0);
	                        }
	                    }
	                    else {

	                        //end of sequence -> reset
	                        $(stateItems[_sequenceIndex-1]).removeClass('enabled');
	                        _sequenceIndex = 0;
	                        _sequenceRunning = false;
	                        $('#' + baseId + 'playSequenceBtn > label').text(" Play");
	                        $('#' + baseId + 'playSequenceBtn > span').removeClass("glyphicon-pause");
	                        $('#' + baseId + 'playSequenceBtn > span').addClass("glyphicon-play");
	                    }
	                }

	                restoreState();
	            }
	            else {

	                $('#' + baseId + 'playSequenceBtn > label').text(" Play");
	                $('#' + baseId + 'playSequenceBtn > span').removeClass("glyphicon-pause");
	                $('#' + baseId + 'playSequenceBtn > span').addClass("glyphicon-play");
	            }
	        });

	        /////////////////////////////////////////////
	        //
	        //
	        /////////////////////////////////////////////
	        _this.addState = function (state) {

	            _stateMap[state.guid] = state;

	            var html = [

	                '<div class="list-group-item state-manager-panel-item" id="' + state.guid + '">',
	                state.name,
	                '</div>'

	            ].join('\n');

	            $('#' + baseId + 'PanelContainerId').append(html);

	            $('#' + state.guid).click(function () {

	                _viewer.restoreState(_stateMap[state.guid]);
	            });
	        }

	        /////////////////////////////////////////////
	        //
	        //
	        /////////////////////////////////////////////
	        _this.clearStates = function () {

	            $('#' + baseId + 'PanelContainerId > div').each(
	              function (idx, child) {
	                  $(child).remove();
	              }
	            )
	        }
	    };

	    Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype = Object.create(
	      Autodesk.Viewing.UI.DockingPanel.prototype);

	    Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.constructor =
	      Autodesk.ADN.Viewing.Extension.StateManager.Panel;

	    Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.initialize = function()
	    {
	        // Override DockingPanel initialize() to:
	        // - create a standard title bar
	        // - click anywhere on the panel to move

	        this.title = this.createTitleBar(
	          this.titleLabel ||
	          this.container.id);

	        this.closer = this.createCloseButton();

	        this.container.appendChild(this.title);
	        this.title.appendChild(this.closer);
	        this.container.appendChild(this.content);

	        this.initializeMoveHandlers(this.title);
	        this.initializeCloseHandler(this.closer);
	    };

	    var css = [

	        'div.state-manager-panel-content {',
	            'height: calc(100% - 70px);',
	        '}',

	        'div.state-manager-panel-container {',
	            'height: calc(100% - 70px);',
	            'margin: 10px;',
	        '}',

	        'div.state-manager-panel-controls-container {',
	            'margin-bottom: 10px;',
	        '}',

	        'div.state-manager-panel-list-container {',
	            'height: calc(100% - 70px);',
	            'overflow-y: auto;',
	        '}',

	        'div.state-manager-panel-item {',
	            'margin-left: 0;',
	            'margin-right: 0;',
	            'color: #FFFFFF;',
	            'background-color: #3F4244;',
	            'margin-bottom: 5px;',
	            'border-radius: 4px;',
	        '}',

	        'div.state-manager-panel-item:hover {',
	            'background-color: #5BC0DE;',
	        '}',

	        'div.state-manager-panel-item.enabled {',
	          'background-color: #5BC0DE;',
	        '}',

	        'label.state-manager-panel-label {',
	            'color: #FFFFFF;',
	        '}',

	        'input.state-manager-panel-input {',
	            'height: 30px;',
	            'width: 60%;',
	            'border-radius: 5px;',
	        '}'

	    ].join('\n');

	    $('<style type="text/css">' + css + '</style>').appendTo('head');
	};

	Autodesk.ADN.Viewing.Extension.StateManager.prototype =
	  Object.create(Autodesk.Viewing.Extension.prototype);

	Autodesk.ADN.Viewing.Extension.StateManager.prototype.constructor =
	  Autodesk.ADN.Viewing.Extension.StateManager;

	Autodesk.Viewing.theExtensionManager.registerExtension(
	  'Autodesk.ADN.Viewing.Extension.StateManager',
	  Autodesk.ADN.Viewing.Extension.StateManager);



/***/ }
/******/ ]);
