import React, { Component } from 'react';
import Login from './Components/JS/LoginComponent';
import Dashboard from './Components/JS/DashboardComponent';
import SpreadSheet from './Components/JS/SpreadSheetComponent';
import Signup from './Components/JS/SignupComponent';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch,Redirect } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faUser,faLock,faCaretDown)
const mapStateToProps = (state) => {
  return ({
    loggedIn: state.loginReducer.loggedInStatus,
    signup_success:state.loginReducer.signup_success
  })
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path="/dashboard" render={() => (this.props.loggedIn ? (
            <Dashboard />):
            (<Login />)
          )} />
          <Route path="/login" render={() => (this.props.loggedIn ? (
            <Redirect to="/dashboard" />):
            (<Login />)
          )} />
          <Route exact path="/" render={() => (this.props.loggedIn ? (
            <Redirect to="/dashboard" />) :
            (<Login />)
          )} />
          <Route path="/spreadsheet/:id" component={SpreadSheet}/>
          <Route path="/signup" render={() => (this.props.signup_success ? (
            <Login  />) :
            (<Signup />)
          )} />
        </Switch>
      </div>
    );
  }
}
export default connect(mapStateToProps, null)(App);
