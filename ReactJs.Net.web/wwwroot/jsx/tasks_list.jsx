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