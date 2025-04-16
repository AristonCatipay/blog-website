import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isTokenValid } from "../utils/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    setToken(storedToken);
  }, [navigate]);

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(null);

    try {
      if (!token || !isTokenValid(token)) {
        localStorage.removeItem("jwtToken");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const data = await response.json();
        handleShowAlert(data.error || "Failed to create a post", "danger");
        return;
      }

      handleShowAlert("Post created successfully! Redirect...");
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    } catch (error) {
      console.error("Failed in creating the post:", error.message);
      handleShowAlert("Failed in creating the post.", "danger");
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Enter description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Button className="mx-2" variant="success" type="submit">
          Submit
        </Button>
        <Button className="mx-2" variant="warning" type="reset">
          Reset
        </Button>
      </Form>
    </>
  );
}
