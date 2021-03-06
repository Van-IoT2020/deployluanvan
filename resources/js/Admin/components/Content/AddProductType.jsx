import axios from 'axios'
import moment from 'moment'
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

class AddProductType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_type_name: "",
            categories_id: "",
            meta_keywords: "",
            product_type_slug: "",
            product_type_desc: "",
            product_type_status: 1,
            created_at: moment(new Date()).format("yyyy-MM-DD"),
            categories: [],
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    loadCategories(){
        axios.get('http://127.0.0.1:8000/api/categories/')
        .then(res=>{
            console.log('categories:', res);
            this.setState({
                categories: res.data,
                categories_id: res.data[0].categories_id
            });
        }).catch(err =>console.log(err));
    }
    componentWillMount() {
        this.loadCategories();
    }
    
    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(){
        console.warn('send:', this.state);
        const listProductType = {
            product_type_name: this.state.product_type_name,
            categories_id: this.state.categories_id,
            meta_keywords: this.state.meta_keywords,
            product_type_slug: this.state.product_type_slug,
            product_type_desc: this.state.product_type_desc,
            product_type_status: this.state.product_type_status,
            created_at : this.state.created_at,
        }
        axios.post('http://127.0.0.1:8000/api/product-type/', listProductType)
        .then(res => {
            if(res != null){
                return this.props.history.push('/admin/home/product-type');
            }
        })
        .catch(err => {
            err.response.data.map((error) => {
                console.log(error);
                // alert(error);
                toast.error('L???i '+ error);
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
                                        <Label for="productTypeName" className="mr-sm-2">T??n lo???i</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_type_name" id="product_type_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">M?? d???ng s???n ph???m</Label>
                                        <Input type="select" onChange={ this.onHandleChange } name="categories_id" id="categories_id" >
                                            {this.state.categories.map((category, index) =>
                                                    <option key={ index } value={category.categories_id}>{category.categories_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="metaKey" className="mr-sm-2">T??? kh??a m??? r???ng</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="meta_keywords" id="meta_keywords"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeSlug" className="mr-sm-2">T??n slug lo???i</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_type_slug" id="product_type_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeDesc" className="mr-sm-2">M?? t??? lo???i</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_type_desc" id="product_type_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productTypeStatus" className="mr-sm-2">Tr???ng th??i lo???i</Label>
                                        <Input type="select" onChange={ this.onHandleChange } name="product_type_status" id="product_type_status" >
                                            <option value={1}>??ang kinh doanh</option>
                                            <option value={0}>???? ng???ng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="productTypeCreate">Ng??y th??m</Label>
                                        <Input type="date" name="created_at" id="exampleDate" defaultValue={moment(this.state.created_at).format("yyyy-MM-DD")} readOnly/>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProductType;