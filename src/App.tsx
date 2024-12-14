import React, { useState } from 'react';
import styled from 'styled-components';
import MovieList from './Components/MovieList';
import Watchlist from './Components/Watchlist';
import Search from './Components/Search';
import { MoviesProvider } from './Context/MoviesContext';
import './App.css';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const AppTitle = styled.h1`
  color: #e50914;
`;

const Nav = styled.nav`
  margin: 20px 0;
`;

const NavButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${props => (props.active ? '#e50914' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#e50914')};
  border: 2px solid #e50914;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e50914;
    color: #fff;
  }
`;

const App: React.FC = () => {
  const [view, setView] = useState<'movies' | 'watchlist'>('movies');

  return (
    <MoviesProvider>
      <AppContainer>
        <AppTitle>Movie Library</AppTitle>
        <Search />
        <Nav>
          <NavButton active={view === 'movies'} onClick={() => setView('movies')}>
            Movies
          </NavButton>
          <NavButton active={view === 'watchlist'} onClick={() => setView('watchlist')}>
            Watchlist
          </NavButton>
        </Nav>
        {view === 'movies' && <MovieList />}
        {view === 'watchlist' && <Watchlist />}
      </AppContainer>
    </MoviesProvider>
  );
};

export default App;
