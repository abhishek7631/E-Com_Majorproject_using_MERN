import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "./../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/AuthStyles.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      toast.success("Login Successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Login Failed");
    }
  };
  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="form-container">
        <Toaster />
        <Form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            LOGIN
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
