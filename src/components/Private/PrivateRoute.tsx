import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../layout/header/Header';
import { Sidebar } from '../layout/sidebar/Siderbar';

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
