import axios from 'axios';
import { Button, Form, Label } from 'reactstrap';
import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShowColorDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            color_details: [],
            colors: [],
            products: [],

            filter_text: "",
        };
        this.loadColorDetails = this.loadColorDetails.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loadColorDetails(){
        axios.get('http://127.0.0.1:8000/api/color-details/')
        .then(res => {
            this.setState({
                color_details: res.data
            });
        })
        .catch( err => console.log(err) );
    }
    loadColor(){
        axios.get('http://127.0.0.1:8000/api/color/')
        .then(res => {
            this.setState({
                colors: res.data
            });
        })
        .catch( err => console.log(err) );
    }
    loadProduct(){
        axios.get('http://127.0.0.1:8000/api/product/')
        .then(res => {
            console.log(res);
            this.setState({
                products: res.data
            });
        })
        .catch( err => console.log(err) );
    }

    componentWillMount(){
        this.loadColorDetails();
        this.loadColor();
        this.loadProduct();
    }

    onDelete(id){
        axios.delete('http://127.0.0.1:8000/api/color-details/' + id)
        .then(res => {
            if(res.data != null){
                this.loadColorDetails();
            }
        })
    }

    render() {
        const columns = [
            {
                name: 'M?? m??u',
                selector: 'color_id',
                sortable: true,
                cell: row => (
                    <>
                        {this.state.colors.map((item, index) => <div key={index}> {item.color_id == row.color_id && row.color_id + " - " + item.color_name}</div>)}
                    </>
                ),
            },
            {
                name: 'M?? chi ti???t m??u',
                selector: 'color_detail_id',
                sortable: true,
                right: true,
            },
            {
                name: 'M?? s???n ph???m',
                selector: 'product_id',
                sortable: true,
                right: true,
                cell: row => (
                    <>
                        {this.state.products.map((item, index) => <div key={index}> {item.product_id == row.product_id && row.product_id + " - " + item.product_name}</div>)}
                    </>
                ),
            },
            {
                name: 'Ng??y th??m',
                selector: 'create_at',
                sortable: true,
                right: true,
            },
            {
                name: 'Ng??y c???p nh???t',
                selector: 'update_at',
                sortable: true,
                right: true,
            },
            // {
            //     cell: row => <Button onClick={ () => {
            //                     this.props.history.push({
            //                         pathname: '/admin/home/edit-color-details/' + row.color_detail_id,
            //                         sendData: {
            //                             color_detail_id: row.color_detail_id
            //                         }
            //                     });
            //                 }} outline color="info" style={{margin: "10px"}}>S???a</Button>,
            //     button: true,
            // },
            {
                cell: row => <Button onClick={ (id)=>this.onDelete(row.color_detail_id)} outline color="danger" style={{margin: "10px"}}>X??a</Button>,
                button: true,
            }
        ];
        var filter_color_details = this.state.filter_text == "" ? this.state.color_details : this.state.color_details.filter(item => item.product_id && item.product_id == this.state.filter_text);
        const FilterComponent = () => (
            <>
                <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" name="filter_text" value = {this.state.filter_text} onChange={this.onHandleChange} className="form-control bg-light border-0 small" placeholder="M?? s???n ph???m c???n t??m m??u" aria-label="Search" aria-describedby="basic-addon2" />
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
                                {/* <Label for="Name" className="mr-sm-2">Th??m k??ch c??? s???n ph???m:</Label>
                                <Link to = {"/admin/home/add-color-details/"}>
                                    <Button color="success" style={{margin: "10px"}}>Th??m</Button>
                                </Link> */}
                                <DataTable
                                    title="Danh s??ch m??u s???n ph???m"
                                    columns={columns}
                                    data={ filter_color_details }
                                    pagination
                                    subHeader
                                    subHeaderComponent={FilterComponent(this.state.color_details)}
                                />
                                {/* <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">B???ng chi ti???t m??u</h6>
                                    </div>
                                    <div className="card-body">
                                        <Label for="Name" className="mr-sm-2">Th??m chi ti???t m??u:</Label>
                                        <Link to = {"/admin/home/add-color-details/"}>
                                            <Button color="success" style={{margin: "10px"}}>Th??m</Button>
                                        </Link>
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>M?? chi ti???t m??u</th>
                                                        <th>M?? m??u</th>
                                                        <th>M?? s???n ph???m</th>
                                                        <th>Ng??y th??m</th>
                                                        <th>Ng??y c???p nh???t</th>
                                                        <th>T??c v???</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>M?? chi ti???t m??u</th>
                                                        <th>M?? m??u</th>
                                                        <th>M?? s???n ph???m</th>
                                                        <th>Ng??y th??m</th>
                                                        <th>Ng??y c???p nh???t</th>
                                                        <th>T??c v???</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    {
                                                        this.state.color_details.map((item, index) => 
                                                            <tr key={ index }>
                                                                <td>{item.color_detail_id}</td>
                                                                <td>{item.color_id}</td>
                                                                <td>{item.product_id}</td>
                                                                <td>{item.create_at}</td>
                                                                <td>{item.update_at}</td>
                                                                <td>
                                                                    <Link to = {"/admin/home/edit-color-details/" + item.color_detail_id}>
                                                                        <Button outline color="info" style={{margin: "10px"}}>S???a</Button>
                                                                    </Link>
                                                                    
                                                                    <Button onClick={ (id)=>this.onDelete(item.color_detail_id) } outline color="danger" style={{margin: "10px"}}>X??a</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>   */}
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowColorDetails;