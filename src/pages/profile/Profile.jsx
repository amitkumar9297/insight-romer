import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Stack,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/userSlice";

function EditProfileDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/updateUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            username,
            profilePicture,
            bio,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        toast.success("Profile updated successfully");
        setTimeout(() => {
          dispatch(fetchUser());
        }, 800);
      } else {
        toast.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }

    console.log("Username:", username);
    console.log("Profile Picture:", profilePicture);
    console.log("Bio:", bio);
    onClose(); // Close the dialog
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      style={{
        borderRadius: "1rem",
      }}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <Avatar
            src={profilePicture}
            style={{ width: 60, height: 60, marginRight: 16 }}
          />
          <TextField
            type="url"
            label="Profile Picture URL"
            fullWidth
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            margin="normal"
          />
        </div>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, status } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState(user?.blogs || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setBlogs(user?.blogs || []);
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blog/delete-blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId: localStorage.getItem("user") }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.message === "Blog deleted successfully") {
        toast.success("Post created successfully");
        setTimeout(() => {
          dispatch(fetchUser());
        }, 800);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "40px", padding: 0 }}>
      <Stack
        container
        spacing={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          height: "calc(100vh - 160px)",
        }}
      >
        {/* Left Section: User Details */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            height: "100%",
            width: { xs: "100%", md: "30%" },
            overflowY: "auto",
            order: { xs: 1, md: 1 },
          }}
        >
          <Box textAlign="center" mb={0}>
            <img
              src={user?.profilePicture} // Replace with actual URL or data
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <Typography variant="h6" mt={2}>
              {user?.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user?.email}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <IconButton onClick={handleClickOpen} color="primary">
              <Edit />
            </IconButton>
            <EditProfileDialog open={open} onClose={handleClose} />
          </Box>
          <Divider />
          <Box mt={2} p={2}>
            <Typography variant="h6">Bio</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.bio}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            height: "100%",
            overflowY: "auto",
            width: { xs: "100%", md: "70%" },
            order: { xs: 2, md: 2 },
            // maxHeight: "calc(100vh - 40px)",
            // overflow: "hidden",
            // position: "relative",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            scrollbarWidth: "none",
          }}
        >
          <Box p={(0, 4)}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer
              sx={{
                maxHeight: "calc(100vh - 160px)",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                scrollbarWidth: "none",
              }}
            >
              <Table>
                <TableHead
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                >
                  <TableRow
                    style={{
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <TableCell>Sr.No</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Likes</TableCell>
                    <TableCell>Comments</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBlogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((blog, index) => (
                      <TableRow key={blog._id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell
                          onClick={() => navigate(`/blog/${blog._id}`)}
                        >
                          <img
                            src={blog?.image}
                            alt="Blog"
                            style={{
                              cursor: "pointer",
                              width: "6rem",
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => navigate(`/blog/${blog._id}`)}
                          cursor="pointer"
                        >
                          <Typography
                            variant="body1"
                            style={{ cursor: "pointer" }}
                          >
                            {blog?.title}
                          </Typography>
                        </TableCell>
                        <TableCell>{blog.likes.length}</TableCell>
                        <TableCell>{blog.comments.length}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/updatePost/${blog._id}`)}
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => deletePost(blog?._id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBlogs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Stack>
      <ToastContainer />
    </Container>
  );
};

export default Profile;
