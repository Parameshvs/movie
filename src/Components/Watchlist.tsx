import React from 'react';
import styled from 'styled-components';
import { useMovies } from '../Context/MoviesContext';
import WatchlistCard from './WatchlistCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist, updateRating } = useMovies();

  return (
    <List>
      {watchlist.map(movie => (
        <WatchlistCard
          key={movie.imdbID}
          movie={movie}
          onRemove={() => removeFromWatchlist(movie.imdbID)}
          onUpdateRating={(rating: number) => updateRating(movie.imdbID, rating)}
        />
      ))}
    </List>
  );
};

export default Watchlist;
