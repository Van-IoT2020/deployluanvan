import axios from 'axios';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default class AddSlide extends Component {
    constructor(props) {
        super(props);
        this.state={
            slide_name: '',
            slide_desc: '',
            slide_status: '',
            slide_image: '',
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(){
        const listSlide = {
            slide_name: this.state.slide_name,
            slide_desc: this.state.slide_desc,
            slide_status: this.state.slide_status,
            slide_image: this.state.slide_image
        }
        axios.post('http://127.0.0.1:8000/api/slide/', listSlide)
        .then(res =>{
            if(res != null){
                return this.props.history.push('/admin/home/slide')
            }
        })
        .catch(err =>{
            err.response.data.map((error) =>{
                console.log(error);
                toast.error('Lỗi: '+ error);
            })
        })
    }
    
    render() {
        return (
            <div id="page-top">
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandName" className="mr-sm-2">Tên banner</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="slide_name" id="slide_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Mô tả</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="slide_desc" id="slide_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandDesc" className="mr-sm-2">Trạng thái</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="slide_status" id="slide_status" /> */}
                                        <Input type="select" value={this.state.brand_status} onChange={ this.onHandleChange } name="slide_status" id="slide_status" >
                                            <option defaultValue={1}>Đang chạy</option>
                                            <option value={0}>Đã ngừng</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandStatus" className="mr-sm-2">Tên hình</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="slide_image" id="slide_image" />
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}
