import { faAdversal } from '@fortawesome/free-brands-svg-icons';
import { faAddressCard, faChartArea, faCog, faFolder, faLaughWink, faTable, faTachometerAlt, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grant: "",
        }
        this.showSideAdmin = this.showSideAdmin.bind(this);
    }

    componentWillMount(){
        var admin = sessionStorage.getItem('objAdmin') ? JSON.parse(sessionStorage.getItem('objAdmin')) : '';
        this.setState({
            grant: admin.grant,
        })
    }

    showSideAdmin(){
        if(this.state.grant == 1){
            return <>
                        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                            {/* Sidebar - Brand */}
                            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin/home">
                                <div className="sidebar-brand-icon rotate-n-15">
                                    <FontAwesomeIcon icon={ faLaughWink } size="2x"/>
                                </div>
                                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                            </Link>
                            {/* Divider */}
                            <hr className="sidebar-divider my-0" />
                            {/* Nav Item - Dashboard */}
                            <li className="nav-item active">
                                <Link className="nav-link" to="/admin/home">
                                    <FontAwesomeIcon icon={ faTachometerAlt } fixedWidth className="mr-2"/>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            {/* Divider */}
                            <hr className="sidebar-divider" />
                            {/* Heading */}
                            <div className="sidebar-heading">Ch???c n??ng c?? b???n</div>
                            {/* Nav Item - Pages Collapse Menu */}
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    <FontAwesomeIcon icon={ faCog } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? h??ng h??a</span>
                                </a>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Ch???c n??ng danh m???c:</h6>
                                        <Link className="collapse-item" to="/admin/home/categories">Xem danh m???c</Link>
                                        <Link className="collapse-item" to="/admin/home/add-categories">Th??m danh m???c</Link>

                                        <h6 className="collapse-header">Ch???c n??ng th????ng hi???u:</h6>
                                        <Link className="collapse-item" to="/admin/home/brand">Xem th????ng hi???u</Link>
                                        <Link className="collapse-item" to="/admin/home/add-brand">Th??m th????ng hi???u</Link>

                                        <h6 className="collapse-header">Ch???c n??ng s???n ph???m:</h6>
                                        <Link className="collapse-item" to="/admin/home/product">Xem s???n ph???m</Link>
                                        <Link className="collapse-item" to="/admin/home/add-product">Th??m s???n ph???m</Link>

                                        <h6 className="collapse-header">Ch???c n??ng lo???i:</h6>
                                        <Link className="collapse-item" to="/admin/home/product-type">Xem lo???i</Link>
                                        <Link className="collapse-item" to="/admin/home/add-product-type">Th??m lo???i</Link>

                                        <h6 className="collapse-header">Ch???c n??ng m??u:</h6>
                                        <Link className="collapse-item" to="/admin/home/color">Xem m??u</Link>
                                        <Link className="collapse-item" to="/admin/home/add-color">Th??m m??u</Link>
                                        <Link className="collapse-item" to="/admin/home/color-details">Xem chi ti???t m??u</Link>
                                        {/* <Link className="collapse-item" to="/admin/home/add-color-details">Th??m chi ti???t m??u</Link> */}

                                        <h6 className="collapse-header">Ch???c n??ng size:</h6>
                                        <Link className="collapse-item" to="/admin/home/size-details">Xem chi ti???t size</Link>
                                        {/* <Link className="collapse-item" to="/admin/home/add-size-details">Th??m chi ti???t size</Link> */}
                                    </div>
                                </div>
                            </li>
                            {/* Nav Item - Utilities Collapse Menu */}
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                                    <FontAwesomeIcon icon={ faWrench } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? nh???p</span>
                                </a>
                                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Ch???c n??ng nh?? cung c???p:</h6>
                                        <Link className="collapse-item" to="/admin/home/supplier">Xem nh?? cung c???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-supplier">Th??m nh?? cung c???p</Link>

                                        <h6 className="collapse-header">Ch???c n??ng phi???u nh???p:</h6>
                                        <Link className="collapse-item" to="/admin/home/receipt">Xem phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-receipt">Th??m phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/receipt-details">Xem chi ti???t phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-receipt-details">Th??m chi ti???t phi???u nh???p</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBB" aria-expanded="true" aria-controls="collapseBB">
                                    <FontAwesomeIcon icon={ faAdversal } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? promotion</span>
                                </a>
                                <div id="collapseBB" className="collapse" aria-labelledby="headingBB" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Ch???c n??ng qu???ng c??o:</h6>
                                        <Link className="collapse-item" to="/admin/home/slide">Xem banner</Link>
                                        <Link className="collapse-item" to="/admin/home/add-slide">Th??m banner</Link>
                                    </div>
                                </div>
                            </li>
                            
                            {/* Divider */}
                            <hr className="sidebar-divider" />
                            {/* Heading */}
                            <div className="sidebar-heading">Qu???n l?? n??ng cao</div>
                            {/* Nav Item - Pages Collapse Menu */}
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                                    <FontAwesomeIcon icon={ faFolder } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? ?????t h??ng</span>
                                </Link>
                                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Qu???n l?? ????n giao h??ng:</h6>
                                        <Link className="collapse-item" to="/admin/home/tbl-order">Xem ????n giao</Link>
                                        <div className="collapse-divider" />
                                        {/* <h6 className="collapse-header">Other Pages:</h6>
                                        <Link className="collapse-item" to="/admin/err">404 Page</Link> */}
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                                    <FontAwesomeIcon icon={ faFolder } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? ????nh gi??</span>
                                </Link>
                                <div id="collapsePages1" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Qu???n l?? ????nh gi??:</h6>
                                        <Link className="collapse-item" to="/admin/rating">Danh s??ch ????nh gi??</Link>
                                    </div>
                                </div>
                            </li>
                            {/* {
                                this.showSideAdmin()
                            } */}
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAA" aria-expanded="true" aria-controls="collapseAA">
                                    <FontAwesomeIcon icon={ faAddressCard } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? t??i kho???n</span>
                                </a>
                                <div id="collapseAA" className="collapse" aria-labelledby="headingAA" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Qu???n l?? nh??n vi??n:</h6>
                                        <Link className="collapse-item" to="/admin/home/admin">Xem nh??n vi??n</Link>
                                        <Link className="collapse-item" to="/admin/home/add-admin">Th??m nh??n vi??n</Link>
                                    </div>
                                </div>
                            </li>
                            {/* Nav Item - Charts */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/home">
                                    <FontAwesomeIcon icon={ faChartArea } fixedWidth className="mr-2"/>
                                    <span>Bi???u ?????</span>
                                </Link>
                            </li>
                            {/* Nav Item - Tables */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/home/tbl-order-statistic">
                                    <FontAwesomeIcon icon={ faTable } fixedWidth className="mr-2"/>
                                    <span>Th???ng k?? chi ti???t</span>
                                </Link>
                            </li>
                        </ul>
            </>   
        } else {
            return <>
                        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                            {/* Sidebar - Brand */}
                            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin/home">
                                <div className="sidebar-brand-icon rotate-n-15">
                                    <FontAwesomeIcon icon={ faLaughWink } size="2x"/>
                                </div>
                                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                            </Link>
                            {/* Divider */}
                            <hr className="sidebar-divider my-0" />
                            {/* Nav Item - Dashboard */}
                            <li className="nav-item active">
                                <Link className="nav-link" to="/admin/home">
                                    <FontAwesomeIcon icon={ faTachometerAlt } fixedWidth className="mr-2"/>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            {/* Divider */}
                            <hr className="sidebar-divider" />
                            {/* Heading */}
                            <div className="sidebar-heading">Ch???c n??ng c?? b???n</div>
                            {/* Nav Item - Utilities Collapse Menu */}
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                                    <FontAwesomeIcon icon={ faWrench } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? nh???p</span>
                                </a>
                                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Ch???c n??ng nh?? cung c???p:</h6>
                                        <Link className="collapse-item" to="/admin/home/supplier">Xem nh?? cung c???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-supplier">Th??m nh?? cung c???p</Link>

                                        <h6 className="collapse-header">Ch???c n??ng phi???u nh???p:</h6>
                                        <Link className="collapse-item" to="/admin/home/receipt">Xem phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-receipt">Th??m phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/receipt-details">Xem chi ti???t phi???u nh???p</Link>
                                        <Link className="collapse-item" to="/admin/home/add-receipt-details">Th??m chi ti???t phi???u nh???p</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBB" aria-expanded="true" aria-controls="collapseBB">
                                    <FontAwesomeIcon icon={ faAdversal } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? promotion</span>
                                </a>
                                <div id="collapseBB" className="collapse" aria-labelledby="headingBB" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Ch???c n??ng qu???ng c??o:</h6>
                                        <Link className="collapse-item" to="/admin/home/slide">Xem banner</Link>
                                        <Link className="collapse-item" to="/admin/home/add-slide">Th??m banner</Link>
                                    </div>
                                </div>
                            </li>
                            
                            {/* Divider */}
                            <hr className="sidebar-divider" />
                            {/* Heading */}
                            <div className="sidebar-heading">Qu???n l?? n??ng cao</div>
                            {/* Nav Item - Pages Collapse Menu */}
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                                    <FontAwesomeIcon icon={ faFolder } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? ?????t h??ng</span>
                                </Link>
                                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Qu???n l?? ????n giao h??ng:</h6>
                                        <Link className="collapse-item" to="/admin/home/tbl-order">Xem ????n giao</Link>
                                        <div className="collapse-divider" />
                                        {/* <h6 className="collapse-header">Other Pages:</h6>
                                        <Link className="collapse-item" to="/admin/err">404 Page</Link> */}
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages1" aria-expanded="true" aria-controls="collapsePages">
                                    <FontAwesomeIcon icon={ faFolder } fixedWidth className="mr-2"/>
                                    <span>Qu???n l?? ????nh gi??</span>
                                </Link>
                                <div id="collapsePages1" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        <h6 className="collapse-header">Qu???n l?? ????nh gi??:</h6>
                                        <Link className="collapse-item" to="/admin/rating">Danh s??ch ????nh gi??</Link>
                                    </div>
                                </div>
                            </li>
                            {/* Nav Item - Charts */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/home">
                                    <FontAwesomeIcon icon={ faChartArea } fixedWidth className="mr-2"/>
                                    <span>Bi???u ?????</span>
                                </Link>
                            </li>
                            {/* Nav Item - Tables */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/home/tbl-order-statistic">
                                    <FontAwesomeIcon icon={ faTable } fixedWidth className="mr-2"/>
                                    <span>Th???ng k?? chi ti???t</span>
                                </Link>
                            </li>
                        </ul>
            </>
        }
    }

    render() {
        return (
            <>
                {
                    this.showSideAdmin()
                }
            </>
            
        )
    }
}
