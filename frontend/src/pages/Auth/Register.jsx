import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "./../../components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/AuthStyles.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      toast.success("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="form-container">
        <Toaster />
        <Form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <Form.Group className="mb-3" controlId="formBasicName">
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            {/* <Form.Label>Phone</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter Your Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            {/* <Form.Label>Address</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default Register;
