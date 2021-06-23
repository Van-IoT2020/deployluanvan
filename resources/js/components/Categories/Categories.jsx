import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import AllProduct from './AllProduct/AllProduct';
class Categories extends Component {
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
            <Link to={ '/categories/' + item.categories_id} 
            style={{color:'black'}}  key={index} className="list-group-item">
                {item.categories_name}
            </Link>
        );
        return lstCategories;
    }
    render() {
        let elements=this.state.product.map((product, index) => {
            if(product.categories_id===this.props.categories_id){
                return <div key={index} className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <AllProduct
                        id={product.product_id}
                        name={product.product_name}
                        price={product.unit_price}
                        promotion_price={product.promotion_price}
                        image={product.product_image}
                        content={product.product_desc}
                        product_slug={product.product_slug}
                    />
                    </div>
            }
        }); 
    return(
        <div style={{overflow:"hidden", width:"100vw"}}>
            <Navigation />
            <Carousels />
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="list-group">
                            {this.showCategoriess()}
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            {elements}
                        </div>
                    </div>
                </div>
            </div>
            <span> </span>
            <Footer />
        </div>
    );
    }
}

export default Categories;
