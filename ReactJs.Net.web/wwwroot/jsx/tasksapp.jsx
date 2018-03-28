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
                    {this.props.firstName} {this.props.lastName}
                </h4>

                <p className="list-group-item-text">
                    <ul>
                        <li>Email: {this.props.emailAddress}</li>
                        <li>Number of Tasks: {this.props.numberOfTasks}</li>
                    </ul>
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
            return (<TaskUser key={user.id} userid={user.id} firstName={user.firstName} lastName={user.lastName} emailAddress={user.emailAddress} numberOfTasks={user.numberOfTasks}/>);
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


var AddTaskForm = React.createClass({
    getUsersFromServer: function() {
        //we can conver this into anything
        var xhr = new XMLHttpRequest();
        xhr.open('get', taskapp.gettaskusers, true);
        xhr.onload = function() {
            var data = JSON.parse(xhr.responseText);

            //most important function call!
            this.setState({ taskUsers: data });

        }.bind(this);
        xhr.send();
    },


    getInitialState: function() {
        return { taskUsers: [] };
    },

    componentDidMount: function() {
        this.getUsersFromServer();
        window.setInterval(this.getUsersFromServer, this.props.pollInterval);
    },


    render: function() {
        var taskUsersNodes = this.state.taskUsers.map(function(user) {
            return (<option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>);
        });

        return (
            <form action={taskapp.addtaskurl} method="post">
                <div className="form-group">
                    <label className="control-label">Task Name</label>
                    <input type="text" name="TaskName" placeholder="Name for the task" className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Description</label>
                    <input type="text" name="TaskDescription" placeholder="A little description for the task" className="form-control"/>
                </div>

                <div className="form-group">
                    <label className="control-label">Assign to user</label>
                    <select className="form-control" name="AssignedTo">
                        {taskUsersNodes}
                    </select>
                </div>

                <div className="form-group">
                    <label className="control-label">Due Date</label>
                    <input type="date" name="DueDate" placeholder="01/31/2018" className="form-control"/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </div>
            </form>
        );
    }
});



//addTaskForm

ReactDOM.render(
    <AddTaskForm pollInterval="3000" />,
    document.getElementById('addTaskForm')
);