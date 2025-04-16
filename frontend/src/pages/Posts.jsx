import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { isTokenValid } from "../utils/auth";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
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

        const response = await fetch("http://localhost:3000/api/posts", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          console.error(data.error || "Failed to retrieve posts.");
          return;
        }

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  if (isLoading || !posts) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <>
      {posts.map((post) => (
        <Card key={post._id}>
          <Card.Header>{post.author.username}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Button variant="primary" as={Link} to={`/posts/${post._id}`}>
              View Post Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
