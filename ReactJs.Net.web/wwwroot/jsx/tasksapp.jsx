﻿/*
    You cannot name your component - taskUser
    It MUST be named TaskUser.

    
    https://reactjs.net/getting-started/tutorial.html
*/

var TaskUser = React.createClass({
    removeUserHandlerChild: function () {
        console.log("removeUserHandler CHILD - " + this.props.userid);
        this.props.removeUserHandler(this.props.userid);
    },
    
    render: function () {
        return (
            <li key={this.props.userid} data-taskuser data-user-id={this.props.userid}>
                <div data-remove-taskuser onClick={this.removeUserHandlerChild}>
                    <i className="fas fa-times-circle"></i>
                </div>

                <div data-user-info>
                    <div data-user-name>
                        {this.props.firstName} {this.props.lastName}
                    </div>

                    <div data-user-info-list>
                        <ul>
                            <li><span>Email</span> <span>{this.props.emailAddress}</span></li>
                            <li><span>Tasks</span> <span>{this.props.numberOfTasks}</span></li>
                        </ul>
                    </div>
                </div>
            </li>
        );
    }
});

var TaskUsersTable = React.createClass({

    removeUserHandler: function(userId) {
        console.log("removeUserHandler PARENT - " + userId);

        $.ajax(taskapp.deletetaskuserurl,
            {
                type: "POST",
                data: {
                    id: userId
                },
                success: function () {
                    
                }
            });
    },

    getInitialState: function () {
        return { taskUsers: [] };
    },

    componentDidMount: function () {
        
    },
    
    render: function () {
        var removeUserHandle = this.removeUserHandler;
        var taskUsersNodes = this.state.taskUsers.map(function (user) {
            return (<TaskUser removeUserHandler={removeUserHandle} key={user.id} userid={user.id} firstName={user.firstName} lastName={user.lastName} emailAddress={user.emailAddress} numberOfTasks={user.numberOfTasks}/>);
        });

        return (
            <ul data-taskusers>
                {taskUsersNodes}
            </ul>
        );
    }
});

var AddTaskForm = React.createClass({

    getInitialState: function() {
        return { taskUsers: [] };
    },

    componentDidMount: function() {
        
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
                        <option>Select User</option>
                        {taskUsersNodes}
                    </select>
                </div>

                <div className="form-group">
                    <label className="control-label">Due Date</label>
                    <input type="date" name="DueOn" placeholder="01/31/2018" className="form-control"/>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </div>
            </form>
        );
    }
});


var CounterWidget = React.createClass({
    getInitialState: function () {
        return {
            widgetName: "Counter Widget",
            count: 0
        };
    },

    componentDidMount: function () {

    },

    render: function() {
        return (
            <div className="countWidget">
                <div className="count">{this.state.count}</div>
                <div className="name">{this.props.widgetName}</div>
            </div>
            );
    }
});



var Task = React.createClass({
    removeTaskHandlerChild: function () {
        console.log("removeTaskHandler CHILD - " + this.props.taskId);
        this.props.removeTaskHandler(this.props.taskId);
    },

    render: function () {
        return (
            <li key={this.props.taskId} data-task data-task-id={this.props.taskId}>
                <div data-remove-task onClick={this.removeTaskHandlerChild}>
                    <i className="fas fa-times-circle"></i>
                </div>

                <div data-task-info>
                    <div data-task-name>
                        {this.props.name}
                    </div>

                    <div data-task-info-list>
                        <ul>
                            <li><span>Status</span> <span>{this.props.status}</span></li>
                            <li><span>Due On</span> <span>{this.props.dueOn}</span></li>
                            <li><span>Assigned To</span> <span>{this.props.assignedTo}</span></li>
                            <li><span>Description</span> <span>{this.props.description}</span></li>
                        </ul>
                    </div>
                </div>
            </li>
        );
    }
});


var TasksList = React.createClass({

    removeTaskHandler: function (taskId) {
        console.log("removeTaskHandler PARENT - " + taskId);

        $.ajax(taskapp.deletetaskurl,
            {
                type: "POST",
                data: {
                    id: taskId
                },
                success: function () {

                }
            });
    },

    getInitialState: function () {
        return { tasks: [] };
    },

    componentDidMount: function () {

    },

    render: function () {
        var removeTaskHandler = this.removeTaskHandler;
        var taskNodes = this.state.tasks.map(function (task) {
            return (<Task removeTaskHandler={removeTaskHandler} key={task.id} taskId={task.id} name={task.taskName} dueOn={task.dueOn} assignedTo={task.assignedToName} description={task.taskDescription} status={task.statusString}/>);
        });

        return (
            <ul data-tasks>
                {taskNodes}
            </ul>
        );
    }
});