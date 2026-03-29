import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

const StarRating = ({ rating, reviewCount, size = "sm" }: StarRatingProps) => {
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className={`${iconSize} amazon-star fill-current`} />);
    } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
      stars.push(<StarHalf key={i} className={`${iconSize} amazon-star fill-current`} />);
    } else {
      stars.push(<Star key={i} className={`${iconSize} text-gray-300`} />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {reviewCount !== undefined && (
        <span className="amazon-link text-sm">{reviewCount.toLocaleString()}</span>
      )}
    </div>
  );
};

export default StarRating;
