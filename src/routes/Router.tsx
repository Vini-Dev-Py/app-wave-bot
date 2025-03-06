import { useCallback, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Login } from "../pages/Login/Login";
import { PrivateRoute } from "../components/Private/PrivateRoute";
import { Flow } from "../pages/Flows/Flow";
import { FlowBuilder } from "../pages/FlowBuilder/FlowBuilder";

export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "mock-token")
  }, [])

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login handleLoginSuccess={handleLoginSuccess} />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <>
              Home
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/flows"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Flow />
          </PrivateRoute>
        }
      />
      <Route
        path="/flow-builder"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <FlowBuilder />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
