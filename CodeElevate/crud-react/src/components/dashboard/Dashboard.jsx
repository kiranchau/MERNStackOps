import React, { useEffect, useState } from "react";
import { deleteRecord, userAllRecord } from "../../API/authCrud";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, sesUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      await userAllRecord()
        .then((res) => {
          console.log("res", res);
          if (res?.status === 200) {
            sesUsers(res?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("error while fetching users: ", error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`user/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id)
        .then((res) => {
          if (res.status === 200) {
            fetchRecord();
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error while fetching users: ", error.message);
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center"> Dashboard Component</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          variant="dark"
                          onClick={() => handleUpdate(user._id)}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
