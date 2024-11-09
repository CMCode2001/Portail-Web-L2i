import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  hoveredRating: number;
  onRate: (rating: number) => void;
  onHover: (rating: number) => void;
  onLeave: () => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  hoveredRating,
  onRate,
  onHover,
  onLeave
}) => {
  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          className="btn btn-link p-0 text-decoration-none"
        >
          <Star
            className={`${
              star <= (hoveredRating || rating)
                ? 'text-warning fill-warning'
                : 'text-secondary'
            }`}
            size={32}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;