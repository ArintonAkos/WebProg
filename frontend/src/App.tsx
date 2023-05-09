import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AddRestaurantForm from './pages/restaurant/AddRestaurantForm';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';
import RestaurantList from './pages/restaurant/RestaurantList';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';
import RestaurantEdit from './pages/restaurant/RestaurantEdit';
import FormPage from './pages/plus-lab-4/FormPage';
import FormDataPage from './pages/plus-lab-4/FormDataPage';
import RegisterPage from './pages/auth/RegistrationPage';
import LoginPage from './pages/auth/LoginPage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/" element={<RestaurantList />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/restaurant/add" element={<AddRestaurantForm />} />
            <Route path="/restaurants/edit/:id" element={<RestaurantEdit />} />

            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />

            <Route path="/form" element={<FormPage />} />
            <Route path="/form-data" element={<FormDataPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
