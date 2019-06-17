import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {loginAction} from '../../Redux/Actions/loginAction';
import '../CSS/Login.css'
const mapStateToProps = state => {
    return (
        {
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({ loginAction }, dispatch)
    };
};
class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            form_filled:false,
            username:'',
            password:'',
            username_field_selected:false,
            password_field_selected:false
        }
    }

    loginAction=()=>{
        if(this.state.form_filled){
            this.props.action.loginAction({username:this.state.username,password:this.state.password})
        }
    }

    formValidation=()=>{
        if(this.state.username.length>4 && this.state.password.length>4){
            return true
        }
        return false
    }

    onFieldChange=(event)=>{     
        this.setState({[event.target.id]:event.target.value,form_filled:this.formValidation()})
    }
    
    onUserFieldSelection=()=>{
        this.setState({username_field_selected:true,password_field_selected:false})
    }

    onPasswordFieldSelection=()=>{
        this.setState({username_field_selected:false,password_field_selected:true})
    }

    render() {
        return (
            <div className="login-page ">
                <div className="login-box col-sm-10 col-md-8 col-lg-6">
                    <div className={`username-box ${this.state.username_field_selected? 'username-active' : 'username-inactive'}`} >
                        <span className="col-1"><FontAwesomeIcon icon="user" /></span>
                        <input className="col-11" id="username" type="text" onChange={this.onFieldChange} onClick={this.onUserFieldSelection} value={this.state.username} placeholder="Enter username"  autoComplete="off"></input>
                    </div>
                    <div className={`password-box ${this.state.password_field_selected? 'password-active' : 'password-inactive'}`} >
                    <span className="col-1"><FontAwesomeIcon icon="lock" /></span>
                        <input className="col-11" id="password" type="password" onChange={this.onFieldChange} onClick={this.onPasswordFieldSelection} value={this.state.password} placeholder="Enter password" ></input>
                    </div>
                    <div className={`login-button ${this.state.form_filled? 'login-active' : 'login-inactive'}`} onClick={this.loginAction}>
                       Login 
                    </div>
                    <div className="sign-up">
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)