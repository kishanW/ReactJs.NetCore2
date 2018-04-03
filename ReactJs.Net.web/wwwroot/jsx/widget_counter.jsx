var CounterWidget = React.createClass({
    getInitialState: function () {
        return {
            widgetName: "Counter Widget",
            count: 0
        };
    },

    componentDidMount: function () {

    },

    render: function () {
        return (
            <div className="countWidget">
                <div className="count">{this.state.count}</div>
                <div className="name">{this.props.widgetName}</div>
            </div>
        );
    }
});