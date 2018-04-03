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