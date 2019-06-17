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
    loggedIn: state.loginReducer.loggedInStatus
  })
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route exact path="/" render={() => (this.props.loggedIn ? (
            <Redirect to="/dashboard" />) :
            (<Login />)
          )} />
          <Route path="/spreadsheet/:id" component={SpreadSheet}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </div>
    );
  }
}
export default connect(mapStateToProps, null)(App);
