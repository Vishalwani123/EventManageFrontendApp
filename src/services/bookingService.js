import axios from './api';

export const bookTicket = async (id, bookingDetails) => {
  try {
    const res = await axios.post(`/api/bookings/${id}`, bookingDetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error booking ticket:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getTicket = async () => {
  try {
    const res = await axios.get("/api/bookings/user/tickets", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};