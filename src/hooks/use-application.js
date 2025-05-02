import { useState, useEffect, useCallback } from 'react';
import { ApplicationService } from '../api/application';
import { Application, ApplicationStatus } from '../types/application';
// import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';


export const useApplication = () => {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  // Fetch applications with filters
  const fetchApplications = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, meta } = await ApplicationService.getApplications(params);
      setApplications(data);
      setMeta(meta);
    } catch (err) {
      setError(err.message || 'Failed to fetch applications');
      toast.error(err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new application
  const createApplication = async (data) => {
    setLoading(true);
    try {
      const application = await ApplicationService.createApplication(data);
      setApplications(prev => [application, ...prev]);
      toast.success('Application submitted successfully!');
      return application;
    } catch (err) {
      setError(err.message || 'Failed to submit application');
      toast.error(err.message || 'Failed to submit application');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Withdraw application
  const withdrawApplication = async (id) => {
    setLoading(true);
    try {
      const updatedApp = await ApplicationService.withdrawApplication(id);
      setApplications(prev =>
        prev.map(app => (app.id === id ? updatedApp : app))
      );
      toast.success('Application withdrawn successfully');
    } catch (err) {
      setError(err.message || 'Failed to withdraw application');
      toast.error(err.message || 'Failed to withdraw application');
    } finally {
      setLoading(false);
    }
  };

  // Upload document
  const uploadDocument = async (file) => {
    try {
      const { url } = await ApplicationService.uploadDocument(file);
      return url;
    } catch (err) {
      toast.error(err.message || 'Failed to upload document');
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications({ 
        applicantId: user.id,
        page: 1,
        limit: 10 
      });
    }
  }, [user, fetchApplications]);

  return {
    applications,
    loading,
    error,
    meta,
    fetchApplications,
    createApplication,
    withdrawApplication,
    uploadDocument,
    refetch: fetchApplications,
  };
};