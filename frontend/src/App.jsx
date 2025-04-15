import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";

import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavigationBar></NavigationBar>
        <Container>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/posts" element={<Posts></Posts>}></Route>
            <Route
              path="/posts/create"
              element={<CreatePost></CreatePost>}
            ></Route>
            <Route
              path="/posts/:id"
              element={<PostDetails></PostDetails>}
            ></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
