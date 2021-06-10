import React from 'react';
import { Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            product:[],
            categories:[],
            product_type:[],
            keyword:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    onChange(e){
        var target=e.target;
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSearch(){
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var {keyword}=this.state; 
        return ( 
            <Container style={{marginTop:"25px",marginRight:"auto",marginBottom:"25px",marginRight:"auto", width:"100vw"}}>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8" style={{margin:"auto"}}>
                        <Form>
                            <Row>
                                <Col md={2} />
                                <Col md={7} >
                                    <Input type="text" name="keyword" placeholder="Nhập sản phẩm cần tìm..." 
                                    value={keyword}
                                    onChange={this.onChange} required />
                                </Col>
                                <Col md={3}>
                                    <Button color="primary" type="submit" onClick={this.onSearch}>Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
            
        );
    }
}


export default Header;

