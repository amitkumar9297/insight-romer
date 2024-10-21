import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import BlogCard from "./components/BlogCard";
import { useNavigate } from "react-router-dom"; // For navigation

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/blog/all-blog`
        ); // Adjust API endpoint as needed
        const data = await response.json();
        setBlogs(data?.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleView = (blogId) => {
    navigate(`/blog/${blogId}`); // Navigate to blog detail page
  };

  return (
    <Container>
      <Grid container spacing={2} margin={"auto"} width={"100%"}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <BlogCard blog={blog} onView={handleView} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No blogs available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
