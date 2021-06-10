import { event } from 'jquery';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
class Account extends Component {
    constructor(){
        super();
        this.state={
            isRedirect:false,
            txtName:null,
            txtEmail:null,
            txtPassword:null,
            txtPhone:null
        }
    }
    submitForm=(event)=>{
        event.preventDefault()
        event.target.reset()
        this.setState({
            isRedirect:true
        });
        const content='';
        content += 'Ho ten: '+ this.state.txtName;
        content += 'Email: '+ this.state.txtEmail;
        content += 'Password: '+ this.state.txtPassword;
        content += 'Phone: '+ this.state.txtPhone;
    }
    render() {
        if(this.state.isRedirect){
            return(
                <Redirect to="/" />
            )
        }
        return (
            <div>
                
            </div>
        );
    }
}

export default Account;
