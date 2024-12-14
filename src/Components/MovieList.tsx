import React from 'react';
import styled from 'styled-components';
import { useMovies } from '../Context/MoviesContext';
import MovieCard from './MovieCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieList: React.FC = () => {
  const { movies, addToWatchlist } = useMovies();

  return (
    <List>
 {movies.map(movie => (
   <MovieCard key={movie.imdbID} movie={movie} onWatchlist={() => addToWatchlist(movie)} />
      ))}
    </List>
  );
};

export default MovieList;
