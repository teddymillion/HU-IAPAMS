import { alpha } from '@mui/material';
import { toast } from 'react-hot-toast';

export const getSearchQuery = (queryParams) => {
  const { page, rowsPerPage, status, role } = queryParams;
  let query = '?';

  if (status && status !== '') {
    query += `status=${status}&`;
  }

  if (role && role !== '') {
    query += `role=${role}&`;
  }

  query += `page=${page || 1}&size=${rowsPerPage > 30 ? 30 : (rowsPerPage || 10)}`;

  return query;
};


export const getSpeficiLengthString = (string, length) => {
  if (!string) return '';
  if (string.length > length) {
    return string.substring(0, length) + '...';
  }
  return string;
};

export const getModifiedStatus = (status) => {
  const newStatus = status.split('_').join(' ').toUpperCase();
  return newStatus;
};

export function debounceFunc(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const getSearchQueryPortfolio = (queryParams) => {
  const { searchTerm, page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc' } = queryParams;

  const query = new URLSearchParams();

  if (searchTerm) {
    query.append('searchTerm', searchTerm);
  }
  if (page) {
    query.append('page', page);
  }
  if (limit) {
    query.append('limit', limit);
  }
  if (sortBy) {
    query.append('sortBy', sortBy);
  }
  if (sortOrder) {
    query.append('sortOrder', sortOrder);
  }
  return `?${query.toString()}`;
};

export const isVideoContent = (url) => {
  const videoKeywords = ['vimeo', 'playback', 'video', 'mp4', 'webm', 'ogg'];
  return videoKeywords.some((keyword) => url.includes(keyword));
};

export const sliderToGridColsCoverter = (sliderCols) => {
  switch (sliderCols) {
    case 1:
      return 3;
    case 2:
      return 3.6;
    case 3:
      return 4;
    case 4:
      return 4.5;
    case 5:
      return 6;
    case 6:
      return 7.2;
    case 7:
      return 9;
    default:
      return 6;
  }
};

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export const textShortner = (text, length) => {
  if (text && text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const colors = ['#5C7285', '#818C78', '#D2665A', '#48A6A7', '#16404D', '#809D3C', '#578E7E', '#E16A54'];
export const getRandomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return alpha(color, 0.8);
};

export const getFancyColor = (index) => {
  const newIndex = index > colors.length - 1 ? 0 : index;
  return colors[newIndex];
};

export const extractFilenameAndType = (path) => {
  if (!path) return { name: '', type: '' };
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  const [name, type] = filename.split('.');
  return { fileName: name, fileType: type };
};

export const isSupabaseUrl = (url) => {
  if (!url) return false;
  return !url.includes('http') && !url.includes('www');
};

const gradients = ['#C8F0D4', '#FCEBA7', '#A6D1F9'];

export const getRandomGradientColor = (index) => {
  const newIndex = index > gradients.length - 1 ? 0 : index;
  return gradients[newIndex];
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const formatCompactNumber = (number) => {
  const num = Number(number || 0);
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }

  return num.toString();
};

export const handleCopy = async (text) => {
  if (text.length === 0) {
    toast.error('No text to copy.');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy text.');
    console.error('Error copying text:', err);
  }
};