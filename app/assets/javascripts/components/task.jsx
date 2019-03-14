class Tasks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks : []
        };
        this.Get = this.Get.bind(this);
        this.Post = this.Post.bind(this);
        this.Put = this.Put.bind(this);
        this.Delete = this.Delete.bind(this);
    }
    componentDidMount(){
        this.Get();
    }
    Get(){
        $.ajax({
            url: '/api/tasks/',
            type: 'GET',
            success: (tasks) => { this.setState({tasks : tasks}); },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    Post(task){
        var tasks = this.state.tasks;
        tasks.push(task);
        this.setState({tasks: tasks});
    }
    Put(task_old, task_new){
        var tasks = this.state.tasks;
        var index = tasks.indexOf(task_old);
        tasks.splice(index, 1, task_new);
        this.setState({tasks: tasks});
    }
    Delete(task){
        var tasks = this.state.tasks;
        var index = tasks.indexOf(task);
        tasks.splice(index, 1);
        this.setState({tasks: tasks});
    }
    render(){
        var tasks = [];
        this.state.tasks.forEach(task => {
            tasks.push(
        <Task   task={task} 
                key={"task-"+task.id} 
                Get={this.Get}
                Put={this.Put} 
                Delete={this.Delete} />
            );
        });
        return(
<article>
    <button onClick={this.Get} className="btn btn-default">Refresh <span className="fa fa-refresh"></span></button>
    <Task Post={this.Post} Get={this.Get} />
    {tasks}
</article>
        );
    }
}

class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            completed: 0,
            start_date: new Date(),
            end_date: new Date(),
            completed_at: '',
            active: true
        }
        this.Post = this.Post.bind(this);
        this.Put = this.Put.bind(this);
        this.Save = this.Save.bind(this);
        this.Delete = this.Delete.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }
    componentDidMount(){
        if(this.props.task){
            this.setState({
                name: this.props.task.name,
                description: this.props.task.description,
                completed: this.props.task.completed,
                start_date: this.props.task.start_date,
                end_date: this.props.task.end_date,
                completed_at: this.props.task.completed_at,
                active: this.props.task.active
            })
        }
    }
    Save(){
        if(this.props.task){
            this.Put();
        } else{
            this.Post();
        }
    }
    Post(){
        $.ajax({
            url: '/api/tasks/',
            type: 'POST',
            data: {
                task : {
                    name : this.state.name,
                    description: this.state.description,
                    completed: this.state.completed,
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    active: this.state.active
                }
            },
            success: (task) => { 
                this.props.Get(); 
                this.setState({
                    name: '',
                    description: '',
                    completed: 0,
                    start_date: new Date(),
                    end_date: new Date(),
                    completed_at: '',
                    active: true
                });
            },
            error: (xhr, errors, status) => { console.log(xhr, errors, status); }
        });
    }
    Put(){
        $.ajax({
            url: '/api/tasks/'+this.props.task.id,
            type: 'PUT',
            data: {
                task : {
                    name : this.state.name,
                    description: this.state.description,
                    completed: this.state.completed,
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    completed_at: this.state.completed_at,
                    active: this.state.active
                }
            },
            success: (task) => { 
                this.props.Get(); 
            },
            error: (xhr, errors, status) => { console.log(xhr, errors, status); }
        });
    }
    Delete(){
        $.ajax({
            url: '/api/tasks/'+this.props.task.id,
            type: 'DELETE',
            success: (task) => { this.props.Get(); },
            error: (xhr, errors, status) => { console.log(xhr, errors, status); }
        });
    }   
    OnChange(e){
        var input_name = e.target.name;
        var value = e.target.value;
        this.setState({ [input_name] : value });
    }
    render(){
        var delete_button = "";
        var completed = "";
        var completed_at = "";
        if(this.props.task){
            delete_button = <button onClick={this.Delete} className="btn btn-default" > Delete <span className="fa fa-trash"></span></button>;
            completed = 
            <div className="field">
                <label htmlFor="completed">Completed: </label>
                <input type="range" name="completed" min="0" max="100" step="1" value={this.state.completed} onChange={this.OnChange} />
            </div>;
            if(this.props.task.completed_at){
                completed_at = 
            <div className="field">
                <label htmlFor="completed_at">Completed at: </label>
                <input type="date" name="completed_at" value={this.state.completed_at} onChange={this.OnChange} />
            </div>;

            }
        }
        var legend = this.props.task ? this.props.task.name : "New Task";
        return(
<div className="form">
    <fieldset>
        <legend>{legend}</legend>
        <div className="field">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="description" className="vertical-top">Description: </label>
            <textarea name="description" rows="4" value={this.state.description} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="start_date">Start Date: </label>
            <input type="date" name="start_date" value={this.state.start_date} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="end_date">End Date: </label>
            <input type="date" name="end_date" value={this.state.end_date} onChange={this.OnChange} />
        </div>
        {completed_at}
        {completed}
        <div className="button-list">
            <button onClick={this.Save} className="btn btn-default" >
                Save <span className="fa fa-save"></span>
            </button>
            {delete_button}
        </div>

    </fieldset>
</div>
        );
    }
}