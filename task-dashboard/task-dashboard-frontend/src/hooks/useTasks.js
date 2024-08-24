import { useEffect, useState } from 'react';
import axios from 'axios';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        const response = await axios.get('http://localhost:3000/api/tasks');

        // Check for valid response structure
        if (response.status !== 200) {
          throw new Error(`Unexpected response code: ${response.status}`);
        }

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response data format.');
        }

        setTasks(response.data);
      } catch (err) {
        // Provide more detailed error messages
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Unknown error occurred.'}`);
        } else if (err.request) {
          // No response received from server
          setError('No response from server. Please check your network connection.');
        } else {
          // Error setting up the request
          setError(`Request error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};

export default useTasks;
