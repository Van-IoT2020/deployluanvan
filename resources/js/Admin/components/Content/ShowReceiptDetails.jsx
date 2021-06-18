import axios from 'axios';
import { Button } from 'reactstrap';
import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

class ShowReceiptDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            receipt_details: []
        };
        this.loadReceiptDetails = this.loadReceiptDetails.bind(this);
    }

    loadReceiptDetails(){
        axios.get('http://127.0.0.1:8000/api/receipt-details/')
        .then(res => {
            this.setState({
                receipt_details: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadReceiptDetails();
    }

    onDelete(id, receipt_id, receipt_quantity, receipt_price){
        axios.delete('http://127.0.0.1:8000/api/receipt-details/' + id)
        .then(res => {
            if(res.data != null){
                const data = { 
                    total_money: receipt_quantity * receipt_price,
                    action: 3
                }
                axios.put('http://127.0.0.1:8000/api/receipt_upd_bill/' + receipt_id, data)
                .then(res =>{
                    this.loadReceiptDetails();
                })
            }
        })
    }
    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng chi tiết phiếu nhập</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã chi tiết phiếu nhập</th>
                                                        <th>Mã phiếu nhập</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Số lượng nhập</th>
                                                        <th>Giá sản phẩm nhập vào</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã chi tiết phiếu nhập</th>
                                                        <th>Mã phiếu nhập</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Số lượng nhập</th>
                                                        <th>Giá sản phẩm nhập vào</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.receipt_details.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.receipt_details_id}</td>
                                                                <td>{item.receipt_id}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.receipt_quantity}</td>
                                                                <td>{item.receipt_price}</td>
                                                                <td>{item.created_at}</td>
                                                                <td>{item.updated_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-receipt-details/" + item.receipt_details_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.receipt_details_id, item.receipt_id, item.receipt_quantity, item.receipt_price) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowReceiptDetails;