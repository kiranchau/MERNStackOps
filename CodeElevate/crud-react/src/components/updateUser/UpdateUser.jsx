import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateRecord, userRecord } from "../../API/authCrud";
import { Button, Form } from "react-bootstrap";
import "../postUser/postUser.css";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchUserIdRecord = async () => {
    try {
      const res = await userRecord(id);
      if (res.status === 200) {
        setFormData(res.data); // Update formData with fetched data
      } else {
        console.error(`Error fetching user: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserIdRecord();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecord(id, formData)
        .then((res) => {
          if (res.status === 200) {
            console.log("updateRecord", res);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="center-form">
      <h1>Update User</h1>
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
        <Button type="submit" variant="dark" className="w-100">
          Update User
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUser;
