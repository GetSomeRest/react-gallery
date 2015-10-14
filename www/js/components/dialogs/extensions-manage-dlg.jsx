

var extensionsManageDlg = React.createClass({

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
            <div onClick={this.handleClick}
                className="modal fade"
                role="dialog"
                aria-hidden="true">

                <div className="modal-dialog">

                    <div className="modal-content gallery-modal-dlg-content">

                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">
                                Close
                                </span>
                            </button>
                            <h4 className="modal-title">Manage Extensions</h4>
                        </div>

                        <div className="modal-body">

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = extensionsManageDlg;
