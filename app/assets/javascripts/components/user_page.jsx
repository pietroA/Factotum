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