import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state ={
            customer_id: '',
            customer_name: '',
            customer_email: '',
            customer_address: '',
            customer_password: '',
            customer_phone: '',

            error_id: false,
            error_email: false,
            error_phone: false,
            is_already_taken_id: null,
            is_already_taken_email: null,
            is_already_taken_phone: null
            
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleEnter = this.onHandleEnter.bind(this);
    }

    onHandleChange(event) {
        // console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onRegister(){
        const listCustomer = {
            customer_id: this.state.customer_id,
            customer_name: this.state.customer_name,
            customer_email: this.state.customer_email,
            customer_address: this.state.customer_address,
            customer_password: this.state.customer_password,
            customer_phone: this.state.customer_phone,
        }
        axios.post('http://127.0.0.1:8000/api/customer', listCustomer)
        .then(res =>{
            if(res != null){
                this.props.history.push('/login');
            }
        }).catch(err =>{
            if(Array.isArray(err.response.data)){
                err.response.data.map((error) =>{
                    console.log(error);
                    toast.error('Lỗi: '+ error);
                })
            }else{
                toast.error(err.response.data);
            }
        })
    }

    onHandleEnter(event){
        if(event.key === "Enter"){
            this.onRegister();
        }
    }
    
    render() {
        return (
            <div className="container">
                <ToastContainer position="top-right" />
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Tạo tài khoản mới</h1>
                                    </div>
                                    <Form className="user">
                                        <FormGroup className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } onBlur={ ()=> {
                                                    if(this.state.customer_id == ""){
                                                        this.setState({error_id: true, is_already_taken_id: null}, ()=> console.log("check rỗng", this.state.error_id));
                                                    }else{
                                                        this.setState({error_id: false});
                                                        axios.get('http://127.0.0.1:8000/api/customer/' + this.state.customer_id)
                                                        .then(response => {
                                                            if(response.data != null){
                                                                this.setState({is_already_taken_id: true}, ()=> console.log("check tồn tại",this.state.is_already_taken_id));
                                                            }
                                                        }).catch(err =>{
                                                            this.setState({is_already_taken_id: false}, ()=> console.log("check chưa",this.state.is_already_taken_id));
                                                        })
                                                    }
                                                } } name="customer_id" id="customer_id" placeholder="Nhập vào tên tài khoản"/>
                                                {
                                                    (this.state.error_id == true) && <span style={{color:'red', fontSize: '13px'}}>Bạn phải nhập tên người dùng</span>
                                                }
                                                {
                                                    (this.state.is_already_taken_id == true) && <span style={{color:'red', fontSize: '13px'}}>Tên tài khoản đã tồn tại</span>
                                                }
                                            </div>
                                            <div className="col-sm-6">
                                                <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } name="customer_name" id="customer_name" placeholder="Nhập tên" />
                                            </div>
                                        </FormGroup>
                                        <div className="form-group">
                                            <Input type="email" className="form-control form-control-user" onChange={ this.onHandleChange } onBlur={ ()=> {
                                                    if(this.state.customer_email == ""){
                                                        this.setState({error_email: true, is_already_taken_email: null});
                                                    }else{
                                                        this.setState({error_email: false});
                                                        axios.get('http://127.0.0.1:8000/api/customer-checkemail/' + this.state.customer_email)
                                                        .then(response => {
                                                            if(response.data != null){
                                                                this.setState({is_already_taken_email: true});
                                                            }
                                                        }).catch(err =>{
                                                            this.setState({is_already_taken_email: false});
                                                        })
                                                    }
                                                } } name="customer_email" id="customer_email" placeholder="Nhập địa chỉ email" />
                                                {
                                                    (this.state.error_email == true) && <span style={{color:'red', fontSize: '13px'}}>Bạn phải nhập địa chỉ email</span>
                                                }
                                                {
                                                    (this.state.is_already_taken_email == true) && <span style={{color:'red', fontSize: '13px'}}>Email đã tồn tại</span>
                                                }
                                        </div>
                                        <div className="form-group">
                                            <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } name="customer_address" id="customer_address" placeholder="Địa chỉ nhận hàng" />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <Input type="text" className="form-control form-control-user" onChange={ this.onHandleChange } onBlur={ ()=> {
                                                    if(this.state.customer_phone == ""){
                                                        this.setState({error_phone: true, is_already_taken_phone: null});
                                                    }else{
                                                        this.setState({error_phone: false});
                                                        axios.get('http://127.0.0.1:8000/api/customer-checkphone/' + this.state.customer_phone)
                                                        .then(response => {
                                                            if(response.data != null){
                                                                this.setState({is_already_taken_phone: true});
                                                            }
                                                        }).catch(err =>{
                                                            this.setState({is_already_taken_phone: false});
                                                        })
                                                    }
                                                } } name="customer_phone" id="customer_phone" placeholder="Nhập vào số điện thoại" />
                                                {
                                                    (this.state.error_phone == true) && <span style={{color:'red', fontSize: '13px'}}>Bạn phải nhập số điện thoại</span>
                                                }
                                                {
                                                    (this.state.is_already_taken_phone == true) && <span style={{color:'red', fontSize: '13px'}}>Số điện thoại đã tồn tại</span>
                                                }
                                            </div>
                                            <div className="col-sm-6">
                                                <Input type="password" className="form-control form-control-user" onChange={ this.onHandleChange } onKeyDown={this.onHandleEnter} name="customer_password" id="customer_password" placeholder="Nhập vào mật khẩu" />
                                            </div>
                                        </div>
                                        <Button className="btn btn-primary btn-user btn-block" onClick={ ()=>this.onRegister() } style={{backgroundColor: "#4e73df"}}> Tạo tài khoản </Button>
                                        <hr />
                                        {/* <a href="index.html" className="btn btn-google btn-user btn-block"> <i className="fab fa-google fa-fw" /> Register with Google </a>
                                        <a href="index.html" className="btn btn-facebook btn-user btn-block"> <i className="fab fa-facebook-f fa-fw" /> Register with Facebook </a> */}
                                    </Form>
                                    <hr />
                                    <div className="text-center">
                                        <Link className="small" to="forgot-password.html" className="btn btn-danger btn-block"  style={{margin: "2px"}}>Quên mật khẩu</Link>
                                    </div>
                                    <div className="text-center">
                                        <Link className="small" to="/login" className="btn btn-success btn-block"  style={{margin: "2px"}}>Đã có tài khoản</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
