import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AddRestaurantForm from './pages/AddRestaurantForm';
import UploadImagesForm from './pages/UploadImagesForm';
import ReservationForm from './pages/ReservationForm';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/add-restaurant" element={<AddRestaurantForm />} />
            <Route path="/upload-images" element={<UploadImagesForm />} />
            <Route path="/reservation" element={<ReservationForm />} />
            <Route path="*" element={<Navigate to="/restaurants" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
