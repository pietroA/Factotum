class DiceRoller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dice_pool : [],
            total : 0
        };
        this.Add = this.Add.bind(this);
        this.AddNew = this.AddNew.bind(this);
        this.Remove = this.Remove.bind(this);
    }
    Add(dice){
        var dice_pool = this.state.dice_pool;
        dice_pool.push(dice);
        var total = dice_pool.reduce((sum, dice) => { return sum +dice.total; }, 0);
        this.setState({dice_pool: dice_pool, total:total});
    }
    AddNew(dice){
        var dice_pool = [];
        dice_pool.push(dice);
        var total = dice_pool.reduce((sum, dice) => { return sum +dice.total; }, 0);
        this.setState({dice_pool: dice_pool, total:total});
    }
    Remove(dice){
        var dice_pool = this.state.dice_pool;
        var index = dice_pool.indexOf(dice);
        dice_pool.splice(index, 1);
        var total = dice_pool.reduce((sum, dice) => { return sum +dice.total; }, 0);
        this.setState({dice_pool: dice_pool, total:total});
    }
    render(){
        var dice_pool = [];
        var counter = 0;
        this.state.dice_pool.forEach(dice => {
            counter++;
            dice_pool.push(<Dice key={"result-"+counter} dice={dice} Remove={this.Remove} />);
        });
        return(
<div className="dice-roller">

<header><h1>Tira Dadi</h1></header>
    <article>
        <p>Tira i tuoi dadi ovunque sei</p>
        <ul>
            <li>Imposta la quantità e il numero di facce dei tuoi dadi</li>
            <li>Se vuoi puoi aggiungere un bonus ad ogni dado oppure al totale</li>
            <li>Clicca per sommare ai tiri già effettuati o per fare un nuovo tiro di dadi</li>
        </ul>
    </article>
    <DiceRollerForm Add={this.Add} AddNew={this.AddNew} />
    <div className="result">
        <h4>Totale: {this.state.total}</h4>
        <ul className="list-group">
            {dice_pool}
        </ul>
    </div>
</div>
        );
    }
}

class DiceRollerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quantity : 1,
            faces : 6,
            bonus : 0,
            bonus_tot : 0,
            results : [],
            total: 0
        };
        this.Add = this.Add.bind(this);
        this.AddNew = this.AddNew.bind(this);
        this.Calculate = this.Calculate.bind(this);
        this.OnChange = this.OnChange.bind(this);
    }
    Add(){
        var dice = this.Calculate();
        this.props.Add(dice);
    }
    AddNew(){
        var dice = this.Calculate();
        this.props.AddNew(dice);
    }
    Calculate(){
        var dice = this.state;
        var results = [];


        for(var i = 0; i < dice.quantity; i++) {
            var result = getRandomNumber(1, dice.faces)
            //console.log(result);
            results.push( result+ dice.bonus);
        }
        //console.log(results);
        var total = results.reduce((a, b) => {return a + b; }, dice.bonus_tot);
        this.setState({results: results, total:total});

        dice.results = results;
        dice.total = total;
        //console.log(dice);
        return dice
    }
    OnChange(e){
        var name = e.target.name;
        var value = parseInt(e.target.value);
        this.setState({[name]: value});
    }
    render(){
        return(
        <form>
            <fieldset>
                <legend>Dado:</legend>
                <input type="number" 
                        id="quantity" 
                        min="1"
                        name="quantity"
                        className="small-input"
                        value={this.state.quantity}
                        onChange={this.OnChange}  />
                d
                <input type="number" 
                        id="faces" 
                        min="1"
                        name="faces"
                        className="small-input"
                        value={this.state.faces}
                        onChange={this.OnChange} />    
            </fieldset>
            <fieldset>
                <legend>Bonus:</legend>
                <label >Per singolo dado:</label>
                <input type="number" 
                        id="bonus" 
                        name="bonus"
                        className="small-input"
                        min="0"
                        value={this.state.bonus}
                        onChange={this.OnChange}  />
                <br />
                <label >Al totale:</label>
                <input type="number" 
                        id="bonus_tot" 
                        name="bonus_tot"
                        className="small-input"
                        value={this.state.bonus_tot}
                        onChange={this.OnChange} />    
            </fieldset>
            <button type="button" onClick={this.Add} >Aggiungi</button>
            <button type="button" onClick={this.AddNew} >Nuovo</button>
            <button type="reset" >Reset</button>
        </form>
        );
    }
}

class Dice extends React.Component{
    constructor(props){
        super(props);
        this.Remove = this.Remove.bind(this);
        this.Description = this.Description.bind(this);
        this.ResultsString = this.ResultsString.bind(this);
    }
    Remove(e){
        e.preventDefault();
        this.props.Remove(this.props.dice);
    }
    Description(){
        var dice = this.props.dice;
        var sign_bonus = dice.bonus < 0 ? '-' : '+';
        var sign_total = dice.bonus_tot < 0 ? '-' : '+';
        return "( "+dice.quantity + " d " + dice.faces + " "+sign_bonus+" "+dice.bonus+" ) "+sign_total+" "+dice.bonus_tot;
    }
    ResultsString(){
        var dice = this.props.dice;
        var sign_total = dice.bonus_tot < 0 ? '-' : '+';
        
        return  dice.results.join("+") + " " + sign_total + dice.bonus_tot + " = " + dice.total;
    }
    render(){
        return(
<li className="list-group-item">
    { this.Description() } = { this.ResultsString() }
    <a href="" onClick={this.Remove} className="right-button"><span className="fa fa-times"></span></a>
</li>
        );
    }
}