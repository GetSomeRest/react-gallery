/**
 * Created by leefsmp on 4/10/15.
 */

var AdnSpinningImg = React.createClass({

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

            <img id="imgId"
                 height={this.props.height}
                 width={this.props.width}
                 src={this.props.src}
                 className={this.props.class}>

            </img>

        );
    }
});

module.exports = AdnSpinningImg;

