import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import postService from "../services/postService";

function UpdateModelComponent(props) {
  const [isShow, invokeModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [id, setId] = useState(props.id);
  const [selectFile, setSelectFile] = useState("");

  const initModal = () => {
    return invokeModal(!isShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("date", date);
    if (selectFile !== "" && selectFile.length !== 0) {
      formData.append("image", selectFile);
    }
    const response = await postService.updatePost(formData);
    if(response.data.success === true){
        alert(response.data.msg);
        props.fetchPosts();
    }else{
        alert(response.data.msg);
    }
    initModal();
  };

  return (
    <div>
      <Button variant="success" onClick={initModal}>
        Edit
      </Button>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              <label>Title: </label>{" "}
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Enter the Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div>
              <label>Date: </label>{" "}
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div>
              <label>Image: </label>{" "}
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setSelectFile(e.target.files[0]);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button type="submit" variant="dark">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateModelComponent;
