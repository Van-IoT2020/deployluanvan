import React from 'react';
import { Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
function Header() {
    return ( 
        <Container style={{marginTop:"25px",marginRight:"auto",marginBottom:"25px",marginRight:"auto", width:"100vw"}}>
            <Row>
                <Col md="2"></Col>
                <Col md="8" style={{margin:"auto"}}>
                    <Form>
                        <Row>
                            <Col md={2}>
                                <Label sm={2}>Search</Label>
                            </Col>
                            <Col md={7}>
                                <Input type='text' name="search" placeholder="Nhập sản phẩm cần tìm..."/>
                            </Col>
                            <Col md={3}>
                                <Button color="primary" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md="2"></Col>
            </Row>
        </Container>
        
    );
}

export default Header;

