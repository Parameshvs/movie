import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import axios from 'axios';
import { Movie } from '../types/types';

interface MoviesState {
  movies: Movie[];
  watchlist: Movie[];
}

interface MoviesAction {
  type: 'SET_MOVIES' | 'ADD_TO_WATCHLIST' | 'REMOVE_FROM_WATCHLIST' | 'UPDATE_RATING';
  payload?: any;
}

interface MoviesContextProps extends MoviesState {
  fetchMovies: (query: string) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (imdbID: string) => void;
  updateRating: (imdbID: string, rating: number) => void;
}

const initialState: MoviesState = {
  movies: [],
  watchlist: [],
};

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

const moviesReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'ADD_TO_WATCHLIST':
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_FROM_WATCHLIST':
      return { ...state, watchlist: state.watchlist.filter(movie => movie.imdbID !== action.payload) };
    case 'UPDATE_RATING':
      return {
        ...state,
        watchlist: state.watchlist.map(movie =>
          movie.imdbID === action.payload.imdbID ? { ...movie, Rating: action.payload.rating } : movie
        ),
      };
    default:
      return state;
  }
};

export const MoviesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const fetchMovies = async (query: string) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=3acf6ddc&s=${query}`);
      dispatch({ type: 'SET_MOVIES', payload: response.data.Search });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const addToWatchlist = (movie: Movie) => dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie });
  const removeFromWatchlist = (imdbID: string) => dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: imdbID });
  const updateRating = (imdbID: string, rating: number) => dispatch({ type: 'UPDATE_RATING', payload: { imdbID, rating } });

  return (
    <MoviesContext.Provider value={{ ...state, fetchMovies, addToWatchlist, removeFromWatchlist, updateRating }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error('useMovies must be used within a MoviesProvider');
  return context;
};
