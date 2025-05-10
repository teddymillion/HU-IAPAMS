import toast from "react-hot-toast";
import { api } from "../utils/api";


export const getUsers = async (queryParams, token) => {
    try {
        const searchQuery = getSearchQuery(queryParams);
        const res = await api.get(`/auth/users${searchQuery}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
    }
    catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return { 
        success: false, 
        error: error.response?.data || { message: 'An unknown error occurred' } 
        };
    }
}

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
}

// export const updateUserData = async (data, token) => {
//     try {
//         const payload = {
//             role: data.role,
//             status: data.status,
//             contact_number: data.contact_number,
//         };

//         const res = await api.put(`/auth/users/${data.id}`, payload, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         if (!res.data.success) {
//             throw new Error(res.data.message || 'Update failed');
//         }

//         toast.success(res.data.message);
//         return { success: true, data: res.data.data };
//     } catch (error) {
//         toast.error(error.response?.data?.message || error.message);
//         return { 
//             success: false, 
//             error: error.response?.data || { message: 'An unknown error occurred' } 
//         };
//     }
// }

// export const forgotPassword = async (email) => {
//     try {
//         const res = await api.post('/auth/forgot-password', { email });
//         if (!res.data.success) {
//             throw new Error(res.data.message || 'Forgot password failed');
//         }
//         return { success: true, data: res.data.data };
//     } catch (error) {
//         toast.error(error.response?.data?.message || error.message);
//         return { 
//             success: false, 
//             error: error.response?.data || { message: 'An unknown error occurred' } 
//         };
//     }
// }



export const updateUserProfile = async (data, token) => {
    try {
        // Create FormData if we have a file to upload
        const formData = new FormData();
        
        // Append all user data fields
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('department', data.department);
        formData.append('positionType', data.positionType);
        formData.append('bio', data.bio);
        formData.append('address', data.address);
        formData.append('website', data.website);

// formData.append('education', JSON.stringify(data.education || []));
//         formData.append('experience', JSON.stringify(data.experience || []));
//         formData.append('skills', JSON.stringify(data.skills || []));
          Object.keys(data).forEach(key => {
      if (key === 'education' || key === 'experience' || key === 'skills') {
        formData.append(key, JSON.stringify(data[key] || []));
      } 
    });
        // Fix: Properly handle socialMedia object
        if (data.socialMedia) {
            const socialMediaObj = typeof data.socialMedia === 'string' ? 
                JSON.parse(data.socialMedia) : 
                data.socialMedia;
            formData.append('socialMedia', JSON.stringify(socialMediaObj));
        } else {
            formData.append('socialMedia', JSON.stringify({}));
        }        
        // Append profile photo if it's a File object
        if (data.profilePhotoFile) {
            formData.append('profilePhoto', data.profilePhotoFile);
        }

        const res = await api.patch(`/auth/users/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.data.success) {
            throw new Error(res.data.message || 'Update failed');
        }

        // toast.success('Profile updated successfully');
        return { 
            success: true, 
            data: res.data.data,
            message: res.data.message
        };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Failed to update profile');
        return { 
            success: false, 
            error: error.response?.data || { message: 'An unknown error occurred' } 
        };
    }
};
export const forgotPassword = async (email) => {
    try {
        const res = await api.post('/auth/forgot-password', { email });
        if (!res.data.success) {
            throw new Error(res.data.message || 'Forgot password failed');
        }
        return { success: true, data: res.data.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || { message: 'An unknown error occurred' } 
        };
    }
};


export const resetPassword = async (token,newPassword) => {
    try {
        const res = await api.post('/auth/reset-password', {resetToken: token, newPassword
        });
        if (!res.data.success) {
            throw new Error(res.data.message || 'Reset password failed');
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
}


export const deleteUserAsync = async (ids, password, token) => {
    try {
        const res = await api.delete(`/auth/users`, {
            data: { ids: ids },
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Delete-Password': password
            }
        });

        if (!res.data.success) {
            throw new Error(res.data.message || 'Delete failed');
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
}


export const changePassword = async (data, token) => {
    try {
        const res = await api.patch('/auth/change-password', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, data: res.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || { message: 'An unknown error occurred' },
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