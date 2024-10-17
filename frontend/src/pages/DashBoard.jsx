import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "../store/postSlice";
import { Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status, error } = useSelector((state) => state.posts);

  const loadPost = useCallback(() => {
    dispatch(fetchPosts());
  }, [fetchPosts]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      loadPost();
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  return (
    <div className="dashboard">
      {status == "pending" && <p>Loading...</p>}
      {status == "failed" && <p>Error: {error}</p>}
      {status == "success" && (
        <Container>
          <Row className="position-relative">
            {posts.map((post) => (
              <Card
                key={post._id}
                style={{ width: "18rem" }}
                className="m-3 p-0"
              >
                <Card.Img
                  variant="top"
                  src={post.image}
                  style={{ height: "200px" }}
                />
                <Card.Header>
                  <Card.Title className="py-3">{post.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>{post.condition}</p>
                  <p>{post.description}</p>
                  <p>{post.location}</p>
                  <p>Rs {post.price}</p>
                  <div className="post-icons">
                    <div
                      className="edit-icon"
                      onClick={() => navigate(`/edit-post/${post._id}`)}
                    >
                      <i className="fa-solid fa-file-pen"></i>
                    </div>
                    <div
                      className="trash-icon"
                      onClick={() => handleDelete(post._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default DashBoard;
