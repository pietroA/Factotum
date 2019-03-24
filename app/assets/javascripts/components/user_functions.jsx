class UserFunctions extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var user_functions = [];
        this.props.user_functions.forEach(user_function => {
            user_functions.push(<UserFunction key={"user-function-"+user_function.id} user_function={user_function} />);
        });
        return(
<div className="functions-list">
    {user_functions}
</div>
        );
    }
}

class UserFunction extends React.Component{
    render(){
        var site_function = this.props.user_function.site_function;
        return(
<a href={site_function.url} className="function-item" >
    <h4>{site_function.name}</h4>
    <p>{site_function.description}</p>
</a>
        );
    }
}

class UserFunctionForms extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var site_functions = [];
        this.props.site_functions.forEach(site_function => {
            var user_function = this.props.user_functions.find( user_function => site_function.id == user_function.site_function_id )
            site_functions.push(<UserFunctionForm key={"site-function-"+site_function.id}
                                    site_function={site_function} 
                                    user_function={user_function} 
                                    Reload={this.props.Reload} /> );
        });
        return(
<div className="functions-list">
    {site_functions}
</div>
        );        
    }
}
class UserFunctionForm extends React.Component{
    constructor(props){
        super(props);
        this.Toggle = this.Toggle.bind(this);
        this.Post = this.Post.bind(this);
        this.Delete = this.Delete.bind(this);
    }
    Toggle(e){
        e.preventDefault();
        if(this.props.user_function){
            this.Delete();
        } else {
            this.Post();
        }
    }
    Delete(){
        $.ajax({
            url : '/api/user_functions/'+this.props.user_function.id,
            type: 'DELETE',
            success: () => { 
                UnsetMenuItem(this.props.site_function)
                this.props.Reload(); 
            },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        })
    }
    Post(){
        $.ajax({
            url : '/api/user_functions/',
            type: 'POST',
            data: {
                user_function: {
                    site_function_id : this.props.site_function.id
                }
            },
            success: (user_function) => { 
                SetMenuItem(this.props.site_function)
                //console.log(user_function);
                this.props.Reload(); 
            },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        })
    }
    render(){
        var toggle_button = <a href="" onClick={this.Toggle} className="function-toggle-button">
                                <span className={"fa "+"fa-"+(this.props.user_function ? 'check-' : '')+"square-o"}></span>
                            </a>;
        return(
<div className="function-item">
    <h4>
    {this.props.site_function.name} {toggle_button}
    </h4>
    <p>{this.props.site_function.description}</p>
</div>
        );
    }

}