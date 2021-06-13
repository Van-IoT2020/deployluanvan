import axios from 'axios';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class ShowReceipt extends Component {
    constructor(props) {
        super(props);
        this.state={
            receipts: []
        };
        this.loadReceipts = this.loadReceipts.bind(this);
    }

    loadReceipts(){
        axios.get('http://127.0.0.1:8000/api/receipt/')
        .then(res => {
            this.setState({
                receipts: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadReceipts();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/receipt/' + id)
        .then(res => {
            if(res.data != null){
                this.loadReceipts();
            }
        })
        .catch(err => {
            toast.error('Lỗi '+ err.response.data);
        })
    }

    render() {
        const columns = [
            {
                name: 'Mã phiếu nhập',
                selector: 'receipt_id',
                sortable: true,
            },
            {
                name: 'Mã nhà cung cấp',
                selector: 'supplier_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Tổng tiền nhập',
                selector: 'bill_total',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày thêm',
                selector: 'create_at',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày cập nhật',
                selector: 'update_at',
                sortable: true,
                right: true,
            },
            {
                cell: row => <Button onClick={ () => {
                                this.props.history.push({
                                    pathname: '/admin/home/edit-receipt/' + row.receipt_id,
                                    sendData: {
                                        receipt_id: row.receipt_id
                                    }
                                });
                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>,
                button: true,
            },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.receipt_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>,
                button: true,
            }
        ];
        return (
            <div id="page-top">
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                 <DataTable
                                    title="Danh sách phiếu nhập"
                                    columns={columns}
                                    data={ this.state.receipts }
                                    pagination
                                    subHeader
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

export default ShowReceipt;