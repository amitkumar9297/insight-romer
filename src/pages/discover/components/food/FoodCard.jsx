// src/FoodCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ meal }) => {
  if (!meal) {
    return (
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
          <Skeleton variant="text" width="80%" sx={{ marginBottom: 1 }} />
          <Skeleton variant="text" width="60%" sx={{ marginBottom: 1 }} />
          <Skeleton variant="text" width="90%" />
        </CardContent>
      </Card>
    );
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${meal.idMeal}`, { state: { meal } });
  };

  return (
    <Card onClick={handleClick} sx={{ cursor: "pointer", maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <CardContent>
        <Typography variant="h6">{meal.strMeal}</Typography>
        <Typography variant="body2" color="text.secondary">
          {meal.strArea}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {meal.strInstructions.substring(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
