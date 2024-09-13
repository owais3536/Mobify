import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Banner from "../components/Banner";
import { fetchAllPosts } from '../store/postSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [selectBrand, setSelectBrand] = useState("");
    console.log(selectBrand);

    const brands = ["Apple", "Samsung", "Oneplus", "Xaomi", "Oppo", "Infinix", "Google", "Vivo", "Techno"];

    const { posts, status } = useSelector(state => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllPosts());
        }
    }, [dispatch, status]);

    // filter posts based on search term and selected brand
    const filterPosts = posts.filter(post => {
        const matchesSearch =
            search.toLowerCase() === "" || post.title.toLowerCase().includes(search.toLowerCase());
        const matchesBrand = selectBrand === "" || selectBrand === post.brand;
        console.log(matchesBrand);

        return matchesSearch && matchesBrand;
    });


    return (
        <div className="home">
            <Banner />
            <Container className='my-5'>
                <Row className="gx-0">
                    <Col lg={2} md={2} sm={12} className="left-section">
                        <div className="categories">
                            <h1>Category</h1>
                            <ul className="category-list">
                                <li onClick={() => setSelectBrand("")}>
                                    All brands
                                </li>
                                {brands.map((brand, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setSelectBrand(brand)}>
                                        {brand}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                    <Col lg={10} md={10} sm={12} className="p-0">
                        <Row className="gx-0">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="py-3 ms-5 w-75"
                                onChange={e => setSearch(e.target.value)} />
                        </Row>

                        <Row className="my-5 gx-0">
                            {filterPosts.length > 0 ? (
                                filterPosts.map(post => (
                                    <Card
                                        key={post._id}
                                        style={{ width: '20rem', cursor: 'pointer' }}
                                        className="py-0 px-0 m-3"
                                        onClick={() => navigate(`/post-details/${post._id}`)}>
                                        <Card.Img variant="top" src={post.image} style={{ height: '200px' }} />
                                        <Card.Body>
                                            <div className='h5 my-3'>{post.brand}</div>
                                            <div className='h3 mb-3'>{post.title}</div>
                                            <div className='h5 my-3'>Rs {post.price}</div>
                                            <div className='h6'>{post.location}</div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) :
                                (<span className="no-match-found">No match found</span>)
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Home;