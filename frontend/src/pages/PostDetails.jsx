import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails } from '../store/postSlice';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { postID } = useParams();

    const dispatch = useDispatch();
    const currentPost = useSelector(state => state.posts.currentPost);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);


    useEffect(() => {
        dispatch(getPostDetails(postID));
    }, [dispatch, postID]);

    if (status === 'pending') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='post-details-page position-relative py-3'>
            <Container className='post-details-container'>
                {currentPost ? (<>
                    <div className='post-img'>
                        <img src={currentPost.image} style={{ objectFit: "contain"}} />
                    </div>
                    <div className="details">
                        <div className='post-content'>
                            <div className='content-group'>
                                <div className='content-heading'>Title:</div>
                                <div className='content-detail'>{currentPost.title}</div>
                            </div>
                            <div className='content-group'>
                                <div className='content-heading'>Brand:</div>
                                <div className='content-detail'>{currentPost.brand}</div>
                            </div>
                            <div className='content-group'>
                                <div className='content-heading'>Condition:</div>
                                <div className='content-detail'>{currentPost.condition}</div>
                            </div>
                            <div className='content-group'>
                                <div className='content-heading'>Description:</div>
                                <div className='content-detail'>{currentPost.description}</div>
                            </div>
                        </div>
                        <div className='post-content'>
                            <div className='content-group'>
                                <div className='content-heading'>Name:</div>
                                <div className='content-detail'>{currentPost.name}</div>
                            </div>
                            <div className='content-group'>
                                <div className='content-heading'>Location:</div>
                                <div className='content-detail'>{currentPost.location}</div>
                            </div>
                            <div className='content-group'>
                                <div className='content-heading'>Contect:</div>
                                <div className='content-detail'>{currentPost.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                </>
                ) : (
                    <div>Post not found</div>
                )}
            </Container>
        </div>
    );
};

export default PostDetails;