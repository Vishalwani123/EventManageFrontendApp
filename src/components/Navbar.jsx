import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTicket } from '../services/bookingService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import '../Style/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setIsAdmin(false);
    const storedUser = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    setDropdownOpen(false);
    if (storedUser && token) {
      try {
        setUser(storedUser);
        const decodedToken = jwtDecode(token);
        const role = decodedToken.sub.split(':').pop();
        if (role && role === 'ADMIN') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, [location]);

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
    closeMenus();
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        toast.info('Logout Successful!', { autoClose: 800, hideProgressBar: true });
        window.location.href = '/';
      }
    });
  };

  const handleQRCode = async () => {
    try {
      const responseData = await getTicket();
      const qrCodeArray = responseData.flatMap((booking) =>
        booking.qrCodes.map((qr) => ({
          qrCode: qr,
          eventTitle: booking.eventTitle,
        }))
      );
      if (qrCodeArray.length !== 0) {
        navigate('/qrcode', { state: { qrCodeValues: qrCodeArray } });
        closeMenus();
      } else {
        toast.warning('No QR Codes available!', { autoClose: 800, hideProgressBar: true });
      }
    } catch (error) {
      toast.error('You have not booked an Event.', { autoClose: 800 });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={handleHomeClick}>
          <span className="navbar__brand-icon">
            <i className="bi bi-calendar-event" aria-hidden="true" />
          </span>
          <span className="navbar__brand-text">EventFlow</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`} />
          <span className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`} />
          <span className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`} />
        </button>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {user ? (
            <div className="navbar__user">
              <span className="navbar__welcome">
                <i className="bi bi-person-circle" />
                <span>{user}</span>
              </span>
              <button
                type="button"
                className="navbar__dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <i className="bi bi-list" />
              </button>

              <div className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}>
                <button
                  type="button"
                  className="navbar__dropdown-item"
                  onClick={handleQRCode}
                >
                  <i className="bi bi-qr-code" />
                  <span>QR Codes</span>
                </button>
                {isAdmin && (
                  <Link
                    to="/MakeEvent"
                    className="navbar__dropdown-item"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-plus-circle" />
                    <span>Create Event</span>
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to={`/yourEvents/${userId}`}
                    className="navbar__dropdown-item"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-calendar2-event" />
                    <span>Your Events</span>
                  </Link>
                )}
                <button
                  type="button"
                  className="navbar__dropdown-item navbar__dropdown-item--logout"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link
                to="/login"
                className={`navbar__link navbar__link--cta ${isActive('/login') ? 'navbar__link--active' : ''}`}
                onClick={closeMenus}
              >
                <i className="bi bi-box-arrow-in-right" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className={`navbar__btn navbar__btn--primary ${isActive('/register') ? 'navbar__btn--active' : ''}`}
                onClick={closeMenus}
              >
                <span>Sign up</span>
              </Link>
            </div>
          )}
        </nav>

        {dropdownOpen && (
          <div
            className="navbar__backdrop"
            onClick={() => setDropdownOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setDropdownOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
        )}
      </div>
    </header>
  );
}

export default Navbar;
