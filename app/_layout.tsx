import useThemeColors from '@/hooks/useThemeColors';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'react-native';
import { queryClient } from '@/hooks/queryClient';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

// Auth protection component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';

    if (!isLoading) {
      // If not authenticated and not in auth group, redirect to login
      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/auth/login');
      }

      // If authenticated and in auth group, redirect to home
      if (isAuthenticated && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [isAuthenticated, segments, isLoading]);

  // While loading auth state, show nothing
  if (isLoading) return null;

  return <>{children}</>;
}

// Define layout for auth group (login, verify, register)
export function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const Colors = useThemeColors();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar backgroundColor={Colors.greyWhite} />
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
