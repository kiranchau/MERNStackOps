import React, { useState } from "react";
import postService from "../services/postService";
import { requestFormReset } from "react-dom";

function CreateComponent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("image", image);

    const response = await postService.create(formData);
    if (response.data.success == true) {
      setMessage("Post Created Successfully");
      setTitle("");
      setDate("");
      setImage("");
    } else {
      setMessage("Post Failed!..");
    }
    setTimeout(function () {
      setMessage("");
    }, 2000);
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateComponent;
