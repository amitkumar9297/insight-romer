import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  // Separate states for each field
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/blog/get-blog/${id}`
        ); // Adjust API endpoint as needed
        const data = await response.json();
        setTitle(data?.blog.title);
        setDescription(data?.blog.discription);
        setImageUrl(data?.blog.image);
        setContent(data?.blog.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: localStorage.getItem("user"),
      title: title,
      discription: description,
      image: imageUrl,
      content: content,
      tags: "",
    };
    const response = await fetch(
      `http://localhost:8000/api/v1/blog/update-blog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      }
    );
    console.log(payload);
    if (response.ok) {
      toast.success("Post updated successfully");
      navigate("/profile");
    }
  };

  return (
    <Stack direction={"column"} width={"100%"} alignItems={"center"}>
      <Box p={3} width={"70%"}>
        <Typography variant="h4" gutterBottom>
          Update Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Box>

          {/* <Box mb={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box> */}

          <Box marginBottom={"1rem"}>
            {/* <Text variant="h6">Description</Text> */}
            <SunEditor
              setContents={description}
              placeholder="Write blog description here..."
              onChange={setDescription}
              setOptions={{
                buttonList: [
                  ["fontSize", "formatBlock"],
                  ["bold", "underline", "italic"],
                  ["fontColor", "hiliteColor"],
                  ["removeFormat"],
                  ["link"],
                  ["preview", "fullScreen"],
                  ["showBlocks", "codeView"],
                ],
              }}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "200px",
                width: "100%",
              }}
            />
          </Box>

          <Box mb={2}>
            <SunEditor
              setContents={content}
              placeholder="Write blog content here..."
              onChange={(content) => setContent(content)}
              setOptions={{
                buttonList: [
                  ["fontSize"],
                  ["bold", "underline", "italic", "blockquote"],
                  ["formatBlock"],
                  ["align", "horizontalRule", "list", "table"],
                  ["fontColor", "hiliteColor"],
                  ["removeFormat"],
                  ["link", "image", "video"],
                  ["preview"],
                  ["showBlocks", "codeView", "fullScreen"],
                ],
              }}
            />
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Update Post
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Stack>
  );
};

export default EditPost;
