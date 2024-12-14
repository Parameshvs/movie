import React from 'react';
import { Movie } from '../types/types';

interface MovieCardProps {
  movie: Movie;
  onWatchlist: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onWatchlist }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="poster" />
      <h3 className="title">{movie.Title}</h3>
      <button className="button" onClick={onWatchlist}>+</button>
    </div>
  );
};

export default MovieCard;
