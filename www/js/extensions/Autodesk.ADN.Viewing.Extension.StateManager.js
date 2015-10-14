///////////////////////////////////////////////////////////////////////////////
// Autodesk.ADN.Viewing.Extension.ExtensionManager
// by Philippe Leefsma, May 2015
//
///////////////////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.StateManager = function (viewer, options) {

  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _panelBaseId = guid();

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

    var ctrlGroup = getControlGroup(
      options.controlGroup);

    createControls(ctrlGroup);

    _panel = new Autodesk.ADN.Viewing.Extension.StateManager.Panel(
      viewer.container,
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
  function getControlGroup(name) {

    var viewerToolbar = viewer.getToolbar(true);

    var control = viewerToolbar.getControl(name);

    if (!control) {

      control = new Autodesk.Viewing.UI.ControlGroup(
        options.controlGroup);

      viewerToolbar.addControl(control);
    }

    return control;
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function createControls(parentGroup) {

    var btn = createButton(
      'Button.StatesManager',
      'glyphicon glyphicon-retweet',
      'Manage States',
      onStateManagerClicked);

    parentGroup.addControl(btn, {index: options.index});
  }

  /////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////
  function onStateManagerClicked() {

    _panel.setVisible(true);

    _stateMap = {};

    $.get(options.apiUrl, function(response) {

      _panel.clearStates();

      response.states.forEach(function(stateStr) {

        var state = JSON.parse(stateStr);

        _stateMap[state.guid] = state;
      });

      response.sequence.forEach(function(guid) {

        var state = _stateMap[guid];

        if(state) {

          _panel.addState(state);
        }
      });

      _panel.scrollToTop();
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
  function guid() {

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

    $(this.container).css({
      'right':'0px',
      'top':'0px',
      'width':'345px',
      'height':'400px',
      'min-width':'10px',
      'min-height':'10px',
      'resize':'auto'
    });

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
    function updateStatesSequence() {

      var sequence = [];

      $('#' + baseId + 'PanelContainerId > div').each(
        function (idx, child) {
          sequence.push(child.id);
        });

      var data = {
        sequence: JSON.stringify(sequence)
      };

      $.ajax({
        url: options.apiUrl + '/sequence',
        type: 'PUT',
        data: data,
        success: function (result) {

        },
        error: function (error) {
          console.log('PUT /sequence failed:');
          console.log(error);
        }
      });
    }

    /////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////
    $('#' + baseId + 'EditCbId').change(function () {

      if (this.checked) {

        _drake = dragula(
          [$('#' + baseId + 'PanelContainerId')[0]],
          {removeOnSpill: true});

        _drake.on('drop', function (element, container) {

          updateStatesSequence();
        });

        _drake.on('remove', function (element, container) {

          delete _stateMap[element.id];

          updateStatesSequence();

          $.ajax({
            url: options.apiUrl + '/delete/' + element.id,
            type: 'POST',
            success: function () {

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

      _this.addState(state);

      $.ajax({
        url: options.apiUrl,
        type: 'PUT',
        data: data,
        success: function () {

        },
        error: function () {
          console.log('Error PUT: ' + options.apiUrl);
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

              viewer.restoreState(state);

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

      var $container = $('#' + baseId + 'PanelContainerId');

      $container.append(html);

      //scroll down to new state
      $container[0].scrollTop = $container[0].scrollHeight;

      $('#' + state.guid).click(function () {

        viewer.restoreState(_stateMap[state.guid]);
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
        });
    }

    /////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////
    _this.scrollToTop = function() {

      var $container = $('#' + baseId + 'PanelContainerId');

      $container[0].scrollTop = 0;
    }
  };

  Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype = Object.create(
    Autodesk.Viewing.UI.DockingPanel.prototype);

  Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.StateManager.Panel;

  Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.setVisible = function(show)
  {
    Autodesk.Viewing.UI.DockingPanel.prototype.setVisible.call(this, show);
  };

  Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.onTitleDoubleClick = function (event) {

  };

  Autodesk.ADN.Viewing.Extension.StateManager.Panel.prototype.initialize = function()
  {
    // Override DockingPanel initialize() to:
    // - create a standard title bar
    // - click anywhere on the panel to move

    this.title = this.createTitleBar(
      this.titleLabel ||
      this.container.id);

    this.closer = this.createCloseButton();

    this.title.appendChild(this.closer);
    this.container.appendChild(this.title);
    this.container.appendChild(this.content);

    this.initializeMoveHandlers(this.title);
    this.initializeCloseHandler(this.closer);
  };

  var css = [

    'div.state-manager-panel-content {',
      'height: calc(100% - 30px);',
    '}',

    'div.state-manager-panel-container {',
      'height: calc(100% - 70px);',
      'margin: 10px;',
    '}',

    'div.state-manager-panel-controls-container {',
      'margin-bottom: 10px;',
      'overflow: auto;',
    '}',

    'div.state-manager-panel-list-container {',
      'height: calc(100% - 100px);',
      'overflow: auto;',
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

