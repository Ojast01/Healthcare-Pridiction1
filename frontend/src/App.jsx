import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Prediction } from './pages/Prediction';
import { Dashboard } from "./pages/Dashboard";
import { Login } from './pages/Login';
import { Contact } from './pages/Contact';

/* Protected Route */
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />

            <Route path="predict" element={<Prediction />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="login" element={<Login />} />

            <Route path="contact" element={<Contact />} />

          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;