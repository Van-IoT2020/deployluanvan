import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { storage } from '../../../FirebaseConfig';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            product_name: "",
            product_quantity: 0,
            product_slug: "",
            product_type_id: "",
            brand_id: "",
            unit: "Cái",
            unit_price: "",
            promotion_price: "",
            product_desc: "",
            product_content: "",
            product_image: "",
            product_status: 1,
            created_at: moment(new Date()).format("yyyy-MM-DD"),
            create_at: moment(new Date()).format("yyyy-MM-DD"),

            product_save_image: null,
            brand: [],
            product_type: [],

            colors: [],
            sizes: [],
            
            checkclickColor: [],
            checkclickSize: [],
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeFile = this.onHandleChangeFile.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onHandleChangeFile(e){
        console.log(e.target.files[0])
        this.setState({
            product_save_image: e.target.files[0],
        })
    }

    loadBrand(){
        axios.get('http://127.0.0.1:8000/api/brand/')
        .then(res=>{
            console.log('brand:', res);
            this.setState({
                brand: res.data,
                brand_id: res.data[0].brand_id
            });
        }).catch(err =>console.log(err));
    }
    loadProduct_type(){
        axios.get('http://127.0.0.1:8000/api/product-type/')
        .then(res=>{
            console.log('pro_type:', res);
            this.setState({
                product_type: res.data,
                product_type_id: res.data[0].product_type_id
            });
        }).catch(err =>console.log(err));
    }
    loadSizes(){
        axios.get('http://127.0.0.1:8000/api/size/')
        .then(res=>{
            this.setState({
                sizes: res.data,
                size_id: res.data[0].size_id
            });
        }).catch(err =>console.log(err));
    }
    loadColors(){
        axios.get('http://127.0.0.1:8000/api/color/')
        .then(res=>{
            this.setState({
                colors: res.data,
                color_id: res.data[0].color_id
            });
        }).catch(err =>console.log(err));
    }

    componentWillMount() {
        this.loadBrand();
        this.loadProduct_type();
        this.loadColors();
        this.loadSizes();
    }

    onSubmit(){
        try {
            if(this.state.checkclickSize.length == 0){
                return alert('Bạn chưa chọn các kích thước của sản phẩm để thêm vào chi tiết size');
            }
            if (this.state.checkclickColor.length == 0){
                return alert('Bạn chưa chọn các màu của sản phẩm để thêm vào chi tiết màu');
            }
            
            var newNameFile = Date.now() + "_" + this.state.product_save_image.name;
            var child = newNameFile;
    
            const uploadTask = storage.ref('product').child(child).put(this.state.product_save_image);
                uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                    storage.ref('product').child(child).getDownloadURL()
                    .then(urlImage => { 
                        this.setState({product_image: urlImage});

                        const listProduct = {
                            product_id: this.state.product_id,
                            product_name: this.state.product_name,
                            product_quantity: this.state.product_quantity,
                            product_slug: this.state.product_slug,
                            product_type_id: this.state.product_type_id,
                            brand_id: this.state.brand_id,
                            unit: this.state.unit,
                            unit_price: this.state.unit_price,
                            promotion_price: this.state.promotion_price,
                            product_desc: this.state.product_desc,
                            product_content: this.state.product_content,
                            product_image: urlImage,
                            product_status: this.state.product_status,
                            created_at: this.state.created_at
                        }
                        console.log('send:', listProduct);
                        axios.post('http://127.0.0.1:8000/api/product/', listProduct)
                        .then(res => {
                            if(res != null){
                                console.log('pro_id:', res.data);
                                if(this.state.checkclickSize.length != 0){
                                    this.state.checkclickSize.map(item => {
                                        const listSizeDetails = {
                                            product_id: res.data.product_id,
                                            size_id: item,
                                            create_at: this.state.create_at
                                        }
                                        axios.post('http://127.0.0.1:8000/api/size-details/', listSizeDetails)
                                        .then(res => {
                                            if(res != null){
                                                alert("Bạn vừa thêm vào Chi tiết size", listSizeDetails.size_id);
                                            }
                                        }).catch(err => {
                                            toast.error('Lỗi '+ err.response.data);
                                        })
                                        
                                    })
                                }

                                if(this.state.checkclickColor.length != 0){
                                    this.state.checkclickColor.map(item => {
                                        const listColorDetails = {
                                            product_id: res.data.product_id,
                                            color_id: item,
                                            create_at: this.state.create_at
                                        }
                                        axios.post('http://127.0.0.1:8000/api/color-details/', listColorDetails)
                                        .then(res => {
                                            if(res != null){
                                                alert("Bạn vừa thêm vào Chi tiết màu", listColorDetails.color_id);
                                            }
                                        }).catch(err => {
                                            toast.error('Lỗi '+ err.response.data);
                                        })
                                        
                                    })
                                }
                                return this.props.history.push('/admin/home/product');
                            }
                        })
                        .catch(err => {
                            err.response.data.map((error) => {
                                // console.log(error);
                                toast.error('Lỗi '+ error);
                            })
                        })
                    })
                });
        } catch (error) {
            toast.error('Lỗi: Hình không được trống');
        }
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
                                    <Row>
                                        <Col sm={6}>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Mã sản phẩm</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } name="product_id" id="product_id"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Tên sản phẩm</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } name="product_name" id="product_name"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Name" className="mr-sm-2">Số lượng sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } name="product_quantity" id="product_quantity" readOnly/>
                                            </FormGroup> */}
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="brandSlug" className="mr-sm-2">Tên slug sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } name="product_slug" id="product_slug" />
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Mã loại sản phẩm</Label>
                                                        {/* <Input type="text" onChange={ this.onHandleChange } name="product_type_id" id="product_type_id"/> */}
                                                        <Input type="select" onChange={ this.onHandleChange } name="product_type_id" id="product_type_id" >
                                                            {this.state.product_type.map((productType, index) =>
                                                                    <option key={ index } value={productType.product_type_id}>{productType.product_type_name}</option>
                                                                )
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Mã thương hiệu</Label>
                                                        {/* <Input type="text" onChange={ this.onHandleChange } name="brand_id" id="brand_id"/> */}
                                                        <Input type="select" onChange={ this.onHandleChange } name="brand_id" id="brand_id" >
                                                            {this.state.brand.map((productBrand, index) =>
                                                                    <option key={ index } value={productBrand.brand_id}>{productBrand.brand_name}</option>
                                                                )
                                                            }
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Name" className="mr-sm-2">Đơn vị tính</Label>
                                                <Input type="select" value={this.state.unit} onChange={ this.onHandleChange } name="unit" id="unit" >
                                                    <option value="Cái">Cái</option>
                                                </Input>
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Giá sản phẩm</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } name="unit_price" id="unit_price"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Giá khuyến mãi</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } name="promotion_price" id="promotion_price"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="productDesc" className="mr-sm-2">Mô tả sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } name="product_desc" id="product_desc" />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Name" className="mr-sm-2">Nội dung sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } name="product_content" id="product_content"/>
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Hình sản phẩm</Label>
                                                        <Input type="file" onChange={ this.onHandleChangeFile } name="product_image" id="product_image" required/>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="productStatus" className="mr-sm-2">Trạng thái sản phẩm</Label>
                                                        {/* <Input type="text" onChange={ this.onHandleChange } name="product_status" id="product_status" /> */}
                                                        <Input type="select" value={this.state.product_status} onChange={ this.onHandleChange } name="product_status" id="product_status" >
                                                            <option value={0}>Đang kinh doanh</option>
                                                            <option value={1}>Sản phẩm mới</option>
                                                            <option value={2}>Tạm ngừng</option>
                                                            <option value={3}>Ngừng kinh doanh</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            
                                            <FormGroup>
                                                <Label for="create">Ngày thêm</Label>
                                                <Input type="date" name="created_at" id="exampleDate" defaultValue={moment(this.state.created_at).format("yyyy-MM-DD")} readOnly/>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Kích thước sản phẩm</Label>
                                                <div>
                                                    {
                                                        this.state.sizes.map((item, index)=>
                                                            <CustomInput key={index} type="checkbox" name="size_id" value={item.size_id} id={'s'+item.size_id} label={item.size_name} 
                                                            onChange={ 
                                                                (e)=>{
                                                                    console.log(e.target.name, e.target.value)
                                                                    var itemSize = this.state.checkclickSize;
                                                                    if(itemSize.includes(e.target.value)){
                                                                        itemSize = itemSize.filter(x => x != e.target.value);
                                                                    }else{
                                                                        itemSize.push(e.target.value)
                                                                    }
                                                                    this.setState({ checkclickSize: itemSize}, () => console.log("listSizeChecked", this.state.checkclickSize))
                                                                } 
                                                            } 
                                                            inline />
                                                        )
                                                    }
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Create">Ngày thêm</Label>
                                                <Input type="date" name="create_at" id="exampleDate" defaultValue={moment(this.state.create_at).format("yyyy-MM-DD")} readOnly/>
                                            </FormGroup>

                                            <hr></hr>

                                            <FormGroup>
                                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Màu sản phẩm</Label>
                                                <div>
                                                    <Row>
                                                        {
                                                            this.state.colors.map((item, index)=>
                                                                <Col sm={3}>
                                                                    <CustomInput key={index} type="checkbox" name="color_id" value={item.color_id} id={'c'+item.color_id} label={item.color_name} 
                                                                        onChange={ 
                                                                            (e)=>{
                                                                                console.log(e.target.name, e.target.value)
                                                                                var itemColor = this.state.checkclickColor;
                                                                                if(itemColor.includes(e.target.value)){
                                                                                    itemColor = itemColor.filter(x => x != e.target.value);
                                                                                }else{
                                                                                    itemColor.push(e.target.value)
                                                                                }
                                                                                this.setState({ checkclickColor: itemColor}, () => console.log("listColorChecked", this.state.checkclickColor))
                                                                            } 
                                                                        } 
                                                                    inline />
                                                                </Col>
                                                            )
                                                        }
                                                    </Row>
                                                    
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="create">Ngày thêm</Label>
                                                <Input type="date" name="create_at" id="exampleDate" defaultValue={moment(this.state.create_at).format("yyyy-MM-DD")} readOnly/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    
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

export default AddProduct;