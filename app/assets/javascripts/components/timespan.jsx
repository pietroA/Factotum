class UnitTimeCalculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time_spans : [],
            total : 0
        };
        this.Add = this.Add.bind(this);
        this.AddNew = this.AddNew.bind(this);
        this.Remove = this.Remove.bind(this);
    }
    Add(time_span){
        var time_spans = this.state.time_spans;
        time_spans.push(time_span);
        var units = time_spans.reduce(
            (sum, time_span) => { 
                return sum + time_span.units
            }, 
            0);
        this.setState({time_spans: time_spans, total: units});
    }
    AddNew(time_span){
        //this.setState({total:0});
        var time_spans = [];
        time_spans.push(time_span);
        var units = time_spans.reduce(
            (sum, time_span) => { 
                return sum + time_span.units
            }, 
            0);
        this.setState({time_spans: time_spans, total: units});
    }
    Remove(time_span){
        var time_spans = this.state.time_spans;
        var index = time_spans.indexOf(time_span);
        time_spans.splice(index, 1);
        var units = time_spans.reduce((sum, time_span) => { return sum + time_span.units}, 0);
        this.setState({time_spans: time_spans, total: units});
    }
    render(){
        var time_spans = [];
        var counter = 0;
        this.state.time_spans.forEach((time_span) => {
            counter++;
            time_spans.push(<TimeSpan key={'result-'+counter} time_span={time_span} Remove={this.Remove}/>);
        });

        return(
<div className="unit-time-calculator">
<header><h1>Time Calculator</h1></header>
    <article>
        <p>Questa funzione prende un orario di inizio e un orario di fine per calcolare le tue ore al giorno in unità</p>
        <ul>
            <li>Inserisci le tue normali ore al giorno</li>
            <li>Digita i minuti effettivi della tua pausa pranzo</li>
            <li>Digita ore e minuti di inizio</li>
            <li>Digita ore e minuti di fine</li>
            <li>Clicca su "Nuovo" per un nuovo calcolo o "Aggiungi" per aggiungere le unità calcolate al totale</li>
        </ul>
        <UnitTimeForm Add={this.Add} AddNew={this.AddNew}/>
        <div className="result">
            <h4>Totale: {this.state.total}</h4>
            <ul className="list-group">
                {time_spans}
            </ul>
        </div>
    </article>
</div>

        );
    }
}

class UnitTimeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hour_per_day: 8,
            start_hour : 0,
            start_minute: 0,
            end_hour : 0,
            end_minute: 0,
            lunch_time: 0,
            units : 0
        };
        this.Add = this.Add.bind(this);
        this.AddNew = this.AddNew.bind(this);
        this.OnChange = this.OnChange.bind(this);
        this.Calculate = this.Calculate.bind(this);
    }
    Add(){
        var units = this.Calculate();
        var time_span = this.state;
        time_span.units = units;
        this.props.Add(time_span);
    }
    AddNew(){
        var units = this.Calculate();
        var time_span = this.state;
        time_span.units = units;
        this.props.AddNew(time_span);
    }
    OnChange(e){
        var name = e.target.name;
        var value = parseInt(e.target.value);
        this.setState({[name] : value});
    }
    Calculate(){
        console.log(this.state.end_hour, this.state.end_minute, this.state.start_hour, this.state.start_minute, this.state.lunch_time, this.state.hour_per_day);
        var end = parseFloat(this.state.end_hour) + parseFloat((this.state.end_minute == 0 ? 0 : (this.state.end_minute / 60)));
        var start = parseFloat(this.state.start_hour) + parseFloat((this.state.start_minute == 0 ? 0 : (this.state.start_minute / 60)));
        var difference = end - start - parseFloat((this.state.lunch_time == 0 ? 0 : this.state.lunch_time / 60));
        var units = (1 /parseInt(this.state.hour_per_day)) * difference;
        console.log(end, start, difference, units);
        this.setState({units: units});
        return units;
    }
    render(){
return(
    <form>
        <label htmlFor="hour_per_day">Ore al giorno: </label>
        <input type="number" 
                id="hour_per_day" 
                name="hour_per_day" 
                className="small-input"
                value={this.state.hour_per_day}
                onChange={this.OnChange} /><br />
        <label htmlFor="lunch">Minuti per il pranzo</label>
        <input type="number" 
                id="lunch_time" 
                name="lunch_time" 
                className="small-input"
                value={this.state.lunch_time} 
                onChange={this.OnChange} />
        <fieldset>
            <legend >Inizio:</legend>
            <input type="number" 
                    id="start_hour" 
                    name="start_hour" 
                    min="0" max="23"
                    className="small-input"
                    value={this.state.start_hour} 
                    onChange={this.OnChange} />
            :
            <input type="number" 
                    id="start_minute" 
                    name="start_minute" 
                    min="0" max="59"
                    className="small-input"
                    value={this.state.start_minute}
                    onChange={this.OnChange} />    
        </fieldset>
        <fieldset>
            <legend>Fine:</legend>
            <input type="number" 
                    id="end_hour" 
                    name="end_hour" 
                    className="small-input"
                    min="0" max="23"
                    value={this.state.end_hour} 
                    onChange={this.OnChange} />
            :
            <input type="number" 
                    id="end_minute" 
                    name="end_minute" 
                    min="0" max="59"
                    className="small-input"
                    value={this.state.end_minute}
                    onChange={this.OnChange} />    
        </fieldset>
        <button type="button" onClick={this.AddNew} >Nuovo</button>
        <button type="button" onClick={this.Add} >Aggiungi</button>
        <button type="reset" >Reset</button>
    </form>
    );
    }
}

class TimeSpan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            units : 0
        };
        this.Remove = this.Remove.bind(this);
        //this.Calculate = this.Calculate.bind(this);
        this.GetTwoDigits = this.GetTwoDigits.bind(this);
    }
    // componentDidMount(){
    //     this.Calculate();
    // }
    // Calculate(){
    //     var time_span = this.props.time_span;
    //     var end = time_span.end_hour + (time_span.end_minute == 0 ? 0 : (time_span.end_minute / 60));
    //     var start = time_span.start_hour + (time_span.start_minute == 0 ? 0 : (time_span.start_minute / 60));
    //     var difference = end - start - (time_span.lunch_time == 0 ? 0 : time_span.lunch_time / 60);
    //     var units = (1 /time_span.hour_per_day) * difference;
    //     this.setState({units: units});
    //     this.props.ChangeTot(units);
    // }
    Remove(e){
        e.preventDefault();
        this.props.Remove(this.props.time_span)
    }
    GetTwoDigits(value){
        return value > 9 ? value :'0'+value;
    }
    render(){
        var time_span = this.props.time_span;
return(
<li className="list-group-item" >
    Da {this.GetTwoDigits(time_span.start_hour)}:{this.GetTwoDigits(time_span.start_minute)} A {this.GetTwoDigits(time_span.end_hour)}:{this.GetTwoDigits(time_span.end_minute)} Con {time_span.lunch_time} minuti di pausa pranzo: {time_span.units}
    <a href="" onClick={this.Remove} className="right-button"><span className="fa fa-times"></span></a>
</li>
    );
    }
}
