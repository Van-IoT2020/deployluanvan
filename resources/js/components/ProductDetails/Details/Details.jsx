import React from 'react';
import './Details.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Label, Button, Input, Form } from 'reactstrap';
class Details extends React.Component {
    constructor(props){
      super(props);
      this.state={
        product_slug: this.props.slug,
        product_id: this.props.id,
        product: {},
        color_details:[],
        size_details: []
      }
      this.loadColors = this.loadColors.bind(this);
    }
    
    loadDetail(id){
      axios.get('http://127.0.0.1:8000/api/product/' + id)
      .then(res=>{
        this.setState({product:res.data});
      }).catch(err=>console.log(err));
    }

    loadColors(id){
      axios.get('http://127.0.0.1:8000/api/get-color-details/' +  id)
      .then(res=>{
        this.setState({
          color_details: res.data
        });
      }).catch(err =>console.log(err))
    }

    loadSizes(id){
      axios.get('http://127.0.0.1:8000/api/get-size-details/' +  id)
      .then(res=>{
        this.setState({
          size_details: res.data
        });
      }).catch(err =>console.log(err))
    }

    componentWillMount(){
      if(this.state.product_id == ""){
        axios.get('http://127.0.0.1:8000/api/product/find-id-by-slug/' + this.state.product_slug)
        .then(res=>{
            console.log('get id by slug', res.data.product_id);
            this.setState({product_id: res.data.product_id}); // -> this.state.product_id

            this.loadDetail(res.data.product_id);
            this.loadColors(res.data.product_id);
            this.loadSizes(res.data.product_id);
        })
      } else {
        this.loadDetail(this.state.product_id);
        this.loadColors(this.state.product_id);
        this.loadSizes(this.state.product_id);
      }
      console.log(this.props)
    }

    
    render() {
      // console.log(this.props.id);
        return (
          <div className="form-group">
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <img className="card-img-top" src="/images/ImageCrs/dam.jpg" alt="!#" height="350px" />
                </div>
                
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  {/* {
                    
                    this.state.product.map(product=>{
                      if(String(product.product_id)===this.props.id){
                        return( */}
                          <div key={this.state.product.product_id}>
                            <h5>Tên sản phẩm: {this.state.product.product_name}</h5>
                            <h5>ID: {this.state.product.product_id}</h5>
                            <h5>Giá gốc: {this.state.product.unit_price}</h5>
                            <h5>Giá giảm: {this.state.product.promotion_price}</h5>
                          </div>
                        {/* )
                      }
                    })
                  } */}
                    <Label>Size</Label>
                    <div className="form-group">
                      <Input type="select" name="size" className="select" required="required">
                        {
                          this.state.size_details.map((item, index) =>
                            <option key={ index } value={item.size_id}>{item.size_name}</option>
                          )
                        }
                      </Input>
                    </div>
                    <Label>Màu sắc</Label>
                    <div className="form-group">
                      <Input type="select" name="color" className="select" required="required">
                        {
                          this.state.color_details.map((item, index) =>
                            <option key={ index } value={item.color_id}>{item.color_name}</option>
                          )
                        }
                      </Input>
                    </div>
                  <Form>
                    <div className="form-group">
                      <Input name="qty" type="number" min="1"  />
                      <Button type="button" className="btn btn-success">Mua ngay</Button>
                    </div>
                  </Form>
                  <h5>Tình trạng</h5>
                  <h5>Hàng còn</h5>
                </div>
              
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <Form>
                  <h1>Đánh giá sản phẩm</h1>
                  <Label>Đánh giá sao</Label>
                  <div className="form-group-">
                    <div className="rating">
                      <Label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                      <Label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></Label>
                    </div>
                  </div>
                  <Label>Bình luận</Label>
                  <div className="form-group">
                    <Input type="text" className="form-comment" placeholder="Comment..." />
                  </div>
                </Form>
                <Button type="submit" className="btn btn-success" name="button">Submit</Button>
              </div>
            </div>  
          </div>
        );
    }
}

export default Details;
