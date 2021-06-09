import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class ShowProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        };
        this.loadProduct = this.loadProduct.bind(this);
    }

    loadProduct(){
        // 100 200 -> then
        // 300 400 500 -> catch err -> err.response.data (noi loi tu be api)
        axios.get('http://127.0.0.1:8000/api/Product/')
        .then(res => {
            console.log('categories: ', res);
            this.setState({
                product: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadProduct();
    }
    
    
    render() {
        const columns = [
            {
                name: '#',
                selector: 'product_id',
                sortable: true,
            },
            {
                name: 'Tên sản phẩm',
                selector: 'product_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Số lượng',
                selector: 'product_quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Slug',
                selector: 'product_slug',
                sortable: true,
                right: true,
            },
            {
                name: 'Loại sp',
                selector: 'product_type_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Thương hiệu',
                selector: 'brand_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Đơn vị',
                selector: 'unit',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá gốc',
                selector: 'unit_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Giá giảm',
                selector: 'promotion_price',
                sortable: true,
                right: true,
            },
            {
                name: 'Mô tả',
                selector: 'product_desc',
                sortable: true,
                right: true,
            },
            {
                name: 'Nội dung',
                selector: 'product_content',
                sortable: true,
                right: true,
            },
            {
                name: 'Hình',
                selector: 'product_image',
                sortable: true,
                right: true,
            },
            {
                name: 'Trạng thái',
                selector: 'product_status',
                sortable: true,
                right: true,
            },
            {
                name: 'Tác vụ',
                cell: () => <Button variant="contained" color="primary">Action</Button>,
                button: true,
            }
        ];
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                 <DataTable
                                    title="Danh sách sản phẩm"
                                    columns={columns}
                                    data={ this.state.product }
                                    pagination
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowProduct;