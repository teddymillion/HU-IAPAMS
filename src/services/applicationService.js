// src/api/application.api.js
import { api } from "../utils/api";
import toast from "react-hot-toast";

export const applyToPosition = async (applicationData, token) => {
  try {
    const formData = new FormData();
    
    // Append files
    formData.append('documents.cv', applicationData.cv);
    if(applicationData.coverLetter) {
      formData.append('documents.coverLetter', applicationData.coverLetter);
    }
    applicationData.certificates?.forEach((cert, index) => {
      formData.append(`documents.certificates[${index}]`, cert);
    });
    
    // Append other fields
    formData.append('position', applicationData.positionId);
    
    const res = await api.post('/applications', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    toast.success("Application submitted successfully!");
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
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