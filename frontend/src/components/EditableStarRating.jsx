import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function EditableStarRating({
  rating: initialRating = 2.5,
  setRating,
}) {
  const [rating, setLocalRating] = useState(initialRating);

  const handleRatingChange = (event, newValue) => {
    setLocalRating(newValue);
    if (setRating) {
      setRating(newValue);
    }
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="half-rating"
        precision={0.5}
        value={rating}
        size="large"
        onChange={handleRatingChange}
      />
    </Box>
  );
}
