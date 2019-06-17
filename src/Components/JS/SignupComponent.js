import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signupAction} from '../../Redux/Actions/signupAction';
import '../CSS/Login.css'
const mapStateToProps = state => {
    return (
        {
        }
    )
}
const mapDispatchToProps = dispatch => {
    return {
        action: bindActionCreators({ signupAction }, dispatch)
    };
};
class Signup extends Component {
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

    signupAction=()=>{
        if(this.state.form_filled){
            this.props.action.signupAction({username:this.state.username,password:this.state.password})
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
            <div className="signup-page ">
                <div className="signup-box col-sm-10 col-md-8 col-lg-6">
                    <div className={`username-box ${this.state.username_field_selected? 'username-active' : 'username-inactive'}`} >
                        <span className="col-1"><FontAwesomeIcon icon="user" /></span>
                        <input className="col-11" id="username" type="text" onChange={this.onFieldChange} onClick={this.onUserFieldSelection} value={this.state.username} placeholder="Enter username"  autoComplete="off"></input>
                    </div>
                    <div className={`password-box ${this.state.password_field_selected? 'password-active' : 'password-inactive'}`} >
                    <span className="col-1"><FontAwesomeIcon icon="lock" /></span>
                        <input className="col-11" id="password" type="password" onChange={this.onFieldChange} onClick={this.onPasswordFieldSelection} value={this.state.password} placeholder="Enter password" ></input>
                    </div>
                    <div className={`signup-button ${this.state.form_filled? 'signup-active' : 'signup-inactive'}`} onClick={this.signupAction}>
                       Sign Up 
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)