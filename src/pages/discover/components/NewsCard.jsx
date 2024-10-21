import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const NewsCard = ({ article }) => {
  const { source, title, description, url, urlToImage, publishedAt } = article;

  return (
    <Stack width={"100%"} direction={"row"} justifyContent={"center"}>
      <Card
        sx={{
          display: "flex",
          minWidth: "100%",
          maxWidth: "100%",
          margin: 2,
          boxShadow: 3,
          cursor: "pointer",
        }}
        onClick={() => window.open(url, "_blank")}
      >
        <Box sx={{ position: "relative", minWidth: 150 }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={urlToImage}
            alt={title}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "2px 5px",
              borderRadius: 1,
            }}
          >
            {source?.name}
          </Typography>
        </Box>

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flex: 1, mr: 1, textAlign: "left" }}
          >
            {description}
          </Typography>
        </CardContent>
        <IconButton
          size="small"
          color="primary"
          sx={{ margin: "1rem" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card click from triggering
            window.open(url, "_blank");
          }}
        >
          <OpenInNewIcon />
        </IconButton>
      </Card>
    </Stack>
  );
};

export default NewsCard;
