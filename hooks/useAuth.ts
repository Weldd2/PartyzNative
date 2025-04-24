import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';

const API_URL = 'https://api.preprod.partyz.app'; // Replace with your actual API URL

// Types for authentication
export type UserCredentials = {
  phoneNumber: string;
};

export type OTPCredentials = {
  phoneNumber: string;
  otp: string;
};

export type UserRegistration = {
  phoneNumber: string;
  firstname: string;
  lastname: string;
  profilePicture?: File;
};

export type CurrentUser = {
  id: number;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  profilePick: string;
};

// Generate OTP
export function useGenerateOTP() {
  return useMutation({
    mutationFn: async (credentials: UserCredentials) => {
      const response = await fetch(`${API_URL}/otp/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Failed to generate OTP');
      }
      return response.json();
    },
  });
}

// Login with OTP
export function useLoginWithOTP() {
  return useMutation({
    mutationFn: async (credentials: OTPCredentials) => {
      const response = await fetch(`${API_URL}/login_check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      // Invalidate and refetch current user query after successful login
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      return true;
    },
  });
}

// Register user
export function useRegisterUser() {
  return useMutation({
    mutationFn: async (userData: UserRegistration) => {
      // Handle file upload with FormData
      const formData = new FormData();
      formData.append('phoneNumber', userData.phoneNumber);
      formData.append('firstname', userData.firstname);
      formData.append('lastname', userData.lastname);

      if (userData.profilePicture) {
        formData.append('profilePicture', userData.profilePicture);
      }

      const response = await fetch(`${API_URL}/user/create`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return response.json();
    },
  });
}

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/current`, {
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null; // Not authenticated
        }
        throw new Error('Failed to fetch current user');
      }

      return response.json() as Promise<CurrentUser>;
    },
  });
}

// Logout
export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'GET',
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear user from cache after logout
      queryClient.setQueryData(['currentUser'], null);

      return true;
    },
  });
}

// Refresh token - usually handled automatically by the API when needed
export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/token/refresh`, {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      return true;
    },
  });
}
