import React from 'react';
import './Products.css';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

class Products extends React.Component {
    constructor(props){
        // console.log(props);
        super(props);
        this.onAddToCart=this.onAddToCart.bind(this);
        
    }
    
    onAddToCart(){
        alert(this.props.product_name + '-' + this.props.unit_price);
    }
    
    render() {
        return (
            <div className="product">
                <span onClick={ () => {
                        this.props.propsParent.history.push({
                            pathname: '/product_details/' + this.props.product_slug,
                            sendData: {
                                product_id: this.props.id
                            }
                        });
                    }}>
                    <img className="card-img-top" src={this.props.image} alt={this.props.name} style={{width:"280"}} style={{height:"300"}} />
                </span>
                <div className="card-body">
                <h4 className="card-title">
                    <Link to="#">{this.props.name}</Link>
                </h4>
                <div className="form-group">
                    <div className="form-check-inline">
                        <h5>
                            <CurrencyFormat value={this.props.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} />
                        </h5>
                    </div>
                    <div className="form-check-inline">
                        <h5  className="flash-sale">
                        <CurrencyFormat value={this.props.promotion_price} displayType={'text'} thousandSeparator={true} prefix={'VND'} />
                        </h5>
                    </div>
                </div>
                <p className="card-text">Mô tả: {this.props.content}</p>
                </div>
                <div className="col-md-12">
                    <div className="rating">
                        <label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    </div>
                </div>
                <div className="col-md-12">
                    <Button onClick={ () => {
                        this.props.propsParent.history.push({
                            pathname: '/product_details/' + this.props.product_slug,
                            sendData: {
                                product_id: this.props.id
                            }
                        });
                    }} color="info" style={{margin: "10px"}}>Xem chi tiết</Button><span> </span>
                    <Button className="btn btn-danger" onClick={this.onAddToCart}>Mua hàng</Button>
                </div>
            </div>
        );
    }
}

export default Products;