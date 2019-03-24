class User extends React.Component{
    render(){
        var page = '';
        if(this.props.page == "home"){
            page = <UserHome />;
        }
        if(this.props.page == "task")
        {
            page = <Tasks />;
        }
        if(this.props.page == 'time_units'){
            page = <UnitTimeCalculator />;
        }
        if(this.props.page == 'dice_roller'){
            page = <DiceRoller />
        }
        if(this.props.page == 'site_functions'){
            page = <SiteFunctions />;
        }

        return(
<div className="container">
    <header>
        <h1>
            Factotum <small>{this.props.current_user.name}</small>     
            <a className="right-button" rel="nofollow" data-method="delete" href="/logout">
                <span className="fa fa-sign-out"></span>
            </a>
        </h1>
    </header>
    {page}
</div>
        );
    }
}

class UserHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_functions : [],
            site_functions : [],
        };
        this.Load = this.Load.bind(this);
        this.GetUserFuncs = this.GetUserFuncs.bind(this);
        this.GetSiteFuncs = this.GetSiteFuncs.bind(this);
    }
    componentDidMount(){
        this.Load();
    }
    Load(){
        this.GetSiteFuncs();
        this.GetUserFuncs();
    }
    GetSiteFuncs(){
        $.ajax({
            url: '/api/site_functions/',
            type: 'GET',
            success: (site_functions) => { this.setState({site_functions: site_functions}); },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    GetUserFuncs(){
        $.ajax({
            url: '/api/user_functions/',
            type: 'GET',
            success: (user_functions) => { this.setState({user_functions: user_functions}); },
            error: (xhr, error, status) => { console.log(xhr, error, status); }
        });
    }
    render(){
        return(
<div>
  <ul className="nav nav-tabs" role="tablist">
    <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    <li role="presentation"><a href="#add-functions" aria-controls="add-functions" role="tab" data-toggle="tab">Shop</a></li>
  </ul>

  <div className="tab-content">
    <div role="tabpanel" className="tab-pane active" id="home">
        <UserFunctions user_functions={this.state.user_functions} />
    </div>
    <div role="tabpanel" className="tab-pane" id="add-functions">
        <UserFunctionForms site_functions={this.state.site_functions} user_functions={this.state.user_functions} Reload={this.Load} />
    </div>
  </div>
</div>            
        );        
    }
}

/*

class UserHome extends React.Component{
    render(){
        return(
<div className="functions-list">
    <a href="/tasks">
        <h4>Tasks</h4>
        <p>La tua lista delle scadenze giornaliere</p>
    </a>
    <a href="/time_units">
        <h4>Convertitore a unità di tempo</h4>
        <p>Questa semplice funzione parte da ora di inizio e fine per calcolare le ore giornaliere di lavoro in unità</p>
    </a>
    <a href="/dice_rolls">
        <h4>Tira Dadi</h4>
        <p>Tira i tuoi dadi ovunque vuoi</p>
    </a>
    <a href="/color_picker">
        <h4>Colourful</h4>
        <p>Non sai che colore impostare come sfondo o testo? Seleziona un colore, applica e guarda te stesso</p>
    </a>
</div>

        );
    }
}
*/