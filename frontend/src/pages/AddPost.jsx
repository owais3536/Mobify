import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';

import { createPost } from '../store/postSlice';



const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [postValue, setPostValues] = useState({
        brand: '',
        condition: '',
        title: '',
        description: '',
        image: '',
        location: '',
        price: '',
        name: '',
        phoneNumber: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postValue)).then(() => {
            navigate('/');
        });
    };

    return (
        <div className='add-post'>
            <div className='h3 text-center'>Post your ad</div>
            <Form className='new-post-form'
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
                method='post'
                action='/create-post'>
                <Container>
                    <div className='post-details-section'>
                        <Form.Group className='form-group'>
                            <Form.Label>Brand*</Form.Label>
                            <Form.Control
                                type='text'
                                name='brand'
                                size='lg'
                                required
                                value={postValue.brand}
                                onChange={(e) => setPostValues({ ...postValue, brand: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Condition*</Form.Label>
                            <Form.Control
                                type='text'
                                name='condition'
                                size='lg'
                                required
                                value={postValue.condition}
                                onChange={(e) => setPostValues({ ...postValue, condition: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                size='lg'
                                required
                                value={postValue.title}
                                onChange={(e) => setPostValues({ ...postValue, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Description*</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                name='description'
                                value={postValue.description}
                                onChange={(e) => setPostValues({ ...postValue, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Upload image*</Form.Label>
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) => setPostValues({ ...postValue, image: base64 })} />
                        </Form.Group>
                        <Form.Group className='form-group'>
                            <Form.Label>Location*</Form.Label>
                            <Form.Control
                                type='text'
                                name='location'
                                size='lg'
                                required
                                value={postValue.location}
                                onChange={(e) => setPostValues({ ...postValue, location: e.target.value })} />
                        </Form.Group>
                    </div>
                    <div className='mobile-price'>
                        <Form.Group className='form-group'>
                            <Form.Label>Price*</Form.Label>
                            <Form.Control
                                type='number'
                                name='price'
                                size='lg'
                                required
                                value={postValue.price}
                                onChange={(e) => setPostValues({ ...postValue, price: e.target.value })} />
                        </Form.Group>
                    </div>
                    <div className='personal-details'>
                        <Form.Group className='form-group'>
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                size='lg'
                                required
                                value={postValue.name}
                                onChange={(e) => setPostValues({ ...postValue, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className='form-group phoneNumber'>
                            <Form.Label>Your phone number*</Form.Label>
                            <Form.Control
                                type='text'
                                name='phoneNumber'
                                size='lg'
                                required
                                value={postValue.phoneNumber}
                                onChange={(e) => setPostValues({ ...postValue, phoneNumber: e.target.value })} />
                        </Form.Group>
                        <div className='submit-btn'>
                            <Button variant='primary' type='submit'>Add</Button>
                        </div>
                    </div>
                </Container>
            </Form>
        </div>
    );
};

export default AddPost;