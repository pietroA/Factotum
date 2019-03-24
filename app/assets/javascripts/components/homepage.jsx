class HomePage extends React.Component{
    render(){
        if(this.props.current_user){
            return <User current_user={this.props.current_user} page={this.props.page} />
        } else{
            return(
<article className="text-center" className="home-page">
    <h1>Factotum</h1>
    <a className="btn btn-lg btn-primary" href="/login">Accedi</a>
    <a className="btn btn-lg btn-primary" href="/signup">Registrati</a>
</article>
            );
        }
    }
}