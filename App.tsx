import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Language } from './types';
import { ContentProvider } from './ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Fleet } from './components/Fleet';
import { Values } from './components/Values';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';

// Main Site Component
const HomePage: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  
  // Animation Observer Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold-400 selection:text-white">
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Process lang={lang} />
        <Fleet lang={lang} />
        <Values lang={lang} />
        <BookingForm lang={lang} />
      </main>

      <Footer lang={lang} onAdminClick={() => {}} />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard lang="fr" />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;