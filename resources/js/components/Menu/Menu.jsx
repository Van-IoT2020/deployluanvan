import React from 'react';
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import './Menu.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
class Menu extends React.Component {
    constructor() {
        super();
        this.state={
            isOpen: false,
            categories:[],
            brand:[]
            
        };
        // this.loadCategories = this.loadCategories.bind(this);
    };
    // componentWillMount(){
    //     this.loadCategories();
    // }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(res=>{
                // console.log(res);
                this.setState({categories:res.data});
            });
        axios.get('http://127.0.0.1:8000/api/brand')
        .then(res=>{
            this.setState({brand:res.data});
        });
    }
    showCategoriess(){
        // console.log(this.state.categories);
        const lst = this.state.categories.map((item, index)=>
            <DropdownItem key={index}>
                <Link to={ '/categories/' + item.categories_id } style={{color:'black'}}>
                    <NavbarText className="nav-link"><span>{item.categories_name}</span></NavbarText>
                </Link>
            </DropdownItem>
        );
        return lst;
    }
    showBrand(){
        // console.log(this.state.brand);
        const lstbrand = this.state.brand.map((item, index)=>
            <DropdownItem key={index}>
                <Link to={ '/brand/' + item.brand_id } style={{color:'black'}}>
                    <NavbarText className="nav-link"><span>{item.brand_name}</span></NavbarText>
                </Link>
            </DropdownItem>
        );
        return lstbrand;
    }
    componentWillMount(){
        this.setState({
            isOpen: false
        });
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        // let category=this.state.product.map((categories, index) => {
        //     return <DropdownItem key={index} href="/quan"  style={{color:'black'}}> {categories.categories_name}</DropdownItem>
                    
        // }); 
        return (
            
                // <Row style={{border: "2px solid red", width:"100vw"}}>
                    <Navbar  expand="md" className="menu">
                        <NavbarToggler onClick={()=>this.toggle()} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <Row style={{ width:"100vw"}}>
                                    <Col xs="12" md="2">
                                        <NavItem>
                                                <Link to="/">
                                                <div className="logo">
                                                    <h2><span>KV</span>Store</h2>
                                                </div>
                                                </Link>
                                        </NavItem>  
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Row style={{margin:"auto"}}>
                                            <Col md="3">
                                                <NavItem className="home">
                                                    <Link to="/">TRANG CHỦ</Link>
                                                </NavItem>
                                            </Col>
                                            <Col md="3">
                                                <NavItem className="products-new">
                                                    <Link to="/products-new" >HÀNG MỚI VỀ</Link>
                                                </NavItem>
                                            </Col>
                                            <Col md="3">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className="dropdown">SẢN PHẨM</DropdownToggle>
                                                    <DropdownMenu right>
                                                        {this.showCategoriess()}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                            <Col md="3">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className="dropdown">THƯƠNG HIỆU</DropdownToggle>
                                                    <DropdownMenu right>
                                                        {this.showBrand()}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="12" md="2">
                                        <Row style={{margin:"auto"}}>
                                            <Col md="6" style={{margin:"auto"}}>
                                                <NavItem className="iconcart">
                                                    <Link to="/cart"><FontAwesomeIcon icon={faCartPlus} size="lg" /></Link>
                                                </NavItem>
                                            </Col>
                                            <Col md="6" style={{margin:"auto"}}>
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className="dropdown" className="iconu"><FontAwesomeIcon icon={faUser} size="lg" /> <span> User </span> </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem>
                                                            <Link to="/register" style={{color:'black'}}>
                                                                <NavbarText className="nav-link"><span>Đăng ký</span></NavbarText>
                                                            </Link>
                                                        </DropdownItem>
                                                        <DropdownItem>
                                                            <Link to="/login" style={{color:'black'}}>
                                                                <NavbarText className="nav-link"><span>Đăng nhập</span></NavbarText>
                                                            </Link>
                                                        </DropdownItem>
                                                        <DropdownItem>
                                                            <Link to="/logout" style={{color:'black'}}>
                                                                <NavbarText className="nav-link"><span>Đăng xuất</span></NavbarText>
                                                            </Link>
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                
                            </Nav>
                        </Collapse>
                    </Navbar>
                // </Row>
        );
    }
}

export default Menu;
