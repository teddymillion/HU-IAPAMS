import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPositionById } from '../../services/positionService';
import { toast } from 'react-hot-toast';

const PositionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const res = await getPositionById(id);
      if (res.success) {
        setPosition(res.data.data);
      } else {
        toast.error('Failed to load position');
      }
    } catch (error) {
      console.error('Error fetching position', error);
      toast.error('Error fetching position');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!position) {
    return <div className="p-8 text-center">Position not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-500 hover:underline"
      >
        ← Back to Positions
      </button>

      <h1 className="text-2xl font-bold mb-2">{position.title}</h1>
      <p className="text-gray-500 mb-4">
        {position.department} • {position.type}
      </p>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Description</h2>
        <p>{position.description}</p>
      </div>

      {position.requirements && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside">
            {position.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Location</h2>
        <p>{position.location}</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/staff/positions`)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default PositionDetail;
