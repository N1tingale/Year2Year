export default function TutorReviewItem({ rating, description }) {
  return (
    <div>
      <h3>Rating: {rating}</h3>
      <p>{description}</p>
    </div>
  );
}
