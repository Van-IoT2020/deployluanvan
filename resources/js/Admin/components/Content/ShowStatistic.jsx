import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import DataTable from 'react-data-table-component';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';

class InputReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year_input: (new Date()).getFullYear(),
            month_input: (new Date()).getMonth()+1,
        }
    }

    onSubmit(){
        var year = this.state.year_input;
        var month = this.state.month_input;
        if(this.state.year_input == ''){
            year = (new Date()).getFullYear();
        }
        if(this.state.month_input == ''){
            month = (new Date()).getMonth()+1;
        }
        this.setState({ 
            year_input: year,
            month_input: month
        })
        console.log('submit: ', year, month);
        this.props.loadInputStatisticData(
            year,
            month
        )
    }
    
    render() {
        return (
            <div>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Name" className="mr-sm-2">Nhập vào năm cần kiểm tra</Label>
                        <Input type="text" onChange={ (e) => {this.setState({ year_input: e.target.value});} } value={this.state.year_input} name="year_input" id="year_input"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="Name" className="mr-sm-2">Nhập vào tháng cần kiểm tra</Label>
                        <Input type="text" onChange={ (e) => {this.setState({ month_input: e.target.value});} } value={this.state.month_input} name="month_input" id="month_input"/>
                    </FormGroup>
                    <Button onClick={ ()=>this.onSubmit() }>Tìm</Button>
                </Form>
                <hr></hr>
            </div>
        );
    }
}

class ShowStatistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statistic: [],
            year_input: (new Date()).getFullYear(),
            month_input: (new Date()).getMonth()+1,
        }
        this.loadInput = this.loadInput.bind(this);
    }

    loadStatistic(){
        const dateForProductSell = {
            year: this.state.year_input,
            month: this.state.month_input
        }
        console.log(dateForProductSell);
        axios.post('http://127.0.0.1:8000/api/tbl-order-statistic/', dateForProductSell)
        .then(res=>{
            console.log('san pham: ',res.data);
            this.setState({
                statistic: res.data
            })
        }).catch( err => console.log(err) );
    }


    loadInput(year, month){
        this.setState({
            year_input: year,
            month_input: month
        },()=>{
            this.loadStatistic();
        })
    }

    componentWillMount(){
        this.loadStatistic();
    }
    
    render() {
        const columns = [
            {
                name: 'Mã sản phẩm',
                selector: 'product_id',
                sortable: true,
            },
            {
                name: 'Tên sản phẩm',
                selector: 'product_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Hình',
                cell: row => <img height="100" width="200" src={ row.product_image } alt="Card image cap" />,
                sortable: true,
                right: true,
            },
            {
                name: 'Số lượng sản phẩm bán được',
                selector: 'product_quantity',
                sortable: true,
                right: true,
            },
            {
                name: 'Tống giá bán sản phẩm trong tháng',
                selector: 'price',
                sortable: true,
                right: true,
            }
        ];

        return (
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <InputReport loadInputStatisticData = {this.loadInput}/>
                                <DataTable
                                    title="Thống kê sản phẩm bán được trong tháng"
                                    columns={columns}
                                    data={ this.state.statistic }
                                    pagination
                                    subHeader
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

export default ShowStatistic;
