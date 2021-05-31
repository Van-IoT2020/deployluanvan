import React from 'react';
import './Products.css';
class Products extends React.Component {
    constructor(props){
        super(props);
        this.onAddToCart=this.onAddToCart.bind(this);
    }
    onAddToCart(){
        alert(this.props.name + '-' + this.props.price);
    }
    format_price(price) {
        return price.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      }
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">  
                <div className="thumbnail">
                    <img src={this.props.image} alt={this.props.name} width="280" height="300"/>
                    <div className="caption" > 
                        <div>
                            <h3>{this.props.name}</h3>
                        </div> 
                        <p>{this.format_price(this.props.price)}</p>  
                    </div>
                    <div>
                            <a className="btn btn-primary">Xem chi tiết</a><span> </span>
                            <a className="btn btn-danger" onClick={this.onAddToCart}>Mua hàng</a>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Products;