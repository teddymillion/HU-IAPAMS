import { api } from "../utils/api";
import toast from "react-hot-toast";

export const createPosition = async (positionData, token) => {
  try {
    const res = await api.post("/positions/create", positionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to create position' } 
    };
  }
};

export const getPositions = async (queryParams, token) => {
  try {
    // const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/positions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to fetch positions' } 
    };
  }
};

export const getPositionById = async (id, token) => {
  try {
    const res = await api.get(`/positions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to fetch position' } 
    };
  }
};

export const updatePosition = async (id, updateData, token) => {
  try {
    const res = await api.patch(`/positions/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Position updated successfully!");
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to update position' } 
    };
  }
};

export const closePosition = async (id, token) => {
  try {
    const res = await api.patch(`/positions/${id}/close`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Position closed successfully!");
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Failed to close position' } 
    };
  }
};