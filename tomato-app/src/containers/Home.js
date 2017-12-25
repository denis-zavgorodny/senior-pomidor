import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeScreen from '../components/HomeScreen';
import * as HomeActions from '../actions/HomeActions';
// import { Link } from "react-router-dom";
class Home extends React.Component {
    render() {
        return <HomeScreen {...this.props} />
    }
}
const mapStateToProps = state => ({ Timer: state.Timer });
const mapDispatchToProps = (dispatch) => bindActionCreators(HomeActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
