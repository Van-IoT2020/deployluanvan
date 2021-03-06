import React from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import StarComponent from "../Rating/StarComponent";

class Products extends React.Component {
    constructor(props) {
        // console.log(props);
        super(props);

        this.onAddToCart = this.onAddToCart.bind(this);
        this.showPrice = this.showPrice.bind(this);
    }

    onAddToCart() {
        alert(this.props.product_name + "-" + this.props.unit_price);
    }
    showPrice() {
        if (this.props.promotion_price !== 0) {
            return (
                <div className="form-group" className="inline-price">
                    <div className="form-check-inline">
                        <h6>
                            {/* prefix={'VND'}    */}
                            <CurrencyFormat
                                style={{
                                    textDecorationLine: "line-through",
                                    color: "red",
                                }}
                                value={this.props.price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <del
                                style={{
                                    color: "red",
                                    CurrencyFormat: "thousand",
                                }}
                            >
                                {" "}
                                VND
                            </del>
                        </h6>
                    </div>
                    <div className="form-check-inline">
                        <h6 className="flash-sale">
                            <CurrencyFormat
                                style={{ color: "black" }}
                                value={this.props.promotion_price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <ins
                                className="ega-text--no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                VND
                            </ins>
                        </h6>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="form-group" className="inline-price">
                    <div className="form-check-inline">
                        <h6>
                            <CurrencyFormat
                                style={{ color: "black" }}
                                value={this.props.price}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            <ins
                                className="ega-text--no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                VND
                            </ins>
                        </h6>
                    </div>
                </div>
            );
        }
    }
    render() {
        const { total } = this.props;
        return (
            <div className="product">
                
                    <Link
                            to={`product-detail/${
                                this.props.id + "/" + this.props.product_slug
                            }`}
                        >
                    <img
                        className="card-img-top"
                        src={this.props.image}
                        alt={this.props.name}
                        style={{ width: "280" }}
                        style={{ height: "300" }}
                    />
                    </Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link
                            to={`product-detail/${
                                this.props.id + "/" + this.props.product_slug
                            }`}
                        >
                            {this.props.name}
                        </Link>
                    </h4>
                    {this.showPrice()}
                    <p className="card-text">M?? t???: {this.props.content}</p>
                </div>
                <div className="col-md-12">
                    <div className="row flex-column align-items-center rating">
                        {total > 0 ? (
                            <React.Fragment>
                                {" "}
                                <StarComponent
                                    ratingValue={total}
                                    handleChange={() => {}}
                                />
                                <span className="rating__text" style={{fontSize: "14px", fontStyle:"italic"}}>({total} sao)</span>
                            </React.Fragment>
                        ) : (
                            <div className="rating__text">
                                Kh??ng c?? ????nh gi??
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <Button
                        className="btn btn-danger"
                    >
                    <Link
                    to={`product-detail/${
                        this.props.id + "/" + this.props.product_slug
                    }`} style={{color: 'white'}}
                    >
                        Mua h??ng
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}

export default Products;