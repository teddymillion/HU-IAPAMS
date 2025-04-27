import { getSearchQuery } from '/src/utils/helper';
import { toast } from 'sonner';

import { api, publicApi } from '/src/utils/api';

export const getUsers = async (queryParams) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/auth/getall-users${searchQuery}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const createUser = async (data, isPublicRegistration = false) => {
  try {
    const { confirm_password, status, ...rest } = data;
    let res = '';
    if (isPublicRegistration) {
      res = await publicApi.post(`/auth/register`, rest);
    } else {
      res = await api.post(`/auth/register`, rest);
    }
    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const updateUserData = async (data) => {
  try {
    const payload = {
      role: data.role,
      is_deleted: data.is_deleted,
      status: data.status,
      contact_number: data.contact_number,
    };
    const res = await api.patch(`/auth/update-user/${data._id}`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};

export const deleteUserAsync = async (ids) => {
  try {
    const res = await api.delete(`/auth/delete`, {
      data: { ids: ids },
    });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return { success: false, error: error.response ? error.response.data : 'An unknown error occurred' };
  }
};