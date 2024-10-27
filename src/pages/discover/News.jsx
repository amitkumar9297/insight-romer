import React, { useEffect, useState, useRef, useCallback } from "react";
import NewsCard from "./components/NewsCard";
import { Stack, CircularProgress, Typography, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // Import React Slick

const News = () => {
  const [news, setNews] = useState([]);
  const [carouselNews, setCarouselNews] = useState([]); // State for carousel news
  const [page, setPage] = useState(2); // Track the current page for pagination
  const [loading, setLoading] = useState(false); // Manage loading state
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  // Fetch carousel news
  const fetchCarouselNews = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NEWS_BASE_URL}/search?api-key=${
          import.meta.env.VITE_NEWS_API_KEY
        }&page-size=10&order-by=newest&show-fields=thumbnail`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch carousel news.");
      }

      const data = await response.json();
      setCarouselNews(data?.response?.results); // Set carousel news
    } catch (error) {
      console.error("Error fetching carousel news:", error);
    }
  }, []);

  // Fetch news when the page changes or on initial render
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_NEWS_BASE_URL}/search?api-key=${
          import.meta.env.VITE_NEWS_API_KEY
        }&page=${page}&page-size=10&order-by=newest&show-fields=thumbnail,trailText`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news.");
      }

      const data = await response.json();

      setNews((prevNews) => [...prevNews, ...data?.response?.results]);
      setHasMore(data?.response?.results?.length > 0); // Check if there are more articles
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCarouselNews(); // Fetch carousel news on initial render
    fetchNews(); // Fetch news
  }, [fetchCarouselNews, fetchNews]);

  // Intersection Observer to trigger when user scrolls to the bottom
  const observer = useRef();
  const lastNewsCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      {/* Carousel for latest news */}
      <Stack
        width="100%"
        minWidth={"60%"}
        maxWidth="60%"
        margin="auto"
        maxHeight="600px"
        overflow="hidden"
        marginY={"2rem"}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="400px" />
        ) : (
          <Slider {...sliderSettings}>
            {carouselNews.map((article, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={article?.fields?.thumbnail}
                  alt={article?.webTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    bottom: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    textAlign: "center",
                    width: "97%",
                    wordWrap: "break-word",
                    fontSize: "0.6rem",
                  }}
                >
                  {article?.webTitle}
                </Typography>
              </div>
            ))}
          </Slider>
        )}
      </Stack>

      <Stack
        minWidth={"80%"}
        maxWidth={"80%"}
        direction={"column"}
        alignItems={"center"}
        margin={"auto"}
        spacing={2}
      >
        {news.length === 0 && loading
          ? // Render skeletons for news cards while loading
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height="150px"
                sx={{ marginBottom: 2 }}
              />
            ))
          : news.map((article, index) => {
              if (index === news.length - 1) {
                return (
                  <div ref={lastNewsCardRef} key={index}>
                    <NewsCard article={article} />
                  </div>
                );
              } else {
                return <NewsCard key={index} article={article} />;
              }
            })}
        {loading && <CircularProgress />}
        {!hasMore && (
          <Typography variant="h6" color="textSecondary">
            No more articles to load.
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default News;
