import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

const SearchBar = (props) => {

    const Brands = [
        "Apple", "Samsung", "Oneplus", "Xoami", "Infinix", "Oppo"
    ];


    return (
        <Container>
            <Row>
                {/* <Col lg={2}>
                    <Form.Select className='py-3'>
                        <option value="">Brand</option>
                        {Brands.map(brand => (
                            <option>{brand}</option>
                        ))}
                    </Form.Select>
                </Col> */}
                {/* <Col lg={10}> */}
                <Form.Control
                    type='text'
                    placeholder='Search'
                    className='py-3'
                />
                {/* </Col> */}
            </Row>
        </Container >
    );
};

export default SearchBar;