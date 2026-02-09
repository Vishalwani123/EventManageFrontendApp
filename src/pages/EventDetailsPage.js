import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, deleteEventById } from '../services/eventService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../Style/EventCard.css';
  
function EventDetailsPage() {
  const { id } = useParams();  
  const { userId } = useParams();  
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('visitedPage', 'eventDetails');
  }, []);

  useEffect(() => {
    document.title = "Event";
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.sub.split(":").pop();
        if (userId !== 'null' && role === 'ADMIN') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }

    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id);
      setEvent(fetchedEvent);
    };

    fetchEvent();
  }, [id, userId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const token = localStorage.getItem('token');
      try {
        await deleteEventById(id, token);
        toast.success(`${event.title} is deleted successfully!`, { autoClose: 800, hideProgressBar: true });
        navigate('/'); 
      } catch (error) {
        toast.error(`${event.title} not deleted`, { autoClose: 800, hideProgressBar: true });
        console.error("Error deleting event:", error);
      }
    }
  };  

  const handleUpdate = () => {
    navigate("/UpdateEvent", { state: { event, id } });   
  };

  const handleBook = () => {
    navigate(`/book/${id}`);
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-detail" style={{ position: 'relative' }}>
      <h1>{event.title}</h1>

      {event.img && (
        <img
          src={`data:image/jpg;base64,${event.img}`}
          alt={event.title}
        />
      )}

      <p>{event.description}</p>
      <p><strong>Location :</strong> {event.location}</p>
      <p><strong>Capacity :</strong> {event.capacity}</p>
      <p><strong>Available Ticket :</strong> {event.availableTicket}</p>

      <div className="button-container">
        <button className="updateEvent" onClick={handleBook}>
          Book Event
        </button>

        {isAdmin && (
          <button className="updateEvent" onClick={handleUpdate}>
            Update Event
          </button>
        )}

        {isAdmin && (
          <button className="deleteEvent" onClick={handleDelete}>
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetailsPage;
