import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AddRestaurantForm from './pages/restaurant/AddRestaurantForm';
import UploadImagesForm from './pages/restaurant/UploadImagesForm';
import ReservationForm from './pages/reservation/ReservationForm';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';
import RestaurantList from './pages/restaurant/RestaurantList';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/add-restaurant" element={<AddRestaurantForm />} />
            <Route path="/upload-images/:id" element={<UploadImagesForm />} />
            <Route path="/reservation/:id" element={<ReservationForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
