import axios from 'axios';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'reactstrap';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class HistoryOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
        }
    }

    loadOrders(){
        axios.get('http://127.0.0.1:8000/api/get-history-order/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                orders: res.data
            })
        }).catch( err => console.log(err) )
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
                    this.props.history.push('/order-tracking/' + row.order_id);
                }} outline color="info" style={{margin: "10px"}}>Xem chi tiết hóa đơn</Button>,
                button: true,
            }
        ];
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Navigation/>
                {/* <Carousels /> */}
                <div className="content" style={{minHeight:"62vh"}}>
                    <div className="container-fluid">
                        <DataTable
                            title="Lịch sử đơn đặt hàng"
                            columns={columns}
                            data={ this.state.orders }
                            pagination
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default HistoryOrder;