import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as OptionsActions from '../actions/OptionsActions'
import Options from '../components/Options'
// import { Link } from "react-router-dom";
class Home extends React.Component {
    render() {
        return <Options {...this.props}></Options>
    }
}
const mapStateToProps = state => {
    return { Options: state.Options };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(OptionsActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
