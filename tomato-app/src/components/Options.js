import React from "react";
import i18next from 'i18next';

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
    componentWillMount() {
        const { Options } = this.props;
        this.setState(Options);
        this.setLanguage(Options.lang);
    }
    setLanguage(language) {
        i18next.init({
            lng: language,
            resources: require(`../i18/${language}.json`)
        });
        this.props.changeLanguage(i18next);
    }
    render() {
        return <div className="form-scroll"><form onSubmit={this.submit.bind(this)}>
            <div className="form-group ">
                <label>{i18next.t('start_of_day')}</label>
                <input required type="time" min="00:00" max="23:59" className="form-control" defaultValue={this.props.Options.start} name="start" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_time')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('end_of_day')}</label>
                <input required type="time" min="00:00" className="form-control" defaultValue={this.props.Options.end} name="end" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_time')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('pomidoro_length')}</label>
                <input required type="number" min="1" max="60" className="form-control" defaultValue={this.props.Options.interval} name="interval" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_pomidoro_length')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('small_break')}</label>
                <input required type="number" min="1" max="10" className="form-control" defaultValue={this.props.Options.break} name="break" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_pomidoro_small_break_length')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('big_break')}</label>
                <input required type="number" min="5" max="30" className="form-control" defaultValue={this.props.Options.breakLong} name="breakLong" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_pomidoro_big_break_length')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('big_break_at')}</label>
                <input required type="number" min="2" max="10" className="form-control" defaultValue={this.props.Options.breakLongPeriod} name="breakLongPeriod" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_pomidoro_big_break_period')}</div>
            </div>
            <div className="form-group ">
                <label>{i18next.t('lunch_time')}</label>
                <input required type="time" min="00:00" className="form-control" defaultValue={this.props.Options.lunch_from} name="lunch_from" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_time')}</div>
            </div>
            <div className="form-group ">
                <input required type="time" min="00:00" className="form-control" defaultValue={this.props.Options.lunch_to} name="lunch_to" onChange={this.fieldChange.bind(this)} />
                <div className="form-error-text"><span className="icon icon-info-circled"></span>&nbsp;{i18next.t('wrong_time')}</div>
            </div>

            <label>{i18next.t('timer_skin')}</label>
            <select className="form-control" name="skin" onChange={this.fieldChange.bind(this)} defaultValue={this.props.Options.skin ? this.props.Options.skin : 'circle'}>
                <option value='circle'>Circle</option>
                <option value='line'>Line</option>
            </select>
            <br />
            <br />
            <label>{i18next.t('timer_lang')}</label>
            <select className="form-control" name="lang" onChange={this.fieldChange.bind(this)} defaultValue={this.props.Options.lang ? this.props.Options.lang : 'en'}>
                <option value='en'>English</option>
                <option value='ru'>Russian</option>
            </select>
            <br />
            <br />
            <label><input type="checkbox" defaultValue={this.props.Options.simpleTimer} defaultChecked={this.props.Options.simpleTimer} name="simpleTimer" onChange={this.fieldChangeCheckbox.bind(this)} />&nbsp;{i18next.t('simple_mode_label')}</label>

            <div className="form-actions">
                <button className="btn btn-large btn-primary" type="submit">{i18next.t('save')}</button>
            </div>
        </form></div>
    }
}

export default Options;
