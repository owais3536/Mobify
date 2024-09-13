import React from 'react';
import { Card } from 'react-bootstrap';

const CardsPost = (props) => {
    return (
        <div>
            <Card
                key={props.id}
                style={{ width: '18rem', cursor: 'pointer' }}
                className="py-0 px-0 m-3"
                onClick={() => navigate(`/post-details/${post._id}`)}>
                <Card.Img variant="top" src={props.image} style={{ height: '200px' }} />
                <Card.Body>
                    <div className='h5 my-3'>Rs {props.price}</div>
                    <div className='h3 mb-3'>{props.title}</div>
                    <div className='h6'>{props.location}</div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CardsPost;