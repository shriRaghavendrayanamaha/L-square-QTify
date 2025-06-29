import React, { useEffect, useState } from "react";
//import Hero from "./components/Hero/Hero";
//import HomePage from "./pages/HomePage/HomePage.jsx";
import Navbar from "./components/Navbar/Navbar";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Outlet } from "react-router-dom";
import {
  fetchFilters,
  fetchNewAlbums,
  fetchSongs,
  fetchTopAlbums,
} from "./api/api";

function App() {
  
    const [data, setData] = useState({});

  

  const generateData = (key, source) => {
    source().then((data) => {
      setData((prevState) => {
      
        return { ...prevState, [key]: data };
      });
    });
  };

  useEffect(() => {
    generateData("topAlbums", fetchTopAlbums);
    generateData("newAlbums", fetchNewAlbums);
    generateData("songs", fetchSongs);
    generateData("genres", fetchFilters);
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [], genres = [] } = data;

  return (
    <>
      <StyledEngineProvider injectFirst>
        <Navbar searchData={[...topAlbums, ...newAlbums]} />
        <Outlet context={{ data: { topAlbums, newAlbums, songs, genres } }} />
      </StyledEngineProvider>
    </>
  );

}

export default App;
