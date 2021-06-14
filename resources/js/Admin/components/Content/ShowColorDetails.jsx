import axios from 'axios';
import { Button } from 'reactstrap';
import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

class ShowColorDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            color_details: []
        };
        this.loadColorDetails = this.loadColorDetails.bind(this);
    }

    loadColorDetails(){
        axios.get('http://127.0.0.1:8000/api/color-details/')
        .then(res => {
            this.setState({
                color_details: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadColorDetails();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/color-details/' + id)
        .then(res => {
            if(res.data != null){
                this.loadColorDetails();
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
                                        <h6 className="m-0 font-weight-bold text-primary">Bảng chi tiết màu</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Mã chi tiết màu</th>
                                                        <th>Mã màu</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Mã chi tiết màu</th>
                                                        <th>Mã màu</th>
                                                        <th>Mã sản phẩm</th>
                                                        <th>Ngày thêm</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.color_details.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.color_detail_id}</td>
                                                                <td>{item.color_id}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.create_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-color-details/" + item.color_detail_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.color_detail_id) } outline color="danger" style={{margin: "10px"}}>Xóa</Button>
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

export default ShowColorDetails;