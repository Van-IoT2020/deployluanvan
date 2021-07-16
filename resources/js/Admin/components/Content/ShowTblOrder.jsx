import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Form } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShowOrderDetails from "./ShowOrderDetails";

class ShowTblOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            // order_details:[],
            // info_ship: [],
            // products:[],

            filter_text: "",
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadOrders(){
        axios.get('http://127.0.0.1:8000/api/tbl-order/')
        .then(res => {
            console.log('orders: ', res);
            this.setState({
                orders: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadOrders();
    }
    
    render() {
        const columns = [
            {
                name: '#',
                selector: 'order_id',
                sortable: true,
            },
            {
                name: 'Mã khách hàng',
                selector: 'customer_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Mã giao hàng',
                selector: 'ship_id',
                sortable: true,
                right: true
            },
            {
                name: 'Trạng thái đơn đặt hàng',
                selector: 'order_status',
                sortable: true,
                right: true
            },
            {
                name: 'Phí giao hàng',
                selector: 'fee_ship',
                sortable: true,
                right: true
            },
            {
                name: 'Tổng giá đơn đặt',
                selector: 'total_sold',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày lập đơn',
                selector: 'created_at',
                sortable: true,
                right: true,
            },
            {
                cell: row => <Button onClick={ () => {
                    this.props.history.push('/admin/home/tbl-order-pdf/' + row.order_id);
                }} outline color="info" style={{margin: "10px"}}>In hóa đơn</Button>,
                button: true,
            }
        ];

        var filter_order= this.state.filter_text == "" ? this.state.orders : this.state.orders.filter(item => item.order_id && item.order_id == this.state.filter_text);
        const FilterComponent = () => (
            <>
                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" name="filter_text" value = {this.state.filter_text} onChange={this.onHandleChange} className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <Button className="btn btn-primary" onClick={ () => this.setState({filter_text: ""})} type="button">
                                <FontAwesomeIcon icon={ faTrash } size="sm"/>
                            </Button>
                        </div>
                    </div>
                </Form>
            </>
          );

        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                 <DataTable
                                    title="Danh sách đơn đặt hàng"
                                    columns={columns}
                                    expandableRows
                                    expandableRowsComponent={<ShowOrderDetails />}
                                    // expandableRowsComponent={<ShowInfoShip />}
                                    data={ filter_order }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.orders)}
                                />
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowTblOrder;