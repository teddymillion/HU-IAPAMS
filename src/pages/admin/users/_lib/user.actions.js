import { getSearchQuery } from '/src/utils/helper';
import { toast } from 'sonner';
import { api, publicApi } from '/src/utils/api';

export const getUsers = async (queryParams, token) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/auth/users${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'An unknown error occurred' } 
    };
  }
};

export const createUser = async (data, token, isPublicRegistration = false) => {
  try {
    const { confirm_password, status, ...rest } = data;
    let res = '';
    
    if (isPublicRegistration) {
      res = await publicApi.post(`/auth/register`, rest);
    } else {
      res = await api.post(`/auth/register`, rest, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    if (!res.data.success) {
      throw new Error(res.data.message || 'Registration failed');
    }
    
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'An unknown error occurred' } 
    };
  }
};

export const updateUserData = async (data, token) => {
  try {
    const payload = {
      role: data.role,
      is_deleted: data.is_deleted,
      status: data.status,
      contact_number: data.contact_number,
    };
    
    const res = await api.patch(`/auth/users/${data._id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'An unknown error occurred' } 
    };
  }
};

//  TODO: will be configured with api 
export const deleteUserAsync = async (ids, password, token) => {
  try {
    const res = await api.delete(`/auth/users`, {
      data: { ids: ids },
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Delete-Password': password
      }
    });
    
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { 
      success: false, 
      error: error.response?.data || { message: 'An unknown error occurred' } 
    };
  }
};