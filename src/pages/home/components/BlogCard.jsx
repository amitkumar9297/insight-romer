import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const BlogCard = ({ blog, onView }) => {
  const styles = {
    truncatedDescription: {
      display: "-webkit-box",
      WebkitLineClamp: 2, // Number of lines to show
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "1rem",
      // lineHeight: "1.6",
      height: "3.5rem",
    },
  };
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="150"
        image={blog?.image}
        alt={blog?.title}
      />
      <CardContent>
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
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
            <IconButton>
              <CalendarTodayIcon style={{ fontSize: "1rem", padding: "0px" }} />
            </IconButton>
            <Typography variant="body2" color="textSecondary">
              {new Date(blog?.createdAt).toLocaleDateString()}{" "}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h5"
          component="div"
          fontWeight={700}
          height={"3.5rem"}
          style={styles.truncatedDescription}
          marginBottom={"0px"}
        >
          {blog?.title}
        </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.discription }}
          // style={{ fontSize: "1rem", lineHeight: "1.6" }}
          style={styles.truncatedDescription}
        />
      </CardContent>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}
        margin={0}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onView(blog?._id)}
        >
          View
        </Button>
      </Box>
    </StyledCard>
  );
};

export default BlogCard;
