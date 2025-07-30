
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import URLForm from './components/URLForm';
import StatsPage from './components/StatsPage';
import RedirectHandler from './components/RedirectHandler';
import Navbar from './components/Navbar';
import { UrlProvider } from './context/UrlContext';
import './styles/beautiful.css';


function AppContent() {
  const location = useLocation();
  // Hide Navbar on redirect page
  const isRedirect = /^\/[\w-]+$/.test(location.pathname) && location.pathname !== '/stats';
  return (
    <>
      {!isRedirect && <Navbar />}
      <div className={!isRedirect ? 'main-content' : ''}>
        <Routes>
          <Route path="/" element={<URLForm />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </div>
    </>
  );
}

const App = () => (
  <UrlProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </UrlProvider>
);

export default App;
