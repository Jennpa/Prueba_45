import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import PrivadaComponent from './components/PrivadaComponent/PrivadaComponent';
import { useAuth } from './context/AuthContext';
import './App.css';
import UsoInterno from './components/UsoInterno/UsoInterno';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/acceso" />;
}

function App() {
    return (
        <Router>
            <Header />
            <NavBar />
            <div className="container content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/acceso" element={<Login />} />
                    <Route path="/uso_interno" element={<UsoInterno />} />
                    <Route path="/privada" element={
                        <PrivateRoute>
                            <PrivadaComponent />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
