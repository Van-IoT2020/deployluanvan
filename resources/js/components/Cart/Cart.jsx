import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import './Cart.css';
import { Link } from 'react-router-dom';

class Cart extends Component {
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation/>
                <Carousels />
                <Header />
                <div className="content">
                    <div className="container-fluid">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Giỏ hàng của bạn</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th>Số lượng</th>
                                                <th>Màu sản phẩm</th>
                                                <th>Kích cỡ sản phẩm</th>
                                                <th>Giá sản phẩm</th>
                                                <th>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Tên sản phẩm</th>
                                                <th>Hình ảnh</th>
                                                <th>Số lượng</th>
                                                <th>Màu sản phẩm</th>
                                                <th>Kích cỡ sản phẩm</th>
                                                <th>Giá sản phẩm</th>
                                                <th>Tác vụ</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {/* {
                                                this.state.brand.map((item, index) => 
                                                    <tr key={ index }>
                                                        <td>{item.brand_id}</td>
                                                        <td>{item.brand_name}</td>
                                                        <td>{item.brand_slug}</td>
                                                        <td>{item.brand_desc}</td>
                                                        <td>{item.brand_status}</td>
                                                        <td>{item.created_at}</td>
                                                        <td>{item.update_at}</td>
                                                        <td>
                                                            <Button onClick={ () => {
                                                                this.props.history.push({
                                                                    pathname: '/admin/home/edit-brand/' + item.brand_slug,
                                                                    sendData: {
                                                                        brand_id: item.brand_id
                                                                    }
                                                                });
                                                            }} outline color="info" style={{margin: "10px"}}>Sửa</Button>
                                                            
                                                            <Button onClick={ (id)=>this.onDelete(item.brand_id)} outline color="danger" style={{margin: "10px"}}>Xóa</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            } */}
                                        </tbody>
                                    </table>
                                    <table style={{float:"right", width:"40%", textAlign:'left'}}>
                                        <tr>
                                            <th>Tổng tiền  : </th>
                                            <td>150000VND</td>
                                        </tr>
                                        <tr>
                                            <th>VAT : </th>
                                            <td>5000VND</td>
                                        </tr>
                                        <tr>
                                            <th>Tổng tiền thanh toán :</th>
                                            <td>155000VND </td>
                                        </tr>
                                    </table>
                                    <div className="shopping">
                                        <div className="shopleft">
                                            <Link style={{background:"#602D8D", textDecoration: 'none'}} to="/tiep-tuc">TIẾP TỤC MUA SẮM</Link>
                                        </div>
                                        <div className="shopright">
                                            <Link style={{background:"#602D8D", textDecoration: 'none'}} to="/thanh-toan">THANH TOÁN</Link>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    }
}

export default Cart;
