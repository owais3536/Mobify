import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost } from "../store/postSlice";

const PostEdit = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postValue, setPostValues] = useState({
    brand: "",
    condition: "",
    title: "",
    description: "",
    image: "",
    location: "",
    price: "",
    name: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editPost({ id, postData: postValue })).then(() => {
      console.log("not working");
      navigate("/dashboard");
    });
  };

  const handleClear = () => {};

  return (
    <div className="post-edit">
      <Form className="post-edit-form" onSubmit={handleSubmit}>
        <Container>
          <div className="form-title display-5 mb-4 pb-3 border-bottom">
            Edit your post
          </div>
          <div className="post-details-section">
            <Form.Group className="form-group">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                size="lg"
                value={postValue.brand}
                onChange={(e) =>
                  setPostValues({ ...postValue, brand: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                type="text"
                name="condition"
                size="lg"
                value={postValue.condition}
                onChange={(e) =>
                  setPostValues({ ...postValue, condition: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                size="lg"
                value={postValue.title}
                onChange={(e) =>
                  setPostValues({ ...postValue, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={postValue.description}
                onChange={(e) =>
                  setPostValues({ ...postValue, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group file-base-input">
              <Form.Label>Upload image</Form.Label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostValues({ ...postValue, image: base64 })
                }
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                size="lg"
                value={postValue.location}
                onChange={(e) =>
                  setPostValues({ ...postValue, location: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="mobile-price">
            <Form.Group className="form-group">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                size="lg"
                value={postValue.price}
                onChange={(e) =>
                  setPostValues({ ...postValue, price: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="personal-details">
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                size="lg"
                value={postValue.name}
                onChange={(e) =>
                  setPostValues({ ...postValue, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="form-group phoneNumber">
              <Form.Label>Your phone number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                size="lg"
                value={postValue.phoneNumber}
                onChange={(e) =>
                  setPostValues({ ...postValue, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <div className="submit-btn">
              <Button variant="secondary" onClick={handleClear}>
                Discard
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </div>
        </Container>
      </Form>
    </div>
  );
};

export default PostEdit;
