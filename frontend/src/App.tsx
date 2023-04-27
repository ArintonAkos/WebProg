import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AddRestaurantForm from './pages/restaurant/AddRestaurantForm';
import ReservationForm from './pages/reservation/ReservationForm';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';
import RestaurantList from './pages/restaurant/RestaurantList';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';
import RestaurantEdit from './pages/restaurant/RestaurantEdit';

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurant/add" element={<AddRestaurantForm />} />
            <Route path="/restaurants/edit/:id" element={<RestaurantEdit />} />
            <Route path="/reservation/:id" element={<ReservationForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
