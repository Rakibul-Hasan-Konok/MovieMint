import React from 'react'
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import MyBookings from './pages/MyBookings';
import Favorite from './pages/Favorite';
import SeatLayout from './pages/SeatLayout';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

const App = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-booking' element={<MyBookings />} />
        <Route path='/favourite' element={<Favorite />} />
        <Route path='*' element={<div>Page Not Found</div>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
