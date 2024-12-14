import React, { useState } from 'react';
import styled from 'styled-components';
import { Movie } from '../types/types';

interface WatchlistCardProps {
  movie: Movie;
  onRemove: () => void;
  onUpdateRating: (rating: number) => void;
}

const Card = styled.div`
  position: relative;
  width: 200px;
  margin: 15px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 10px 0;
  color: #333;
  text-align: center;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Star = styled.span<{ active: boolean }>`
  font-size: 20px;
  color: ${props => (props.active ? '#FFD700' : '#ccc')};
  cursor: pointer;
  &:hover,
  &:hover ~ & {
    color: #FFD700;
  }
`;

const WatchlistCard: React.FC<WatchlistCardProps> = ({ movie, onRemove, onUpdateRating }) => {
  const [rating, setRating] = useState(movie.Rating || 0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onUpdateRating(newRating);
  };

  return (
    <Card>
      <Poster src={movie.Poster} alt={movie.Title} />
      <Title>{movie.Title}</Title>
      <Button onClick={onRemove}>-</Button>
      <RatingContainer>
        {[...Array(10)].map((_, index) => (
          <Star
            key={index}
            active={index < rating}
            onClick={() => handleRatingChange(index + 1)}
          >
            ★
          </Star>
        ))}
      </RatingContainer>
    </Card>
  );
};

export default WatchlistCard;
