import React from 'react';
import './Details.css';
import axios from 'axios';
import { returnStatement } from '@babel/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
class Details extends React.Component {
  constructor(){
    super();
    this.state={
      product:[],
      color:[],
      color_details:[]
    }
  }
  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/product')
    .then(res=>{
      this.setState({product:res.data});
    });
    axios.get('http://127.0.0.1:8000/api/get-color-details')
    .then(res=>{
      console.log(res);
      this.setState({color_details:res.data});
      
    });
  }
  // showProductDetails(){
  //   // console.log(this.state.categories);
  //   const lstProductDetails = this.state.product.map((item, index)=>
  //     <option value="2" key={index}>{item.color_id}</option>
  //   );
  //   return lstProductDetails;
  // }
  render() {
    // console.log(this.props.id);
      return (
        <div className="form-group">
          <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <img className="card-img-top" src="/images/imageCrs/dam.jpg" alt="!#" height="350px" />
              </div>
              
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {
                  
                  this.state.product.map(product=>{
                    if(String(product.product_id)===this.props.id){
                      return(
                        <div key={product.product_id}>
                          <h5>Tên sản phẩm: {product.product_name}</h5>
                          <h5>ID: {product.product_id}</h5>
                          <h5>Giá gốc: {product.unit_price}</h5>
                          <h5>Giá giảm: {product.promotion_price}</h5>
                        </div>
                      )
                    }
                  })
                }
                  <label>Size</label>
                  <div className="form-group">
                    <select name="size" className="select" required="required">
                      <option>---Vui lòng chọn size---</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                      <option>XXL</option>
                      {/* {
                        this.state.product.map((productSize, index)=>{
                          <option key = { index } value={productSize.}>M</option>
                        })
                      } */}
                    </select>
                  </div>
                  <label>Màu sắc</label>
                  <div className="form-group">
                    <select name="color" className="select" required="required">
                      {/* <option>---Vui lòng chọn color---</option>
                      <option>Xanh</option>
                      <option>Đỏ</option>
                      <option>Trắng</option>
                      <option>Vàng</option> */}
                      {
                        this.state.color_details.map((productSize, index)=>{
                          <option key = { index } value={productSize.product_id}>{productSize.color_}</option>
                        })
                      }
                    </select>
                  </div>
                <form>
                  <div className="form-group">
                    <input name="qty" type="number" min="1"  />
                    <button type="button" className="btn btn-success">Mua ngay</button>
                  </div>
                </form>
                <h5>Tình trạng</h5>
                <h5>Hàng còn</h5>
              </div>
            
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <form>
                <h1>Đánh giá sản phẩm</h1>
                <label>Đánh giá sao</label>
                <div className="form-group-">
                  <div className="rating">
                    <label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    <label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    <label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    <label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    <label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                  </div>
                </div>
                <label>Bình luận</label>
                <div className="form-group">
                  <input type="text" className="form-comment" placeholder="Comment..." />
                </div>
              </form>
              <button type="submit" className="btn btn-success" name="button">Submit</button>
            </div>
          </div>  
        </div>
      );
  }
}

export default Details;
