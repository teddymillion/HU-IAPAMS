// src/api/application.api.js
import { api } from "../utils/api";
import toast from "react-hot-toast";


export const applyToPosition = async (formData, token) => {
  try {
    for (let pair of formData.entries()) {
      console.log(`FormData entry: ${pair[0]} =`, pair[1]);
    }

    const res = await api.post('/applications', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    toast.success("Application submitted successfully!");
    return { success: true, data: res.data };
  } catch (error) {
    console.error('applyToPosition error:', error.response?.data || error);
    toast.error(error.response?.data?.message || 'Failed to submit application');
    return {
      success: false,
      error: error.response?.data || { message: 'Failed to submit application' }
    };
  }
};

export const getMyApplications = async (token) => {
  try {
    const res = await api.get('/applications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to get applications' } 
    };
  }
};

export const getUserProfile = async (token) => {
  try {
    const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    // console.log('User profile response:', res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('getUserProfile error:', error);
    toast.error(error.response?.data?.message || 'Failed to fetch profile');
    return { success: false, data: null };
  }
};

export const getUserStats = async (token) => {
  try {
    const res = await api.get('/users/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('User stats response:', res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('getUserStats error:', error);
    toast.error(error.response?.data?.message || 'Failed to fetch stats');
    return { success: false, data: {} };
  }
};

// export const getEvaluations = async (token) => {
//   try {
//     const res = await api.get('/applications/evaluations', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     console.log('Evaluations response:', res.data);
//     return { success: true, data: res.data };
//   } catch (error) {
//     console.error('getEvaluations error:', error);
//     toast.error(error.response?.data?.message || 'Failed to fetch evaluations');
//     return { success: false, data: [] };
//   }
// };

// Add these new functions to your existing application.api.js

export const getEvaluations = async (token) => {
  try {
    const res = await api.get('/applications', {
      params: { evaluatorView: true },
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('getEvaluations error:', error);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to get evaluations' } 
    };
  }
};

export const submitEvaluation = async (applicationId, evaluationData, token) => {
  try {
    const res = await api.post(
      `/applications/${applicationId}/evaluate`,
      evaluationData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.error('submitEvaluation error:', error);
    return {
      success: false,
      error: error.response?.data || { message: 'Failed to submit evaluation' }
    };
  }
};