import { useEffect } from 'react';

export const useRequiredUser = () => {

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');

    if (!userProfile) {
      window.location.href = '/login';
    }
  }, []);

  return null;
};
