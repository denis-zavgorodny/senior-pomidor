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
        return <form onSubmit={this.submit.bind(this)}>
            <label>Рабочий день
                с <input defaultValue={this.props.Options.start} name="start" onChange={this.fieldChange.bind(this)} />
                по <input defaultValue={this.props.Options.end} name="end" onChange={this.fieldChange.bind(this)} />
            </label>
            <br />
            <label>Длина помидорки <input defaultValue={this.props.Options.interval} name="interval" onChange={this.fieldChange.bind(this)} /></label>
            <br />
            <label>Малый перерыв <input defaultValue={this.props.Options.break} name="break" onChange={this.fieldChange.bind(this)} /></label>
            <br />
            <label>Большой перерыв <input defaultValue={this.props.Options.breakLong} name="breakLong" onChange={this.fieldChange.bind(this)} /></label>

            <br />
            <label>Перерыв на обед
                с <input defaultValue={this.props.Options.lunch_from} name="lunch_from" onChange={this.fieldChange.bind(this)} />
                по <input defaultValue={this.props.Options.lunch_to} name="lunch_to" onChange={this.fieldChange.bind(this)} />
            </label>

            <br />
            <label><input type="checkbox" defaultValue={this.props.Options.simpleTimer} defaultChecked={this.props.Options.simpleTimer} name="simpleTimer" onChange={this.fieldChangeCheckbox.bind(this)}/>Режим простого таймера?</label>
            <br />
            <br />
            <button type="submit">Сохранить</button>
        </form>
    }
}

export default Options;
