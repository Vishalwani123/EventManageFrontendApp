import { useEffect, useState } from 'react';
import { getEventsByuserId } from '../services/eventService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';
import '../Style/Dashboard.css';

function YourEvents() {
  const { userId } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    getEventsByuserId(userId).then(setEvents);
  }, [userId]);

  const handleView = (id) => {
    if (isAuthenticated) {
      navigate(`/event/${id}/${userId}`);
    } else {
      toast.success('Login to continue', { autoClose: 800 });
      setTimeout(() => navigate('/login'), 100);
    }
  };
  const rows = Math.ceil(events.length / 4);
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Your Events</h1>
        <div className={`dashboard-events-grid ${rows > 2 ? 'scrollable' : ''}`} id="events">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onView={handleView} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourEvents;