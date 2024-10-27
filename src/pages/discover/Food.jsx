import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Card,
  Skeleton,
  CardContent,
} from "@mui/material";
import FoodCard from "./components/food/FoodCard";
import _ from "lodash"; // Import lodash for throttling
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();
  const handleCrouselClick = (meal) => {
    navigate(`/meal/${meal.idMeal}`, { state: { meal } });
  };
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if there are more meals to load
  const [page, setPage] = useState(0); // Track page with state
  const [carouselMeals, setCarouselMeals] = useState([]);

  // Function to fetch random meals for the carousel
  const fetchCarouselMeals = async () => {
    try {
      // Create an array of promises to fetch 7 random meals
      const mealPromises = Array.from({ length: 7 }, () =>
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      );

      // Wait for all fetch requests to resolve
      const responses = await Promise.all(mealPromises);
      const dataPromises = responses.map((response) => response.json());
      const mealsData = await Promise.all(dataPromises);

      // Filter out any undefined meals (if any)
      const fetchedCarouselMeals = mealsData
        .map((data) => data.meals)
        .flat()
        .filter(Boolean);

      if (fetchedCarouselMeals.length > 0) {
        setCarouselMeals(fetchedCarouselMeals); // Set state for carousel meals
      }
    } catch (error) {
      console.error("Error fetching carousel meals:", error);
    }
  };

  // Call this function in the useEffect hook to fetch carousel meals on component mount
  useEffect(() => {
    fetchCarouselMeals(); // Fetch carousel meals when the component mounts
  }, []);

  // Fetch meals from API
  const fetchMeals = async () => {
    try {
      setLoading(true);

      // Create an array of promises to fetch 20 random meals
      const mealPromises = Array.from({ length: 10 }, () =>
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      );

      // Wait for all fetch requests to resolve
      const responses = await Promise.all(mealPromises);
      const dataPromises = responses.map((response) => response.json());
      const mealsData = await Promise.all(dataPromises);

      // Filter out any undefined meals (if any)
      const fetchedMeals = mealsData
        .map((data) => data.meals)
        .flat()
        .filter(Boolean);

      if (fetchedMeals.length > 0) {
        setMeals((prevMeals) => [...prevMeals, ...fetchedMeals]); // Append new meals
        setHasMore(true);
      } else {
        setHasMore(false); // No more meals to load
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch meals when the component mounts or when the page changes
  useEffect(() => {
    fetchMeals();
  }, [page]);

  // Throttled scroll handler to avoid multiple calls
  const handleScroll = useCallback(
    _.throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1); // Update page state
      }
    }, 500), // Throttle with 500ms delay
    [loading, hasMore]
  );

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
    ],
  };

  return (
    <Container>
      <div style={{ marginBottom: "20px", marginTop: "2rem" }}>
        <Slider {...sliderSettings}>
          {loading
            ? // Render skeletons while loading
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    height: "400px",
                    cursor: "pointer",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="400px"
                    style={{
                      borderRadius: "8px",
                      marginRight: "20px",
                    }}
                  />
                </div>
              ))
            : carouselMeals.map((meal) => (
                <div
                  key={meal.idMeal}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    height: "600px",
                  }}
                  onClick={() => handleCrouselClick(meal)}
                >
                  {/* Left side: Meal image */}
                  {window.innerWidth > 768 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        height: "400px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{
                          width: "40%", // Take full width
                          height: "100%", // Take full height of the carousel item
                          borderRadius: "8px",
                          objectFit: "cover", // Maintain aspect ratio
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          paddingLeft: "20px",
                          fontSize: "0.6rem",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "1rem",
                        }}
                      >
                        <Typography variant="h5" align="center">
                          {meal.strMeal}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: "1rem" }}>
                          Ingredients:
                        </Typography>
                        <ul
                          style={{
                            marginLeft: "20px",
                            listStyleType: "square",
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "0.8rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {Object.keys(meal)
                            .filter(
                              (key) =>
                                key.startsWith("strIngredient") && meal[key]
                            )
                            .map((key, index) => (
                              <li key={index} style={{ marginLeft: "20px" }}>
                                {meal[key]}
                              </li>
                            ))}
                        </ul>
                        <Typography variant="h6" style={{ marginTop: "1rem" }}>
                          Instructions:
                        </Typography>
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 7,
                            fontSize: "0.8rem",
                          }}
                        >
                          <Typography style={{ marginLeft: "0.7rem" }}>
                            {meal.strInstructions}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      style={{
                        width: "100%", // Take full width
                        height: "200px", // Take full height of the carousel item
                        borderRadius: "8px",
                        cursor: "pointer",
                        objectFit: "cover", // Maintain aspect ratio
                      }}
                    />
                  )}
                </div>
              ))}
        </Slider>
      </div>

      <Grid
        marginLeft={0}
        container
        spacing={2}
        justifyContent={"center"}
        margin={"auto"}
        marginTop={"3rem"}
      >
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <FoodCard meal={meal} />
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

      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <CircularProgress />
        </div>
      )}

      {/* {!hasMore && !loading && (
        <Typography
          variant="h6"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          No more meals to load.
        </Typography>
      )} */}
    </Container>
  );
};

export default Food;
