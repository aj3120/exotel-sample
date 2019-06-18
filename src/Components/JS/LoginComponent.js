import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {loginAction} from '../../Redux/Actions/loginAction';
import '../CSS/Login.css'
const mapStateToProps = state => {
    return (
        {
            login_loader:state.loginReducer.login_loader,
            login_error:state.loginReducer.login_error
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
            password_field_selected:false,
            error_show:false
        }
    }

    loginAction=()=>{
        if(this.state.form_filled){
            this.props.action.loginAction({username:this.state.username,password:this.state.password})
        }
        else{
            this.setState({error_show:true})
        }
    }

    formValidation=()=>{
        if(this.state.username.length>=4 && this.state.password.length>=4){
            return true
        }
        else{
            return false
        }
        
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
    componentDidMount(){
        window.addEventListener('keydown',(event)=>{
            if(event.key==='Enter')
                this.loginAction()
        })
    }

    render() {
        return (
            <div className="login-page ">
                <div className="login-box col-sm-10 col-md-8 col-lg-6">
                    <div className="header-login">
                        <div className="heading-tag">SIGN IN</div>
                        <img src="/assets/login.jpg" alt="timeline"/>
                    </div>
                    <div className="footer-login">
                        <div className={`error-message ${this.state.error_show?'':'error-message-hide'}`}>Please enter username and password with atleast 4 letters </div>
                        <div className={`error-message ${this.props.login_error?'':'error-message-hide'}`}>Invalid username or password</div>
                        <div className="username-box" >
                            <label className="col-3">Username</label>
                            <input className={`col-8 ${this.state.username_field_selected? 'username-active' : 'username-inactive'}`} id="username" type="text" onChange={this.onFieldChange} onClick={this.onUserFieldSelection} value={this.state.username} placeholder="Enter username"  autoComplete="off"></input>
                        </div>
                        <div className="password-box" >
                            <label className="col-3">Password</label>
                            <input className={`col-8 ${this.state.password_field_selected? 'password-active' : 'password-inactive'}`} id="password" type="password" onChange={this.onFieldChange} onClick={this.onPasswordFieldSelection} value={this.state.password} placeholder="Enter password" ></input>
                        </div>
                        <div className="sign-up">
                            <Link to="/signup">Sign Up</Link>
                        </div>
                        <div className={`login-button ${this.state.form_filled? 'login-active' : 'login-inactive'}`} onClick={this.loginAction}>
                        Login 
                        </div>
                        
                    </div>
                   
                </div>
                <div className={`login-loader ${this.props.login_loader? '' : 'loader-hide'}`}><img src="/assets/loader.gif" alt="loader"/></div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)