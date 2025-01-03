import React, { useEffect, useState } from "react";
import postService from "../services/postService";
import UpdateModelComponent from "./UpdateModelComponent";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";

function ShowComponent() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    setPosts(await postService.getPost());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onDelete = async (id) => {
    const data = await postService.deletePost(id);
    if (data.data.success === true) {
      alert(data.data.msg);
      fetchPosts();
    }
  };

  return (
    <div className="App">
      <h3>Posts</h3>
      {posts.data !== undefined && posts.data.data.length > 0 && (
        <Table style={{ width: "100%" }} border={1}>
          <thead>
            <tr>
              <td>Title</td>
              <td>Date</td>
              <td>Image</td>
              <td>Delete</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {posts.data.data.map((obj) => {
              return (
                <tr key={obj._id}>
                  <td>{obj.title}</td>
                  <td>{obj.date}</td>
                  <td>
                    <img
                      src={"http://localhost:8000/api/postImages/" + obj.image}
                      alt="obj.image"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => onDelete(obj._id)}
                    >
                    Delete
                    </Button>
                   
                  </td>
                  <td>
                  <UpdateModelComponent id={obj._id} title={obj.title} date={obj.date} fetchPosts={fetchPosts}/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ShowComponent;
