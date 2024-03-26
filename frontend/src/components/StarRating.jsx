import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function StarRating({ rating, size = "medium" }) {
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
        size={size}
        readOnly
      />
    </Box>
  );
}
