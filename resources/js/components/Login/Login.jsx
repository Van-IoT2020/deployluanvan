import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer:[],
            email:'',
            password:'',
            phone:''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    handlePhoneChange(e){
        this.setState({phone:e.target.value})
    }
    signIn(){
        alert('thanh cong');            
    }

    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Menu />
                <Carousels />
            <div className="container">
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <form className="form-signin">
                        <div className="form-group">
                            <h1 className="form-signin-heading"> Đăng Nhập </h1>
                            <div className="form-group">
                                <label> Email address</label>
                                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required />
                            </div>
                            <div className="form-group">
                                <label> Password</label>
                                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button"> Sign in</button>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
                </div>
            </div>
            <span> </span>
                <Footer />
            </div>
        );
    }
}

export default Login;

