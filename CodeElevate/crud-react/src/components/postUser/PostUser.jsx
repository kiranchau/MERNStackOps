import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./postUser.css";
import { userAddRecord } from "../../API/authCrud";
import { useNavigate } from "react-router-dom";

function PostUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userAddRecord(formData);
      console.log("data", data);
      navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Post New User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="forBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="forBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="forBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Enter phone"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" varient="dark" className="w-100">
          Post User
        </Button>
      </Form>
    </div>
  );
}

export default PostUser;
