import React from "react";

class Options extends React.Component {
    submit(e) {
        this.props.save(this.state);
        e.preventDefault();
    }
    fieldChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    fieldChangeCheckbox(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }
    componentDidMount() {
        const { Options } = this.props;
        this.setState(Options);
    }
    render() {
        return <div className="form-scroll"><form onSubmit={this.submit.bind(this)}>
            <div className="form-group ">
                <label>Начало рбочего дня</label>
                <input className="form-control" defaultValue={this.props.Options.start} name="start" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Конец рбочего дня</label>
                <input className="form-control" defaultValue={this.props.Options.end} name="end" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Длина помидорки</label>
                <input className="form-control" defaultValue={this.props.Options.interval} name="interval" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Малый перерыв</label>
                <input className="form-control" defaultValue={this.props.Options.break} name="break" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Большой перерыв</label>
                <input className="form-control" defaultValue={this.props.Options.breakLong} name="breakLong" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Большой перерыв каждые</label>
                <input className="form-control" defaultValue={this.props.Options.breakLongPeriod} name="breakLongPeriod" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <label>Перерыв на обед</label>
                <input className="form-control" defaultValue={this.props.Options.lunch_from} name="lunch_from" onChange={this.fieldChange.bind(this)} />
            </div>
            <div className="form-group ">
                <input className="form-control" defaultValue={this.props.Options.lunch_to} name="lunch_to" onChange={this.fieldChange.bind(this)} />
            </div>

            {/*<div className="checkbox">
                <label><input type="checkbox" defaultValue={this.props.Options.simpleTimer} defaultChecked={this.props.Options.simpleTimer} name="simpleTimer" onChange={this.fieldChangeCheckbox.bind(this)} />
                Режим простого таймера?</label>
            </div>*/}

            <label>Внешний вид таймера</label>
            <select className="form-control" name="skin" onChange={this.fieldChange.bind(this)} defaultValue={this.props.Options.skin ? this.props.Options.skin : 'circle'}>
                <option value='circle'>Circle</option>
                <option value='line'>Line</option>
            </select>
            <br />
            <br />

            <div className="form-actions">
                <button className="btn btn-large btn-primary" type="submit">Сохранить</button>
            </div>
        </form></div>
    }
}

export default Options;
