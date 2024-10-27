import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
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
          <Grid
            marginLeft={0}
            container
            spacing={2}
            justifyContent={"center"}
            margin={"auto"}
            marginTop={"3rem"}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "100%",
                    maxWidth: "345px",
                    margin: 2,
                    boxShadow: 3,
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" height={140} />
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="80%"
                      sx={{ marginBottom: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      sx={{ marginBottom: 1 }}
                    />
                    <Skeleton variant="text" width="90%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
