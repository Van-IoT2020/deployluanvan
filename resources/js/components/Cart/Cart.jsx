import React, { Component } from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import './Cart.css';
import { Link } from 'react-router-dom';
class Cart extends Component {
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
            <Menu />
            <Carousels />
            <Header />
            <div className="content">
                <h2>Giỏ hàng của bạn</h2>
                <div className="cartpage">
                    <table className="tblone">
                        <tr>
                            <th style={{width:"20"}}>Tên sản phẩm</th>
                            <th style={{width:"10"}}>Hình ảnh</th>
                            <th style={{width:"15"}}>Số lượng</th>
                            <th style={{width:"25"}}>Giá sản phẩm</th>
                            <th style={{width:"20"}}>Tổng giá</th>
                            <th style={{width:"10"}}>Hoạt động</th>
                        </tr>		
                        <tr>
                            <td>Áo Hoodie</td>
                            <td>hoodie.jpg</td>
                            <td>1</td>
                            <td>150000VND</td>
                            <td>150000VND</td>
                            <td>Xóa</td>
                        </tr>
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
                </div>
                <div className="shopping">
                    <div className="shopleft">
                        <Link style={{background:"#602D8D"}} to="/tiep-tuc">TIẾP TỤC MUA SẮM</Link>
                    </div>
                    <div className="shopright">
                        <Link style={{background:"#602D8D"}} to="/thanh-toan">THANH TOÁN</Link>
                    </div>
                </div>
                    <div className="clear"></div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default Cart;
