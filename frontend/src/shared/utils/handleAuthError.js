import { toast } from 'react-toastify';

export function handleAuthError(navigate) {
  localStorage.removeItem('token');
  toast.error('Session expired. Please log in again.');
  navigate('/login');
} 