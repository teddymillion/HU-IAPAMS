// src/hooks/usePositions.ts
import { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

export const usePositions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const { data } = await apiClient.get('/positions');
        setPositions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return { positions, loading, error };
};