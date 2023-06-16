import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import RestaurantCreate from './pages/restaurant/RestaurantCreate';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';
import RestaurantList from './pages/restaurant/RestaurantList';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';
import RestaurantEdit from './pages/restaurant/RestaurantEdit';
import RegisterPage from './pages/auth/RegistrationPage';
import LoginPage from './pages/auth/LoginPage';
import ReservationList from './pages/reservation/ReservationList';
import LogoutPage from './pages/auth/LogoutPage';
import ManageReservations from './pages/reservation/ManageReservations';

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/" element={<RestaurantList />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurant/add" element={<RestaurantCreate />} />
            <Route path="/restaurants/edit/:id" element={<RestaurantEdit />} />

            <Route path="/reservations/" element={<ReservationList />} />
            <Route path="/reservations/manage" element={<ManageReservations />} />

            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/logout" element={<LogoutPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
