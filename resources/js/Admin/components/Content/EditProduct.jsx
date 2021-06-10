import React, { Component } from 'react';

class EditProduct extends Component {
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
                                        <Label for="Name" className="mr-sm-2">Mã sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_id" id="product_id"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Tên sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_name" id="product_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Số lượng sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_quantity" id="product_quantity"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">Tên slug sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_slug" id="product_slug" />
                                    </FormGroup>
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
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Đơn vị tính</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="unit" id="unit"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Giá sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="unit_price" id="unit_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Giá khuyến mãi</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="promotion_price" id="promotion_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productDesc" className="mr-sm-2">Mô tả sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_desc" id="product_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Nội dung sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_content" id="product_content"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandName" className="mr-sm-2">Hình sản phẩm</Label>
                                        <Input type="text" onChange={ this.onHandleChange } name="product_image" id="product_image"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productStatus" className="mr-sm-2">Trạng thái sản phẩm</Label>
                                        {/* <Input type="text" onChange={ this.onHandleChange } name="product_status" id="product_status" /> */}
                                        <Input type="select" value={this.state.product_status} onChange={ this.onHandleChange } name="product_status" id="product_status" >
                                            <option value={1}>Đang kinh doanh</option>
                                            <option value={0}>Đã ngừng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="brandCreate">Ngày thêm</Label>
                                        <Input type="date" name="created_at" id="exampleDate" defaultValue={moment(this.state.created_at).format("yyyy-MM-DD")}/>
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

export default EditProduct;