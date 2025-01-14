
import axios from 'axios';

const registerForEvent = async (eventId: string) => {
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const token = localStorage.getItem("token");
    const response = await axios.post(`${backend}/api/events/register`, { eventId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Registration successful:', response.data);
  } catch (error: any) {
    console.error('Error registering for event:', error.response?.data || error.message);
  }
};

export default registerForEvent;