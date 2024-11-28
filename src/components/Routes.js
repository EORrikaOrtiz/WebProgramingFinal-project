import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginAccess from './Login';
import AdminDashboard from './Administrator';
import { UserPanel } from './User';

const AppRoutes = () => {
  const [authData, setAuthData] = useState(null);

  const handleLogin = (data) => {
    setAuthData(data); 
  };

  const PrivateRoute = ({ children, role }) => {
    if (!authData) {
      return <Navigate to="/" replace />;
    }
    if (authData.role !== role) {
      return <Navigate to={authData.role === 'admin' ? '/admin' : '/user'} replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!authData ? <LoginAccess onLogin={handleLogin} /> : <Navigate to={`/${authData.role}`} />}
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard token={`Bearer ${authData?.token}`} />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserPanel token={`Bearer ${authData?.token}`} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
