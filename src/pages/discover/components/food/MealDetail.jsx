// src/MealDetail.jsx
import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const MealDetail = () => {
  const location = useLocation();
  const meal = location.state?.meal; // Optional chaining to avoid errors

  if (!meal) return <Typography>Loading...</Typography>;

  // Function to format instructions
  const formatInstructions = (instructions) => {
    return instructions.split("\r\n").map((step, index) => (
      <Typography key={index} variant="body2" paragraph>
        {step}
      </Typography>
    ));
  };

  return (
    <Container sx={{ paddingY: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <iframe
            width="100%"
            height={"600px"}
            src={meal.strYoutube.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: "1rem" }}>
            <Typography variant="h5">{meal.strMeal}</Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Ingredients:
            </Typography>
            <ul>
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i}>
                      {ingredient}: {measure}
                    </li>
                  )
                );
              })}
            </ul>
          </Paper>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Instructions:</Typography>
            {formatInstructions(meal.strInstructions)}
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={6}>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default MealDetail;
