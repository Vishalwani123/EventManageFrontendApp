import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MakeEvent from './pages/MakeEvent';
import EventDetailsPage from './pages/EventDetailsPage';
import BookTicketPage from './pages/BookTicketPage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import YourEvents from './pages/YourEvents';
import UpdateEvent from './pages/UpdateEvent';
import QRCodePage from './pages/QRCodePage';
import QRScanner from './components/QRScanner';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        <header className="app-header">
          <Navbar />
        </header>
        <main className="app-main">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/MakeEvent" element={<MakeEvent />} />
            <Route path="/UpdateEvent" element={<UpdateEvent />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/event/:id/:userId" element={<EventDetailsPage />} />
            <Route path="/book/:id" element={<BookTicketPage />} />
            <Route path="/qrcode" element={<QRCodePage />} />
            <Route path="/qrscan" element={<QRScanner />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/yourEvents/:userId" element={<YourEvents />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;