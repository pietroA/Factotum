class User extends React.Component{
    render(){
        return(
<div className="container">
    <header>
        <h1>
            Factotum <small>{this.props.current_user.name}</small>     
            <a className="btn btn-xm btn-primary" rel="nofollow" data-method="delete" href="/logout">
                <span className="fa fa-sign-out"></span>
            </a>
        </h1>
    </header>
    <Tasks />
</div>

        );
    }
}