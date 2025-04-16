import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { isTokenValid } from "../utils/auth";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(null);
  const navigate = useNavigate();

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const storedToken = localStorage.getItem("jwtToken");

        if (!storedToken) {
          navigate("/login");
          return;
        }

        if (!isTokenValid(storedToken)) {
          localStorage.removeItem("jwtToken");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          handleShowAlert(
            data.error || "Failed to fetch the current user",
            "danger"
          );
          return;
        }

        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.log("Failed to fetch user information:", error.message);
        handleShowAlert("Failed to fetch user information.", "danger");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const storedToken = localStorage.getItem("jwtToken");

        if (!storedToken) {
          navigate("/login");
          return;
        }

        if (!isTokenValid(storedToken)) {
          localStorage.removeItem("jwtToken");
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          const data = response.json();
          handleShowAlert(data.error || "Failed to retrieve post.", "danger");
          return;
        }

        const postDetails = await response.json();
        setPost(postDetails);
      } catch (error) {
        console.error("Failed to retrieve the post:", error.message);
        handleShowAlert("Failed to retrieve the post.", "danger");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    if (post && currentUser) {
      setUserIsAuthor(post.author._id === currentUser._id);
    }
  }, [post, currentUser]);

  if (isLoading || !post) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <h1>Post Details</h1>
      {userIsAuthor ? (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                defaultValue={post.title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter description"
                defaultValue={post.description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>

            <Button className="mx-2" variant="warning">
              Update
            </Button>
            <Button className="mx-2" variant="danger">
              Delete
            </Button>
          </Form>
        </>
      ) : (
        post && (
          <Card key={post._id}>
            <Card.Header>{post.author.username}</Card.Header>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
            </Card.Body>
          </Card>
        )
      )}
    </>
  );
}
