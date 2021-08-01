import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { storage } from '../../../FirebaseConfig'

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            product_name: "",
            product_quantity: "",
            product_slug: "",
            product_type_id: "",
            brand_id: "",
            unit: "",
            unit_price: "",
            promotion_price: "",
            product_desc: "",
            product_content: "",
            product_image: "",
            product_status: "",
            updated_at: moment(new Date()).format("yyyy-MM-DD"),
            create_at: moment(new Date()).format("yyyy-MM-DD"),

            brand: [],
            product_type: [],

            colors: [],
            sizes: [],

            checkeditColor: [],
            checkeditSize: [],
            checkclickColor: [],
            checkclickSize: [],

            haveAChangeFile: false,
            product_save_image: null,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeFile = this.onHandleChangeFile.bind(this);
        this.showChangeImg = this.showChangeImg.bind(this);
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

    showChangeImg(){
        if(this.state.haveAChangeFile == true){
            return <Input type="file" onChange={ this.onHandleChangeFile } name="product_image" id="product_image" required />
        }
        else{
            return <Input type="text" defaultValue={ this.state.product_image} name="product_image" id="product_image" readOnly />
        }
    }

    onSubmit(){
        axios.get('http://127.0.0.1:8000/api/get-to-edit-size/' + this.props.match.params.id)
        .then(res =>{
            var size = [];
            res.data.map((item) => {size.push(item.size_id)})
            size = size.sort();
            this.setState({
                checkeditSize: size,
            }, () => {
                axios.get('http://127.0.0.1:8000/api/get-to-edit-color/' + this.props.match.params.id)
                .then(res =>{
                    var color = [];
                    res.data.map((item) => {color.push(item.color_id)})
                    color = color.sort(); 
                    this.setState({
                        checkeditColor: color,
                    }, ()=> { 
                        // console.log(this.state.checkeditColor, this.state.checkclickColor)
                        // if(JSON.stringify(this.state.checkeditColor) != JSON.stringify(this.state.checkclickColor.sort())){
                        //     alert("Chọn màu có khác");
                        // }
                        // else{
                        //     alert("Chọn màu như cũ");
                        // }
                        // return 1;

                        if(this.state.haveAChangeFile == false){
                            const listProduct = this.state;
                            axios.put('http://127.0.0.1:8000/api/product/' + this.props.match.params.id, listProduct)
                            .then(res => {
                                if(res != null){
                                    if(this.state.checkclickSize.length != 0){
                                        console.log('s0: ', this.state.checkclickSize.length);
                                        console.log('s1: ', this.state.checkeditSize, this.state.checkclickSize.sort());
                                        if(JSON.stringify(this.state.checkeditSize) != JSON.stringify(this.state.checkclickSize.sort())){
                                            axios.delete('http://127.0.0.1:8000/api/delete-size-details/' + this.props.match.params.id)
                                            .then(res => {
                                                this.state.checkclickSize.map(item => {
                                                    const listSizeDetails = {
                                                        product_id: this.props.match.params.id,
                                                        size_id: item,
                                                        create_at: this.state.create_at
                                                    }
                                                    axios.post('http://127.0.0.1:8000/api/size-details/', listSizeDetails)
                                                    .then(res => {
                                                        if(res != null){
                                                            alert("Bạn vừa sửa Chi tiết size", listSizeDetails.size_id);
                                                        }
                                                    }).catch(err => {
                                                        toast.error('Lỗi '+ err.response.data);
                                                    })
                                                })
                                            })
                                        }
                                    }
                                    if(this.state.checkclickColor.length != 0){
                                        console.log('c0: ', this.state.checkclickColor.length);
                                        console.log('c1: ', this.state.checkeditColor, this.state.checkclickColor.sort());
                                        if(JSON.stringify(this.state.checkeditColor) != JSON.stringify(this.state.checkclickColor.sort())){
                                            axios.delete('http://127.0.0.1:8000/api/deletet-color-details/' + this.props.match.params.id)
                                            .then(res => {
                                                this.state.checkclickColor.map(item => {
                                                    const listColorDetails = {
                                                        product_id: this.props.match.params.id,
                                                        color_id: item,
                                                        create_at: this.state.create_at
                                                    }
                                                    axios.post('http://127.0.0.1:8000/api/color-details/', listColorDetails)
                                                    .then(res => {
                                                        if(res != null){
                                                            alert("Bạn vừa sửa Chi tiết màu", listColorDetails.color_id);
                                                        }
                                                    }).catch(err => {
                                                        toast.error('Lỗi '+ err.response.data);
                                                    })
                                                })
                                            })
                                        }
                                    }
                                    return this.props.history.push("/admin/home/product");
                                }
                            }) 
                            .catch(err =>{
                                err.response.data.map((error) =>{
                                    console.log(error);
                                    toast.error('Lỗi: '+ error);
                                })
                            })
                        }else{
                            if(this.state.product_save_image != null){
                                try { 
                                    storage.refFromURL(this.state.product_image).delete()
                                    .then(() => {
                                        alert("Picture is deleted successfully!");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                                } catch (error) {
                                    alert("Can't delete Picture!");
                                    console.log(error);
                                }
                                try {
                                    var newNameFile = Date.now() + "_" + this.state.product_save_image.name;
                                    var child = newNameFile;
                            
                                    const uploadTask = storage.ref('product').child(child).put(this.state.product_save_image);
                                        uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                                            storage.ref('product').child(child).getDownloadURL()
                                            .then(urlImage => { 
                                                this.setState({product_image: urlImage});

                                                const listProduct = this.state;
                                                axios.put('http://127.0.0.1:8000/api/product/' + this.props.match.params.id, listProduct)
                                                .then(res => {
                                                    if(res != null){
                                                        if(this.state.checkclickSize.length != 0){
                                                            if(JSON.stringify(this.state.checkeditSize) != JSON.stringify(this.state.checkclickSize.sort())){
                                                                axios.delete('http://127.0.0.1:8000/api/delete-size-details/' + this.props.match.params.id)
                                                                .then(res => {
                                                                    this.state.checkclickSize.map(item => {
                                                                        const listSizeDetails = {
                                                                            product_id: this.props.match.params.id,
                                                                            size_id: item,
                                                                            create_at: this.state.create_at
                                                                        }
                                                                        axios.post('http://127.0.0.1:8000/api/size-details/', listSizeDetails)
                                                                        .then(res => {
                                                                            if(res != null){
                                                                                alert("Bạn vừa sửa Chi tiết size", listSizeDetails.size_id);
                                                                            }
                                                                        }).catch(err => {
                                                                            toast.error('Lỗi '+ err.response.data);
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                        }
                                                        if(this.state.checkclickColor.length != 0){
                                                            if(JSON.stringify(this.state.checkeditColor) != JSON.stringify(this.state.checkclickColor.sort())){
                                                                axios.delete('http://127.0.0.1:8000/api/deletet-color-details/' + this.props.match.params.id)
                                                                .then(res => {
                                                                    this.state.checkclickColor.map(item => {
                                                                        const listColorDetails = {
                                                                            product_id: this.props.match.params.id,
                                                                            color_id: item,
                                                                            create_at: this.state.create_at
                                                                        }
                                                                        axios.post('http://127.0.0.1:8000/api/color-details/', listColorDetails)
                                                                        .then(res => {
                                                                            if(res != null){
                                                                                alert("Bạn vừa sửa Chi tiết màu", listColorDetails.color_id);
                                                                            }
                                                                        }).catch(err => {
                                                                            toast.error('Lỗi '+ err.response.data);
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                        }
                                                        return this.props.history.push("/admin/home/product");
                                                    }
                                                }) 
                                                .catch(err =>{
                                                    err.response.data.map((error) =>{
                                                        console.log(error);
                                                        toast.error('Lỗi: '+ error);
                                                    })
                                                })
                                            })
                                        });
                                } catch (error) {
                                    console.error(error);
                                }                
                            } else {
                                alert('Phải chọn hình trước khi cập nhật')
                            }
                        }
                    })
                })
            })
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

    editProduct(){
        const brand_id_C2 = this.props.location.sendData.product_id
        axios.get('http://127.0.0.1:8000/api/product/' + brand_id_C2)
        .then(res =>{
            this.setState({
                product_id: res.data.product_id,
                product_name: res.data.product_name,
                product_quantity: res.data.product_quantity,
                product_slug: res.data.product_slug,
                product_type_id: res.data.product_type_id,
                brand_id: res.data.brand_id,
                unit: res.data.unit,
                unit_price: res.data.unit_price,
                promotion_price: res.data.promotion_price,
                product_desc: res.data.product_desc,
                product_content: res.data.product_content,
                product_image: res.data.product_image,
                product_status: res.data.product_status,
            });
        })
    }

    editColor(){
        axios.get('http://127.0.0.1:8000/api/get-to-edit-color/' + this.props.match.params.id)
        .then(res =>{
            var color = [];
            res.data.map((item) => {color.push(item.color_id)})
            console.log("Màu lấy được: ", color);
            this.setState({
                checkclickColor: color
            })
        })
    }
    editSize(){
        axios.get('http://127.0.0.1:8000/api/get-to-edit-size/' + this.props.match.params.id)
        .then(res =>{
            var size = [];
            res.data.map((item) => {size.push(item.size_id)})
            console.log("Size lấy được: ", size);
            this.setState({
                checkclickSize: size
            })
        })
    }

    componentWillMount(){
        this.loadBrand();
        this.loadProduct_type();
        this.editProduct();
        this.loadColors();
        this.loadSizes();
        this.editColor();
        this.editSize();
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
                                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_id } name="product_id" id="product_id" readOnly/>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Tên sản phẩm</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_name } name="product_name" id="product_name"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Name" className="mr-sm-2">Số lượng sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_quantity } name="product_quantity" id="product_quantity" readOnly/>
                                            </FormGroup> */}
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="brandSlug" className="mr-sm-2">Tên slug sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_slug } name="product_slug" id="product_slug" />
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Mã loại sản phẩm</Label>
                                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.product_type_id} name="product_type_id" id="product_type_id" >
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
                                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.brand.brand_id} name="brand_id" id="brand_id" >
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
                                                <Input type="select" value={this.state.unit} onChange={ this.onHandleChange } value={ this.state.unit } name="unit" id="unit" >
                                                    <option value="Cái">Cái</option>
                                                </Input>
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Giá sản phẩm</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.unit_price } name="unit_price" id="unit_price"/>
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="Name" className="mr-sm-2">Giá khuyến mãi</Label>
                                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.promotion_price } name="promotion_price" id="promotion_price"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="productDesc" className="mr-sm-2">Mô tả sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_desc } name="product_desc" id="product_desc" />
                                            </FormGroup>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Name" className="mr-sm-2">Nội dung sản phẩm</Label>
                                                <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_content } name="product_content" id="product_content"/>
                                            </FormGroup>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label check><Input onChange={ (e)=>{ this.setState({haveAChangeFile: e.target.checked}) } } type="checkbox"/>Chọn để thay đổi hình</Label>
                                                        {
                                                            this.showChangeImg()
                                                        }
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="productStatus" className="mr-sm-2">Trạng thái sản phẩm</Label>
                                                        <Input type="select" value={this.state.product_status} onChange={ this.onHandleChange } name="product_status" id="product_status" >
                                                            <option value={1}>Đang kinh doanh</option>
                                                            <option value={0}>Đã ngừng kinh doanh</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            <FormGroup>
                                                <Label for="Name">Ngày cập nhật</Label>
                                                <Input type="date" name="updated_at" id="exampleDate" onChange={ this.onHandleChange } defaultValue={moment(this.state.updated_at).format("yyyy-MM-DD")} readOnly/>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Kích thước sản phẩm</Label>
                                                <div>
                                                    {
                                                        this.state.sizes.map((item, index)=> (<>
                                                            {(this.state.checkclickSize.includes(item.size_id)) ?
                                                                <CustomInput key={index} type="checkbox" name="size_id" value={item.size_id} id={'s'+item.size_id} label={item.size_name} checked
                                                                onChange={ 
                                                                    (e)=>{
                                                                        console.log(e.target.name, e.target.value)
                                                                        var itemSize = this.state.checkclickSize;
                                                                        if(itemSize.includes(parseInt(e.target.value))){
                                                                            itemSize = itemSize.filter(x => x != parseInt(e.target.value));
                                                                        }else{
                                                                            itemSize.push(parseInt(e.target.value))
                                                                        }
                                                                        this.setState({ checkclickSize: itemSize}, () => console.log("listSizeChecked", this.state.checkclickSize))
                                                                    } 
                                                                } 
                                                                inline />
                                                             : 
                                                                <CustomInput key={index} type="checkbox" name="size_id" value={item.size_id} id={'s'+item.size_id} label={item.size_name} 
                                                                onChange={ 
                                                                    (e)=>{
                                                                        console.log(e.target.name, e.target.value)
                                                                        var itemSize = this.state.checkclickSize;
                                                                        if(itemSize.includes(parseInt(e.target.value))){
                                                                            itemSize = itemSize.filter(x => x != parseInt(e.target.value));
                                                                        }else{
                                                                            itemSize.push(parseInt(e.target.value))
                                                                        }
                                                                        this.setState({ checkclickSize: itemSize}, () => console.log("listSizeChecked", this.state.checkclickSize))
                                                                    } 
                                                                } 
                                                                inline />
                                                            }
                                                        </>)
                                                            
                                                        )
                                                    }
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Name">Ngày cập nhật</Label>
                                                <Input type="date" name="update_at" id="exampleDate" onChange={ this.onHandleChange } defaultValue={moment(this.state.update_at).format("yyyy-MM-DD")} readOnly/>
                                            </FormGroup>

                                            <hr></hr>

                                            <FormGroup>
                                                <Label for="exampleCheckbox" style={{fontWeight:'bold', color:'black'}}>Màu sản phẩm</Label>
                                                <div>
                                                    <Row>
                                                        {
                                                            this.state.colors.map((item, index)=> (<>
                                                                {(this.state.checkclickColor.includes(item.color_id)) ?
                                                                    <Col sm={3}>
                                                                        <CustomInput key={index} type="checkbox" name="color_id" value={item.color_id} id={'c'+item.color_id} label={item.color_name} checked
                                                                            onChange={ 
                                                                                (e)=>{
                                                                                    console.log(e.target.name, e.target.value)
                                                                                    var itemColor = this.state.checkclickColor;
                                                                                    if(itemColor.includes(parseInt(e.target.value))){
                                                                                        itemColor = itemColor.filter(x => x != parseInt(e.target.value));
                                                                                    }else{
                                                                                        itemColor.push(parseInt(e.target.value))
                                                                                    }
                                                                                    this.setState({ checkclickColor: itemColor}, () => console.log("listColorChecked", this.state.checkclickColor))
                                                                                } 
                                                                            } 
                                                                        inline />
                                                                    </Col>
                                                                    :
                                                                    <Col sm={3}>
                                                                        <CustomInput key={index} type="checkbox" name="color_id" value={item.color_id} id={'c'+item.color_id} label={item.color_name} 
                                                                            onChange={ 
                                                                                (e)=>{
                                                                                    console.log(e.target.name, e.target.value)
                                                                                    var itemColor = this.state.checkclickColor;
                                                                                    if(itemColor.includes(parseInt(e.target.value))){
                                                                                        itemColor = itemColor.filter(x => x != parseInt(e.target.value));
                                                                                    }else{
                                                                                        itemColor.push(parseInt(e.target.value))
                                                                                    }
                                                                                    this.setState({ checkclickColor: itemColor}, () => console.log("listColorChecked", this.state.checkclickColor))
                                                                                } 
                                                                            } 
                                                                        inline />
                                                                    </Col>
                                                                }
                                                            </>)
                                                                
                                                            )
                                                        }
                                                    </Row>
                                                    
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Name">Ngày cập nhật</Label>
                                                <Input type="date" name="update_at" id="exampleDate" onChange={ this.onHandleChange } defaultValue={moment(this.state.update_at).format("yyyy-MM-DD")} readOnly/>
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

export default EditProduct;