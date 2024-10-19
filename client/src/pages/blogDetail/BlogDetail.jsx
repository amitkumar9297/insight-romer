import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from URL params
  const [blog, setBlog] = useState(null);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0); // State to track number of likes
  const [liked, setLiked] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const open = Boolean(anchorEl);

  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blog/get-blog/${id}`
      ); // Adjust API endpoint as needed
      const data = await response.json();
      setBlog(data?.blog);

      setComments(data?.blog?.comments || []); // Assuming comments are included
      setLikes(data?.blog?.likes || 0); // Assuming likes count is included
      // Assume user information is in the local storage or context to determine if the user has liked the blog
      setLiked(data?.blog?.likedByCurrentUser ? true : false);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id, liked]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      // Replace with your API endpoint to post comments
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: comment, blogId: id }),
        }
      );

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setComment("");
        toast.success("Add Commment Successfully!");
        setTimeout(() => {
          fetchBlog();
        }, 1000);
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      // Replace with your API endpoint to like the blog
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blog/like/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: localStorage.getItem("user") }), // Toggle like status
        }
      );

      if (response.ok) {
        const result = await response.json();
        setLikes(result.likes); // Update likes count
        setLiked(!liked); // Toggle liked state
      } else {
        console.error("Error liking blog");
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };
  const handleCommentMenuClick = (event, comment) => {
    setCurrentComment(comment);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditComment = () => {
    // Handle edit comment logic
    handleCloseMenu();
  };

  const handleDeleteComment = async (comment) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/comments/${comment?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fullresponse = response.json();

      if (fullresponse?.ok) {
        // setComments(comments.filter((c) => c._id !== currentComment._id));
        toast.success("Comment Deleted!");
      } else {
        console.error("Error deleting comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
    handleCloseMenu();
  };

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{ p: 3 }}
      marginX={"4%"}
      // display={"flex"}
      // flexDirection={"column"}
      // justifyItems={"center"}
      // alignItems={"center"}
    >
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography variant="h4" gutterBottom fontWeight={"700"} width={"100%"}>
          {blog.title}
        </Typography>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "auto",
              maxWidth: "90%",
              height: "auto",
              padding: "1 2rem",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // margin: "0 1rem",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <strong>Author:</strong> {blog?.user?.username}{" "}
          {/* Assuming user object has a name field */}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
          <IconButton>
            <CalendarTodayIcon style={{ fontSize: "1rem", padding: "0px" }} />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {new Date(blog?.createdAt).toLocaleDateString()}{" "}
            {/* Adjust format as needed */}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.discription }}
          style={{ fontSize: "1rem", lineHeight: "1.6" }}
        />
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.content }}
          style={{ fontSize: "1rem", lineHeight: "1.6" }}
        />
      </Box>
      <Divider />
      <Box sx={{ my: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={handleLike}>
          <ThumbUpIcon
            color={
              likes?.includes(localStorage.getItem("user"))
                ? "primary"
                : "action"
            }
          />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {likes === 1 ? "Like" : "Likes"}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <Box>
          <TextField
            label="Add a comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
          >
            Add Comment
          </Button>
        </Box>
        {comments.length > 0 && (
          <List
            style={{
              borderRadius: "1rem",
              backgroundColor: "#D9D9D9",
              padding: "1rem",
              marginTop: "1rem",
              maxHeight: "20rem",
              overflowY: "scroll",
            }}
          >
            {comments.map((comment) => (
              <>
                <ListItem
                  key={comment._id}
                  sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                >
                  <Avatar src={comment?.user?.profilePicture} sx={{ mr: 2 }} />{" "}
                  {/* Avatar */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography variant="body2" fontWeight="bold">
                        {comment?.user?.username || "Unknown"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant="body1" sx={{ mt: 1 }} width={"70%"}>
                        {comment.content}
                      </Typography>
                      {(localStorage.getItem("user") == blog.user ||
                        comment.user._id === localStorage.getItem("user")) && (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 1,
                            width: "20%",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* <IconButton
                          onClick={(event) =>
                            handleCommentMenuClick(event, comment)
                          }
                        >
                          <EditIcon />
                        </IconButton> */}
                          <IconButton
                            onClick={() => handleDeleteComment(comment)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </ListItem>
                <Divider color={"white"} style={{ height: "0.5px" }} />
              </>
            ))}
          </List>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleEditComment}>Edit Comment</MenuItem>
          <MenuItem onClick={handleDeleteComment}>Delete Comment</MenuItem>
        </Menu>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default BlogDetail;
