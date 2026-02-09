import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookTicket  } from '../services/bookingService';
import { toast } from 'react-toastify';
import { getEventById } from '../services/eventService';
import '../Style/EventCard.css';
import '../Style/BookingEvent.css';

function BookTicketPage() {
  const { id } = useParams();
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('visitedPage', 'bookTicket');
  }, []);

  useEffect(() => {
    document.title = "Book Event";
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id);
      setEvent(fetchedEvent);
      setTicketsLeft(Number(fetchedEvent.availableTicket ?? fetchedEvent.capacity));
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketsToBook = Number(numberOfTickets);
    if (ticketsToBook <= 0) {
      alert("Number of tickets must be at least 1");
      return;
    }
    if (ticketsLeft !== null && ticketsToBook > ticketsLeft) {
      alert("Not enough tickets left");
      return;
    }
    const bookingDetails = { ticket: numberOfTickets }; 

    try {
      const responseData = await bookTicket(id, bookingDetails);
      
      setTicketsLeft((prev) => (prev !== null ? prev - ticketsToBook : 0));

      toast.success(`${responseData.username} Booking is done for - ${responseData.eventTitle} `, {autoClose: 1000,}); 

      let qrCodeArray = responseData.qrCodes;

      if (typeof qrCodeArray === 'string') {
        qrCodeArray = qrCodeArray.split(',');
      }

      navigate('/qrcode', { state: { qrCodeValues: qrCodeArray, eventTitles: responseData.eventTitle }});
    } 
    catch (error) {
      toast.error(`Booking Fail`, {autoClose: 1000,});
    }
  };

  return (
    <div className="booking-page-container" style={{ position: 'relative' }}>
      <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>← Back</button>
      {event && (
        <div className="event-detail">
          <h1>{event.title}</h1>
          {event.img && <img src={`data:image/jpg;base64,${event.img}`} alt={event.title} />}
          <p>{event.description}</p>
          <p><strong>Location :</strong> {event.location}</p>
          <p><strong>Capacity :</strong> {event.capacity}</p>
          <p><strong>Available Ticket :</strong> {event.availableTicket}</p>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="ticketNumber">Number of Tickets</label>
              <input
                id="ticketNumber"
                type="number"
                min="1"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                className="form-control booking-input"
                required
              />
            </div>
            <button type="submit" className="btn-book">Book Now</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookTicketPage;