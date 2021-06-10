import React from 'react';
import Products from '../Products/Products';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Content extends React.Component {
    
        constructor(){
            super();
            this.state={
                product:[],
                categories:[]
            }
        } 
        componentDidMount(){
            axios.get('http://127.0.0.1:8000/api/product')
                .then(res=>{
                    this.setState({product:res.data});
                });
            axios.get('http://127.0.0.1:8000/api/categories')
                .then(res=>{
                    this.setState({categories:res.data});
                });
        }
        showCategoriess(){
            // console.log(this.state.categories);
            const lstCategories = this.state.categories.map((item, index)=>
                <Link to={ '/categories/' + item.categories_id } 
                style={{color:'black'}}  key={index} className="list-group-item">
                    {item.categories_name}
                </Link>
            );
            return lstCategories;
        }
        render(){
        let elements=this.state.product.map((product, index) => {
            return <div key={index} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <Products
                        id={product.product_id}
                        name={product.product_name}
                        price={product.unit_price}
                        promotion_price={product.promotion_price}
                        image={product.product_image}
                        content={product.product_desc}
                        product_slug={product.product_slug}
                    />
                </div>
        }); 
        return(
            <div className="form-group">
            <div className="container">
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className="list-group">
                            {this.showCategoriess()}
                        </div>
                    </div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <div className="row">
                            {elements}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Content;
