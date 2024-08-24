import { useEffect, useState } from 'react';
import axios from 'axios';

const useTasks = (retryCount = 3, retryDelay = 1000) => {
  const [tasks, setTasks] = useState([]); //state to store tasks
  const [loading, setLoading] = useState(true); //state to indicate loading state
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const fetchTasks = async (retries = retryCount) => {
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
        if (retries > 0) {
          // Retry the request if it fails
          setTimeout(() => fetchTasks(retries - 1), retryDelay);
          return;
        } else {
        // Provide more detailed error messages after exhausting retries
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
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [retryCount, retryDelay]); // included as dependencies to avoid stale closures

  return { tasks, loading, error };
};

export default useTasks; // Export the custom hook for use in other components
