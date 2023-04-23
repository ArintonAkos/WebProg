import * as React from 'react';
import { ChakraProvider, ColorModeProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRestaurantForm from './pages/AddRestaurantForm';
import UploadImagesForm from './pages/UploadImagesForm';
import ReservationForm from './pages/ReservationForm';
import HomePage from './pages/HomePage';
import Layout from './components/shared/Layout';
import { ToastProvider } from './context/toastContext';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config });

export const App = () => (
  <ChakraProvider theme={theme}>
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/add-restaurant" element={<AddRestaurantForm />} />
            <Route path="/upload-images" element={<UploadImagesForm />} />
            <Route path="/reservation" element={<ReservationForm />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  </ChakraProvider>
);
