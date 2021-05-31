import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false,
        };
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
        return (
                // <Row style={{border: "2px solid red", width:"100vw"}}>
                    <Navbar color="light" light expand="md">
                        <NavbarToggler onClick={()=>this.toggle()} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <Row style={{ width:"100vw"}}>
                                    <Col xs="12" md="2">
                                        <NavItem>   
                                                <NavLink href="/components/">
                                                <div className="logo">
                                                    <h2><span>KV</span>Store</h2>
                                                </div>
                                                </NavLink>
                                        </NavItem>  
                                    </Col>
                                    <Col xs="12" md="8">
                                        <Row style={{margin:"auto"}}>
                                            <Col md="3">
                                                <NavItem>
                                                    <NavLink href="/components/">TRANG CHỦ</NavLink>
                                                </NavItem>
                                            </Col>
                                            <Col md="3">
                                                <NavItem>
                                                    <NavLink href="https://github.com/reactstrap/reactstrap">HÀNG MỚI VỀ</NavLink>
                                                </NavItem>
                                            </Col>
                                            <Col md="2">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret>NAM</DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem> ÁO</DropdownItem>
                                                        <DropdownItem> QUẦN</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                            <Col md="2">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret>NỮ</DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem> ÁO</DropdownItem>
                                                        <DropdownItem> QUẦN</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Col>
                                            <Col md="2">
                                                <NavItem>
                                                    <NavLink href="/components/">BRANDS</NavLink>
                                                </NavItem>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    
                                    <Col xs="12" md="2">
                                        <Row style={{margin:"auto"}}>
                                            <Col md="6" style={{margin:"auto"}}>
                                                <NavItem>
                                                    <NavLink href="/components/"><FontAwesomeIcon icon={faCartPlus} size="2x" /></NavLink>
                                                </NavItem>
                                            </Col>
                                            <Col md="6" style={{margin:"auto"}}>
                                                <NavItem>
                                                    <NavLink href="/components/"><FontAwesomeIcon icon={faBook} size="2x" /></NavLink>
                                                </NavItem>
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
