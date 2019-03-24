class SiteFunctions extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            site_functions : []
        };
        this.Load = this.Load.bind(this);
    }
    componentDidMount(){
        this.Load();
    }
    Load(){
        $.ajax({
            url: '/api/site_functions/',
            type: 'GET',
            success: (site_functions) => { this.setState( { site_functions: site_functions }); },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    render(){
        var site_functions = [];
        this.state.site_functions.forEach(site_function => {
            site_functions.push(
                <SiteFunction key={"site-function-"+site_function.id } site_function={site_function} Reload={this.Load} />
            );
        })

        return(
<div className="site-functions">

<header><h1>Gestione Funzioni</h1></header>
    <SiteFunctionForm Reload={this.Load} />
    <div>
        <h4>Funzioni Presenti</h4>
        <ul className="list-group">
            {site_functions}
        </ul>
    </div>
</div>
        );
    }
}

class SiteFunctionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            description : '',
            url : '',
            admin: false
        };
        this.Post = this.Post.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }
    Post(){
        var site_function = this.state;
        $.ajax({
            url : '/api/site_functions/',
            type : 'POST',
            data : {
                site_function : site_function
            },
            success : (site_function) => { 
                this.props.Reload();
            },
            error : (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    OnChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name] : value});
    }
    render(){
        return(
<form>
    <fieldset>
        <legend>Nuova Funzione</legend>
        <div className="field">
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" value={this.state.name} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="url">Url</label>
            <input type="text" name="url" id="url" value={this.state.url} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="admin">Admin</label>
            <input type="checkbox" name="admin" id="admin" value={this.state.admin} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="description">Descrizione</label>
            <textarea name="description" id="description" value={this.state.description} onChange={this.OnChange}></textarea>
        </div>
        <div className="field">
            <button type="button" onClick={this.Post}>Salva</button>
            <button type="reset">Reset</button>
        </div>
    </fieldset>
</form>
        );
    }
}

class SiteFunction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.site_function.name,
            description : this.props.site_function.description,
            url : this.props.site_function.url,
            admin: this.props.site_function.admin
        };
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }
    Delete(){
        $.ajax({
            url: '/api/site_functions/'+this.props.site_function.id,
            type: 'DELETE',
            success: () => { this.props.Reload(); },
            errror: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    Update(){
        var site_function = this.state;
        $.ajax({
            url: '/api/site_functions/'+this.props.site_function.id,
            type: 'PUT',
            data: {
                site_function : site_function
            },
            success: (site_function) => {
                this.props.Reload();
            },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    OnChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name] : value});
    }
    render(){
        return(
<form>
    <fieldset>
    <div className="field">
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" value={this.state.name} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="url">Url</label>
            <input type="text" name="url" id="url" value={this.state.url} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="admin">Admin</label>
            <input type="checkbox" name="admin" id="admin" value={this.state.admin} onChange={this.OnChange} />
        </div>
        <div className="field">
            <label htmlFor="description">Descrizione</label>
            <textarea name="description" id="description" value={this.state.description} onChange={this.OnChange}></textarea>
        </div>
        <div className="field">
            <button type="button" onClick={this.Update}>Salva</button>
            <button type="button" onClick={this.Delete}>Elimina</button>
            <button type="reset" >Reset</button>
        </div>
    </fieldset>
</form>
        );
    }
}
