import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import LandingPage from '../pages/LandingPage';
import Login from '../../auth/pages/Login';
import Register from '../../auth/pages/Register';
import ForgotPassword from '../../auth/pages/ForgotPassword';
import Profile from '../../auth/pages/ProfilePage';
import HomePage from '../pages/HomePage';
import Settings from '../../auth/pages/SettingsPage';
import Properties from '../../auth/pages/PropertiesPage';
import Payment from '../../auth/pages/PaymentPage';
import ProtectedRoute from '../../auth/components/ProtectedRoute';
import PublicRoute from '../../auth/components/PublicRoute';
import AdminRoute from '../../auth/components/AdminRoute';
import Admin from '../../auth/pages/Admin';
import ComingsoonPage from '../../auth/pages/ComingsoonPage';
import DashboardPage from '../pages/DashboardPage';
const SubscriptionRouting = React.lazy(() => import('../../auth/routing/subscriptionrouting'));

const Routing = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comingsoon"
          element={
            <ProtectedRoute>
              <ComingsoonPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions/*"
          element={<Suspense><SubscriptionRouting /></Suspense>}
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Routing;
