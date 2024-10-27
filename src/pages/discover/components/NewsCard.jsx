import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
  Skeleton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const NewsCard = ({ article }) => {
  if (!article) {
    // Display skeleton when article is not present
    return (
      <Card
        sx={{
          display: "flex",
          minWidth: "100%",
          maxWidth: "100%",
          margin: 2,
          boxShadow: 3,
        }}
      >
        <Skeleton variant="rectangular" width={300} height={150} />
        <CardContent sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="90%" />
        </CardContent>
      </Card>
    );
  }

  const { source, title, description, url, urlToImage, publishedAt } = article;

  return (
    <>
      {window.innerWidth > 768 ? (
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
                image={article?.fields?.thumbnail}
                alt={article?.webTitle}
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
                {"guardians"}
              </Typography>
            </Box>

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {new Date(article?.webPublicationDate).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" lineHeight={1} mb={1}>
                {article?.webTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article?.fields?.trailText}
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
      ) : (
        <>
          <Stack width={"100%"} direction={"row"} justifyContent={"center"}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                minWidth: "100%",
                maxWidth: "100%",
                margin: 2,
                boxShadow: 3,
                cursor: "pointer",
              }}
              onClick={() => window.open(url, "_blank")}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height: 150 }}
                  image={article?.fields?.thumbnail}
                  alt={article?.webTitle}
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
                  {"guardians"}
                </Typography>
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontSize={"0.5rem"}
                  >
                    {new Date(article?.webPublicationDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="h6" fontSize={"0.9rem"} fontWeight={700}>
                    {article?.webTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize={"0.7rem"}
                    fontWeight={400}
                    color="text.secondary"
                  >
                    {article?.fields?.trailText}
                  </Typography>
                  <IconButton
                    aria-label="view"
                    onClick={() => window.open(article?.webUrl, "_blank")}
                    sx={{ position: "absolute", bottom: 5, right: 5 }}
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </CardContent>
              </Box>
            </Card>
          </Stack>
        </>
      )}
    </>
  );
};

export default NewsCard;
