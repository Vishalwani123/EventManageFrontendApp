import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Footer.css';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Event Organizer',
    rating: 5,
    text: 'EventFlow made our conference seamless. Booking and QR check-ins were flawless.',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Tech Meetup Host',
    rating: 5,
    text: 'Best event platform we have used. Clean UI and reliable ticket management.',
    avatar: 'RV',
  },
  {
    id: 3,
    name: 'Anita Desai',
    role: 'Corporate HR',
    rating: 5,
    text: 'Our team uses EventFlow for all company events. Highly recommend!',
    avatar: 'AD',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Community Manager',
    rating: 4,
    text: 'Great experience. Would love to see more customization options in the future.',
    avatar: 'VS',
  },
];

function ReviewCard({ review }) {
  return (
    <div className="footer-review-card">
      <div className="footer-review-header">
        <div className="footer-review-avatar">{review.avatar}</div>
        <div className="footer-review-meta">
          <span className="footer-review-name">{review.name}</span>
          <span className="footer-review-role">{review.role}</span>
        </div>
      </div>
      <div className="footer-review-stars">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="footer-review-text">"{review.text}"</p>
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__reviews">
        <div className="footer__inner">
          <h2 className="footer__section-title">What People Say</h2>
          <div className="footer__reviews-grid">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__inner footer__bottom-inner">
          <div className="footer__company">
            <div className="footer__brand">
              <i className="bi bi-calendar-event" aria-hidden="true" />
              <span>EventFlow</span>
            </div>
            <p className="footer__tagline">Your events, simplified. Discover, book, and manage in one place.</p>
            <div className="footer__contact">
              <span><i className="bi bi-geo-alt" /> 123 Event Street, City 400001</span>
              <span><i className="bi bi-envelope" /> support@eventflow.com</span>
            </div>
          </div>
          {/* <div className="footer__links">
            <h3>Quick Links</h3>
            <Link to="/#">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
            <Link to="/#events">Events</Link>
          </div> */}
          <div className="footer__social">
            <h3>Follow Us</h3>
            <div className="footer__social-icons">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <div className="footer__inner">
            <p>&copy; {currentYear} EventFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
