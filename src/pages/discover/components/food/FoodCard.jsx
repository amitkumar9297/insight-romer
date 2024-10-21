// src/FoodCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ meal }) => {
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
