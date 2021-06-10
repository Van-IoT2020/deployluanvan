import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import './Register.css';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                customer_id: "",
                customer_name: "",
                customer_email: "",
                customer_password: "",
                customer_phone: "",
                isLoading: "",
            },
            msg: "",
        }
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChangehandler(e, key){
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData });
      };
      onSubmitHandler(e){
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
          .post("http://localhost:8000/api/signup", this.state.signupData)
          .then((response) => {
            this.setState({ isLoading: false });
            if (response.data.status === 200) {
              this.setState({
                msg: response.data.message,
                signupData: {
                    customer_id: "",
                    customer_name: "",
                    customer_email: "",
                    customer_password: "",
                    customer_phone: "",
                },
              });
              setTimeout(() => {
                this.setState({ msg: "" });
              }, 2000);
            }
            if (response.data.status === "failed") {
              this.setState({ msg: response.data.message });
              setTimeout(() => {
                this.setState({ msg: "" });
              }, 2000);
            }
          });
      };
    render() {
        const isLoading = this.state.isLoading;
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Menu />
                <Carousels />
                <div className="form-group">
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>     
                        <div className="col-xs-5 col-sm-4 col-md-4 col-lg-4">
                            <Form>
                            <h2 className="form-signin-heading">Đăng Ký</h2>
                            <FormGroup>
                                <Label for="customer_id">ID</Label>
                                <Input
                                type="customer_id"
                                name="customer_id"
                                placeholder="ID bắt đầu: KHhoten viết tắt (VD: KHltlk; Tên KH: Lê Thị Lệ Kiều)"
                                value={this.state.signupData.customer_id}
                                onChange={this.onChangehandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="customer_name">Name</Label>
                                <Input
                                type="customer_name"
                                name="customer_name"
                                placeholder="Nhập Họ Tên..."
                                value={this.state.signupData.customer_name}
                                onChange={this.onChangehandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="customer_email">Email id</Label>
                                <Input
                                type="email"
                                name="customer_email"
                                placeholder="Nhập Email..."
                                value={this.state.signupData.customer_email}
                                onChange={this.onChangehandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="customer_password">Password</Label>
                                <Input
                                type="password"
                                name="customer_password"
                                placeholder="Nhập Password..."
                                value={this.state.signupData.customer_password}
                                onChange={this.onChangehandler}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="customer_phone">Phone Number</Label>
                                <Input
                                type="phone"
                                name="customer_phone"
                                placeholder="Nhập số điện thoại..."
                                value={this.state.signupData.customer_phone}
                                onChange={this.onChangehandler}
                                />
                            </FormGroup>
                            <p className="text-white">{this.state.msg}</p>
                            <Button
                                className="text-center mb-4"
                                color="success"
                                onClick={this.onSubmitHandler}
                            >
                                Sign Up
                                {isLoading ? (
                                <span
                                    className="spinner-border spinner-border-sm ml-5"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                ) : (
                                <span></span>
                                )}
                            </Button>
                            <Link to="/sign-in" className="text-white ml-5">I'm already member</Link>
                            </Form>
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

export default Register;
