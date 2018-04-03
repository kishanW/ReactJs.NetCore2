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