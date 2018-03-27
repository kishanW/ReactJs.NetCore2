/*
    You cannot name your component - taskUser
    It MUST be named TaskUser.

    
    https://reactjs.net/getting-started/tutorial.html
*/
var TaskUser = React.createClass({
    render: function() {
        return (
            <li className="list-group-item" key={this.props.userid}>
                <h4 className="list-group-item-heading">
                    {this.props.emailAddress}
                    <span className="badge right">{this.props.numberOfTasks}</span>
                </h4>

                <p className="list-group-item-text">
                    {this.props.firstName} {this.props.lastName} email address is {this.props.emailAddress}
                </p>
            </li>
        );
    }
});

var TaskUsersTable = React.createClass({
    getUsersFromServer: function () {
        //we can conver this into anything
        var xhr = new XMLHttpRequest();
        xhr.open('get', taskapp.gettaskusers, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);

            //most important function call!
            this.setState({ taskUsers: data });
            
        }.bind(this);
        xhr.send();
    },

    getInitialState: function () {
        return { taskUsers: [] };
    },

    componentDidMount: function () {
        this.getUsersFromServer();
        window.setInterval(this.getUsersFromServer, this.props.pollInterval);
    },


    
    
    render: function () {
        var taskUsersNodes = this.state.taskUsers.map(function(user) {
            return (<TaskUser key={user.key} userid={user.key} firstName={user.firstName} lastName={user.lastName} emailAddress={user.emailAddress} numberOfTasks={user.numberOfTasks}/>);
        });

        return (
            <ul className="list-group">
                {taskUsersNodes}
            </ul>
        );
    }
});

ReactDOM.render(
    <TaskUsersTable pollInterval="3000"/>,
    document.getElementById('taskusers')
);